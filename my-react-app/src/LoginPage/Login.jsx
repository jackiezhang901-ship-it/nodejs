import { useState, userContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {

  // Navigation Menu Toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Password Visibility Toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Email Validation State
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

  // Password Validation State
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

  // Navigation based on User Role
  const navigation = useNavigate();
  const { setUser } = useState(userContext);

  const navigateToUserTypePage = (userType) => {
    switch (userType) {
      case 'Administrator':
        navigation('/Administrator');  
        break;
      case 'User':
        navigation('/UserPage');
        break;
      default:
        navigation('/Login');
    }
  };

  // Login Functions
  const Login = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {  
        setUser(data.user);
        navigateToUserTypePage(data.user.role);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
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
                <div className='form'>
                    <h2>Login</h2>
                    <div className='box'>
                        <input type='email' placeholder='Enter your email' value={email} onChange={handleEmailChange} />
                        {emailError && <p className="error">{emailError}</p>}
                    </div>
                    <div className='box'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Enter your Password' value={password} onChange={handlePasswordChange} />
                        <span className='toggle-password' onClick={togglePasswordVisibility}>
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {passwordError && <p className="error">{passwordError}</p>}
                    <button onClick={Login}>Sign In Your Account</button>
                    <p>Don't Have An Account? <Link to='/Register' style={{ color: 'blue', fontSize: '14px' }}>Register Account</Link></p>
                </div>
            </div>
       </section>
        
        <footer>
            <p>School Management System &nbsp;&nbsp;|&nbsp;&nbsp; © Copyright: Foolish Developer &nbsp;&nbsp;|&nbsp;&nbsp; SchoolManagement@gmail.com</p>
        </footer>
    </div>
  );
}

export default LoginPage;
