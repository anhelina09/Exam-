import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SpecialColorPage = () => {
  const { colorHex } = useParams();
  const navigate = useNavigate();
  const hex = colorHex.toUpperCase();

  // --- ЛОГІКА КОНВЕРТАЦІЇ КОЛЬОРІВ ---

  // HEX to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const rgb = `${r}, ${g}, ${b}`;

  // RGB to CMYK
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  const c = Math.round(((1 - rNorm - k) / (1 - k)) * 100) || 0;
  const m = Math.round(((1 - gNorm - k) / (1 - k)) * 100) || 0;
  const y = Math.round(((1 - bNorm - k) / (1 - k)) * 100) || 0;
  const cmyk = `${c}%, ${m}%, ${y}%, ${Math.round(k * 100)}%`;

  // RGB to HSB (HSV)
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;
  let h;
  if (d === 0) h = 0;
  else if (max === rNorm) h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) * 60;
  else if (max === gNorm) h = ((bNorm - rNorm) / d + 2) * 60;
  else if (max === bNorm) h = ((rNorm - gNorm) / d + 4) * 60;
  const sB = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;
  const hsb = `${Math.round(h)}°, ${Math.round(sB)}%, ${Math.round(v)}%`;

  // RGB to HSL
  const l = (max + min) / 2;
  const sL = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  const hsl = `${Math.round(h)}°, ${Math.round(sL * 100)}%, ${Math.round(l * 100)}%`;

  return (
    <div style={{ ...styles.container, backgroundColor: `#${hex}` }}>
      {/* Кнопка закрити */}
      <button style={styles.closeBtn} onClick={() => navigate(-1)}>✕</button>

      <div style={styles.modal}>
        <div style={styles.content}>
          <div style={styles.header}>
            <p style={styles.label}>COLOR NAME</p>
            <h1 style={styles.title}>Beautiful Shade</h1>
          </div>

          {/* Секція Conversion (Динамічні та захардкоджені поля) */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Conversion</h3>
            <div style={styles.grid}>
              <div style={styles.row}><span>HEX</span> <strong>#{hex}</strong></div>
              <div style={styles.row}><span>RGB</span> <strong>{rgb}</strong></div>
              <div style={styles.row}><span>CMYK</span> <strong>{cmyk}</strong></div>
              <div style={styles.row}><span>HSB</span> <strong>{hsb}</strong></div>
              <div style={styles.row}><span>HSL</span> <strong>{hsl}</strong></div>
              {/* Захардкоджені поля */}
              <div style={styles.row}><span>LAB</span> <strong>54, 12, 45</strong></div>
              <div style={styles.row}><span>XYZ</span> <strong>23.4, 12.1, 44.5</strong></div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Details</h3>
            <p style={styles.description}>
              This color is a unique digital shade. Its properties make it ideal for modern UI design, 
              providing a balance between vibrancy and readability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif"
  },
  closeBtn: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    background: 'white',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    maxWidth: '500px',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
  },
  content: {
    padding: '40px'
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center'
  },
  label: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#aaa',
    letterSpacing: '1px',
    margin: 0
  },
  title: {
    fontSize: '32px',
    fontWeight: '900',
    margin: '5px 0'
  },
  section: {
    marginBottom: '25px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '800',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px'
  },
  description: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6'
  }
};

export default SpecialColorPage;