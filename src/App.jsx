import { useEffect, useRef, useState, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { label: 'Years Coding', target: 7, suffix: '+' },
  { label: 'Projects Shipped', target: 42, suffix: '' },
  { label: 'Songs Written', target: 28, suffix: '' },
  { label: 'Games Conquered', target: 150, suffix: '+' },
]

const SKILLS = [
  { name: 'React / Next.js', icon: '⚛', mastery: 95, type: 'Nodachi' },
  { name: 'Node.js', icon: '🟢', mastery: 88, type: 'Katana' },
  { name: 'Python', icon: '🐍', mastery: 82, type: 'Wakizashi' },
  { name: 'TypeScript', icon: '🔷', mastery: 90, type: 'Tachi' },
  { name: 'Tailwind CSS', icon: '🌊', mastery: 93, type: 'Naginata' },
  { name: 'PostgreSQL', icon: '🐘', mastery: 78, type: 'Yumi Bow' },
  { name: 'Docker', icon: '🐳', mastery: 72, type: 'Tanto' },
  { name: 'Framer Motion', icon: '🎞', mastery: 85, type: 'Shuriken' },
]

const PROJECTS = [
  {
    name: 'NightBlade CMS',
    desc: 'A headless content management system forged in the fires of full-stack mastery.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    difficulty: 'Master',
    github: '#',
    live: '#',
  },
  {
    name: 'Ronin API Gateway',
    desc: 'High-performance REST gateway with JWT auth, rate-limiting, and real-time analytics.',
    stack: ['Node.js', 'Redis', 'Docker', 'TypeScript'],
    difficulty: 'Ronin',
    github: '#',
    live: '#',
  },
  {
    name: 'ShadowScript CLI',
    desc: 'Terminal tool that automates deployments, scaffolding, and code generation.',
    stack: ['Python', 'Click', 'Jinja2'],
    difficulty: 'Apprentice',
    github: '#',
    live: '#',
  },
  {
    name: 'Ember Analytics',
    desc: 'Real-time dashboard for tracking user behaviour across distributed systems.',
    stack: ['React', 'D3.js', 'WebSockets', 'Node.js'],
    difficulty: 'Master',
    github: '#',
    live: '#',
  },
]

const EXPERIENCE = [
  {
    clan: 'ShadowForge Studios',
    rank: 'Lead Engineer',
    years: '2023 – Present',
    battles: ['Rebuilt core platform, 3× performance gain', 'Led 6-warrior engineering squad', 'Shipped 12 product features'],
  },
  {
    clan: 'Void Technologies',
    rank: 'Senior Developer',
    years: '2021 – 2023',
    battles: ['Architected microservices migration', 'Reduced infra costs by 40%', 'Mentored 4 junior ronin'],
  },
  {
    clan: 'Crimson Data Co.',
    rank: 'Full-Stack Developer',
    years: '2019 – 2021',
    battles: ['Built 3 client portals from 0 to launch', 'Integrated ML pipeline for data scoring', 'Wrote internal tooling used by 50+ staff'],
  },
]

const SONGS = [
  { title: 'Ember of War', mood: 'Dark Epic', plays: '12K' },
  { title: 'Neon Ronin', mood: 'Cyberpunk', plays: '8.4K' },
  { title: 'Ink & Steel', mood: 'Ambient', plays: '5.1K' },
  { title: 'Last Cherry Blossom', mood: 'Melancholic', plays: '19K' },
  { title: 'Shadow Protocol', mood: 'Electronic', plays: '7.7K' },
  { title: 'The Void Between', mood: 'Atmospheric', plays: '3.2K' },
]

const POEMS = [
  ['In the silence of the server room,', 'I hear the hum of becoming.'],
  ['Every function is a vow —', 'written in the blood of intent,', 'executed without hesitation.'],
  ['The cursor blinks like a lantern', 'at the edge of the known world.', 'I step forward anyway.'],
  ['Code does not lie.', 'It exposes the architecture of thought,', 'the skeleton beneath the skin of ambition.'],
]

