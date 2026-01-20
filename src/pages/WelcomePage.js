import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnimatedText = ({ text }) => {
  return (
    <span className="rainbow-text">
      {text.split("").map((char, index) => (
        <span key={index} className="letter">{char === " " ? "\u00A0" : char}</span>
      ))}
    </span>
  );
};

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <style>{`
        .letter { display: inline-block; transition: color 0.8s ease, text-shadow 0.8s ease; cursor: default; }
        .letter:hover { transition: color 0s; }
        .letter:nth-child(5n+1):hover { color: #ff0055; text-shadow: 0 0 10px #ff0055; }
        .letter:nth-child(5n+2):hover { color: #00fbff; text-shadow: 0 0 10px #00fbff; }
        .letter:nth-child(5n+3):hover { color: #fffa00; text-shadow: 0 0 10px #fffa00; }
        .letter:nth-child(5n+4):hover { color: #00ff22; text-shadow: 0 0 10px #00ff22; }
        
        .welcome-card { transition: all 0.4s ease; cursor: pointer; }
        .welcome-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}><AnimatedText text="Welcome back!" /></h1>
        <p style={styles.subtitle}><AnimatedText text="What would you like to do today?" /></p>
      </div>

      <div style={styles.grid}>
        {/* Картка 1: Перехід на головну (Best color) */}
        <div className="welcome-card" style={styles.card} onClick={() => navigate('/main')}>
          <div style={{...styles.iconBox, backgroundColor: '#0066ff'}}>✨</div>
          <h2 style={styles.cardTitle}><AnimatedText text="Explore Trends" /></h2>
          <p style={styles.cardDesc}>Check the best color of the day and top companies.</p>
        </div>

        {/* Картка 2: Перехід до Генератора */}
        <div className="welcome-card" style={styles.card} onClick={() => navigate('/generator')}>
          <div style={{...styles.iconBox, backgroundColor: '#ff0055'}}>🎨</div>
          <h2 style={styles.cardTitle}><AnimatedText text="Open Generator" /></h2>
          <p style={styles.cardDesc}>Start creating your own unique color palettes.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfcfc', fontFamily: 'Inter, sans-serif' },
  header: { textAlign: 'center', marginBottom: '50px' },
  title: { fontSize: '48px', fontWeight: '900', margin: '0 0 10px 0' },
  subtitle: { fontSize: '18px', color: '#666' },
  grid: { display: 'flex', gap: '30px' },
  card: { backgroundColor: '#fff', width: '300px', padding: '40px', borderRadius: '32px', textAlign: 'center', border: '1.5px solid #f0f0f0' },
  iconBox: { width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 25px auto', color: '#fff' },
  cardTitle: { fontSize: '22px', fontWeight: '800', marginBottom: '12px' },
  cardDesc: { fontSize: '15px', color: '#888', lineHeight: '1.5' }
};

export default WelcomePage;