import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import "./Header.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className='header'>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-sm-12">
            <p className="logo">Student List</p>
          </div>
          <div className="col-md-9 col-sm-12 header-right">
            <ul className="nav nav-tabs justify-content-end">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <button className={`${activeTab === "Home" ? "active" : ""}`}
                     onClick={() => setActiveTab("Home")}>
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add" className="nav-link">
                  <button className={`${activeTab === "AddContact" ? "active" : ""}`}
                     onClick={() => setActiveTab("AddContact")}>
                    Add Contact
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header