const GAMES = [
  { name: 'Elden Ring', rank: 'Legend', xp: 98, trophy: '🏆', genre: 'Soulsborne' },
  { name: 'Ghost of Tsushima', rank: 'Master', xp: 95, trophy: '🥇', genre: 'Action RPG' },
  { name: 'Sekiro', rank: 'Legend', xp: 92, trophy: '🏆', genre: 'Soulsborne' },
  { name: 'Baldur\'s Gate 3', rank: 'Ronin', xp: 78, trophy: '🥈', genre: 'RPG' },
  { name: 'Hollow Knight', rank: 'Master', xp: 88, trophy: '🥇', genre: 'Metroidvania' },
  { name: 'Cyberpunk 2077', rank: 'Ronin', xp: 74, trophy: '🥈', genre: 'Open World' },
]

const RANK_COLOR = {
  Legend: 'text-yellow-400',
  Master: 'text-katana-red',
  Ronin: 'text-gray-300',
  Apprentice: 'text-gray-500',
  Bronze: 'text-orange-700',
}

const DIFFICULTY_STYLE = {
  Master: 'border-katana-red text-katana-red',
  Ronin: 'border-gray-400 text-gray-400',
  Apprentice: 'border-gray-600 text-gray-500',
}

// ─── Cursor Trail ─────────────────────────────────────────────────────────────

function CursorTrail() {
  const dotRef = useRef(null)
  const trailRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const trail = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)

    let raf
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.12
      trail.current.y += (pos.current.y - trail.current.y) * 0.12
      if (trailRef.current) {
        trailRef.current.style.left = trail.current.x + 'px'
        trailRef.current.style.top = trail.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  )
}

// ─── Cherry Blossoms ──────────────────────────────────────────────────────────

function CherryBlossoms() {
  const petals = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    size: 6 + Math.random() * 10,
    drift: (Math.random() - 0.5) * 120,
    rotate: Math.random() * 360,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          style={{ left: `${p.x}%`, top: '-5%', width: p.size, height: p.size }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, p.drift],
            rotate: [p.rotate, p.rotate + 360],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
        >
          <svg viewBox="0 0 24 24" fill="rgba(255,0,51,0.6)">
            <path d="M12 2C8 2 4 6 4 10c0 2 1 4 2.5 5.5L12 22l5.5-6.5C19 14 20 12 20 10c0-4-4-8-8-8z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Image Break ──────────────────────────────────────────────────────────────

function ImageBreak({ src, alt, tint = 'red' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.0, 1.05])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.6])
  const vigOpacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0])

  return (
    <div ref={ref} className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative">
      <motion.div style={{ scale, opacity }} className="w-full h-full">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a0008] to-[#0a0a0a] flex items-center justify-center">
            <span className="font-cinzel text-[#8b0000] text-5xl opacity-20 select-none">{alt}</span>
          </div>
        )}
      </motion.div>
      {/* Red neon vignette */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: vigOpacity,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(139,0,0,0.6) 80%, rgba(10,10,10,0.95) 100%)',
        }}
      />
      {/* Red ink bleed */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.7) 100%)' }}
      />
    </div>
  )
}

// ─── Slash Divider ────────────────────────────────────────────────────────────

function SlashDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="relative h-16 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute w-full h-px origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, #ff0033 30%, #ff0033 70%, transparent)',
          boxShadow: '0 0 8px #ff0033, 0 0 16px rgba(255,0,51,0.4)',
          transform: 'rotate(-1deg)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="relative z-10 w-3 h-3 rotate-45 border border-katana-red bg-dead-black"
        style={{ boxShadow: '0 0 8px #ff0033' }}
      />
    </div>
  )
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ children, id, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative px-6 md:px-16 py-20 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionHeading({ ja, en }) {
  return (
    <div className="mb-14 text-center">
      <p className="font-mono text-xs tracking-[0.4em] text-[#8b0000] uppercase mb-2">{ja}</p>
      <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white katana-underline inline-block">{en}</h2>
    </div>
  )
}

// ─── Stat Counter ─────────────────────────────────────────────────────────────

