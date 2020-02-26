import React, { useState } from 'react';
import LoginButton from "./LoginButton";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
} from 'reactstrap';

const HeaderBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Steam Visualizer</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {/* This is the smart component that handles displaying the user if they are logged in */}
                    <LoginButton />
                </Collapse>
            </Navbar>
            <br></br>
        </div>
    );
}

export default HeaderBar;