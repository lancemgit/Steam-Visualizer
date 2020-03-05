import React, { Component } from 'react';
import { Row } from 'reactstrap';
import HomeFAQ from '../utils/HomeFAQ';
import ViewsTable from '../utils/ViewsTable';

class Home extends Component {
    render() {

        return (
            <Row>
                <HomeFAQ />
                <ViewsTable />
            </Row>
        )
    }
}

export default Home;