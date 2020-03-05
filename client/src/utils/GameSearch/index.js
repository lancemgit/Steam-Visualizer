import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
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
            <Col md="6" sm="12">
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
                    }}><Button className="otherButtonColors customButton buttonSpacer">
                            Game Search
                    </Button>
                    </Link>
                </Form>
            </Col>
        );
    }
}

export default GameSearch;