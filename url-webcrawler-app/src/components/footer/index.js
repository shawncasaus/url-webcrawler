import React from 'react';
import {Navbar} from 'react-bootstrap';
import nate from '../../images/nate.png';

const Footer = () => {

    return (
        <div className="footer" style={{height: "75px"}}>
            <Navbar sticky="top">
                <h3>Created by Shawn Renee Casaus: 2021</h3>
            </Navbar>
        </div>
    );
}

export default Footer;