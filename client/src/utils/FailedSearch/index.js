import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Button, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';

function FailedSearch() {
    return (
        <Row>
            <Col md="12">
                <Card className="customCard text-center" style={{ height: "70vh" }}>
                    <CardBody>
                        <CardTitle>
                            <h2 className="fontBold">
                                Error</h2>
                        </CardTitle>
                        <CardSubtitle>
                            <h4>Incorrect Search</h4>
                        </CardSubtitle>
                    </CardBody>
                    <CardBody>
                        <CardText>
                            <h5>
                                Make sure the Steam64ID or AppID searched is a valid ID and has been inputted correctly.
                                </h5>
                        </CardText>
                        <br></br>
                        <Link to={{
                            pathname: '/'
                        }}><Button className="otherButtonColors customButton buttonSpacer">
                                Back Home
                    </Button>
                        </Link>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default FailedSearch;