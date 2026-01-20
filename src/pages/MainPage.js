import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- КОМПОНЕНТ АНІМОВАНОГО ТЕКСТУ З РІЗНОКОЛЬОРОВИМИ БУКВАМИ ---
const AnimatedText = ({ text }) => {
  const getRandomColor = () => {
    const colors = ['#0066ff', '#ff3396', '#ff84e8', '#7944ce', '#4caf50', '#ff9800', '#f44336', '#00bcd4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = getRandomColor();
    e.target.style.transition = 'color 0s';
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = '';
    e.target.style.transition = 'color 0.6s ease';
  };

  return (
    <span className="rainbow-text">
      {text.split("").map((char, index) => (
        <span 
          key={index} 
          className="letter"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const AnimatedBackground = () => {
  const [colors, setColors] = useState(['#7944ce', '#ff3396', '#ff84e8', '#ffcae4', '#ffe5f1']);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        const newColors = colors.map(() => 
          '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
        );
        setColors(newColors);
      }, 600);
    }
    return () => clearInterval(interval);
  }, [isHovered, colors]);

  return (
    <div 
      style={styles.animBgContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {colors.map((c, i) => (
        <div key={i} style={{ ...styles.colorStrip, backgroundColor: c }}></div>
      ))}
    </div>
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const [dynamicColor, setDynamicColor] = useState("F54A1C");

  useEffect(() => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    setDynamicColor(randomHex);
  }, []);

  const handleColorClick = () => navigate(`/colors/${dynamicColor}`);
  const goToGenerator = () => navigate('/generator');

  const companies = [
    { name: 'Airbnb', logo: 'https://cdn.worldvectorlogo.com/logos/airbnb-1.svg' },
    { name: 'Dropbox', logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-1.svg' },
    { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
    { name: 'Netflix', logo: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg' },
    { name: 'GitHub', logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg' },
    { name: 'Slack', logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' },
    { name: 'Warner Bros.', logo: 'https://cdn.worldvectorlogo.com/logos/warner-bros-1.svg' },
  ];

  const tools = [
    { title: "Palette Generator", desc: "Create beautiful color schemes in seconds with the worldwide loved palette tool.", bg: "#e0f7fa", active: "#00bcd4", text: "#006064" },
    { title: "Explore Palettes", desc: "Get inspired by thousands of beautiful color schemes. Search by colors, styles, or hex values.", bg: "#e8efff", active: "#2d72ff", text: "#1a3a8a" },
    { title: "Image Picker", desc: "Extract beautiful colors from your photos and turn them into palettes for your projects.", bg: "#f3eaff", active: "#9c27b0", text: "#4a148c" },
    { title: "Contrast Checker", desc: "Calculate the contrast ratio of text and background colors to make your content more accessible.", bg: "#ffebee", active: "#f44336", text: "#b71c1c" },
    { title: "Palette Visualizer", desc: "Preview your colors on real designs to see how they look in context before using them.", bg: "#fff0f0", active: "#ff5252", text: "#d32f2f" },
    { title: "Color Picker", desc: "Get useful color information like meaning, usage, variations, accessibility and conversion.", bg: "#fff3e0", active: "#ff9800", text: "#e65100" },
    { title: "Tailwind Colors", desc: "Preview Tailwind CSS colors on real designs to see how they look in context.", bg: "#fef9c3", active: "#facc15", text: "#854d0e" },
    { title: "Color Bot", desc: "Chat with our AI-powered Color Bot, ask questions and get color suggestions.", bg: "#e1fae5", active: "#4caf50", text: "#1b5e20" }
  ];

  const resources = [
    { name: "Color Names", desc: "Browse and search through a comprehensive list of color names." },
    { name: "Free Fonts", desc: "Discover and collect beautiful free fonts for your designs." },
    { name: "Collage Maker", desc: "Create stylish collages by combining your photos and palettes." },
    { name: "Browse Gradients", desc: "Explore beautiful gradients for your projects or create your own." },
    { name: "Gradient Palette", desc: "Create a gradient palette between two colors and export it." },
    { name: "Image Converter", desc: "Convert images to different formats with ease." }
  ];

  return (
    <div style={styles.container}>
      <style>{`
        .letter { display: inline-block; cursor: default; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee { display: flex; animation: scroll 35s linear infinite; width: max-content; }
        .tool-card { transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer; position: relative; overflow: hidden; }
        .tool-card h3, .tool-card p { transition: color 0.4s ease; z-index: 2; position: relative; }
        .tool-card:hover { transform: translateY(-5px); }
        ${tools.map((t, i) => `
          .card-${i}:hover { background-color: ${t.active} !important; }
          .card-${i}:hover h3, .card-${i}:hover p { color: white !important; }
        `).join('')}
        .hover-scale { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
        .hover-scale:hover { transform: scale(1.02); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      `}</style>

      {/* HEADER & HERO */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate('/')}><AnimatedText text="Coolors" /></div>
        <div style={styles.navGroup}>
          <div style={styles.navItemContainer}>
            <span style={styles.navLinkNormal}>Tools <span style={{fontSize: '10px', marginLeft: '2px'}}>▼</span></span>
            <span style={styles.navLinkPro}>Go Pro</span>
            <div style={styles.divider}></div>
            <span style={styles.navLinkNormal} onClick={() => navigate('/login')}>Sign in</span>
          </div>
          <button style={styles.signUpBtn} onClick={() => navigate('/registration')}>Sign up</button>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.mainTitle}><AnimatedText text="The super fast color palettes generator!" /></h1>
          <p style={styles.heroSubtitle}>Create the perfect palette or get inspired by thousands of beautiful color schemes.</p>
          <div style={styles.btnGroup}>
            <button style={styles.primaryBtn} onClick={goToGenerator}>Start the generator!</button>
            <button style={styles.secondaryBtn} onClick={() => navigate('/explore')}>Explore trending</button>
          </div>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.imageWrapper}><AnimatedBackground /></div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <div style={styles.marqueeSection}>
        <p style={styles.trustedText}>TRUSTED BY OVER 3 MILLION CREATIVE MINDS AND TOP COMPANIES</p>
        <div style={{overflow: 'hidden'}}>
          <div className="marquee">
            {[...companies, ...companies].map((company, i) => (
              <div key={i} style={styles.companyWrapper}>
                <img src={company.logo} alt={company.name} style={styles.logoImg} />
                <span style={styles.companyName}>{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section style={styles.descriptionSection}>
        <div style={styles.descriptionContent}>
          <p style={styles.mainDescription}>
            Coolors is the lightning-fast, ultra-intuitive color palette generator for designers, creators, and anyone seeking visual harmony. Instantly generate beautiful palettes by hitting the spacebar, or explore millions of popular ones. Extract colors from images, check accessibility, and preview them on real designs. Organize your palettes into projects and export them in multiple formats—effortlessly across web, apps, and plugins. Now with AI!
          </p>
          <div className="hover-scale" style={styles.midnightCard} onClick={handleColorClick}>
            <p style={styles.midnightLabel}>COLOR OF THE DAY</p>
            <div style={styles.midnightFlex}>
              <div style={{...styles.midnightSquare, backgroundColor: `#${dynamicColor}`}}></div>
              <div style={styles.midnightTextContainer}>
                <h4 style={styles.midnightTitle}>Dynamic Harmony</h4>
                <p style={styles.midnightSubText}>A unique shade generated for you.</p>
                <span style={styles.midnightHex}>#{dynamicColor}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section style={styles.toolsSection}>
        <p style={styles.toolsLabel}>OUR TOOLS, LOVED BY MILLIONS</p>
        <div style={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <div key={index} className={`tool-card card-${index}`} style={{...styles.toolCard, backgroundColor: tool.bg}} onClick={goToGenerator}>
              <h3 style={{...styles.toolTitle, color: tool.text}}>{tool.title}</h3>
              <p style={{...styles.toolDesc, color: tool.text}}>{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESOURCES */}
      <section style={styles.resourcesSection}>
        <p style={styles.toolsLabel}>MORE USEFUL RESOURCES</p>
        <div style={styles.resourcesGrid}>
          {resources.map((res, i) => (
            <div key={i} className="hover-scale" style={styles.resCard}>
              <h4 style={styles.resTitle}>{res.name}</h4>
              <p style={styles.resDesc}>{res.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLUGINS */}
      <section style={styles.pluginsSection}>
        <p style={styles.toolsLabel}>PLUGINS AND APPS</p>
        <div style={styles.pluginsGrid}>
          {['iOS App', 'Figma Plugin', 'Adobe Extension'].map((item, i) => (
            <div key={i} className="hover-scale" style={styles.pluginBtn}>{item}</div>
          ))}
        </div>
      </section>

      {/* BIG SLOGAN WITH MULTI-COLOR ANIMATION */}
      <div style={styles.sloganContainer}>
        <h2 style={styles.sloganText}>
          <AnimatedText text="Make something colorful!" />
        </h2>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerCol}>
            <h5 style={styles.footerHead}>TOOLS</h5>
            <p style={styles.footerLink}>Generate your palettes</p>
            <p style={styles.footerLink}>Explore popular palettes</p>
            <p style={styles.footerLink}>Extract palette from image</p>
            <p style={styles.footerLink}>Contrast checker</p>
          </div>
          <div style={styles.footerCol}>
            <h5 style={styles.footerHead}>DISCOVER</h5>
            <p style={styles.footerLink}>List of colors</p>
            <p style={styles.footerLink}>Browse gradients</p>
            <p style={styles.footerLink}>Create a gradient</p>
            <p style={styles.footerLink}>Make a gradient palette</p>
          </div>
          <div style={styles.footerCol}>
            <h5 style={styles.footerHead}>APPS</h5>
            <p style={styles.footerLink}>iOS App</p>
            <p style={styles.footerLink}>Figma Plugin</p>
            <p style={styles.footerLink}>Adobe Extension</p>
            <p style={styles.footerLink}>Chrome Extension</p>
          </div>
          <div style={styles.footerCol}>
            <h5 style={styles.footerHead}>COMPANY</h5>
            <p style={styles.footerLink}>Pricing</p>
            <p style={styles.footerLink}>License</p>
            <p style={styles.footerLink}>Terms of service</p>
            <p style={styles.footerLink}>Privacy policy</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© Coolors by Fabrizio Bianchi. Let's make something cool!</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: { fontFamily: "'Inter', sans-serif", backgroundColor: '#fff', overflowX: 'hidden' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 60px' },
  logo: { fontSize: '28px', fontWeight: '900', color: '#0066ff', cursor: 'pointer' },
  navGroup: { display: 'flex', gap: '20px', alignItems: 'center' },
  navItemContainer: { display: 'flex', alignItems: 'center', gap: '20px' },
  navLinkNormal: { fontWeight: '600', cursor: 'pointer', fontSize: '15px', color: '#333' },
  navLinkPro: { fontWeight: '700', cursor: 'pointer', fontSize: '15px', color: '#ff55cc' }, // Рожевий колір Go Pro
  divider: { width: '1px', height: '20px', backgroundColor: '#eee', margin: '0 5px' },
  signUpBtn: { backgroundColor: '#0066ff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' },
  hero: { display: 'flex', padding: '80px 10%', alignItems: 'center', gap: '60px' },
  heroLeft: { flex: 1.2 },
  mainTitle: { fontSize: '72px', fontWeight: '900', lineHeight: '1.1', marginBottom: '25px' },
  heroSubtitle: { fontSize: '20px', color: '#555', marginBottom: '40px' },
  btnGroup: { display: 'flex', gap: '15px' },
  primaryBtn: { backgroundColor: '#0066ff', color: '#fff', border: 'none', padding: '20px 35px', borderRadius: '15px', fontSize: '18px', fontWeight: '800', cursor: 'pointer' },
  secondaryBtn: { backgroundColor: '#fff', border: '1.5px solid #ddd', padding: '20px 35px', borderRadius: '15px', fontSize: '18px', fontWeight: '700', cursor: 'pointer' },
  heroRight: { flex: 1 },
  imageWrapper: { width: '100%', height: '450px', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.1)' },
  animBgContainer: { display: 'flex', width: '100%', height: '100%' },
  colorStrip: { flex: 1, transition: 'background-color 0.3s ease' },
  marqueeSection: { padding: '60px 0', borderTop: '1px solid #f0f0f0', backgroundColor: '#fafafa' },
  trustedText: { textAlign: 'center', fontSize: '11px', fontWeight: '800', color: '#bbb', letterSpacing: '2px', marginBottom: '40px' },
  companyWrapper: { display: 'flex', alignItems: 'center', gap: '12px', margin: '0 45px', filter: 'grayscale(100%)', opacity: 0.6 },
  logoImg: { height: '28px' },
  companyName: { fontSize: '19px', fontWeight: '700', color: '#333' },
  descriptionSection: { padding: '80px 10%', backgroundColor: '#fff' },
  descriptionContent: { display: 'flex', gap: '80px', alignItems: 'flex-start' },
  mainDescription: { flex: 1.5, fontSize: '19px', lineHeight: '1.6', color: '#111', fontWeight: '500' },
  midnightCard: { flex: 1, backgroundColor: '#f8f8f8', padding: '30px', borderRadius: '15px' },
  midnightLabel: { fontSize: '11px', fontWeight: '800', color: '#888', marginBottom: '20px' },
  midnightFlex: { display: 'flex', gap: '20px' },
  midnightSquare: { width: '70px', height: '70px', borderRadius: '12px' },
  midnightTitle: { fontSize: '18px', fontWeight: '900', margin: 0 },
  midnightSubText: { fontSize: '12px', color: '#666', lineHeight: '1.4', margin: '5px 0' },
  midnightHex: { fontSize: '13px', fontWeight: '700', color: '#888' },
  toolsSection: { padding: '60px 10%', textAlign: 'center' },
  toolsLabel: { fontSize: '11px', fontWeight: '800', color: '#bbb', letterSpacing: '2px', marginBottom: '40px' },
  toolsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' },
  toolCard: { padding: '45px 35px', borderRadius: '25px', textAlign: 'left' },
  toolTitle: { fontSize: '26px', fontWeight: '900', marginBottom: '15px' },
  toolDesc: { fontSize: '16px', lineHeight: '1.5' },
  resourcesSection: { padding: '60px 10%' },
  resourcesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  resCard: { padding: '30px', backgroundColor: '#fcfcfc', borderRadius: '15px', border: '1px solid #f0f0f0', textAlign: 'left' },
  resTitle: { fontSize: '20px', fontWeight: '900', margin: '0 0 10px 0' },
  resDesc: { fontSize: '14px', color: '#666', lineHeight: '1.4' },
  pluginsSection: { padding: '60px 10%', textAlign: 'center' },
  pluginsGrid: { display: 'flex', justifyContent: 'center', gap: '20px' },
  pluginBtn: { flex: 1, padding: '35px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '20px', fontSize: '22px', fontWeight: '900' },
  sloganContainer: { padding: '120px 0', textAlign: 'center' },
  sloganText: { fontSize: '90px', fontWeight: '900', color: '#ebebeb', margin: 0 },
  footer: { padding: '80px 10% 40px', borderTop: '1px solid #eee' },
  footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' },
  footerCol: { display: 'flex', flexDirection: 'column', gap: '12px' },
  footerHead: { fontSize: '13px', fontWeight: '900', color: '#111', marginBottom: '15px' },
  footerLink: { fontSize: '14px', color: '#666', cursor: 'pointer' },
  footerBottom: { marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #f9f9f9', fontSize: '13px', color: '#aaa' }
};

export default MainPage;
