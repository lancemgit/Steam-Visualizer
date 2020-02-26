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
            <div>
                <Form className="text-center">
                    <FormGroup>

                        <Label for="userSearch"></Label>
                        <Input type="text" name="userSearch" id="userSearch" placeholder="Steam64ID" onChange={this.handleInputChange} value={this.state.search} />
                    </FormGroup>

                    <Button className="justify-content-center" onClick={this.handleUserSearch}><Link to={{
                        pathname: '/user',
                        state: this.state.userSearch
                    }}>Search</Link></Button>
                </Form>
            </div>
        );
    }
}

export default GameSearch;