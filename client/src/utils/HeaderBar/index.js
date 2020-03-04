import React, { useState } from 'react';
import LoginButton from "../LoginButton";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
} from 'reactstrap';
import logo from "../../assets/logo.svg";

const HeaderBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className="customHeader" light expand="md">
                <NavbarBrand href="/" className="customHeaderColor boldFont">
                    <img src={logo} alt="Steam Visualizer Logo" height="15" width="25" />  Steam Visualizer
                      </NavbarBrand>
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