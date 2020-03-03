import React, { Component } from 'react';
import UserSearch from "../utils/UserSearch";
import GameSearch from "../utils/GameSearch";
import axios from 'axios';
import { Link } from "react-router-dom";
import {
    Card, Button, CardBody,
    CardTitle, CardText, Row, Col
} from 'reactstrap';

class Home extends Component {

    state = {
        users: null
    }

    componentDidMount() {
        axios.get("/api/user/views").then((res) => {
            console.log(res.data);

            this.setState({ users: res.data });
        });
    }


    render() {
        return (
            <div>
                <UserSearch></UserSearch>
                <GameSearch></GameSearch>
                <Row>
                    <Col md="9" sm="12">
                        <Card>
                            <CardBody>
                                <CardTitle>FAQ</CardTitle>
                                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                <CardText>Some quick questions about the app and why it was made.</CardText>
                                <Button>Github</Button>
                            </CardBody>
                        </Card>
                    </Col>


                    <Col md="3" sm="12">
                        {this.state.users ? (
                            this.state.users.map(user => {
                                console.log(user);
                                return (
                                    <div>
                                        <Link to={{
                                            pathname: '/user',
                                            state: user.steamid
                                        }}>
                                            {user.personaname} - {user.views}
                                        </Link>
                                    </div>
                                );
                            })
                        )
                            : (<div>Waiting</div>)}
                    </Col>
                </Row>


            </div>
        )
    }
}

export default Home;