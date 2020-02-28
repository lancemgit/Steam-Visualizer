import React from "react";
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Row, Col
} from 'reactstrap';

function UserMainCard(props) {
    return (
        <Card>
            {console.log(props)}
            <Row>
                <CardBody>
                    <Col>
                        <img src={props.avatar} alt="Avatar Img"></img>
                    </Col>
                    <Col>
                        <CardTitle>{props.personaName}</CardTitle>
                        <CardText>
                            <div>id {props.steamId}</div>
                            <div>lvl {props.steamLevel}</div>
                            <div>visibility {props.communityVisibility}</div>
                            <div>game count {props.gameCount}</div>
                            <div>friend count {props.friendCount}</div>
                            <div>views {props.views}</div>
                        </CardText>
                        <a href={props.profileUrl}>
                            <Button>To Steam Community Page</Button>
                        </a>
                    </Col>
                </CardBody>
            </Row>
        </Card>
    )
}

export default UserMainCard;