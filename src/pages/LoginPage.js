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

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    onLogin();
    navigate('/');
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
        .letter:nth-child(5n+5):hover { color: #ff00ff; text-shadow: 0 0 10px #ff00ff; }
      `}</style>

      <div style={styles.leftSection}>
        <div style={styles.loginBox}>
          <h1 style={styles.title}><AnimatedText text="Hello!" /></h1>
          <p style={styles.subtitle}>Use your email or another service to continue with Colors.</p>
          
          <div style={styles.socialContainer}>
            <button style={styles.socialButton}>
               <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="" />
               <AnimatedText text="Continue with Google" />
            </button>
            <button style={styles.socialButton}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" width="20" alt="" />
               <AnimatedText text="Continue with Apple" />
            </button>
          </div>

          <div style={styles.divider}><span style={styles.dividerText}>OR</span></div>

          <form onSubmit={handleSignIn}>
            <div style={styles.inputGroup}>
              <label style={styles.label}><AnimatedText text="Email or Username" /></label>
              <input type="text" style={styles.input} placeholder="Email address" required />
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.passwordWrapper}>
                <input type={showPassword ? "text" : "password"} style={styles.input} placeholder="Password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.showButton}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" style={styles.signInButton}>
               <AnimatedText text="Sign in" />
            </button>
          </form>
          <p style={styles.signUpText}>Don't have an account? <span style={styles.link} onClick={() => navigate('/registration')}>Sign up</span></p>
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
  socialContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  socialButton: { width: '100%', padding: '14px', borderRadius: '12px', border: '1.5px solid #eee', backgroundColor: '#fff', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  divider: { borderBottom: '1px solid #eee', lineHeight: '0.1em', margin: '30px 0', textAlign: 'center' },
  dividerText: { background: '#fff', padding: '0 10px', color: '#aaa', fontSize: '12px', fontWeight: 'bold' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  passwordWrapper: { position: 'relative' },
  showButton: { position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', color: '#0066ff', fontWeight: '700', cursor: 'pointer' },
  signInButton: { width: '100%', padding: '16px', backgroundColor: '#0066ff', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' },
  signUpText: { textAlign: 'center', marginTop: '20px', color: '#555', fontSize: '14px' },
  link: { color: '#0066ff', fontWeight: 'bold', cursor: 'pointer' },
  rightSection: { flex: '1.2', backgroundSize: 'cover', backgroundPosition: 'center' }
};

export default LoginPage;