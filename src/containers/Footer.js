import React from 'react';
import '../styles/css/style.css'

import logo_s2 from '../resources/logo/l4.png'

import facebook from '../resources/icons/facebook.svg'
import whatsapp from '../resources/icons/whatsapp.svg'
import twitter from '../resources/icons/twitter.svg'

export const Footer = props => {
    return (
        <div id='footer'>
            <footer className="footer-distributed">
                <div className="footer-left">

                    <a href="/"><img id='logo' src={logo_s2} alt='logo' /></a>

                    <p className="footer-links">
                        <a href="/" className="link-1">Home&nbsp;</a>

                        <a href="/cart">Cart &nbsp;</a>
                        <a href="/orders">Orders &nbsp;</a>
                        <a href="/about">About Us &nbsp;</a>
                        <a href="#contact">Contact &nbsp;</a>
                    </p>

                    <p className="footer-company-name">Mothers Store © 2020</p>
                </div>

                <div className="footer-center">

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>105, 5th street, Poongothai Nagar</span> Sitra, Coimbatore</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>+91 9524284655</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:supportmotherstore@ms.com">supportmotherstore@ms.com</a></p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About Mothers Store</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

                    <div className="footer-icons">

                        <a href="/" ><img alt='a' src={facebook} /></a>
                        <a href="/" ><img alt='a' src={whatsapp} /></a>
                        <a href="/" ><img alt='a' src={twitter} /></a>

                    </div>

                </div>

            </footer>
        </div>
    );
}


export default Footer;