import { useState, FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [form, setForm] = useState({
     username: '',
     password: ''
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
    // Handle form submission logic here
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                       <input  name='username' type='text' value={form.username} onChange={(e) => setForm({...form, username: e.target.value})}
                               placeholder='Enter your username'/>
                    </div>
                    <div className='box'>
                        <input name='password' type={showPassword ? 'text' : 'password'} value={form.password}
                         onChange={(e) => setForm({...form, password: e.target.value})}
                               placeholder='Enter your Password'/>
                        <span className='toggle-password' onClick={togglePasswordVisibility}>
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
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
