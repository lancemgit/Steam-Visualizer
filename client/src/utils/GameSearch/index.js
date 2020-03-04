import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";

class GameSearch extends Component {

    state = {
        gameSearch: "",
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
                    <Label for="gameSearch"></Label>
                    <Input
                        className="customForm"
                        type="text"
                        name="gameSearch"
                        id="gameSearch"
                        placeholder="Steam AppID"
                        onChange={this.handleInputChange}
                        value={this.state.search} />
                </FormGroup>

                <Link to={{
                    pathname: '/game',
                    state: this.state.gameSearch
                }}><Button className="customButton">
                        Search
                    </Button>
                </Link>
            </Form>
        );
    }
}

export default GameSearch;