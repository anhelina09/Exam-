import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Компонент для анімації кожної літери при наведенні
const AnimatedText = ({ text }) => {
  return (
    <span className="rainbow-text">
      {text.split("").map((char, index) => (
        <span key={index} className="letter">{char === " " ? "\u00A0" : char}</span>
      ))}
    </span>
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const [dailyColor, setDailyColor] = useState("78FA8B");

  // Зміна кольору дня при оновленні сторінки
  useEffect(() => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    setDailyColor(randomHex);
  }, []);

  // Оновлений список компаній (БЕЗ Apple, NYT та DreamWorks)
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
    { title: "Palette Generator", desc: "Create beautiful color schemes in seconds with the worldwide loved palette tool. Just hit the spacebar!", color: "#e0fbfc", action: "START THE GENERATOR", path: "/generator" },
    { title: "Explore Palettes", desc: "Get inspired by thousands of beautiful color schemes. Search by colors, styles, topics or hex values.", color: "#e0eaff", action: "EXPLORE 10M+ PALETTES", path: "/generator" },
    { title: "Image Picker", desc: "Extract beautiful colors from your photos and turn them into palettes for your projects.", color: "#f3e8ff", action: "LAUNCH THE IMAGE PICKER", path: "/generator" },
    { title: "Contrast Checker", desc: "Calculate the contrast ratio of text and background colors to make your content more accessible.", color: "#ffe4f2", action: "TRY THE CONTRAST CHECKER", path: "/generator" },
    { title: "Palette Visualizer", desc: "Preview your colors on real designs to see how they look in context before using them in your projects.", color: "#ffe8e0", action: "OPEN THE VISUALIZER", path: "/generator" },
    { title: "Color Picker", desc: "Get useful color information like meaning, usage, variations, accessibility and conversion.", color: "#fff4e0", action: "LAUNCH THE COLOR PICKER", path: "/generator" },
    { title: "Tailwind Colors", desc: "Preview Tailwind CSS colors on real designs to see how they look in context before using them in your projects.", color: "#fff9c4", action: "GET ALL THE TAILWIND COLORS", path: "/generator" },
    { title: "Color Bot", desc: "Chat with our AI-powered Color Bot, ask questions and get color suggestions for your projects.", color: "#e8f5e9", action: "CHAT WITH COLOR BOT", path: "/generator" }
  ];

  return (
    <div style={styles.container}>
      <style>{`
        /* Анімація букв */
        .letter { display: inline-block; transition: color 0.6s ease; cursor: default; }
        .letter:hover { transition: color 0s; }
        .letter:nth-child(5n+1):hover { color: #ff0055; text-shadow: 0 0 10px #ff0055; }
        .letter:nth-child(5n+2):hover { color: #00fbff; text-shadow: 0 0 10px #00fbff; }
        .letter:nth-child(5n+3):hover { color: #fffa00; text-shadow: 0 0 10px #fffa00; }
        .letter:nth-child(5n+4):hover { color: #00ff22; text-shadow: 0 0 10px #00ff22; }
        .letter:nth-child(5n+5):hover { color: #ff00ff; text-shadow: 0 0 10px #ff00ff; }

        /* Рухомий рядок */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee { display: flex; animation: scroll 35s linear infinite; width: max-content; }
        
        .tool-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); transition: all 0.3s ease; }
      `}</style>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          <AnimatedText text="Coolors" />
        </div>
        <div style={styles.navGroup}>
          <span style={styles.navLink} onClick={() => navigate('/login')}>Sign in</span>
          <button style={styles.signUpBtn} onClick={() => navigate('/registration')}>Sign up</button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.mainTitle}>
            <AnimatedText text="The super fast color palettes generator!" />
          </h1>
          <p style={styles.heroSubtitle}>
            <AnimatedText text="Create the perfect palette or get inspired by thousands of beautiful color schemes." />
          </p>
          <div style={styles.btnGroup}>
            <button style={styles.primaryBtn} onClick={() => navigate('/generator')}>Start the generator!</button>
            <button style={styles.secondaryBtn}>Explore trending</button>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.imageWrapper}>
            <img src="/loginphoto.jpg" alt="Hero" style={styles.mainImg} />
            
            {/* КАРТКА КОЛЬОРУ: ПРАВОРУЧ ВНИЗУ */}
            <div style={styles.dailyCard} onClick={() => navigate(`/colors/${dailyColor}`)}>
              <div style={{...styles.dailyColorBox, backgroundColor: `#${dailyColor}`}}></div>
              <div style={styles.dailyText}>
                <p style={styles.dailyLabel}>The best color of the day</p>
                <h3 style={styles.dailyHex}>#{dailyColor}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY: МАРКІ З ІКОНКАМИ ТА НАЗВАМИ */}
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

      {/* TOOLS GRID */}
      <section style={styles.toolsSection}>
        <h2 style={styles.sectionTitle}><AnimatedText text="Our tools loved by millions" /></h2>
        <div style={styles.grid}>
          {tools.map((tool, index) => (
            <div key={index} className="tool-card" style={{...styles.toolCard, backgroundColor: tool.color}} onClick={() => navigate(tool.path)}>
              <h3 style={styles.toolHeading}>{tool.title}</h3>
              <p style={styles.toolDescription}>{tool.desc}</p>
              <span style={styles.toolAction}>{tool.action} →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: { fontFamily: "'Inter', sans-serif", backgroundColor: '#fff', overflowX: 'hidden' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px' },
  logo: { fontSize: '28px', fontWeight: '900', color: '#0066ff', cursor: 'pointer' },
  navGroup: { display: 'flex', gap: '25px', alignItems: 'center' },
  navLink: { fontWeight: '700', cursor: 'pointer', fontSize: '15px' },
  signUpBtn: { backgroundColor: '#0066ff', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' },

  hero: { display: 'flex', padding: '80px 10%', alignItems: 'center', gap: '60px' },
  heroLeft: { flex: 1.2 },
  mainTitle: { fontSize: '72px', fontWeight: '900', lineHeight: '1.1', marginBottom: '25px', letterSpacing: '-1px' },
  heroSubtitle: { fontSize: '20px', color: '#555', marginBottom: '45px' },
  btnGroup: { display: 'flex', gap: '15px' },
  primaryBtn: { backgroundColor: '#0066ff', color: '#fff', border: 'none', padding: '20px 35px', borderRadius: '15px', fontSize: '18px', fontWeight: '800', cursor: 'pointer' },
  secondaryBtn: { backgroundColor: '#fff', border: '1.5px solid #ddd', padding: '20px 35px', borderRadius: '15px', fontSize: '18px', fontWeight: '700', cursor: 'pointer' },

  heroRight: { flex: 1 },
  imageWrapper: { position: 'relative' },
  mainImg: { width: '100%', borderRadius: '40px', boxShadow: '0 30px 80px rgba(0,0,0,0.1)' },
  
  dailyCard: { 
    position: 'absolute', 
    bottom: '40px', 
    right: '40px', 
    backgroundColor: '#fff', 
    padding: '20px', 
    borderRadius: '25px', 
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px', 
    cursor: 'pointer',
    zIndex: 10 
  },
  dailyColorBox: { width: '70px', height: '70px', borderRadius: '16px' },
  dailyLabel: { fontSize: '11px', color: '#888', fontWeight: '700', margin: '0 0 4px 0', textTransform: 'uppercase' },
  dailyHex: { fontSize: '24px', fontWeight: '900', margin: 0 },

  marqueeSection: { padding: '60px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' },
  trustedText: { textAlign: 'center', fontSize: '11px', fontWeight: '800', color: '#bbb', letterSpacing: '2px', marginBottom: '40px' },
  companyWrapper: { display: 'flex', alignItems: 'center', gap: '12px', margin: '0 45px', filter: 'grayscale(100%)', opacity: 0.6 },
  logoImg: { height: '28px', width: 'auto' },
  companyName: { fontSize: '19px', fontWeight: '700', color: '#333' },

  toolsSection: { padding: '100px 10%' },
  sectionTitle: { textAlign: 'center', fontSize: '38px', fontWeight: '900', marginBottom: '70px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' },
  toolCard: { padding: '50px', borderRadius: '35px', cursor: 'pointer', display: 'flex', flexDirection: 'column' },
  toolHeading: { fontSize: '36px', fontWeight: '900', marginBottom: '20px' },
  toolDescription: { fontSize: '17px', color: '#444', marginBottom: '45px', lineHeight: '1.5', flexGrow: 1 },
  toolAction: { fontSize: '13px', fontWeight: '900', color: '#111', textTransform: 'uppercase' }
};

export default MainPage;