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
                        <Card className="customCard">
                            <CardBody>
                                <CardTitle>FAQ</CardTitle>
                                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                <CardText>Some quick questions about the app and why it was made.</CardText>
                                <Button>Github</Button>
                            </CardBody>
                        </Card>
                    </Col>


                    <Col md="3" sm="12">
                        <Card className="customCard">
                            <CardBody>
                                <CardTitle className="text-center">
                                    <h5>Top Profiles (Views)</h5>
                                </CardTitle>
                                <hr></hr>
                                {this.state.users ? (
                                    <div style={{ display: "grid" }}>
                                        <table stlye={{ width: "100%" }}>
                                            <tr>
                                                <th>Steam Name</th>
                                                <th>Views</th>
                                            </tr>
                                            {this.state.users.map(user => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <Link to={{
                                                                pathname: '/user',
                                                                state: user.steamid
                                                            }}>
                                                                {user.personaname}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {user.views}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                            }
                                        </table>
                                    </div>
                                )
                                    : (<div>Waiting</div>)}
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;