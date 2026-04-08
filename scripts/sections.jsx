import React from 'react';
import cvFile from '../src/assets/raiyan-cv.pdf';
import progressData from '../src/data/progress.json';

export default function Sections({ layoutMap, currentLang, t, navTo, ProgressBar }) {
  return (
    <>
      {/* HOME SECTION */}
      <section className="viewport-section" style={{ left: `${layoutMap['home'].x * 100}vw`, top: `${layoutMap['home'].y * 100}vh`, alignItems: 'center' }}>
        <div className="section-content fade-in" style={{ textAlign: 'center', pointerEvents: 'auto', background: 'transparent', boxShadow: 'none', border: 'none', overflowY: 'visible' }}>
          <h1 style={{ fontSize: '3.8rem', marginBottom: '1.2rem', display: 'inline-block', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.2', fontFamily: currentLang === 'ar' ? 'sans-serif' : 'inherit' }}>
            {t.hero.name}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', maxWidth: '600px', margin: '0 auto 1rem auto', fontWeight: '600', background: 'var(--glass-card-bg)', padding: '0.8rem 2rem', borderRadius: '30px', border: '1px solid var(--glass-panel-border)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            {t.hero.role}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem' }}>
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
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
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
              onMouseOver={(e) => e.target.style.transform = 'translateY(5px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
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
            <div className="card fade-in" style={{ maxWidth: '600px', margin: '0 auto', width: '100%', cursor: 'default' }}>
              <p>{t.contact.desc}</p>
              <div style={{ marginTop: '2rem' }}>
                <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', color: 'white', background: 'var(--primary)', fontWeight: '600', transition: '0.3s', cursor: 'pointer', border: 'none' }}>{t.contact.button}</button>
              </div>
            </div>
          </div>
          <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>&copy; {new Date().getFullYear()} {t.contact.rights}</p>
          </footer>
        </div>
      </section>
    </>
  );
}
