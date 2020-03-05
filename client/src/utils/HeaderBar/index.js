import React, { useState } from 'react';
import LoginButton from "../LoginButton";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
} from 'reactstrap';
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg";

const HeaderBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className="customHeader" dark expand="md">
                <Link to={{ pathname: '/' }}>
                    <NavbarBrand className="customHeaderColor boldFont">
                        <img className="customLogo" src={logo} alt="Steam Visualizer Logo" height="15" width="25" />  Steam Visualizer
                      </NavbarBrand>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {/* This is the smart component that handles displaying the user if they are logged in */}
                    <LoginButton className="customHeaderColor" />
                </Collapse>
            </Navbar>
        </div>
    );
}

export default HeaderBar;