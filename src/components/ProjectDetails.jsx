import React, { useEffect, useState, memo } from 'react';
import encryptGif from '../assets/encrypt-1.2.gif';
import walkthroughGif from '../assets/cipher2.2.gif';
import guestProfile from '../assets/profile-nlogged.jpg';
import loggedProfile from '../assets/profile-logged.jpg';
import main1 from '../assets/main1.png';
import gallery1 from '../assets/gallery1.png';
import admin1 from '../assets/admin1.png';
import admin2 from '../assets/admin2.png';

const StaticGlassTileGrid = memo(({ theme }) => {
  const tiles = Array.from({ length: 150 });
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: -1,
          background: theme === 'dark' ? '#1b160f' : '#e9e8e5',
          transition: 'background 0.5s ease'
        }}
      ></div>
      <div className="subtle-glow"></div>
      <div className="glass-grid-static">
        {tiles.map((_, i) => (
          <div key={i} className="glass-tile"></div>
        ))}
      </div>
    </>
  );
});

export default function ProjectDetails({ theme, setTheme, currentLang, changeLanguage, t, navTo }) {
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    const handleUrl = () => {
      const pathParts = window.location.pathname.split('/');
      if (pathParts.length >= 2 && pathParts[1] === 'projects') {
        const id = pathParts[2] || 'cipher'; // Default to cipher if only /projects
        setProjectId(id);
      }
    };
    
    handleUrl();
    window.addEventListener('popstate', handleUrl);
    return () => window.removeEventListener('popstate', handleUrl);
  }, []);

  const renderProjectContent = () => {
    const p = t.projects || {};
    switch (projectId) {
      case 'cipher':
        return (
          <div className="fade-in project-detail-view" style={{ textAlign: 'left' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                <span className="gradient-text">{p.cipherTitle}</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', opacity: 0.9, lineHeight: '1.6', maxWidth: '900px' }}>
                {p.cipherDesc}
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <a href="https://cipher-suite16.web.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', color: 'white', background: 'var(--primary)', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                  🚀 {p.accessCipher || "View Live Demo"}
                </a>
              </div>
            </div>

            {/* Features */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ✨ <span className="gradient-text">{p.cipherFeaturesTitle?.replace('✨', '').trim()}</span>
              </h2>
              <div className="grid">
                {(p.cipherFeatures || []).map((feat, i) => (
                  <div key={i} className="card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-panel-border)', borderRadius: '16px', cursor: 'default' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{feat.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots & Demos */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                📸 <span className="gradient-text">{p.cipherScreenshotsTitle?.replace('📸', '').trim()}</span>
              </h2>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>
                  🔐 {p.cipherEncAction}
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{p.cipherEncDesc}</p>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--glass-panel-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  <img src={encryptGif} alt="Encryption Demo" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>
                  🌐 {p.cipherWalkthrough}
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{p.cipherWalkthroughDesc}</p>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--glass-panel-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  <img src={walkthroughGif} alt="App Walkthrough" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '2rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>
                  👤 {p.cipherProfileTitle?.replace('👤', '').trim()}
                </h3>
                <div className="grid">
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{p.cipherGuest}</h4>
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-panel-border)', marginBottom: '1rem' }}>
                      <img src={guestProfile} alt="Guest Profile" style={{ width: '100%', display: 'block' }} />
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.cipherGuestDesc}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{p.cipherLogged}</h4>
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-panel-border)', marginBottom: '1rem' }}>
                      <img src={loggedProfile} alt="Logged In Profile" style={{ width: '100%', display: 'block' }} />
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.cipherLoggedDesc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                🛠️ <span className="gradient-text">{p.cipherTechTitle?.replace('🛠️', '').trim()}</span>
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {(p.cipherTechList || []).map((tech, i) => (
                  <span key={i} style={{ padding: '0.5rem 1.2rem', background: 'var(--glass-panel-border)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Setup & Deployment */}
            <section className="code-block-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   💻 <span className="gradient-text">{p.cipherSetupTitle?.replace('💻', '').trim()}</span>
                </h2>
                <div style={{ position: 'relative', background: '#0d0d0d', borderRadius: '12px', border: '1px solid var(--glass-panel-border)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ background: '#1a1a1a', padding: '10px 15px', display: 'flex', gap: '6px', borderBottom: '1px solid #222' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <pre style={{ padding: '1.5rem', margin: 0, color: '#00d4ff', fontSize: '0.9rem', overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace", lineHeight: '1.6' }}>
                    <code>{p.cipherSetupCode || "No instructions provided."}</code>
                  </pre>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   🚀 <span className="gradient-text">{p.cipherDeployTitle?.replace('🚀', '').trim()}</span>
                </h2>
                <div style={{ position: 'relative', background: '#0d0d0d', borderRadius: '12px', border: '1px solid var(--glass-panel-border)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ background: '#1a1a1a', padding: '10px 15px', display: 'flex', gap: '6px', borderBottom: '1px solid #222' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <pre style={{ padding: '1.5rem', margin: 0, color: '#00d4ff', fontSize: '0.9rem', overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace", lineHeight: '1.6' }}>
                    <code>{p.cipherDeployCode || "No instructions provided."}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* License */}
            <footer style={{ padding: '2rem', borderTop: '1px solid var(--glass-panel-border)', color: 'var(--primary)', fontSize: '0.95rem', textAlign: 'center', fontWeight: '500' }}>
              📄 {p.cipherLicense?.replace('📄', '').trim()}
            </footer>
          </div>
        );
      case 'resume':
        return (
          <div className="fade-in project-detail-view" style={{ textAlign: 'left' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                <span className="gradient-text">{p.resumeTitle}</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', opacity: 0.9, lineHeight: '1.6', maxWidth: '900px' }}>
                {p.resumeDesc}
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <a href="https://github.com/syed-raiyan-ali/resume" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', color: 'white', background: 'var(--primary)', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                  💻 {p.accessResume || "Source Code"}
                </a>
              </div>
            </div>

            {/* Features */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ✨ <span className="gradient-text">{p.cipherFeaturesTitle?.replace('✨', '').trim() || 'Features'}</span>
              </h2>
              <div className="grid">
                {(p.resumeFeatures || []).map((feat, i) => (
                  <div key={i} className="card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-panel-border)', borderRadius: '16px', cursor: 'default' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{feat.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Overview */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                📝 <span className="gradient-text">{p.detailHeading}</span>
              </h2>
              <div className="card" style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-panel-border)', borderRadius: '24px', cursor: 'default' }}>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
                  {p.resumeDetail}
                </p>
              </div>
            </section>

            {/* Tech Stack */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                🛠️ <span className="gradient-text">{p.cipherTechTitle?.replace('🛠️', '').trim() || 'Tech Stack'}</span>
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {(p.resumeTechList || []).map((tech, i) => (
                  <span key={i} style={{ padding: '0.5rem 1.2rem', background: 'var(--glass-panel-border)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Setup & Deployment */}
            <section className="code-block-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   💻 <span className="gradient-text">{p.resumeSetupTitle?.replace('💻', '').trim()}</span>
                </h2>
                <div style={{ position: 'relative', background: '#0d0d0d', borderRadius: '12px', border: '1px solid var(--glass-panel-border)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ background: '#1a1a1a', padding: '10px 15px', display: 'flex', gap: '6px', borderBottom: '1px solid #222' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <pre style={{ padding: '1.5rem', margin: 0, color: '#00d4ff', fontSize: '0.9rem', overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace", lineHeight: '1.6' }}>
                    <code>{p.resumeSetupCode || "No instructions provided."}</code>
                  </pre>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   🚀 <span className="gradient-text">{p.resumeDeployTitle?.replace('🚀', '').trim()}</span>
                </h2>
                <div style={{ position: 'relative', background: '#0d0d0d', borderRadius: '12px', border: '1px solid var(--glass-panel-border)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ background: '#1a1a1a', padding: '10px 15px', display: 'flex', gap: '6px', borderBottom: '1px solid #222' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <pre style={{ padding: '1.5rem', margin: 0, color: '#00d4ff', fontSize: '0.9rem', overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace", lineHeight: '1.6' }}>
                    <code>{p.resumeDeployCode || "No instructions provided."}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* License */}
            <footer style={{ padding: '2rem', borderTop: '1px solid var(--glass-panel-border)', color: 'var(--primary)', fontSize: '0.95rem', textAlign: 'center', fontWeight: '500' }}>
              📄 {p.resumeLicense?.replace('📄', '').trim()}
            </footer>
          </div>
        );
      case 'graphics':
        return (
          <div className="fade-in project-detail-view" style={{ textAlign: 'left' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                <span className="gradient-text">{p.graphicsTitle}</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', opacity: 0.9, lineHeight: '1.6', maxWidth: '900px' }}>
                {p.graphicsDesc}
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <a href="https://github.com/syed-raiyan-ali/ruhenrai-portfolio" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', color: 'white', background: 'var(--primary)', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                  📂 {p.accessGraphics || "View Source"}
                </a>
              </div>
            </div>

            {/* Features */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ✨ <span className="gradient-text">{p.cipherFeaturesTitle?.replace('✨', '').trim() || 'Features'}</span>
              </h2>
              <div className="grid">
                {(p.graphicsFeatures || []).map((feat, i) => (
                  <div key={i} className="card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-panel-border)', borderRadius: '16px', cursor: 'default' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{feat.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Overview */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                📝 <span className="gradient-text">{p.detailHeading}</span>
              </h2>
              <div className="card" style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-panel-border)', borderRadius: '24px', cursor: 'default' }}>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
                  {p.graphicsDetail}
                </p>
              </div>
            </section>

            {/* Screenshots & Demos */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                📸 <span className="gradient-text">{p.graphicsScreenshotsTitle?.replace('📸', '').trim()}</span>
              </h2>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>
                  🏠 {p.graphicsHomeAction}
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{p.graphicsHomeDesc}</p>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--glass-panel-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  <img src={main1} alt="Home View" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>
                  🖼️ {p.graphicsGalleryAction}
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{p.graphicsGalleryDesc}</p>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--glass-panel-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  <img src={gallery1} alt="Gallery View" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '2rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>
                  ⚙️ {p.graphicsAdminTitle}
                </h3>
                <div className="grid">
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{p.graphicsLoggedOut}</h4>
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-panel-border)', marginBottom: '1rem' }}>
                      <img src={admin1} alt="Admin Logged Out" style={{ width: '100%', display: 'block' }} />
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.graphicsLoggedOutDesc}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{p.graphicsLoggedIn}</h4>
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-panel-border)', marginBottom: '1rem' }}>
                      <img src={admin2} alt="Admin Logged In" style={{ width: '100%', display: 'block' }} />
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.graphicsLoggedInDesc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                🛠️ <span className="gradient-text">{p.cipherTechTitle?.replace('🛠️', '').trim() || 'Tech Stack'}</span>
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {(p.graphicsTechList || []).map((tech, i) => (
                  <span key={i} style={{ padding: '0.5rem 1.2rem', background: 'var(--glass-panel-border)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Setup & Deployment */}
            <section className="code-block-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   💻 <span className="gradient-text">{p.graphicsSetupTitle?.replace('💻', '').trim()}</span>
                </h2>
                <div style={{ position: 'relative', background: '#0d0d0d', borderRadius: '12px', border: '1px solid var(--glass-panel-border)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ background: '#1a1a1a', padding: '10px 15px', display: 'flex', gap: '6px', borderBottom: '1px solid #222' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <pre style={{ padding: '1.5rem', margin: 0, color: '#00d4ff', fontSize: '0.9rem', overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace", lineHeight: '1.6' }}>
                    <code>{p.graphicsSetupCode || "No instructions provided."}</code>
                  </pre>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   🚀 <span className="gradient-text">{p.graphicsDeployTitle?.replace('🚀', '').trim()}</span>
                </h2>
                <div style={{ position: 'relative', background: '#0d0d0d', borderRadius: '12px', border: '1px solid var(--glass-panel-border)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ background: '#1a1a1a', padding: '10px 15px', display: 'flex', gap: '6px', borderBottom: '1px solid #222' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <pre style={{ padding: '1.5rem', margin: 0, color: '#00d4ff', fontSize: '0.9rem', overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace", lineHeight: '1.6' }}>
                    <code>{p.graphicsDeployCode || "No instructions provided."}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* License */}
            <footer style={{ padding: '2rem', borderTop: '1px solid var(--glass-panel-border)', color: 'var(--primary)', fontSize: '0.95rem', textAlign: 'center', fontWeight: '500' }}>
              📄 {p.graphicsLicense?.replace('📄', '').trim()}
            </footer>
          </div>
        );
      default:
        return (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h1 className="fade-in" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>
              Project Information Not Found
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>The project ID '{projectId}' does not exist in our records.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 10, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0 1.5rem' }}>
      <StaticGlassTileGrid theme={theme} />
      <nav className="navbar fade-in" style={{ position: 'relative', margin: '20px auto', top: 'auto', left: 'auto', right: 'auto' }}>
        <div className="navbar-logo-container">
          <button
            onClick={(e) => navTo(e, 'projects')}
            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '1.2rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', transition: '0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateX(-5px)'; e.currentTarget.style.color = 'var(--text-main)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.color = 'var(--primary)'; }}
          >
            ← {t.nav.projects || "Projects"}
          </button>
        </div>
        <div className="nav-links">
          <div 
            className="navbar-logo" 
            onClick={(e) => navTo(e, 'home')}
            title="Home"
          >
            RAIYAN<span>.</span>
          </div>
        </div>
        <div className="nav-actions-container">
          <div className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle Theme" style={{ margin: 0 }}>
            <div className="theme-toggle-thumb">{theme === 'dark' ? '🌙' : '☀️'}</div>
          </div>
        </div>
      </nav>

      <div className="card fade-in section-content project-detail-view-container" style={{
        maxWidth: '1100px',
        width: '100%',
        margin: '0 auto 2.5rem auto',
        padding: '3rem', /* Overridden by !important in media queries */
        background: 'var(--glass-card-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 140px)',
        scrollbarWidth: 'thin',
        borderRadius: '24px',
        border: '1px solid var(--glass-panel-border)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        pointerEvents: 'auto'
      }}>
        {renderProjectContent()}
      </div>
    </div>
  );
}
