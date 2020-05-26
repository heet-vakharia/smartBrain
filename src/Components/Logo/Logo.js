import React from 'react';
import Tilt from 'react-tilt'
import LOGO from './icons8-brain-100.png'
import './Logo.css'
const Logo = () => {
    return(
        <div className="ma4 mt0 ">
            <Tilt className="Tilt br shadow-2 Logo" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> <img src ={LOGO} alt ="Brain logo" /></div>
            </Tilt>
        </div>
    )
}

export default  Logo;