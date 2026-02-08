import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function RegisterPage() {

  // Navigation Menu Toggle
  const [menuOpen, setMenuOpen] = useState(false);
   const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const currentDate = yyyy + '-' + mm + '-' + dd;

  const handleDateOfBirthChange = (e) => {
    const val = e.target.value;
    setDateOfBirth(val);
    
    if (val.trim() === '') {
      setDateOfBirthError('Date of birth is required');
    } else {
      const selectedDate = new Date(val);
      const todayDate = new Date();
      
      // Calculate age
      let age = todayDate.getFullYear() - selectedDate.getFullYear();
      const monthDiff = todayDate.getMonth() - selectedDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && todayDate.getDate() < selectedDate.getDate())) {
        age--;
      }
      
      // Validate: must be at least 18 years old
      if (age < 18) {
        setDateOfBirthError('You must be at least 18 years old');
      }
      // Validate: cannot be a future date
      else if (selectedDate > todayDate) {
        setDateOfBirthError('Date of birth cannot be in the future');
      }
      // Validate: reasonable age limit (not more than 120 years old)
      else if (age > 120) {
        setDateOfBirthError('Please enter a valid date of birth');
      } else {
        setDateOfBirthError('');
      }
    }
  };

  // Gender Validation
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');
  const handleGenderChange = (e) => {
    const val = e.target.value;
    setGender(val);
    if (val.trim() === '') {
      setGenderError('Gender is required');
    } else {
      setGenderError('');
    }
  };

  // Role Validation
  const [role, setRole] = useState('');
  const [roleError, setRoleError] = useState(''); 
  const handleRoleChange = (e) => {
    const val = e.target.value;
    setRole(val);
    if (val.trim() === '') {
      setRoleError('Role is required');
    } else {
      setRoleError('');
    }
  };

  // Contact Number Validation
  const [contactNumber, setContactNumber] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const contactNumberPattern = /^[0-9]{10,}$/;
  const handleContactNumberChange = (e) => {
    const val = e.target.value;
    setContactNumber(val);
    if (val.trim() === '') {
      setContactNumberError('Contact number is required');
    } else if (!contactNumberPattern.test(val)) {
      setContactNumberError('Contact number must contain only digits');
    } else if (val.length < 10) {
      setContactNumberError('Contact number must be at least 10 digits');
    } else {
      setContactNumberError('');
    }
  };

  // Validation Function
  const validate = () => {
    return !userNameError && !emailError && !passwordError && !confirmPasswordError && !dateOfBirthError && !genderError && !roleError && !contactNumberError &&
           userName && email && password && confirmPassword && dateOfBirth && gender && role &&contactNumber;
  };

  // Register Function
  const Register = async () => {
    if (!validate()) {
      alert('Please fix all errors before registering');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          email,
          password,
          confirmPassword,
          dateOfBirth,
          gender,
          role,
          contactNumber,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! Please login.');
        // Redirect to login page
        window.location.href = '/Login';
      } else {
        alert('Registration failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Registration error:', error);
    }
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
            <input type='date' value={dateOfBirth} onChange={handleDateOfBirthChange} max={currentDate} />
            {dateOfBirthError && <p className='error'>{dateOfBirthError}</p>}
          </div>

          <div className='box'>
            <p>Gender</p>
            <select value={gender} onChange={handleGenderChange}>
              <option value=''>Select your Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
            {genderError && <p className='error'>{genderError}</p>}
          </div>

          <div className='box'>
            <p>Role</p>
            <select value={role} onChange={handleRoleChange}>
              <option value=''>Select your Role</option>
              <option value='Administrator'>Administrator</option>
              <option value='User'>User</option>
            </select>
            {roleError && <p className='error'>{roleError}</p>}
          </div>

          <div className='box'>
            <p>Contact Number</p>
            <input type='tel' placeholder='Add your Contact Number' value={contactNumber} onChange={handleContactNumberChange} />
            {contactNumberError && <p className='error'>{contactNumberError}</p>}
          </div>

          <button onClick={Register}>Sign In Your Account</button>
        </div>
      </div>

      <footer>
        <p>School Management System &nbsp;&nbsp;|&nbsp;&nbsp; © Copyright: Foolish Developer &nbsp;&nbsp;|&nbsp;&nbsp; SchoolManagement@gmail.com</p>
      </footer>
    </div>
  );
}

export default RegisterPage;