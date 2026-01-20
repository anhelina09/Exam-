import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SpecialColorPage = () => {
  const { hex } = useParams();
  const navigate = useNavigate();
  const cleanHex = hex ? hex.replace('#', '') : '301934';
  const colorHex = `#${cleanHex}`;

  // Визначаємо колір тексту (чорний для світлих фонів, білий для темних)
  const getContrastColor = (hexCode) => {
    const r = parseInt(hexCode.substring(0, 2), 16) || 0;
    const g = parseInt(hexCode.substring(2, 4), 16) || 0;
    const b = parseInt(hexCode.substring(4, 6), 16) || 0;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  };

  const textColor = getContrastColor(cleanHex);

  return (
    <div style={styles.pageContainer}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate('/')}>coolors</div>
        <div style={styles.headerRight}>
          <span style={styles.navLink}>Tools ⌄</span>
          <span style={styles.proLink}>Go Pro</span>
          <div style={styles.divider}></div>
          <span style={styles.navLink}>Sign in</span>
          <button style={styles.signUpBtn}>Sign up</button>
        </div>
      </header>

      <main style={styles.mainContent}>
        {/* Breadcrumbs */}
        <div style={styles.breadcrumbs}>
          <span>Colors</span> <span style={{margin:'0 8px'}}>›</span> 
          <span style={{fontWeight:'bold'}}>#{cleanHex.toUpperCase()}</span>
        </div>

        <h1 style={styles.title}>Color Details</h1>
        <p style={styles.subtitle}>
          The color with hex code #{cleanHex.toUpperCase()} has been successfully generated. 
          This shade is ideal for modern UI design.
        </p>

        {/* ВЕЛИКА КАРТКА */}
        <div style={{ ...styles.colorCard, backgroundColor: colorHex }}>
          <h2 style={{ ...styles.hexDisplay, color: textColor }}>{cleanHex.toUpperCase()}</h2>
          <div style={styles.cardActions}>
            <button style={{...styles.actionBtn, color: textColor, background: 'rgba(255,255,255,0.2)'}}>✎</button>
            <button style={{...styles.saveBtn, color: textColor, background: 'rgba(255,255,255,0.2)'}}>♡ Save ⌄</button>
          </div>
        </div>

        {/* ТАБЛИЦЯ CONVERSION */}
        <section style={styles.conversionSection}>
          <h2 style={styles.sectionTitle}>Conversion</h2>
          <div style={styles.tablesGrid}>
            <div style={styles.tableCol}>
              <div style={styles.convRow}><span>HEX</span> <b>{cleanHex.toUpperCase()}</b></div>
              <div style={styles.convRow}><span>RGB</span> <b>{/* Розрахунок... */}</b></div>
              <div style={styles.convRow}><span>CMYK</span> <b>{/* Розрахунок... */}</b></div>
            </div>
            <div style={styles.tableCol}>
              <div style={styles.convRow}><span>LAB</span> <b>Dynamic</b></div>
              <div style={styles.convRow}><span>XYZ</span> <b>Dynamic</b></div>
            </div>
          </div>
        </section>

        {/* ОПИС ТА РЕСУРСИ (Footer Section) */}
        <div style={styles.footerLinksGrid}>
          <div style={styles.footerCol}>
            <h4 style={styles.footerHead}>TOOLS</h4>
            <p style={styles.fLink}>Generate your palettes</p>
            <p style={styles.fLink}>Explore popular palettes</p>
            <p style={styles.fLink}>Color picker</p>
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerHead}>DISCOVER</h4>
            <p style={styles.fLink}>List of colors</p>
            <p style={styles.fLink}>Browse gradients</p>
            <p style={styles.fLink}>Create a gradient</p>
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerHead}>APPS</h4>
            <p style={styles.fLink}>iOS App</p>
            <p style={styles.fLink}>Figma Plugin</p>
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerHead}>COMPANY</h4>
            <p style={styles.fLink}>Pricing</p>
            <p style={styles.fLink}>License</p>
            <p style={styles.fLink}>Terms of service</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageContainer: { backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', height: '64px', borderBottom: '1px solid #f0f0f0' },
  logo: { color: '#0066ff', fontSize: '24px', fontWeight: '900', cursor: 'pointer' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  navLink: { fontSize: '14px', fontWeight: '600', color: '#444' },
  proLink: { fontSize: '14px', fontWeight: '700', color: '#ff55cc' },
  divider: { width: '1px', height: '24px', backgroundColor: '#eee' },
  signUpBtn: { backgroundColor: '#0066ff', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '700' },
  mainContent: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  breadcrumbs: { marginBottom: '20px', fontSize: '13px', color: '#888' },
  title: { fontSize: '64px', fontWeight: '900', margin: '0' },
  subtitle: { fontSize: '18px', color: '#666', marginBottom: '40px' },
  colorCard: { width: '100%', height: '400px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  hexDisplay: { fontSize: '90px', fontWeight: '900', opacity: 0.4 },
  cardActions: { position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' },
  actionBtn: { width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  saveBtn: { padding: '0 15px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  conversionSection: { marginTop: '80px' },
  sectionTitle: { fontSize: '32px', fontWeight: '900', marginBottom: '30px' },
  tablesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' },
  convRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f5f5f5' },
  footerLinksGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', marginTop: '100px', borderTop: '1px solid #eee', paddingTop: '60px', paddingBottom: '60px' },
  footerCol: { display: 'flex', flexDirection: 'column', gap: '10px' },
  footerHead: { fontSize: '14px', fontWeight: '900', marginBottom: '10px' },
  fLink: { fontSize: '14px', color: '#666', cursor: 'pointer', margin: 0 }
};

export default SpecialColorPage;