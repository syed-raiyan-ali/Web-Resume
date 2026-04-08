import { useState, useEffect, useRef, Suspense, lazy, memo } from 'react'
import { useForm, ValidationError } from '@formspree/react';
import './App.css'
import cvFile from './assets/raiyan-cv.pdf'
import progressData from './data/progress.json'
import { translations } from './data/translations.js'
import ukFlag from './assets/uk-flag.webp'
import deFlag from './assets/de-flag.png'
import idFlag from './assets/id-flag.png'
import saFlag from './assets/sa-flag.png'
import ProjectDetails from './components/ProjectDetails.jsx'

const Loading = ({ text }) => (
  <div className="spline-loader fade-in">
    <div className="loader-content">
      <div className="terminal-cursor"></div>
      <p style={{ fontFamily: 'monospace', letterSpacing: '2px', color: 'var(--primary)', fontSize: '0.8rem' }}>
        {text || "SYNCING 3D ASSETS..."}
      </p>
    </div>
  </div>
);

const LanguageLoader = ({ text }) => (
  <div className="spline-loader fade-in" style={{ zIndex: 10000 }}>
    <div className="loader-content">
      <div className="terminal-cursor"></div>
      <p style={{ fontFamily: 'monospace', letterSpacing: '2px', color: 'var(--primary)', fontSize: '0.8rem' }}>
        {text || "SYNCING LANGUAGE ASSETS..."}
      </p>
    </div>
  </div>
);

const LanguageSwitcher = memo(({ currentLang, changeLanguage, t }) => {
  const langs = [
    { code: 'en', imgSrc: ukFlag, label: 'English' },
    { code: 'de', imgSrc: deFlag, label: 'German' },
    { code: 'id', imgSrc: idFlag, label: 'Indonesian' },
    { code: 'ar', imgSrc: saFlag, label: 'Arabic' }
  ];

  return (
    <div className="language-switcher-wrapper fade-in">
      <div className="lang-label">
        {t.misc.langLabel}
      </div>
      <div className="language-switcher">
        {langs.map(l => (
          <div 
            key={l.code}
            className={`lang-bubble ${currentLang === l.code ? 'active' : ''}`}
            onClick={() => changeLanguage(l.code)}
            title={l.label}
          >
            <img src={l.imgSrc} alt={l.label} className="lang-flag" />
          </div>
        ))}
      </div>
    </div>
  );
});

const DarkSpline = lazy(() => import('./components/DarkSpline'));

const LightSpline = lazy(() => import('./components/LightSpline'));

