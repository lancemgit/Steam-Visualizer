import React, { Component } from 'react';
import UserSearch from "../utils/UserSearch";
import GameSearch from "../utils/GameSearch";
import { Row } from 'reactstrap';
import HomeFAQ from '../utils/HomeFAQ';
import ViewsTable from '../utils/ViewsTable';

class Home extends Component {
    render() {
        return (
            <div>
                <Row>
                    <UserSearch></UserSearch>
                    <GameSearch></GameSearch>
                </Row>
                <br></br>
                <Row>
                    <HomeFAQ />
                    <ViewsTable />
                </Row>
            </div>
        )
    }
}

export default Home;