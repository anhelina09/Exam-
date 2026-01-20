import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <span style={{ fontWeight: '900', fontSize: '24px', color: '#0066ff', cursor: 'pointer' }}>
      {text.split("").map((char, index) => (
        <span 
          key={index} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'inline-block', transition: 'color 0.6s ease' }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const GeneratorPage = () => {
  const navigate = useNavigate();
  const [colors, setColors] = useState(['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FFF333']);
  const [savedIndices, setSavedIndices] = useState([]);
  const [lockedIndices, setLockedIndices] = useState([]); 

  const generate = () => {
    setColors(prev => prev.map((c, i) => 
      
      savedIndices.includes(i) || lockedIndices.includes(i) ? c : '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()
    ));
  };

  useEffect(() => {
    const handleSpace = (e) => e.code === 'Space' && generate();
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, [savedIndices, lockedIndices]); 

  const addColumn = () => {
    if (colors.length < 7) {
      const newColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
      setColors([...colors, newColor]);
    }
  };

  const toggleSave = (index) => {
    setSavedIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  
  const toggleLock = (index) => {
    setLockedIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div style={styles.genContainer}>
      <style>{`
        .color-column .icons-overlay { opacity: 0; transition: 0.3s; }
        .color-column:hover .icons-overlay { opacity: 1; }
        .plus-area { width: 10px; position: relative; cursor: pointer; z-index: 10; margin: 0 -5px; }
        .plus-circle { opacity: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.2); font-weight: bold; }
        .plus-area:hover .plus-circle { opacity: 1; }
        body { margin: 0; font-family: 'Inter', sans-serif; }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerLeft} onClick={() => navigate('/')}>
          <AnimatedText text="coolors" />
        </div>
        <div style={styles.headerRight}>
          <div style={styles.navLinks}>
            <div style={styles.navItem}>
              <span style={styles.textLink}>Tools</span>
              <span style={styles.arrow}>⌄</span>
            </div>
            <span style={styles.proLink}>Go Pro</span>
          </div>
          <div style={styles.divider}></div>
          <div style={styles.authLinks}>
            <span style={styles.textLink} onClick={() => navigate('/login')}>Sign in</span>
            <button style={styles.signUpBtn} onClick={() => navigate('/registration')}>Sign up</button>
          </div>
        </div>
      </header>

      <div style={styles.subHeader}>
        <div style={styles.hintText}>Press the spacebar to generate color palettes!</div>
        <div style={styles.saveContainer}>
          <span style={styles.heartIcon}>♡</span>
          <span style={styles.saveText}>Save</span>
        </div>
      </div>

      <button style={styles.exitBtn} onClick={() => navigate('/')}>✕</button>

      <div style={styles.columnsWrapper}>
        {colors.map((color, i) => (
          <React.Fragment key={i}>
            <div className="color-column" style={{ ...styles.column, backgroundColor: color }}>
              <div className="icons-overlay" style={styles.iconsOverlay}>
                <span onClick={(e) => { e.stopPropagation(); toggleSave(i); }} 
                      style={{ ...styles.icon, color: savedIndices.includes(i) ? 'black' : 'white' }}>
                  ❤
                </span>
                
                
                <span onClick={(e) => { e.stopPropagation(); toggleLock(i); }} style={styles.icon}>
                  {lockedIndices.includes(i) ? '🔒' : '🔓'}
                </span>

                <span style={styles.icon}>📋</span>
              </div>
              <div onClick={() => navigate(`/colors/${color.substring(1)}`)} style={styles.hexLabel}>
                {color}
                <div style={styles.colorName}>Custom Color</div>
              </div>
            </div>
            {i < colors.length - 1 && (
              <div className="plus-area" onClick={addColumn} style={styles.plusArea}>
                <div className="plus-circle" style={styles.plusCircle}>+</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const styles = {
  genContainer: { height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height: '60px', borderBottom: '1px solid #e8e8e8', backgroundColor: '#fff', zIndex: 100 },
  headerLeft: { cursor: 'pointer' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '25px' },
  navItem: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  textLink: { fontSize: '14px', fontWeight: '600', color: '#444', cursor: 'pointer' },
  proLink: { fontSize: '14px', fontWeight: '700', color: '#ff55cc', cursor: 'pointer' },
  arrow: { fontSize: '12px', marginLeft: '5px', color: '#888' },
  divider: { width: '1px', height: '24px', backgroundColor: '#e8e8e8' },
  authLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  signUpBtn: { backgroundColor: '#0066ff', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' },
  subHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e8e8e8', zIndex: 90 },
  hintText: { fontSize: '13px', color: '#666' },
  saveContainer: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  heartIcon: { fontSize: '16px', color: '#444' },
  saveText: { fontSize: '13px', fontWeight: '600' },
  columnsWrapper: { display: 'flex', flex: 1, overflow: 'hidden' },
  column: { flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '100px', transition: 'background-color 0.2s' },
  hexLabel: { background: 'white', padding: '15px 25px', borderRadius: '12px', fontWeight: '900', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  colorName: { fontSize: '10px', color: '#888', marginTop: '5px' },
  iconsOverlay: { position: 'absolute', top: '40%', display: 'flex', flexDirection: 'column', gap: '20px' },
  icon: { fontSize: '24px', cursor: 'pointer', textShadow: '0 2px 4px rgba(0,0,0,0.3)', userSelect: 'none' },
  exitBtn: { position: 'absolute', top: '120px', left: '20px', zIndex: 100, borderRadius: '50%', border: 'none', width: '35px', height: '35px', cursor: 'pointer', fontWeight: 'bold', background: 'rgba(255,255,255,0.8)', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }
};

export default GeneratorPage;