function StatCounter({ target, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 20)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="font-cinzel text-4xl md:text-5xl font-black neon-red">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-gray-500 mt-1 tracking-widest uppercase">{label}</div>
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '#hero', label: '始' },
  { href: '#about', label: '武' },
  { href: '#skills', label: '刃' },
  { href: '#projects', label: '案' },
  { href: '#experience', label: '歴' },
  { href: '#songs', label: '楽' },
  { href: '#poems', label: '詩' },
  { href: '#gaming', label: '遊' },
  { href: '#contact', label: '連' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-sm border-b border-[#ff0033]/20' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-cinzel text-xl font-bold neon-red">侍</a>
          {/* Desktop nav */}
          <div className="hidden md:flex gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="font-mono text-xs text-gray-400 hover:text-katana-red transition-colors tracking-widest hover:neon-red">
                {l.label}
              </a>
            ))}
          </div>
          {/* Fan hamburger */}
          <button onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2 group" aria-label="menu">
            {[0, 1, 2].map((i) => (
              <motion.span key={i}
                animate={open ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y: i === 0 ? 8 : i === 2 ? -8 : 0,
                  opacity: i === 1 ? 0 : 1,
                } : { rotate: 0, y: 0, opacity: 1 }}
                className="block w-6 h-0.5 bg-katana-red transition-all"
                style={{ boxShadow: '0 0 4px #ff0033' }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="font-cinzel text-3xl font-bold text-gray-300 hover:text-katana-red transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dead-black">
      <CherryBlossoms />
      {/* Background kanji */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-cinzel text-[28vw] font-black opacity-[0.03] text-white">侍</span>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.2 }}
          className="font-mono text-xs text-[#8b0000] tracking-[0.4em] uppercase mb-6"
        >
          ◈ Portfolio of a Dark Samurai ◈
        </motion.p>

        <div className="relative inline-block mb-4">
          <motion.h1
            data-text="SHADOW KEN"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glitch-text font-cinzel text-6xl md:text-9xl font-black text-white tracking-tight leading-none"
          >
            SHADOW KEN
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="katana-underline inline-block mb-10"
        >
          <span className="font-cinzel text-xl md:text-2xl font-semibold text-gray-300 tracking-widest">
            CREATIVE LEGEND
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="font-cinzel text-lg md:text-xl neon-red tracking-[0.2em] mb-12"
        >
          Warrior. Developer. Wordsmith. Player.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          {['#projects', '#contact'].map((href, i) => (
            <a key={href} href={href}
              className={`font-mono text-sm px-8 py-3 border tracking-widest uppercase transition-all duration-300 ${
                i === 0
                  ? 'border-katana-red text-katana-red hover:bg-katana-red hover:text-black neon-box'
                  : 'border-gray-700 text-gray-400 hover:border-gray-400 hover:text-white'
              }`}
            >
              {i === 0 ? 'View Quests' : 'Make Contact'}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-katana-red" style={{ boxShadow: '0 0 6px #ff0033' }} />
        <span className="font-mono text-[10px] text-[#8b0000] tracking-[0.3em]">SCROLL</span>
      </motion.div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <Section id="about">
      <div className="relative">
        <div className="kanji-watermark">武士道</div>
        <SectionHeading ja="自己紹介" en="About the Warrior" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 relative z-10">
            <p className="font-mono text-gray-300 leading-relaxed text-sm">
              I am a <span className="text-katana-red font-bold">full-stack developer</span> who writes code the way a samurai forges steel — with precision, intention, and discipline honed over years of relentless practice.
            </p>
            <p className="font-mono text-gray-400 leading-relaxed text-sm">
              By night I craft melodies, by day I architect systems. Words flow as freely as algorithms. I don't just build software — I <span className="text-katana-red">craft experiences</span> that outlive the projects they were born from.
            </p>
            <p className="font-mono text-gray-400 leading-relaxed text-sm">
              My code is my haiku: minimal, purposeful, devastating in effect. Every commit is a vow. Every deployment is a battle won.
            </p>
            <div className="pt-4 flex flex-wrap gap-2">
              {['Open to work', 'Remote-first', 'Night owl', 'Caffeinated'].map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-3 py-1 border border-[#8b0000]/50 text-[#8b0000] tracking-widest uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 relative z-10">
            {STATS.map((s) => (
              <div key={s.label} className="border border-[#ff0033]/20 p-5 text-center bg-black/40 neon-box">
                <StatCounter target={s.target} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading ja="武器庫" en="Weapon Arsenal" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  )
}

function SkillCard({ skill, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="border border-[#ff0033]/20 bg-black/50 p-5 group hover:border-katana-red transition-all duration-300 hover:neon-box"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{skill.icon}</span>
        <div>
          <div className="font-cinzel text-sm font-bold text-white">{skill.name}</div>
          <div className="font-mono text-[10px] text-[#8b0000] tracking-widest">{skill.type}</div>
        </div>
      </div>
      <div className="h-1 bg-[#1a0008] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.mastery}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #8b0000, #ff0033)', boxShadow: '0 0 6px #ff0033' }}
        />
      </div>
      <div className="font-mono text-[10px] text-[#8b0000] mt-1 text-right">{skill.mastery}%</div>
    </motion.div>
  )
}

// ─── Projects ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <Section id="projects">
      <SectionHeading ja="任務記録" en="Quest Log" />
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} project={p} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  )
}

function ProjectCard({ project, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: delay % 0.2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="border border-[#ff0033]/20 bg-black/50 p-6 group hover:border-katana-red transition-all duration-300 relative overflow-hidden"
    >
      {/* Diagonal slash accent */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-katana-red/30 to-transparent" />
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-katana-red transition-colors">{project.name}</h3>
        <span className={`font-mono text-[10px] border px-2 py-0.5 tracking-widest ${DIFFICULTY_STYLE[project.difficulty]}`}>
          {project.difficulty}
        </span>
      </div>
      <p className="font-mono text-xs text-gray-500 mb-4 leading-relaxed">{project.desc}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.stack.map((t) => (
          <span key={t} className="font-mono text-[10px] bg-[#1a0008] text-[#8b0000] px-2 py-0.5 border border-[#8b0000]/30">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <a href={project.github}
          className="font-mono text-[10px] border border-gray-700 text-gray-400 px-4 py-2 hover:border-katana-red hover:text-katana-red transition-all tracking-widest uppercase">
          ⚔ GitHub
        </a>
        <a href={project.live}
          className="font-mono text-[10px] border border-katana-red text-katana-red px-4 py-2 hover:bg-katana-red hover:text-black transition-all tracking-widest uppercase neon-box">
          ⛩ Enter Dungeon
        </a>
      </div>
    </motion.div>
  )
}

// ─── Katana Slash Image Break (with animated line) ───────────────────────────

function KatanaImageBreak({ src, alt }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.0, 1.05])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.6])

  return (
    <div ref={ref} className="w-full h-[50vh] md:h-[65vh] overflow-hidden relative">
      <motion.div style={{ scale, opacity }} className="w-full h-full">
        <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a0008] to-[#0a0a0a] flex items-center justify-center">
          <span className="font-cinzel text-[#8b0000] text-6xl opacity-10 select-none">{alt}</span>
        </div>
      </motion.div>
      {/* Katana slash line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="absolute top-1/2 left-0 w-full origin-left"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #ff0033 30%, #ff0033 70%, transparent 100%)',
          boxShadow: '0 0 12px #ff0033, 0 0 24px rgba(255,0,51,0.5)',
          transform: 'rotate(-2deg) translateY(-50%)',
          zIndex: 5,
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.7) 100%)' }}
      />
    </div>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <Section id="experience">
      <SectionHeading ja="戦歴" en="Battle History" />
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-katana-red/60 via-[#8b0000]/30 to-transparent" />
        <div className="space-y-10">
          {EXPERIENCE.map((exp, i) => (
            <ExperienceEntry key={exp.clan} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function ExperienceEntry({ exp, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline dot */}
      <div className="absolute left-2.5 md:left-6 top-2 w-3 h-3 rotate-45 border-2 border-katana-red bg-dead-black"
        style={{ boxShadow: '0 0 8px #ff0033' }} />
      <div className="border border-[#ff0033]/20 bg-black/40 p-5 hover:border-katana-red/50 transition-all">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="font-cinzel text-lg font-bold text-white">{exp.clan}</h3>
          <span className="font-mono text-[10px] text-[#8b0000] tracking-widest border border-[#8b0000]/30 px-2 py-0.5">{exp.years}</span>
        </div>
        <div className="font-cinzel text-sm text-katana-red mb-3 tracking-wider">{exp.rank}</div>
        <ul className="space-y-1">
          {exp.battles.map((b) => (
            <li key={b} className="font-mono text-xs text-gray-500 flex items-start gap-2">
              <span className="text-katana-red mt-0.5 shrink-0">▸</span>{b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ─── Songs ────────────────────────────────────────────────────────────────────

function Songs() {
  return (
    <Section id="songs">
      <SectionHeading ja="作曲" en="The Songbook" />
      <div className="flex gap-5 overflow-x-auto scroll-hide pb-4">
        {SONGS.map((s, i) => (
          <SongCard key={s.title} song={s} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  )
}

function SongCard({ song, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex-none w-52 border border-[#ff0033]/20 bg-black/50 p-5 group hover:border-katana-red transition-all hover:neon-box cursor-pointer"
    >
      {/* Wax seal */}
      <div className="w-10 h-10 rounded-full bg-katana-red flex items-center justify-center mb-4 seal-pulse mx-auto"
        style={{ boxShadow: '0 0 12px rgba(255,0,51,0.6)' }}>
        <span className="font-cinzel text-xs font-bold text-white">封</span>
      </div>
      <h4 className="font-cinzel text-sm font-bold text-white text-center mb-1 group-hover:text-katana-red transition-colors">{song.title}</h4>
      <p className="font-mono text-[10px] text-[#8b0000] text-center tracking-widest mb-3">{song.mood}</p>
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full border border-katana-red/50 flex items-center justify-center group-hover:border-katana-red transition-all">
          <span className="text-katana-red text-xs">▶</span>
        </div>
        <span className="font-mono text-[10px] text-gray-600">{song.plays}</span>
      </div>
    </motion.div>
  )
}

// ─── Poems ────────────────────────────────────────────────────────────────────

function Poems() {
  return (
    <Section id="poems">
      <SectionHeading ja="詩集" en="The Manuscripts" />
      <div className="grid md:grid-cols-2 gap-8">
        {POEMS.map((poem, pi) => (
          <PoemCard key={pi} lines={poem} poemIndex={pi} />
        ))}
      </div>
    </Section>
  )
}

function PoemCard({ lines, poemIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      className="border border-[#8b0000]/30 bg-black/40 p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(26,0,8,0.5) 100%)' }}
    >
      {/* Parchment texture accent */}
      <div className="absolute top-2 right-3 font-cinzel text-4xl opacity-5 text-katana-red select-none">詩</div>
      <div className="space-y-2">
        {lines.map((line, li) => (
          <motion.p
            key={li}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ duration: 0.7, delay: poemIndex * 0.2 + li * 0.25 }}
            className="font-mono text-sm text-gray-300 leading-relaxed italic"
          >
            {line}
          </motion.p>
        ))}
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#8b0000]/40 to-transparent" />
    </motion.div>
  )
}

// ─── Gaming ───────────────────────────────────────────────────────────────────

function Gaming() {
  return (
    <Section id="gaming">
      <SectionHeading ja="功績" en="Gaming Achievements" />
      <div className="relative scanlines rounded border border-[#ff0033]/10 overflow-hidden">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {GAMES.map((g, i) => (
            <GameCard key={g.name} game={g} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function GameCard({ game, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className="border border-[#ff0033]/20 bg-black/60 p-4 hover:border-katana-red/60 transition-all"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{game.trophy}</span>
        <div>
          <div className="font-cinzel text-sm font-bold text-white">{game.name}</div>
          <div className="font-mono text-[10px] text-gray-600">{game.genre}</div>
        </div>
        <span className={`ml-auto font-mono text-[10px] font-bold tracking-widest ${RANK_COLOR[game.rank]}`}>
          {game.rank}
        </span>
      </div>
      <div className="h-1 bg-[#1a0008] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${game.xp}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.4, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #8b0000, #ff0033)', boxShadow: '0 0 4px #ff0033' }}
        />
      </div>
      <div className="font-mono text-[10px] text-[#8b0000] mt-1 text-right">{game.xp} XP</div>
    </motion.div>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="contact" className="relative px-6 md:px-16 py-20 max-w-3xl mx-auto">
      {/* Torii gate SVG */}
      <div className="flex justify-center mb-12">
        <motion.svg
          initial={{ opacity: 0, scaleY: 0 }}
          animate={inView ? { opacity: 1, scaleY: 1 } : {}}
          ref={ref}
          transition={{ duration: 0.8 }}
          viewBox="0 0 200 120"
          className="w-40 h-auto"
          style={{ filter: 'drop-shadow(0 0 8px #ff0033)' }}
        >
          {/* Torii gate */}
          <rect x="20" y="80" width="8" height="40" fill="#ff0033" />
          <rect x="172" y="80" width="8" height="40" fill="#ff0033" />
          <rect x="10" y="30" width="180" height="12" rx="2" fill="#ff0033" />
          <rect x="0" y="50" width="200" height="8" rx="2" fill="#8b0000" />
          <rect x="25" y="60" width="6" height="20" fill="#8b0000" />
          <rect x="169" y="60" width="6" height="20" fill="#8b0000" />
        </motion.svg>
      </div>

      <SectionHeading ja="連絡" en="Make Contact" />

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {[
          { id: 'name', label: 'Your Name / 氏名', type: 'text', placeholder: 'Shadow Warrior...' },
          { id: 'email', label: 'Email / メール', type: 'email', placeholder: 'ronin@shadow.net' },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="font-mono text-xs text-[#8b0000] tracking-widest uppercase block mb-1.5">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full bg-black/60 border border-[#ff0033]/20 px-4 py-3 font-mono text-sm text-gray-300
                placeholder:text-gray-700 focus:outline-none focus:border-katana-red focus:neon-border
                transition-all duration-300"
            />
          </div>
        ))}
        <div>
          <label htmlFor="message" className="font-mono text-xs text-[#8b0000] tracking-widest uppercase block mb-1.5">
            Message / 伝言
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="State your mission..."
            className="w-full bg-black/60 border border-[#ff0033]/20 px-4 py-3 font-mono text-sm text-gray-300
              placeholder:text-gray-700 focus:outline-none focus:border-katana-red
              transition-all duration-300 resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full font-cinzel text-sm tracking-widest uppercase py-4 border border-katana-red text-katana-red
            hover:bg-katana-red hover:text-black transition-all duration-300 neon-box"
        >
          ⚔ Send the Scroll
        </button>
      </form>

      {/* Social links */}
      <div className="flex gap-6 justify-center mt-10">
        {['GitHub', 'LinkedIn', 'Twitter', 'Spotify'].map((s) => (
          <a key={s} href="#"
            className="font-mono text-[10px] text-gray-600 hover:text-katana-red transition-colors tracking-widest uppercase">
            {s}
          </a>
        ))}
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[#ff0033]/10 py-8 text-center">
      <p className="font-mono text-xs text-gray-700 tracking-widest">
        © 2026 SHADOW KEN — FORGED IN DARKNESS, TEMPERED IN CODE
      </p>
      <p className="font-cinzel text-[10px] text-[#8b0000] mt-1 tracking-widest">侍 · 武士道 · 名誉</p>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-dead-black min-h-screen">
      <CursorTrail />
      <Nav />
      <Hero />
      <SlashDivider />
      <ImageBreak alt="⛩ The Warrior Awakens" />
      <SlashDivider />
      <About />
      <SlashDivider />
      <ImageBreak alt="⚔ The Forge" />
      <SlashDivider />
      <Skills />
      <SlashDivider />
      <ImageBreak alt="📜 Ancient Scrolls" />
      <SlashDivider />
      <Projects />
      <SlashDivider />
      <KatanaImageBreak alt="⚔ Battlefield" />
      <SlashDivider />
      <Experience />
      <SlashDivider />
      <ImageBreak alt="🎵 Night Music" />
      <SlashDivider />
      <Songs />
      <SlashDivider />
      <Poems />
      <SlashDivider />
      <ImageBreak alt="🎮 The Arena" />
      <SlashDivider />
      <Gaming />
      <SlashDivider />
      <Contact />
      <Footer />
    </div>
  )
}
