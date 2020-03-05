import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Link } from "react-router-dom";

class GameSearch extends Component {

    state = {
        userSearch: "",
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if (user) {
            user = user.id;
            this.setState({ userSearch: user });
        }
    }

    render() {
        return (
            <Col md="6" sm="12">
                <Form onSubmit={e => { e.preventDefault(); }} className="text-center">
                    <FormGroup>
                        <Label for="userSearch"></Label>
                        <Input
                            className="customForm"
                            type="text"
                            name="userSearch"
                            id="userSearch"
                            placeholder="Steam64ID"
                            onChange={this.handleInputChange}
                            value={this.state.userSearch} />
                    </FormGroup>

                    <Link to={{
                        pathname: '/user',
                        state: this.state.userSearch
                    }}><Button className="otherButtonColors customButton">
                            User Search
                    </Button>
                    </Link>
                </Form>
            </Col>
        );
    }
}

export default GameSearch;