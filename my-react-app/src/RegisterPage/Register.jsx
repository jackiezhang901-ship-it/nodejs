import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function RegisterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const login = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // Temporary: log the registration data. Add validation/auth later.
    console.log('register', { name, email, password, repeatPassword, date, gender, contactNumber });
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
                <li className="nav-item"> <Link to="/Login" className="nav-link">Login</Link></li>               
              </ul> 

              {/* ==== NAV CLOSE ===*/}
              <div className="nav-close" id="nav-close">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>

            {/* ==== NAV BUTTON ===*/}
            <div className="nav-btn">
              {/* ==== TOGGLE BUTTON ===*/}
              <div className="nav-toggle" id="nav-toggle">
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </nav>
      </header>

       {/* ==== Register Form ===*/}
          <div className='login-container'>
            <div className='form'>
                <div className='box'>
                  <p>Name</p>
                    <input type='text' placeholder='Add your Fullname' onChange={(e) => setName(e.target.value)} />
                    {nameError && <p className='error'>{nameError}</p>}
                </div>

                <div className='box'>
                  <p>Email</p>
                    <input type='email' placeholder='Add your Email' onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <p className='error'>{emailError}</p>}
                </div>

                <div className='box'>
                  <p>Password</p>
                    <input type='password' placeholder='Add your password' onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <p className='error'>{passwordError}</p>}
                </div>

                <div className='box'>
                  <p>Repeat Password</p>
                    <input type='password' placeholder='Repeat your password' onChange={(e) => setRepeatPassword(e.target.value)} />
                    {repeatPasswordError && <p className='error'>{repeatPasswordError}</p>}
                </div>

                <div className='box'>
                  <p>Date of Birth</p>
                    <input type='date' placeholder='Add your Date of Birth' onChange={(e) => setDate(e.target.value)} />
                    {dateError && <p className='error'>{dateError}</p>}
                </div>

                <div className='box'>
                  <p>Gender</p>
                    <select onChange={(e) => setGender(e.target.value)}>
                      <option value=''>Select your Gender</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </select>
                    {genderError && <p className='error'>{genderError}</p>}
                </div>

                <div className='box'>
                    <p>Contact Number</p>
                    <input type='tel' placeholder='Add your Contact Number' onChange={(e) => setContactNumber(e.target.value)} />
                    {contactNumberError && <p className='error'>{contactNumberError}</p>}
                </div>
                
                  <button onClick={login}>Sign In Your Account</button>
              </div>
            </div>

        <footer>
            <p>School Management System &nbsp;&nbsp;|&nbsp;&nbsp; © Copyright: Foolish Developer &nbsp;&nbsp;|&nbsp;&nbsp; SchoolManagement@gmail.com</p>
        </footer>
    </div>
    
  );
}

export default RegisterPage;
