import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GeneratorPage = () => {
  const navigate = useNavigate();
  const [colors, setColors] = useState(['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FFF333']);
  const [savedIndices, setSavedIndices] = useState([]);

  const generate = () => {
    setColors(prev => prev.map((c, i) => 
      savedIndices.includes(i) ? c : '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()
    ));
  };

  useEffect(() => {
    const handleSpace = (e) => e.code === 'Space' && generate();
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, [savedIndices]);

  const addColumn = () => {
    if (colors.length < 7) {
      const newColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
      setColors([...colors, newColor]);
    }
  };

  const toggleSave = (index) => {
    if (!savedIndices.includes(index)) {
      setSavedIndices([...savedIndices, index]);
    }
  };

  return (
    <div style={styles.genContainer}>
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
                <span style={styles.icon}>🔒</span>
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
      <style>{`
        .color-column .icons-overlay { opacity: 0; transition: 0.3s; }
        .color-column:hover .icons-overlay { opacity: 1; }
        .plus-area { width: 10px; position: relative; cursor: pointer; z-index: 10; margin: 0 -5px; }
        .plus-circle { opacity: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.2); font-weight: bold; }
        .plus-area:hover .plus-circle { opacity: 1; }
      `}</style>
    </div>
  );
};

const styles = {
  genContainer: { height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' },
  columnsWrapper: { display: 'flex', height: '100%' },
  column: { flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '100px' },
  hexLabel: { background: 'white', padding: '15px 25px', borderRadius: '12px', fontWeight: '900', textAlign: 'center', cursor: 'pointer' },
  colorName: { fontSize: '10px', color: '#888', marginTop: '5px' },
  iconsOverlay: { position: 'absolute', top: '40%', display: 'flex', flexDirection: 'column', gap: '20px' },
  icon: { fontSize: '24px', cursor: 'pointer', textShadow: '0 2px 4px rgba(0,0,0,0.3)' },
  exitBtn: { position: 'absolute', top: '20px', left: '20px', zIndex: 100, borderRadius: '50%', border: 'none', width: '40px', height: '40px', cursor: 'pointer', fontWeight: 'bold' }
};

export default GeneratorPage;