const ProgressBar = memo(({ progress, goal, unit = "", tText }) => {
  const percentage = Math.min(100, Math.max(0, (progress / goal) * 100));
  return (
    <div style={{ marginTop: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 'bold' }}>
        <span>{tText || "Progress"}</span>
        <span>{progress} / {goal}{unit}</span>
      </div>
      <div style={{ height: '8px', background: 'var(--glass-panel-border)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${percentage}%`, background: 'var(--primary)', transition: 'width 1s ease-out' }}></div>
      </div>
    </div>
  );
});

const GlassTileGrid = memo(() => {
  // Using 1500 tiles to seamlessly cover the massive 300vw x 300vh map workspace
  const tiles = Array.from({ length: 1500 });
  return (
    <div className="glass-grid">
      {tiles.map((_, i) => (
        <div key={i} className="glass-tile"></div>
      ))}
    </div>
  );
});

const DesktopTip = memo(({ t }) => {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  return (
    <div className="desktop-tip fade-in">
      <div style={{ marginRight: '15px' }}>
        <strong>{t.misc.tipTitle}</strong><br/>
        <span style={{ fontSize: '0.9rem' }}>{t.misc.tipDesc}</span>
      </div>
      <button onClick={() => setVisible(false)} style={{ background: 'transparent', border: 'none', color: 'inherit', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
    </div>
  )
});

const ContactForm = memo(({ t }) => {
  const [state, handleSubmit] = useForm("mgopzawo");

  if (state.succeeded) {
    return (
      <div className="card fade-in" style={{ padding: '3rem', textAlign: 'center', background: 'var(--glass-card-bg)', cursor: 'default' }}>
        <h3 style={{ color: 'var(--primary)', fontSize: '1.8rem', marginBottom: '1rem' }}>{t.contact.success}</h3>
        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{t.contact.successDesc}</p>
      </div>
    );
  }

  return (
    <div className="card fade-in" style={{ maxWidth: '600px', margin: '0 auto', width: '100%', cursor: 'default', background: 'var(--glass-card-bg)', padding: '2.5rem' }}>
      <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '1rem' }}>{t.contact.desc}</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="form-group">
          <label htmlFor="full-name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{t.contact.nameLabel}</label>
          <input
            id="full-name"
            type="text" 
            name="name"
            required
            className="form-input"
            placeholder="John Doe"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="form-error" />
        </div>

        <div className="form-group">
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{t.contact.emailLabel}</label>
          <input
            id="email"
            type="email" 
            name="email"
            required
            className="form-input"
            placeholder="john@example.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="form-error" />
        </div>

        <div className="form-group">
          <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{t.contact.msgLabel}</label>
          <textarea
            id="message"
            name="message"
            required
            className="form-input"
            style={{ minHeight: '120px', resize: 'vertical' }}
            placeholder="How can I help you?"
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} className="form-error" />
        </div>

        <button 
          type="submit" 
          disabled={state.submitting}
          className="btn btn-primary" 
          style={{ 
            width: '100%', 
            padding: '1rem', 
            borderRadius: '30px', 
            color: 'white', 
            background: 'var(--primary)', 
            fontWeight: '600', 
            transition: '0.3s', 
            cursor: state.submitting ? 'not-allowed' : 'pointer', 
            border: 'none',
            fontSize: '1rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            marginTop: '0.5rem'
          }}
        >
          {state.submitting ? t.contact.submitting : t.contact.button}
        </button>

        {state.errors && state.errors.length > 0 && !state.succeeded && (
          <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem' }}>
            {t.contact.errorDesc}
          </p>
        )}
      </form>
    </div>
  );
});

const layoutMap = {
  about: { x: -1, y: 0 },
  home: { x: 0, y: 0 },
  skills: { x: 1, y: 0 },
  projects: { x: 0, y: 1 },
  contact: { x: 0, y: 2 }
};
const layoutOrder = ['about', 'home', 'skills', 'projects', 'contact'];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolioTheme') || 'light';
  });
  const [currentLang, setCurrentLang] = useState('en');
  const [isChangingLang, setIsChangingLang] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const isAnimating = useRef(false);

  const t = translations[currentLang] || translations['en'];

  const changeLanguage = (lang) => {
    if (lang === currentLang) return;
    setIsChangingLang(true);
    setTimeout(() => {
      setCurrentLang(lang);
      setIsChangingLang(false);
    }, 1000);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolioTheme', theme);
  }, [theme]);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    
    if (path.length > 1 && path !== '/') { 
      if (path.startsWith('/projects') || path === '/projects/') {
        setActiveSection('projects-detail');
      } else {
        setActiveSection('404');
      }
    } else if (hash && layoutOrder.includes(hash)) {
      setActiveSection(hash);
    } else if (hash && hash !== '') {
      setActiveSection('404');
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY;
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].screenY;
      const touchEndX = e.changedTouches[0].screenX;
      
      let target = e.target;
      let canScroll = false;
      
      while (target && target !== document.body) {
        if (target.classList && target.classList.contains('section-content')) {
          if (target.scrollHeight > target.clientHeight) {
            const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
            const isAtTop = target.scrollTop <= 0;
            
            if (touchStartY > touchEndY && !isAtBottom) {
              canScroll = true; 
            } else if (touchStartY < touchEndY && !isAtTop) {
              canScroll = true; 
            }
          }
          break;
        }
        target = target.parentElement;
      }
      
      if (canScroll) return;

      if (isAnimating.current || activeSection === '404' || activeSection === 'projects-detail') return;

      const diffY = touchStartY - touchEndY;
      const diffX = touchStartX - touchEndX;
      
      if (Math.abs(diffY) > 40 && Math.abs(diffY) > Math.abs(diffX)) {
        const currentIndex = layoutOrder.indexOf(activeSection);
        let nextIndex = currentIndex;

        if (diffY > 0) {
          nextIndex = Math.min(currentIndex + 1, layoutOrder.length - 1);
        } else {
          nextIndex = Math.max(currentIndex - 1, 0);
        }

        if (nextIndex !== currentIndex) {
          const nextSection = layoutOrder[nextIndex];
          setActiveSection(nextSection);
          window.history.pushState(null, '', `/#${nextSection}`);
          isAnimating.current = true;
          setTimeout(() => { isAnimating.current = false; }, 800);
        }
      }
    };
    const handleWheel = (e) => {
      // Allow native scrolling for elements that overflow
      let target = e.target;
      let canScroll = false;
      
      while (target && target !== document.body) {
        if (target.classList.contains('section-content')) {
          if (target.scrollHeight > target.clientHeight) {
            const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
            const isAtTop = target.scrollTop <= 0;
            
            if (e.deltaY > 0 && !isAtBottom) {
              canScroll = true;
            } else if (e.deltaY < 0 && !isAtTop) {
              canScroll = true;
            }
          }
          break; // We found the main scroll boundary
        }
        target = target.parentElement;
      }

      if (canScroll) {
        // Do not intercept, allowing native scrolling down the element
        return; 
      }

      // Otherwise we've hit the boundary (or it's not scrollable), flip viewports
      e.preventDefault(); 
      if (isAnimating.current || activeSection === '404' || activeSection === 'projects-detail') return;

      const currentIndex = layoutOrder.indexOf(activeSection);
      let nextIndex = currentIndex;

      if (e.deltaY > 40) {
        nextIndex = Math.min(currentIndex + 1, layoutOrder.length - 1);
      } else if (e.deltaY < -40) {
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      if (nextIndex !== currentIndex) {
        const nextSection = layoutOrder[nextIndex];
        setActiveSection(nextSection);
        window.history.pushState(null, '', `/#${nextSection}`);
        isAnimating.current = true;
        setTimeout(() => { isAnimating.current = false; }, 800);
      }
    };

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      if (isAnimating.current || activeSection === '404' || activeSection === 'projects-detail') return;

      const currentPos = layoutMap[activeSection];
      let nextSection = activeSection;

      if (e.key === 'ArrowDown') {
        const found = Object.keys(layoutMap).find(k => layoutMap[k].x === currentPos.x && layoutMap[k].y === currentPos.y + 1);
        if (found) nextSection = found;
      } else if (e.key === 'ArrowUp') {
        const found = Object.keys(layoutMap).find(k => layoutMap[k].x === currentPos.x && layoutMap[k].y === currentPos.y - 1);
        if (found) nextSection = found;
      } else if (e.key === 'ArrowRight') {
        const found = Object.keys(layoutMap).find(k => layoutMap[k].y === currentPos.y && layoutMap[k].x === currentPos.x + 1);
        if (found) nextSection = found;
      } else if (e.key === 'ArrowLeft') {
        const found = Object.keys(layoutMap).find(k => layoutMap[k].y === currentPos.y && layoutMap[k].x === currentPos.x - 1);
        if (found) nextSection = found;
      }

      if (nextSection !== activeSection) {
        setActiveSection(nextSection);
        window.history.pushState(null, '', `/#${nextSection}`);
        isAnimating.current = true;
        setTimeout(() => { isAnimating.current = false; }, 800);
      }
    };

    // non-passive so we can preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection]);

  const navTo = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
    if (section !== '404' && section !== 'projects-detail') {
      window.history.pushState(null, '', `/#${section}`);
    } else if (section === 'projects-detail') {
      window.history.pushState(null, '', '/projects');
    } else {
      window.history.pushState(null, '', '/404');
    }
  };

  return (
    <div className="app-container">
      {/* Spline Base rendered globally */}
      {isChangingLang && <LanguageLoader text={t.misc.syncLang} />}
      
      {!isMobile && activeSection !== 'projects-detail' && (
        <Suspense fallback={<Loading />}>
          {theme === 'dark' ? (
            <DarkSpline className="hero-bg-spline" />
          ) : (
            <LightSpline className="hero-bg-spline" />
          )}
        </Suspense>
      )}
      
      <LanguageSwitcher currentLang={currentLang} changeLanguage={changeLanguage} t={t} />

      {activeSection === 'projects-detail' && (
        <ProjectDetails 
          theme={theme} 
          setTheme={setTheme} 
          currentLang={currentLang} 
          changeLanguage={changeLanguage} 
          t={t} 
          navTo={navTo}
        />
      )}

      {activeSection === '404' && (
        <>
          <GlassTileGrid />
          <nav className="navbar fade-in">
            <div className="navbar-logo-container">
              <div 
                className="navbar-logo" 
                onClick={(e) => { window.history.pushState(null, '', '/'); navTo(e, 'home'); }}
                title="Return to Base Matrix"
              >
                RAIYAN<span>.</span>
              </div>
            </div>
            <div className="nav-links">
            </div>
            <div className="nav-actions-container">
               <div className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle Theme" style={{ margin: 0 }}>
                 <div className="theme-toggle-thumb">{theme === 'dark' ? '🌙' : '☀️'}</div>
               </div>
            </div>
          </nav>

          <div style={{ position: 'relative', zIndex: 10, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className="card fade-in" style={{ padding: '4rem 6rem', textAlign: 'center', cursor: 'default', background: theme === 'dark' ? 'rgba(20, 15, 10, 0.4)' : 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
              <h1 className="fade-in" style={{ fontSize: '10vw', color: 'var(--primary)', marginBottom: '0.2rem', lineHeight: '1', WebkitTextFillColor: 'var(--primary)' }}>404</h1>
              <h2 className="fade-in" style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-main)', background: 'transparent', WebkitTextFillColor: 'inherit' }}>{t.misc.signalLost}</h2>
              <p className="fade-in" style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>{t.misc.signalDesc}</p>
              <button className="btn key-hint fade-in" onClick={(e) => { window.history.pushState(null, '', '/'); navTo(e, 'home'); }} style={{ padding: '0.8rem 2.5rem', borderRadius: '30px', color: 'white', background: 'var(--primary)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', letterSpacing: '1px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                {t.misc.reinit}
              </button>
            </div>
          </div>
        </>
      )}

      {activeSection !== 'projects-detail' && activeSection !== '404' && (
        <>
          <DesktopTip t={t} />

      <nav className="navbar fade-in">
        <div className="navbar-logo-container">
          <div 
            className="navbar-logo" 
            onClick={(e) => navTo(e, 'home')}
            title="Home"
          >
            RAIYAN<span>.</span>
          </div>
        </div>
        <div className="nav-links">
          {layoutOrder.map((section) => (
            <a 
              key={section}
              href={`#${section}`} 
              onClick={(e) => navTo(e, section)}
              className={activeSection === section ? 'active' : ''}
              style={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center' }}
            >
              {t.nav[section] || section}
            </a>
          ))}
        </div>
        <div className="nav-actions-container">
          <div 
            className="theme-toggle" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Theme"
            style={{ margin: 0 }}
          >
            <div className="theme-toggle-thumb">
              {theme === 'dark' ? '🌙' : '☀️'}
            </div>
          </div>
        </div>
      </nav>

      <div 
        className="viewport-wrapper"
        style={{
          transform: `translate(${-layoutMap[activeSection].x * 100}vw, ${-layoutMap[activeSection].y * 100}vh)`
        }}
      >
        {/* Spatial background mask banner tracking viewport movement perfectly */}
        <GlassTileGrid />

        {/* HOME SECTION */}
        <section className="viewport-section" style={{ left: `${layoutMap['home'].x * 100}vw`, top: `${layoutMap['home'].y * 100}vh`, alignItems: 'center' }}>
          <div className="section-content fade-in" style={{ textAlign: 'center', pointerEvents: 'auto', background: 'transparent', boxShadow: 'none', border: 'none', overflowY: 'visible' }}>
            <h1 style={{ fontSize: '3.8rem', marginBottom: '1.2rem', display: 'inline-block', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.2', fontFamily: currentLang === 'ar' ? 'sans-serif' : 'inherit' }}>
              {t.hero.name}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', maxWidth: '600px', margin: '0 auto 1rem auto', fontWeight: '600', background: 'var(--glass-card-bg)', padding: '0.8rem 2rem', borderRadius: '30px', border: '1px solid var(--glass-panel-border)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              {t.hero.role}
            </p>
            
            <div className="hero-nav-btn-container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem' }}>
              <button className="key-hint" onClick={(e) => navTo(e, 'about')}>{t.hero.about}</button>
              <button className="key-hint" onClick={(e) => navTo(e, 'projects')}>{t.hero.projects}</button>
              <button className="key-hint" onClick={(e) => navTo(e, 'skills')}>{t.hero.skills}</button>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <a href={cvFile} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2.5rem', borderRadius: '30px', color: 'white', background: 'var(--primary)', fontWeight: '600', textDecoration: 'none', transition: '0.3s', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '1px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                {t.hero.resume}
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="viewport-section" style={{ left: `${layoutMap['about'].x * 100}vw`, top: `${layoutMap['about'].y * 100}vh` }}>
          <div className="section-content fade-in">
            <div className="section-title">
              <h2>{t.about.title}</h2>
              <div className="underline"></div>
            </div>
            <div className="card fade-in" style={{ backgroundColor: 'var(--glass-card-bg)', cursor: 'default' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                {t.about.p1}
              </p>
              <br />
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                {t.about.p2}
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="viewport-section" style={{ left: `${layoutMap['skills'].x * 100}vw`, top: `${layoutMap['skills'].y * 100}vh` }}>
          <div className="section-content fade-in">
            <div className="section-title">
              <h2>{t.skills.title}</h2>
              <div className="underline"></div>
            </div>
            <div className="grid-2x2">
              <div className="card fade-in" style={{ cursor: 'default' }}>
                <h3>{t.skills.frontend}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>{t.skills.frontendDesc}</p>
              </div>
              <div className="card fade-in" style={{ cursor: 'default' }}>
                <h3>{t.skills.backend}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>{t.skills.backendDesc}</p>
              </div>
              <div className="card fade-in" style={{ cursor: 'default' }}>
                <h3>{t.skills.design}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>{t.skills.designDesc}</p>
              </div>
              <div className="card fade-in" style={{ cursor: 'default' }}>
                <h3>{t.skills.tools}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>{t.skills.toolsDesc}</p>
              </div>
              <div className="card fade-in" style={{ cursor: 'default' }}>
                <h3>{t.skills.langs}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t.skills.langsDesc }}></p>
              </div>
              <div className="card fade-in" style={{ cursor: 'default' }}>
                <h3>{t.skills.german}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t.skills.germanDesc }}></p>
              </div>
            </div>

            <div className="section-title" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>{t.skills.futureTitle}</h3>
              <div className="underline" style={{ width: '30px' }}></div>
            </div>
            <div className="grid">
              {progressData.futureSkills.map((skill, i) => (
                <div key={i} className="card fade-in" style={{ cursor: 'default' }}>
                  <h3>{skill.name}</h3>
                  <ProgressBar progress={skill.progress} goal={skill.goal} unit={skill.unit} tText={t.skills.progressText} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="viewport-section" style={{ left: `${layoutMap['projects'].x * 100}vw`, top: `${layoutMap['projects'].y * 100}vh` }}>
          <div className="section-content fade-in">
            <div className="section-title">
              <h2>{t.projects.title}</h2>
              <div className="underline"></div>
            </div>
            <div className="grid">
              <div className="card fade-in" style={{ cursor: 'default', display: 'flex', flexDirection: 'column' }}>
                <h3>{t.projects.cipherTitle}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', flexGrow: 1 }}>{t.projects.cipherDesc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{t.projects.techPrefix} React.js, Firebase, Supabase, Vite</span>
                  <button onClick={() => window.open('/projects/cipher', '_blank')} style={{ padding: '0.4rem 1.2rem', borderRadius: '20px', color: 'white', background: 'var(--primary)', border: 'none', cursor: 'pointer', fontSize: '0.85rem', transition: '0.3s' }}>{t.projects.extendBtn}</button>
                </div>
              </div>
              <div className="card fade-in" style={{ cursor: 'default', display: 'flex', flexDirection: 'column' }}>
                <h3>{t.projects.resumeTitle}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', flexGrow: 1 }}>{t.projects.resumeDesc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{t.projects.techPrefix} React.js, Vercel, HTML, CSS</span>
                  <button onClick={() => window.open('/projects/resume', '_blank')} style={{ padding: '0.4rem 1.2rem', borderRadius: '20px', color: 'white', background: 'var(--primary)', border: 'none', cursor: 'pointer', fontSize: '0.85rem', transition: '0.3s' }}>{t.projects.extendBtn}</button>
                </div>
              </div>
              <div className="card fade-in" style={{ cursor: 'default', display: 'flex', flexDirection: 'column' }}>
                <h3>{t.projects.graphicsTitle}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', flexGrow: 1 }}>{t.projects.graphicsDesc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{t.projects.techPrefix} Photoshop, UI/UX Design</span>
                  <button onClick={() => window.open('/projects/graphics', '_blank')} style={{ padding: '0.4rem 1.2rem', borderRadius: '20px', color: 'white', background: 'var(--primary)', border: 'none', cursor: 'pointer', fontSize: '0.85rem', transition: '0.3s' }}>{t.projects.extendBtn}</button>
                </div>
              </div>
            </div>

            <div className="section-title" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>{t.projects.futureTitle}</h3>
              <div className="underline" style={{ width: '30px' }}></div>
            </div>
            <div className="grid">
              {progressData.futureProjects.map((proj, i) => (
                <div key={i} className="card fade-in" style={{ cursor: 'default' }}>
                  <h3>{proj.name}</h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>{t.projects.builtUsing} {proj.tech}</p>
                  <ProgressBar progress={proj.progress} goal={proj.goal} unit={proj.unit} tText={t.skills.progressText} />
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '1rem', width: '100%' }}>
              <button 
                className="fade-in"
                onClick={(e) => navTo(e, 'contact')}
                style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '2rem', cursor: 'pointer', opacity: 0.8, transition: 'transform 0.3s' }}
                onMouseOver={(e) => e.target.style.transform='translateY(5px)'}
                onMouseOut={(e) => e.target.style.transform='translateY(0)'}
                title="Go to Contact"
              >
                ⤓
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="viewport-section" style={{ left: `${layoutMap['contact'].x * 100}vw`, top: `${layoutMap['contact'].y * 100}vh` }}>
          <div className="section-content fade-in" style={{ justifyContent: 'center' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="section-title">
                <h2>{t.contact.title}</h2>
                <div className="underline"></div>
              </div>
              <ContactForm t={t} />
            </div>
            <footer style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                &copy; {new Date().getFullYear()} {t.contact.rights}
              </p>
            </footer>
          </div>
        </section>
      </div>
      </>
      )}
    </div>
  )
}

export default App
