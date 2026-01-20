import React, { useState } from 'react';
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

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Тут логіка реєстрації
    navigate('/login');
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        .letter { display: inline-block; transition: color 0.8s ease, text-shadow 0.8s ease; cursor: default; }
        .letter:hover { transition: color 0s; }
        .letter:nth-child(5n+1):hover { color: #ff0055; text-shadow: 0 0 10px #ff0055; }
        .letter:nth-child(5n+2):hover { color: #00fbff; text-shadow: 0 0 10px #00fbff; }
        .letter:nth-child(5n+3):hover { color: #fffa00; text-shadow: 0 0 10px #fffa00; }
        .letter:nth-child(5n+4):hover { color: #00ff22; text-shadow: 0 0 10px #00ff22; }
      `}</style>

      <div style={styles.leftSection}>
        <div style={styles.loginBox}>
          <h1 style={styles.title}><AnimatedText text="Sign up" /></h1>
          <p style={styles.subtitle}>Create a free account with your email.</p>
          
          <form onSubmit={handleSignUp}>
            <div style={styles.inputGroup}>
              <label style={styles.label}><AnimatedText text="Full Name" /></label>
              <input type="text" style={styles.input} placeholder="Enter your name" required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}><AnimatedText text="Email" /></label>
              <input type="email" style={styles.input} placeholder="Email address" required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}><AnimatedText text="Password" /></label>
              <div style={styles.passwordWrapper}>
                <input type={showPassword ? "text" : "password"} style={styles.input} placeholder="Create password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.showButton}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" style={styles.signUpButton}>
               <AnimatedText text="Create your free account" />
            </button>
          </form>
          <p style={styles.footerText}>Already have an account? <span style={styles.link} onClick={() => navigate('/login')}>Sign in</span></p>
        </div>
      </div>
      <div style={{...styles.rightSection, backgroundImage: "url('/loginphoto.jpg')"}}></div>
    </div>
  );
};

const styles = {
  pageWrapper: { display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: 'Inter, sans-serif' },
  leftSection: { flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: '0 40px' },
  loginBox: { width: '100%', maxWidth: '400px' },
  title: { fontSize: '50px', fontWeight: '900', marginBottom: '10px' },
  subtitle: { fontSize: '18px', color: '#555', marginBottom: '30px' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  passwordWrapper: { position: 'relative' },
  showButton: { position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', color: '#0066ff', fontWeight: '700', cursor: 'pointer' },
  signUpButton: { width: '100%', padding: '16px', backgroundColor: '#0066ff', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' },
  footerText: { textAlign: 'center', marginTop: '20px', color: '#555', fontSize: '14px' },
  link: { color: '#0066ff', fontWeight: 'bold', cursor: 'pointer' },
  rightSection: { flex: '1.2', backgroundSize: 'cover', backgroundPosition: 'center' }
};

export default RegistrationPage;