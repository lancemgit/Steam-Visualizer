import React from "react";
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Row, Col
} from 'reactstrap';

function GameMainCard(props) {


    return (
        <Card>
            {console.log(props)}
            <Row>
                <CardBody>
                    <Col>
                        <img src={props.headerImage} alt="Avatar Img"></img>
                    </Col>
                    <Col>
                        <a href={props.appUrl}>
                            <CardTitle>
                                {props.appName} - {props.appId}
                            </CardTitle>
                        </a>
                        <CardText>
                            <div>short desc {props.shortDescription}</div>
                            <div>release {props.releaseDate}</div>
                            <div>dev {props.developer}</div>
                            <div>publisher {props.publisher}</div>
                            <div>positive-negative {props.positive}-{props.negative}</div>
                            <div>owners {props.owners}</div>
                            <div>average f {props.averageForever}</div>
                            <div>average 2 {props.average2Weeks}</div>
                            <div>median f {props.medianForever}</div>
                            <div>median 2 {props.median2Weeks}</div>
                            <div>ccu {props.ccu}</div>
                            <div>genre {props.genre}</div>
                        </CardText>
                    </Col>
                </CardBody>
            </Row>
        </Card>
    )
}

export default GameMainCard;