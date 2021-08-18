import React from 'react';
import {Navbar} from 'react-bootstrap';
import nate from '../../images/nate.png';

const NavBar = () => {

    return (
        <div className="nav-bar" style={{height: "75px"}}>
            <Navbar sticky="top">
                <img  src={nate} style={{height: "50px"}} alt="nate logo" />
            </Navbar>
        </div>
    );
}

export default NavBar;