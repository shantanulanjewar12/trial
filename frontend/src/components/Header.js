
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // This will ensure the header updates when the user changes
    }, [user, location]);

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            logout();           // Clear auth context & cookies
            navigate('/login'); // Redirect to login page
            setIsLoading(false);
        }, 500);
    };

    return (
        <header className="main-header">
            <div className="header-left">
                <Link to="/" className="logo">
                    <i className="logo-icon">CE</i> CampusEventHub
                </Link>
            </div>

            <nav className="header-nav">
                {isLoading ? (
                    <div className="loading-spinner"></div>
                ) : user ? (
                    <>
                        {user.role === 'student' && (
                            <>
                                <Link to="/student-dashboard" className="nav-item">👤 Dashboard</Link>
                                {/* <Link to="/events" className="nav-item">📋 Events</Link> */}
                            </>
                        )}
                        {user.role === 'college_admin' && (
                            <>
                                <Link to="/admin-dashboard" className="nav-item">⚙️ Admin Dashboard</Link>
                                <Link to="/create-event" className="nav-item">➕ Create Event</Link>
                                {/* <Link to="/events" className="nav-item">📋 Manage Events</Link> */}
                            </>
                        )}
                        {/* <div className="user-welcome">Welcome, {user.name || user.email}!</div> */}
                        <button onClick={handleLogout} className="nav-item logout-button"> Logout ➜]</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-item">→ Login</Link>
                        {/* <Link to="/register" className="nav-item">📝 Register</Link> */}
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;




