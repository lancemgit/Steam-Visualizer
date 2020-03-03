import React, { Component } from 'react';
import {
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from "react-router-dom";

class LoginButton extends Component {

    state = {
        name: "",
        avatar: "",
        id: "",
        url: ""
    };

    handleLogin = () => {
        const authLink = process.env.REACT_APP_API_REALM + "/auth/steam";
        const popupWindow = window.open(authLink, '_blank', 'width=800, height=600');
        if (window.focus) popupWindow.focus();
    }

    handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        this.setState({ name: "", avatar: "", id: "", url: "" });
    }

    componentDidMount = () => {
        // Checking to see if the user is still logged in from the previous session
        let user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            this.setState({ name: user.name, avatar: user.avatar, id: user.id, url: "https://steamcommunity.com/profiles/" + user.id });
        }

        window.addEventListener('message', event => {

            if (event.origin !== process.env.REACT_APP_API_REALM) {
                return;
            }

            const { token } = event.data;
            localStorage.setItem('authToken', token);

            let base64Token = token.split('.')[1].replace('-', '+').replace('_', '/');
            let payload = JSON.parse(atob(base64Token)).user;
            localStorage.setItem("user", JSON.stringify(payload));

            this.setState({ name: payload.name, avatar: payload.avatar, id: payload.id });
        });
    }

    render() {
        return (
            <div className="ml-auto">
                {
                    this.state.name && this.state.avatar && this.state.id ?
                        (
                            <Nav navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav>
                                        {this.state.name}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <a href={this.state.url}>
                                            <DropdownItem>
                                                Steam Page
                                            </DropdownItem>
                                        </a>

                                        <Link to={{
                                            pathname: '/user',
                                            state: this.state.id
                                        }}><DropdownItem>
                                                Your Stats
                                    </DropdownItem></Link>

                                        <a href={this.state.url}>

                                        </a>
                                        <DropdownItem onClick={this.handleLogout}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        )
                        :
                        (
                            <div onClick={this.handleLogin}>Sign In</div>
                        )
                }
            </div>
        )
    }
}

export default LoginButton;