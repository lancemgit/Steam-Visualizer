import React from "react";
import {
    Card, Button, CardBody,
    CardTitle, CardText, Row, Col
} from 'reactstrap';
import GameListPieChart from "../GameListPieChart";

function UserMainCard(props) {
    return (
        <Card className="customCard">
            <CardBody>
                <Row>
                    <Col md="4" sm="12">
                        <img className="customImg userImg mx-auto d-block" src={props.avatar} alt="Avatar Img" ></img>
                        <h4 className="boldFont text-center">Level - {props.steamLevel}</h4>
                    </Col>
                    <Col md="8" sm="12">
                        <a href={props.profileUrl} target="_blank">
                            <CardTitle>
                                <h3 className="boldFont">
                                    {props.personaName} - {props.steamId}
                                </h3>
                            </CardTitle>
                        </a>
                        <br></br>
                        <CardText>
                            <h5>Profile Visibility - {props.communityVisibility}</h5>
                            <h5>Amount of Games Owned - {props.gameCount}</h5>
                            <h5>Amount of Friends on Friends List - {props.friendCount}</h5>
                        </CardText>
                    </Col>
                </Row>

                <hr className="customHr"></hr>
                <Row>
                    <Col md="12">
                        <CardTitle className="text-center">
                            <h3 className="boldFont">
                                Stats
                            </h3>
                        </CardTitle>
                    </Col>

                    <Col md="6" sm="12">
                        <h5 className="underlinedFont text-center">Playtime</h5>
                        {props.AboveOne === 0 && props.NoTime === 0 && props.SubOne === 0 ?
                            (<h5 className="text-center">
                                Game Data Not Available
                        </h5>)
                            :
                            (
                                <GameListPieChart
                                    NoTime={props.NoTime}
                                    SubOne={props.SubOne}
                                    AboveOne={props.AboveOne} />
                            )}

                    </Col>

                    <Col md="6" sm="12">
                        <h5 className="statsSection underlinedFont text-center">Game Count</h5>
                        {props.gameCount !== "Not Available" && props.gameCount ?
                            (<div className="text-center">
                                <h5 className="percentColor">
                                    {((Number(props.gameCount) / 51.256) * 100).toFixed(2)}%
                                </h5>
                                <p> of Global Game Amount Average</p>
                            </div>
                            )
                            :
                            (<h5 className="text-center">
                                Game Data Not Available
                                </h5>)}

                        <h5 className="statsSection underlinedFont text-center">Friend Count</h5>
                        {props.friendCount !== "Not Available" ?
                            (<div className="text-center">
                                <h5 className="percentColor">
                                    {((Number(props.friendCount) / 18.2) * 100).toFixed(2)}%
                                </h5>
                                <p> of Global Friend Amount Average</p>
                            </div>)
                            :
                            (<h5 className="text-center">
                                Friend Data Not Available
                                </h5>)}

                        <h5 className="statsSection underlinedFont text-center">Profile Views</h5>
                        <h5 className="text-center percentColor">{props.views}</h5>

                    </Col>
                </Row>
            </CardBody>
        </Card >
    )
}

export default UserMainCard;