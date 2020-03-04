import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";

class GameSearch extends Component {

    state = {
        userSearch: "",
        result: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
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
                        value={this.state.search} />
                </FormGroup>

                <Link to={{
                    pathname: '/user',
                    state: this.state.userSearch
                }}><Button className="customButton">
                        Search
                    </Button>
                </Link>
            </Form>
        );
    }
}

export default GameSearch;