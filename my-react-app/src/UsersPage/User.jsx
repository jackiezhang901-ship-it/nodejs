import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function UserPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
                <li className="nav-item"><a href="/" className="nav-link">Payment</a></li>
                <li className="nav-item"><a href="/" className="nav-link">Setting</a></li>
                <li className="nav-item"><a href="/" className="nav-link">Profile</a></li>
                <li className="nav-item"><a href="/" className="nav-link">Account</a></li>
                <li className="nav-item"> <Link to="/Login" className="nav-link">Logout</Link></li>               
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

      <main className="about section">
        <div className="about-container">
            <div className="row">
                <div className="about-content padd-15">
                    <div className="row">
                        <div className="about-text padd-15">    
                            <h2>Welcome to Management System</h2>
                            <p>
                              Manage your bookings, shop from the school inventory, and 
                              stay connected—all in one place. Whether you're a student, 
                              teacher, or admin, everything you need is just a click away.
                            </p>
                            <div className="center">
                                <a href="#" target="" class="btn btn-default">Learn More</a>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </main>

        <footer>
            <p>School Management System &nbsp;&nbsp;|&nbsp;&nbsp; © Copyright: Foolish Developer &nbsp;&nbsp;|&nbsp;&nbsp; SchoolManagement@gmail.com</p>
        </footer>
    </div>
    
  );
}

export default UserPage;
