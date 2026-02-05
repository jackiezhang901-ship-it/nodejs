import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function RegisterPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Name Validation
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const userNamePattern = /^[a-zA-Z\s]{8,}$/;
  const handleUserNameChange = (e) => {
    const val = e.target.value;
    setUserName(val);
    if (val.trim() === '') {
      setUserNameError('Name is required');
    } else if (val.length < 8) {
      setUserNameError('Name must be at least 8 characters long');
    } else if (!userNamePattern.test(val)) {
      setUserNameError('Name must contain only letters and spaces');
    } else {
      setUserNameError('');
    }
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

    if (confirmPassword && val !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else if (confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  // Confirm Password Validation
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (val.trim() === '') {
      setConfirmPasswordError('Please confirm your password');
    } else if (val !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Date of Birth Validation

  // Gender Validation

  // Contact Number Validation

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="nav-logo">
            <h2>Management System</h2>
          </a>

          <div className="nav-menu" id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/" className="nav-link">Features</Link></li>
              <li className="nav-item"><Link to="/" className="nav-link">Blog</Link></li>
              <li className="nav-item"><Link to="/" className="nav-link">About & Contact Us</Link></li>
              <li className="nav-item"><Link to="/" className="nav-link">Location</Link></li>
              <li className="nav-item"><Link to="/Login" className="nav-link">Login</Link></li>
            </ul>

            <div className="nav-close" id="nav-close">
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>

          <div className="nav-btn">
            <div className="nav-toggle" id="nav-toggle" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </nav>
      </header>

      <div className='login-container'>
        <div className='form'>
          <div className='box'>
            <p>Name</p>
            <input type='text' placeholder='Add your Fullname' value={userName} onChange={handleUserNameChange} />
            {userNameError && <p className='error'>{userNameError}</p>}
          </div>

          <div className='box'>
            <p>Email</p>
            <input type='email' placeholder='Add your Email' value={email} onChange={handleEmailChange} />
            {emailError && <p className='error'>{emailError}</p>}
          </div>

          <div className='box'>
            <p>Password</p>
            <input type='password' placeholder='Add your password' value={password} onChange={handlePasswordChange} />
            {passwordError && <p className='error'>{passwordError}</p>}
          </div>

          <div className='box'>
            <p>Repeat Password</p>
            <input type='password' placeholder='Repeat your password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {confirmPasswordError && <p className='error'>{confirmPasswordError}</p>}
          </div>

          <div className='box'>
            <p>Date of Birth</p>
            <input type='date' />
          </div>

          <div className='box'>
            <p>Gender</p>
            <select>
              <option value=''>Select your Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>

          <div className='box'>
            <p>Contact Number</p>
            <input type='tel' placeholder='Add your Contact Number' />
          </div>

          <button>Sign In Your Account</button>
        </div>
      </div>

      <footer>
        <p>School Management System &nbsp;&nbsp;|&nbsp;&nbsp; © Copyright: Foolish Developer &nbsp;&nbsp;|&nbsp;&nbsp; SchoolManagement@gmail.com</p>
      </footer>
    </div>
  );
}

export default RegisterPage;