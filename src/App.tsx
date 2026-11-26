import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Award, Github, Mail, Phone, Linkedin, Swords, UserRound, X, Compass, Gem, Music2, MousePointer2, Activity } from 'lucide-react'

type Section = 'home' | 'character' | 'materia' | 'projects' | 'journey' | 'contact'
type MusicStatus = 'starting' | 'playing' | 'blocked' | 'error' | 'off'

const navItems: { id: Section; label: string }[] = [
  { id: 'home', label: 'Chronicle' },
  { id: 'character', label: 'Profile' },
  { id: 'materia', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Career' },
  { id: 'contact', label: 'Contact' },
]

const skills = [
  { name: 'Languages', type: 'Programming', color: 'blue', tools: [{name:'C#',mark:'C#'},{name:'Python',mark:'Py'},{name:'C',mark:'C'},{name:'C++',mark:'C++'},{name:'Java',mark:'J'},{name:'JavaScript',mark:'JS'},{name:'HTML',mark:'5'},{name:'CSS',mark:'3'}] },
  { name: 'Game Engines', type: 'Development', color: 'teal', tools: [{name:'Unity 3D',mark:'U'},{name:'Unreal Engine 5',mark:'UE'}] },
  { name: 'Frameworks', type: 'Software', color: 'violet', tools: [{name:'.NET',mark:'.N'}] },
  { name: 'Platforms & IDEs', type: 'Workflow', color: 'gold', tools: [{name:'Windows',mark:'⊞'},{name:'GitHub',mark:'GH'},{name:'Visual Studio',mark:'VS'},{name:'IntelliJ IDEA',mark:'IJ'}] },
  { name: 'AI Tools', type: 'Creative technology', color: 'blue', tools: [{name:'Claude',mark:'Cl'},{name:'ChatGPT',mark:'GPT'},{name:'Gemini',mark:'Ge'},{name:'Meshy',mark:'Me'},{name:'Tripo',mark:'Tr'}] },
  { name: 'Design & Management', type: 'Production', color: 'teal', tools: [{name:'Blender',mark:'B'},{name:'Mixamo',mark:'Mx'},{name:'Canva',mark:'Ca'},{name:'Google Suite',mark:'G'},{name:'Jira',mark:'J'},{name:'Notion',mark:'N'},{name:'Overleaf',mark:'OL'}] },
]

const materiaOrbs = [
  { src: '/images/materia-blue.png', name: 'Blue' },
  { src: '/images/materia-green.png', name: 'Green' },
  { src: '/images/materia-violet.png', name: 'Violet' },
  { src: '/images/materia-gold.png', name: 'Gold' },
  { src: '/images/materia-red.png', name: 'Red' },
  { src: '/images/materia-blue.png', name: 'Blue' },
]

const projects = [
  { number: '01', title: 'Tower Defenders', type: 'TOWER DEFENSE · MOBILE', description: 'Defend a moving tower against waves of enemies and upgrade at checkpoints. Published for Voodoo.', tags: ['Unity 3D', 'Game Design', 'Voodoo'], status: 'STUDIO RELEASE', date: 'December 2025', icon: '/images/project-tower-defenders.png', playUrl: 'https://play.google.com/store/apps/details?id=com.bigbang.towerdefenders&hl=en' },
  { number: '02', title: 'Pinball Arena', type: 'PVP · HYBRID CASUAL', description: 'Gather energy through pinball clashes, then deploy troops to outplay your opponent. Published for Voodoo.', tags: ['Unity 3D', 'PvP', 'Voodoo'], status: 'STUDIO RELEASE', date: 'February 2026', icon: '/images/project-pinball-arena.png', playUrl: 'https://play.google.com/store/apps/details?id=com.bigbang.pinballarena&hl=en' },
  { number: '03', title: 'Wagon Rush', type: 'PVP · RACING', description: 'Power up your wagon and race to the checkpoint. The first player to score three points wins. Published for Voodoo.', tags: ['Unity 3D', 'PvP', 'Voodoo'], status: 'STUDIO RELEASE', date: 'June 2026', icon: '/images/project-wagon-rush.png', playUrl: 'https://play.google.com/store/apps/details?id=com.bigbang.wagonrushpvp&hl=en' },
  { number: '04', title: 'Train Escort', type: 'MISSION DEFENSE · MOBILE', description: 'Protect a moving train from waves of zombies and help it reach the checkpoint safely. Published for Neptune (Treeplla).', tags: ['Unity 3D', 'Game Design', 'Treeplla'], status: 'STUDIO RELEASE', date: 'September 2026', icon: '/images/project-train-escort.png', playUrl: 'https://play.google.com/store/apps/details?id=com.bigbang.trainescort&hl=en' },
  { number: '05', title: 'Pong', type: 'CLASSIC · LOCAL MULTIPLAYER', description: 'A Unity take on classic Pong, with single-player matches against AI and local multiplayer for two.', tags: ['Unity', 'C#', 'Academic project'], status: 'PERSONAL PROJECT', date: 'August–December 2022', cover: '/images/project-pong.png', links: [{ label: 'Play on itch.io', url: 'https://jobaduwul.itch.io/pong' }, { label: 'GitHub', url: 'https://github.com/Jobaduwul/Pong' }] },
  { number: '08', title: 'Stray Cat Cannot Miss Any Fish', type: 'ARCADE · CAT ADVENTURE', description: 'Play as a stray cat catching falling fish. Watch their shadows to track where they will land—one mistake means game over. Built in 48 hours for a February 2025 game jam.', tags: ['Unity', '48-hour Game Jam', 'Arcade'], status: 'PERSONAL PROJECT', date: 'February 2025 · 48-hour Game Jam', cover: '/images/project-stray-cat-fish.png', links: [{ label: 'Play on itch.io', url: 'https://jobaduwul.itch.io/stray-cat-cannot-miss-any-fish' }] },
  { number: '06', title: 'Whispering Shadow', type: 'ACTION ADVENTURE · GAME JAM', description: 'A game made for the BUET CSE Fest GameJam around the theme “You are your own enemy.” The team placed 10th among 92 participating teams.', tags: ['Game Jam', 'Action adventure', '10th of 92'], status: 'GAME JAM PROJECT', date: 'July 2023', cover: '/images/project-whispering-shadow.png', links: [{ label: 'Play on itch.io', url: 'https://m-a-k.itch.io/whispering-shadow' }, { label: 'GitHub', url: 'https://github.com/GoonerMAK/Whispering-Shadow' }] },
  { number: '07', title: 'Burger Shot', type: 'FIRST-PERSON SHOOTER · GAME JAM', description: 'Collect ingredients, prepare a burger and protect the stove in a game built for the IUT 11th ICT Fest GameJam. The team earned 2nd runner-up for the theme “It’s hard to cook without deadly spells.”', tags: ['Game Jam', 'FPS', '2nd runner-up'], status: 'GAME JAM PROJECT', date: 'April 2024', cover: '/images/project-burger-shot.png', links: [{ label: 'Play on itch.io', url: 'https://jobaduwul.itch.io/burgershot' }, { label: 'GitHub', url: 'https://github.com/Jobaduwul/ICT-Fest-GameJam-2024' }] },
]

const career = [
  { date: 'MAR 2025 — NOW', logo: '/images/logo-big-bang-studio.png', logoAlt: 'Big Bang Studio logo', logoTone: 'dark', positions: [
    { date: 'NOV 2025 — PRESENT', title: 'Game Developer · Big Bang Studio LLC', body: 'Developing hybrid casual mobile games with publishers Voodoo and Neptune (Treeplla). Working with Unity 3D, Mixamo, Tripo, Meshy and game design.' },
    { date: 'MAR — OCT 2025', title: 'Game Developer Intern · Big Bang Studio LLC', body: 'Contributed to hybrid casual mobile game development for publishers Voodoo and Neptune (Treeplla), building experience with Unity 3D and game design.' },
  ] },
  { date: 'JUN — SEP 2024', title: 'Game Developer Intern · Battery Low Interactive', body: 'Completed a four-month academic internship and developed two mobile games using Unity 3D.', logo: '/images/logo-battery-low-interactive.png', logoAlt: 'Battery Low Interactive logo' },
]

const education = [
  { date: 'JUN 2021 — SEP 2025', title: 'BSc in Software Engineering', body: 'Islamic University of Technology, Gazipur · Department of Computer Science and Engineering · CGPA 3.15', logo: '/images/logo-iut.png', logoAlt: 'Islamic University of Technology logo' },
  { date: 'AUG 2006 — MAY 2020', title: 'CAIE O and A Levels · SFX Greenherald International School and College', body: 'O Level: 7A*, 2A (2018) · A Level: 4A* (2020)', logo: '/images/logo-sfx-greenherald.png', logoAlt: 'SFX Greenherald crest' },
]

function App() {
  const [active, setActive] = useState<Section>('home')
  const [transitioning, setTransitioning] = useState(false)
  const [transitionTarget, setTransitionTarget] = useState<Section | null>(null)
  const [selectedSkill, setSelectedSkill] = useState(0)
  const [toast, setToast] = useState('')
  const [musicEnabled, setMusicEnabled] = useState(() => localStorage.getItem('chronicle-music-enabled') !== 'false')
  const [musicStatus, setMusicStatus] = useState<MusicStatus>('starting')
  const [customCursorEnabled, setCustomCursorEnabled] = useState(() => localStorage.getItem('chronicle-cursor-enabled') !== 'false')
  const [animationsEnabled, setAnimationsEnabled] = useState(() => localStorage.getItem('chronicle-animations-enabled') !== 'false')
  const activeRef = useRef(active)
  const musicEnabledRef = useRef(musicEnabled)
  const transitionTimers = useRef<number[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)
  const hoverSoundRef = useRef<HTMLAudioElement>(null)
  const selectSoundRef = useRef<HTMLAudioElement>(null)

  const requestMusicPlayback = useCallback((audio: HTMLAudioElement | null) => {
    if (!audio || !musicEnabledRef.current) return Promise.resolve(false)
    setMusicStatus('starting')
    return audio.play().then(() => {
      if (musicEnabledRef.current) setMusicStatus('playing')
      return true
    }).catch((error: unknown) => {
      if (musicEnabledRef.current) {
        setMusicStatus(error instanceof DOMException && error.name === 'NotAllowedError' ? 'blocked' : 'error')
      }
      return false
    })
  }, [])

  useEffect(() => {
    musicEnabledRef.current = musicEnabled
    localStorage.setItem('chronicle-music-enabled', String(musicEnabled))
    // The music toggle is the master audio switch for both music and menu sounds.
    for (const sound of [hoverSoundRef.current, selectSoundRef.current]) {
      if (!sound) continue
      sound.muted = !musicEnabled
      if (!musicEnabled) sound.pause()
    }
    const audio = audioRef.current
    if (!audio) return

    if (!musicEnabled) {
      audio.pause()
      setMusicStatus('off')
      return
    }

    let started = false
    const startPlayback = () => {
      if (started) return
      void requestMusicPlayback(audio).then((success) => {
        if (!success) return
        started = true
        window.removeEventListener('pointerdown', startPlayback)
        window.removeEventListener('keydown', startPlayback)
      })
    }
    window.addEventListener('pointerdown', startPlayback)
    window.addEventListener('keydown', startPlayback)
    startPlayback()
    return () => {
      window.removeEventListener('pointerdown', startPlayback)
      window.removeEventListener('keydown', startPlayback)
    }
  }, [musicEnabled, requestMusicPlayback])

  useEffect(() => {
    const selectableSelector = 'button:not(:disabled),a[href],[role="button"],[role="link"],input[type="submit"]:not(:disabled),input[type="button"]:not(:disabled),input[type="checkbox"]:not(:disabled),input[type="radio"]:not(:disabled),select:not(:disabled),summary,label[for]'
    const play = (sound: HTMLAudioElement | null) => {
      if (!musicEnabled || !sound) return
      sound.currentTime = 0
      void sound.play().catch(() => {})
    }
    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const target = event.target instanceof Element ? event.target.closest(selectableSelector) : null
      if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return
      play(hoverSoundRef.current)
    }
    const onSelect = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest(selectableSelector) : null
      if (!target) return
      play(selectSoundRef.current)
    }

    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('click', onSelect, true)
    return () => {
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('click', onSelect, true)
    }
  }, [musicEnabled])

  useEffect(() => {
    localStorage.setItem('chronicle-cursor-enabled', String(customCursorEnabled))
    document.documentElement.classList.toggle('custom-cursor-disabled', !customCursorEnabled)
    return () => document.documentElement.classList.remove('custom-cursor-disabled')
  }, [customCursorEnabled])

  useEffect(() => {
    localStorage.setItem('chronicle-animations-enabled', String(animationsEnabled))
    document.documentElement.classList.toggle('animations-disabled', !animationsEnabled)
    return () => document.documentElement.classList.remove('animations-disabled')
  }, [animationsEnabled])

  useEffect(() => () => transitionTimers.current.forEach(window.clearTimeout), [])

  useLayoutEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>([
      '.hero-copy > .eyebrow', '.hero-copy > h1', '.hero-copy > .hero-description',
      '.hero-copy > .hero-actions', '.hero-copy > .hero-meta', '.hero-art', '.hero-bottom',
      '.section-header', '.character-grid > *', '.orb-grid > *', '.materia-detail',
      '.project-card', '.timeline-item', '.achievement-strip', '.contact-panel', '.fine-print',
    ].join(','))

    if (!('IntersectionObserver' in window)) return

    const targets = Array.from(revealTargets)
    targets.forEach((target, index) => {
      target.classList.add('scroll-reveal')
      target.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting))
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' })
    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      targets.forEach((target) => {
        target.classList.remove('scroll-reveal', 'is-visible')
        target.style.removeProperty('--reveal-delay')
      })
    }
  }, [active])

  const navigate = (section: Section) => {
    if (section === activeRef.current) return
    activeRef.current = section
    transitionTimers.current.forEach(window.clearTimeout)
    transitionTimers.current = []
    setTransitionTarget(section)
    setTransitioning(true)
    transitionTimers.current.push(window.setTimeout(() => {
      setActive(section)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 320))
    transitionTimers.current.push(window.setTimeout(() => {
      setTransitioning(false)
      setTransitionTarget(null)
    }, 760))
  }

  const toggleMusic = () => {
    if (musicEnabled && (musicStatus === 'blocked' || musicStatus === 'error')) {
      void requestMusicPlayback(audioRef.current)
      return
    }
    const nextEnabled = !musicEnabled
    musicEnabledRef.current = nextEnabled
    setMusicEnabled(nextEnabled)
    const audio = audioRef.current
    if (!nextEnabled) audio?.pause()
    else void requestMusicPlayback(audio)
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey && /^[1-6]$/.test(event.key)) navigate(navItems[Number(event.key) - 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const current = navItems.find((item) => item.id === active)!

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <button className="brand" onClick={() => navigate('home')} aria-label="Go to Kazi Jawadul Islam Jishan home">
          <span className="brand-mark"><img src="/images/jishan-mark.png" alt="" /></span>
          <span className="brand-name">KAZI JAWADUL ISLAM JISHAN</span>
        </button>
        <div className="topbar-right">
          <div className="utility-toggles" aria-label="Experience settings">
            <button className="utility-toggle" type="button" aria-pressed={musicEnabled} onClick={toggleMusic} title={!musicEnabled ? 'Turn all audio on' : musicStatus === 'blocked' ? 'Autoplay blocked. Tap to start audio.' : musicStatus === 'error' ? 'Audio unavailable. Tap to retry.' : 'Turn all audio off'} aria-label={!musicEnabled ? 'Turn all audio on' : musicStatus === 'blocked' ? 'Autoplay blocked. Tap to start audio.' : musicStatus === 'error' ? 'Audio unavailable. Tap to retry.' : 'Turn all audio off'}>
              <Music2 size={14} aria-hidden="true" /><span>AUDIO</span><b>{!musicEnabled ? 'OFF' : musicStatus === 'blocked' ? 'TAP' : musicStatus === 'error' ? 'RETRY' : 'ON'}</b>
            </button>
            <button className="utility-toggle" type="button" aria-pressed={customCursorEnabled} onClick={() => setCustomCursorEnabled(value => !value)} title={customCursorEnabled ? 'Use the system cursor' : 'Use the game cursors'}>
              <MousePointer2 size={14} aria-hidden="true" /><span>CURSOR</span><b>{customCursorEnabled ? 'ON' : 'OFF'}</b>
            </button>
            <button className="utility-toggle" type="button" aria-pressed={animationsEnabled} onClick={() => setAnimationsEnabled(value => !value)} title={animationsEnabled ? 'Turn animations off' : 'Turn animations on'}>
              <Activity size={14} aria-hidden="true" /><span>MOTION</span><b>{animationsEnabled ? 'ON' : 'OFF'}</b>
            </button>
          </div>
          <span className="status-dot" /> <span className="status-label">ONLINE</span>
        </div>
      </header>

      <audio ref={audioRef} src="/audio/portfolio-theme.mp3" autoPlay loop preload="auto" />
      <audio ref={hoverSoundRef} src="/audio/cursor_on_selectable_item.wav" preload="auto" />
      <audio ref={selectSoundRef} src="/audio/select_item.wav" preload="auto" />

      <button className="quest-hud" onClick={() => navigate(navItems[(navItems.findIndex(item => item.id === active) + 1) % navItems.length].id)} aria-label="Advance to the next chapter"><span className="hud-emblem"><Compass size={17}/></span><span><small>ACTIVE QUEST</small><b>{current.label.toUpperCase()}</b></span><span className="hud-progress"><i style={{ width: `${((navItems.findIndex(item => item.id === active) + 1) / navItems.length) * 100}%` }} /></span><span className="hud-level">{String(navItems.findIndex(item => item.id === active) + 1).padStart(2, '0')}/06</span></button>
      <div className="rune-dust" aria-hidden="true">✦　·　✧　　·　✦　　✧　·　✦　·　✧　　✦</div>

      <div className={`page-transition ${transitioning ? 'active' : ''}`}>
        {transitionTarget && <div className="transition-chapter" aria-hidden="true"><small>ENTERING CHAPTER</small><strong>{navItems.find(item => item.id === transitionTarget)?.label}</strong><span>✦</span></div>}
      </div>

      {active === 'home' && <Home onNavigate={navigate} />}
      {active === 'character' && <Character />}
      {active === 'materia' && <Materia selected={selectedSkill} onSelect={setSelectedSkill} motionEnabled={animationsEnabled} />}
      {active === 'projects' && <Projects />}
      {active === 'journey' && <Journey />}
      {active === 'contact' && <Contact />}

      {toast && <button className="quest-toast" onClick={() => setToast('')}>✦ &nbsp; {toast} <X size={14}/></button>}

      <nav className="game-dock" aria-label="Chapter select">
        {navItems.map((item, index) => {
          const Icon = [Compass, UserRound, Gem, Swords, Award, Mail][index]
          return <button key={item.id} className={`dock-item ${active === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)} aria-current={active === item.id ? 'page' : undefined} aria-label={`${item.label} chapter`}><span className="dock-icon"><Icon size={17}/></span><span className="dock-label">{item.label}</span><span className="dock-index">0{index + 1}</span></button>
        })}
      </nav>

      <footer className="footer">
        <span>KAZI JAWADUL ISLAM JISHAN</span>
        <span className="theme-credit"><b>THEME INSPIRED FROM</b><a className="theme-credit-link" href="https://www.square-enix.com/ffvii/en-us/" target="_blank" rel="noreferrer" aria-label="Visit the official Final Fantasy VII website"><img src="/images/ffvii-logo.png" alt="Final Fantasy VII" /></a></span>
      </footer>

      <div className="section-label"><span className="section-line" /> {current.label.toUpperCase()} <span className="section-count">/ 0{navItems.findIndex(x => x.id === active) + 1}</span></div>
    </main>
  )
}

function Home({ onNavigate }: { onNavigate: (section: Section) => void }) {
  return (
    <section className="hero page-content">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-star">✦</span> A GAME DEVELOPER'S JOURNAL <span className="eyebrow-rule" /></div>
        <h1>CRAFTING<br /><em>WORLDS</em><br />THROUGH CODE<span className="title-period">.</span></h1>
        <p className="hero-description">I'm <strong>Kazi Jawadul Islam Jishan</strong> — a game developer focused on immersive games and XR, building memorable interactive experiences with curiosity and care.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => onNavigate('projects')}>EXPLORE MY WORK <ArrowUpRight size={17} /></button>
          <button className="text-button" onClick={() => onNavigate('character')}>VIEW PROFILE <ArrowDown size={15} /></button>
        </div>
        <div className="hero-meta"><span><i /> GAME DEVELOPER · BIG BANG STUDIO</span><span>GAME DEVELOPMENT · XR</span></div>
      </div>
      <div className="hero-art" onClick={() => onNavigate('character')} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onNavigate('character')} aria-label="Open my profile">
        <div className="art-ring ring-one" /><div className="art-ring ring-two" />
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <img className="hero-portrait" src="/images/jishan-hero-cutout.png" alt="Portrait of Kazi Jawadul Islam Jishan" />
        <div className="art-caption"><span>FIG. 001</span><span>THE DEVELOPER</span></div>
        <div className="art-side-note">MEET THE DEVELOPER</div>
      </div>
      <div className="hero-bottom"><span className="scroll-line" /><span>01 — 06</span></div>
    </section>
  )
}

function SectionHeader({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return <div className="section-header"><span className="eyebrow">{kicker}</span><h2>{title}</h2><p>{description}</p></div>
}

function Character() {
  const [vitals, setVitals] = useState({ hp: 1111, mp: 225 })
  const today = new Date()
  const birthdayThisYear = new Date(today.getFullYear(), 8, 23)
  const level = today.getFullYear() - 2001 - (today < birthdayThisYear ? 1 : 0)

  useEffect(() => {
    let timer = 0
    const updateVitals = () => {
      timer = window.setTimeout(() => {
        setVitals({ hp: 760 + Math.floor(Math.random() * 391), mp: 90 + Math.floor(Math.random() * 160) })
        updateVitals()
      }, 3500 + Math.floor(Math.random() * 5000))
    }
    updateVitals()
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="page-content inner-page">
      <SectionHeader kicker="CHAPTER 01 · CHARACTER RECORD" title="THE DEVELOPER" description="Game development and XR, shaped by hands-on studio work, game jams and a software engineering degree." />
      <div className="character-grid profile-centered">
        <div className="character-info">
          <div className="profile-status" aria-label={`Jawadul, level ${level}, HP ${vitals.hp} of 1150, MP ${vitals.mp} of 249`}>
            <img className="profile-status-icon" src="/images/jishan-profile-avatar.png" alt="" />
            <div className="profile-status-content">
              <div className="profile-status-heading"><h3>JAWADUL</h3><span className="profile-level">LV {level}</span></div>
              <div className="profile-vital"><b>HP</b><span className="profile-vital-track"><i className="hp-fill" style={{ width: `${vitals.hp / 1150 * 100}%` }} /></span><strong>{vitals.hp}/{1150}</strong></div>
              <div className="profile-vital"><b>MP</b><span className="profile-vital-track"><i className="mp-fill" style={{ width: `${vitals.mp / 249 * 100}%` }} /></span><strong>{vitals.mp}/{249}</strong></div>
            </div>
          </div>
          <p className="lead">GAME DEVELOPER <span>·</span> XR EXPLORER</p>
          <p>Software engineering graduate passionate about game development and XR. I build immersive gaming experiences, keep learning new tools and enjoy turning ideas into playable projects for mobile and beyond.</p>
          <div className="stat-grid"><div><small>PRIMARY CLASS</small><strong>GAME DEVELOPER</strong></div><div><small>GAME ENGINES</small><strong>UNITY · UNREAL 5</strong></div><div><small>CURRENT GUILD</small><strong>BIG BANG STUDIO</strong></div><div><small>DEGREE</small><strong>SOFTWARE ENGINEERING</strong></div></div>
        </div>
      </div>
    </section>
  )
}

function Materia({ selected, onSelect, motionEnabled }: { selected: number; onSelect: (index: number) => void; motionEnabled: boolean }) {
  const skill = skills[selected]
  const detailRef = useRef<HTMLDivElement>(null)
  const selectSkill = (index: number) => {
    onSelect(index)
    window.requestAnimationFrame(() => detailRef.current?.scrollIntoView({
      behavior: motionEnabled ? 'smooth' : 'auto',
      block: window.innerWidth <= 850 ? 'start' : 'center',
    }))
  }
  return (
    <section className="page-content inner-page">
      <SectionHeader kicker="CHAPTER 02 · EQUIPPED KNOWLEDGE" title="MATERIA ARCHIVE" description="The tools, technologies and disciplines I use to bring interactive ideas to life." />
      <div className="materia-layout">
        <div className="orb-grid">
          {skills.map((item, index) => <button key={item.name} className={`materia-item ${item.color} ${selected === index ? 'active' : ''}`} onClick={() => selectSkill(index)}><span className="materia-sphere materia-sphere-small" role="img" aria-label={`${materiaOrbs[index].name} materia sphere`}><img src={materiaOrbs[index].src} alt="" /></span><strong>{item.name}</strong><small>{item.type}</small></button>)}
        </div>
        <div className="materia-detail" ref={detailRef}>
          <span className="eyebrow">SELECTED MATERIA / 0{selected + 1}</span>
          <div className="materia-sphere materia-sphere-large" role="img" aria-label={`${materiaOrbs[selected].name} materia sphere`}><img src={materiaOrbs[selected].src} alt="" /></div>
          <h3>{skill.name}</h3><span className="detail-type">{skill.type}</span>
          <ul className={`tool-list ${skill.color}`} aria-label={`${skill.name} tools`}>
            {skill.tools.map(tool => <li key={tool.name}><span className="tool-mark" aria-hidden="true">{tool.mark}</span><span>{tool.name}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const collections = [
    { id: 'personal', index: '01', title: 'PERSONAL PROJECTS', subtitle: 'INDEPENDENT BUILDS', description: 'Personal and independent games, prototypes, and experiments.', status: 'PERSONAL PROJECT' },
    { id: 'studio', index: '02', title: 'BIG BANG STUDIO', subtitle: 'PUBLISHED STUDIO RELEASES', description: 'Mobile games developed with the studio for its publishing partners.', status: 'STUDIO RELEASE' },
    { id: 'gamejam', index: '03', title: 'GAME JAM PROJECTS', subtitle: 'BUILDS UNDER PRESSURE', description: 'Short-form team projects made for competitive game jam events.', status: 'GAME JAM PROJECT' },
  ].map(collection => ({
    ...collection,
    items: projects.map((project, index) => ({ project, index })).filter(({ project }) => project.status === collection.status),
  }))

  return (
    <section className="page-content inner-page">
      <SectionHeader kicker="CHAPTER 03 · FIELD REPORTS" title="PROJECT ARCHIVE" description="Mobile releases, personal builds and game jam projects from across my development journey." />
      <div className="project-collections">
        {collections.map(collection => <section className={`project-shelf ${collection.id}`} key={collection.id} aria-labelledby={`project-shelf-${collection.id}`}>
          <header className="project-shelf-header">
            <div><span className="project-shelf-kicker">COLLECTION / {collection.index} · {collection.subtitle}</span><h3 id={`project-shelf-${collection.id}`}>{collection.title}</h3><p>{collection.description}</p></div>
            <span className="project-shelf-count">{String(collection.items.length).padStart(2, '0')} FILES</span>
          </header>
          <div className="project-card-grid">
            {collection.items.map(({ project }) => <article className="project-card" key={project.number}>
              <div className={`project-art ${'cover' in project ? 'has-cover' : 'has-icon'}`}><span>{project.number}</span>{'icon' in project ? <img className="project-art-icon" src={project.icon} alt={`${project.title} game icon`} /> : 'cover' in project ? <img className="project-cover" src={project.cover} alt={`${project.title} game artwork`} /> : <Swords size={54} strokeWidth={1} />}</div>
              <div className="project-info"><span className="eyebrow">{project.status} · {project.date}</span><h3>{project.title}</h3><span className="project-type">{project.type}</span><p>{project.description}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-actions">{'playUrl' in project && <a className="play-store-badge" href={project.playUrl} target="_blank" rel="noreferrer" aria-label={`Get ${project.title} on Google Play`}><img src="/images/google-play-badge.png" alt="Get it on Google Play" /></a>}{'links' in project && project.links?.map(link => <a className="project-outbound-link" key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={14} /></a>)}</div></div>
            </article>)}
          </div>
        </section>)}
      </div>
      <p className="fine-print">STUDIO RELEASES · PERSONAL BUILDS · GAME JAM FIELD REPORTS</p>
    </section>
  )
}

function Journey() {
  return (
    <section className="page-content inner-page">
      <SectionHeader kicker="CHAPTER 04 · CHRONOLOGY" title="CAREER & STUDY" description="Studio experience, education and certifications gathered along the way." />
      <div className="timeline">
        {career.map(({date, title, body, logo, logoAlt, logoTone, positions}) => <div className="timeline-item" key={title ?? logo}><span className="timeline-date">{date}</span><span className="timeline-node" /><div className="timeline-entry"><span className={`timeline-logo ${logoTone === 'dark' ? 'dark' : ''}`}><img src={logo} alt={logoAlt} /></span><div className={`timeline-entry-copy ${positions ? 'timeline-positions' : ''}`}>{positions ? positions.map(position => <div className="timeline-position" key={position.title}><span className="timeline-position-date">{position.date}</span><h3>{position.title}</h3><p>{position.body}</p></div>) : <><h3>{title}</h3><p>{body}</p></>}</div></div></div>)}
      </div>
      <div className="career-subsection"><h3>EDUCATION</h3>{education.map(({date,title,body,logo,logoAlt}) => <div className="timeline-item" key={title}><span className="timeline-date">{date}</span><span className="timeline-node" /><div className="timeline-entry"><span className="timeline-logo"><img src={logo} alt={logoAlt} /></span><div className="timeline-entry-copy"><h3>{title}</h3><p>{body}</p></div></div></div>)}</div>
      <div className="achievement-strip">
        <Award size={24} aria-hidden="true" />
        <div className="certification-content">
          <strong>UNITY LEARN CERTIFICATIONS</strong>
          <ul className="certification-list">
            <li><a href="https://credly.com/badges/066d0ec0-9c64-4a98-a068-9a6eebb87747/public_url" target="_blank" rel="noreferrer">Unity Essentials Pathway <ArrowUpRight size={13} aria-hidden="true" /></a></li>
            <li><a href="https://credly.com/badges/79abce21-7f90-4650-ad56-5636f23364b7/public_url" target="_blank" rel="noreferrer">Unity Junior Programmer <ArrowUpRight size={13} aria-hidden="true" /></a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="page-content inner-page contact-page">
      <SectionHeader kicker="CHAPTER 05 · OPEN CHANNEL" title="LET'S CONNECT" description="Interested in game development, XR or building something together? Reach out through any of these channels." />
      <div className="contact-panel">
        <div className="contact-hub-heading"><span>COMMUNICATION TERMINAL · PLAYER 01</span><b><i /> SIGNAL READY</b></div>
        <div className="contact-hub-main">
          <div className="contact-identity"><div className="contact-emblem"><img src="/images/jishan-profile-avatar.png" alt="Jawadul's profile portrait" /></div><div><small>PLAYER RECORD</small><h3>JAWADUL</h3><p>Game Developer · Software Engineering graduate</p></div></div>
          <div className="contact-stats" aria-label="Player profile stats">
            <div><small>CLASS</small><strong>GAME DEVELOPER</strong></div>
            <div><small>FIELD</small><strong>GAME DEVELOPMENT · XR</strong></div>
            <div><small>GUILD</small><strong>BIG BANG STUDIO</strong></div>
            <div><small>DEGREE</small><strong>SOFTWARE ENGINEERING</strong></div>
          </div>
        </div>
        <div className="contact-links" aria-label="Contact channels">
          <a href="mailto:kazijawadulislam123@gmail.com"><Mail size={18} /><span><small>CHANNEL 01</small><b>EMAIL</b></span><ArrowUpRight size={14} /></a>
          <a href="tel:+8801731121470"><Phone size={18} /><span><small>CHANNEL 02</small><b>PHONE</b></span><ArrowUpRight size={14} /></a>
          <a href="https://github.com/Jobaduwul" target="_blank" rel="noreferrer"><Github size={18} /><span><small>CHANNEL 03</small><b>GITHUB</b></span><ArrowUpRight size={14} /></a>
          <a href="https://linkedin.com/in/jobaduwul" target="_blank" rel="noreferrer"><Linkedin size={18} /><span><small>CHANNEL 04</small><b>LINKEDIN</b></span><ArrowUpRight size={14} /></a>
        </div>
      </div>
    </section>
  )
}

export default App
