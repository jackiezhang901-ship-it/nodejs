import { useState, FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {

  // Navigation Menu Toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Email Validation
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (e) => {
    const val = e.target.value;
      setEmail(val);
      if (val.trim() === '') {
          setEmailError('Email is required');
      } else if (!val.includes('@')) {
          setEmailError('Email must include @');
      } else if (!emailPattern.test(val)) {
          setEmailError('Invalid email address');
      } else {
          setEmailError('');
      }
  };

  // Password Validation
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
      if (val.trim() === '') {
        setPasswordError('Password is required');
      } else if (val.length < 8 || !passwordPattern.test(val)) {
        setPasswordError('Must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
      } else {
          setPasswordError('');
      }
  };
  
  return (
    <div>
      <header className="header" id="header">
          {/* ==== NAV ===*/}
          <nav className="nav container">
            <a href="#" className="nav-logo"> <h2>Management System</h2> </a>

            {/* ==== NAV MENU ===*/}
            <div className="nav-menu" id="nav-menu">
              {/* ==== NAV LIST ===*/}
              <ul className="nav-list">
                <li className="nav-item"><Link to="/" className="nav-link">Features</Link></li>
                <li className="nav-item"><Link to="/" className="nav-link">Blog</Link></li>
                <li className="nav-item"><Link to="/" className="nav-link">About & Contact Us</Link></li>
                <li className="nav-item"><Link to="/" className="nav-link">Location</Link></li>              
              </ul> 

              {/* ==== NAV CLOSE ===*/}
              <div className="nav-close" id="nav-close">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>

            {/* ==== NAV BUTTON ===*/}
            <div className="nav-btn">
              <div className="nav-toggle" id="nav-toggle" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </nav>
      </header>

       {/* ==== Login Form ===*/}
       <section>
            <div className='login-container'>
              <form>
                  <div className='form'>
                    <h2>Login</h2>
                    <div className='box'>
                      <p>Email</p>
                      <input type='email' placeholder='Add your Email' value={email} onChange={handleEmailChange} />
                      {emailError && <p className='error'>{emailError}</p>}
                    </div>
                    <div className='box'>
                     <input name='password' type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder='Enter your Password'/>
                        <span className='toggle-password' onClick={togglePasswordVisibility}>
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                        {passwordError && <p className='error'>{passwordError}</p>}
                    </div>
                    <button type='submit'>Sign In Your Account</button>
                    <p>Don't Have An Account? <Link to='/Register' style={{ color: 'blue', fontSize: '14px' }}>Register Account</Link></p>
                </div>
              </form>
            </div>
       </section>
        
        <footer>
            <p>School Management System &nbsp;&nbsp;|&nbsp;&nbsp; © Copyright: Foolish Developer &nbsp;&nbsp;|&nbsp;&nbsp; SchoolManagement@gmail.com</p>
        </footer>
    </div>
    
  );
}
export default LoginPage;
