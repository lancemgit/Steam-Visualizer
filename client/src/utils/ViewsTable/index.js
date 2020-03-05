import React, { Component } from "react";
import {
    Card, CardBody,
    CardTitle, Col
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

class ViewsTable extends Component {

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
            <Col md="4" sm="12">
                <Card className="customCard">
                    <CardBody>
                        <CardTitle className="text-center">
                            <h5 className='boldFont'>Top Profiles (Views)</h5>
                        </CardTitle>
                        <hr className='customHr'></hr>
                        {this.state.users ? (
                            <div style={{ display: "grid" }}>
                                <table className="customTable">
                                    <tr>
                                        <th>Name</th>
                                        <th className="float-right">Views</th>
                                    </tr>
                                    {this.state.users.map(user => {
                                        return (
                                            <tr>
                                                <td>
                                                    <Link to={{
                                                        pathname: '/user/' + user.steamid,
                                                        state: user.steamid
                                                    }}>
                                                        {user.personaname}
                                                    </Link>
                                                </td>
                                                <td className="float-right">
                                                    {user.views}
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                </table>
                            </div>
                        )
                            : (<div></div>)}
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default ViewsTable;