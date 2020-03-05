import React from "react";
import {
    Card, Button, CardBody,
    CardTitle, CardText, Row, Col
} from 'reactstrap';
import GameReviewChart from '../GameReviewChart';


function GameMainCard(props) {


    return (
        <Card className="customCard">
            <CardBody>
                <Row>
                    <Col md="6" sm="12" className="text-center">
                        <img className="customImg" src={props.headerImage} alt="Game Img" width="100%"></img>
                        <br></br>
                        <a href={props.steamLink}>
                            <Button className="customButton otherButtonColors buttonSpacer2">Launch the Game</Button>
                        </a>
                    </Col>
                    <Col md="6" sm="12">
                        <CardTitle>
                            <a className="gameImg" href={props.appUrl} target="_blank">
                                <h3>
                                    {props.appName} - {props.appId}
                                </h3>
                            </a>
                            <div className="text-muted">{props.releaseDate}</div>
                            <div className="text-muted">{props.genre}</div>
                        </CardTitle>
                        <br></br>
                        <CardText>
                            <div>{props.shortDescription}</div>
                            <br></br>
                            <div>Publisher - {props.publisher}</div>
                            <div>Developer - {props.developer}</div>
                            <div>Copies Sold - {props.owners}</div>
                            <div>Concurrent Players - {props.ccu}</div>
                        </CardText>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <hr className="customHr"></hr>
                <Row>
                    <Col md="12">
                        <h4 className="boldFont text-center">
                            Reviews
                            </h4>
                    </Col>
                    <Col md='12'>
                        <GameReviewChart
                            positive={props.positive}
                            negative={props.negative}
                        />
                    </Col>
                </Row>

                <hr className="customHr"></hr>
                <Row>
                    <Col md="12">
                        <h4 className="boldFont text-center">
                            Owner Stats
                            </h4>
                    </Col>
                    <Col md='6' sm='12'>
                        <div className="text-center">
                            <h5 className="underlinedFont">Concurrent Players</h5>
                            <h5 className="percentColor">{((Number(props.ccu) / 16200000) * 100).toFixed(5)}%</h5>
                            <p>Currently Online Steam Users Playing</p>
                        </div>
                    </Col>

                    <Col md='6' sm='12'>
                        <div className="text-center">
                            <h5 className="underlinedFont">Total Owners</h5>
                            <h5 className="percentColor">{
                                (props.ccuAvg / 1000000000).toFixed(5)
                            }%</h5>
                            <p>Of The Steam User Base Owns This Game</p>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default GameMainCard;