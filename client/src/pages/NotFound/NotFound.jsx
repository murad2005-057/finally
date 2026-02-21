import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found'>
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Oops! Page Not Found</h2>
                <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <button onClick={() => navigate('/')} className='not-found-btn'>
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
