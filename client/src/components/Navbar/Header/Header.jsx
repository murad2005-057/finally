import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
                <img src="/header_img.jpg" alt="Header Image" />
            
            <div className="header-contents">
                <h2>Order your favourite food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culibary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious </p>
                <a href="#food-display">View Menu</a>
            </div>
        </div>
    )
}

export default Header
