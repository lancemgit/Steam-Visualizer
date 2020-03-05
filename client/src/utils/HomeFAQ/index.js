import React from "react";
import {
    Card, Button, CardBody,
    CardTitle, CardText, Col
} from 'reactstrap';

function HomeFAQ() {
    return (
        <Col md="9" sm="12">
            <Card className="customCard">
                <CardBody>
                    <CardTitle className="text-center">
                        <h5 className="boldFont">
                            FAQ
                                    </h5>
                    </CardTitle>
                    <hr className='customHr'></hr>

                    <CardTitle className="text-center underlinedFont">
                        Overview
                                    </CardTitle>
                    <CardText>Steam Visualizer is an application that helps the user visualize the statistics associated with an account.
                        Multiple graphs and other statistics are generated through the data provided by the Steam Web API.  Global statistics
                        are provided by the SteamSpy API.
                                </CardText>
                    <br></br>

                    <CardTitle className="text-center underlinedFont">
                        How To
                                    </CardTitle>
                    <CardText>To use Steam Visualizer simply type in the Steam64ID of the user you want to look up, or the AppID of the game you want to lookup.
                        Logging In will automatically input your Steam64ID into the search field.  Make sure the profile you are searching is set to public visibility
                        to recieve the best result.
                                </CardText>
                    <br></br>

                    <CardTitle className="text-center underlinedFont">Logging In</CardTitle>
                    <CardText>When you login with your Steam account the only data provided to Steam Visualizer is publicly available information.  Steam Visualizer
                        does not recieve your Steam username or your Steam password.
                                </CardText>
                    <br></br>

                    <CardTitle className="text-center underlinedFont">Stored Data</CardTitle>
                    <CardText>When a user or game is searched the data that is presented on the screen is also stored in the database of Steam Visualizer.  None of this
                        data is private data.  All of the data is publicly available through the Steam Web API or through the SteamSpy API.
                                </CardText>
                    <br></br>

                    <CardTitle className="text-center underlinedFont">Links</CardTitle>
                    <CardText>The code of this application is openly available on GitHub.
                        If you would like to host this application locally then go the repository.
                                    Both my GitHub and LinkedIn are linked below.</CardText>
                    <div className="text-center">
                        <a href="https://github.com/lancemgit" target="_blank">
                            <Button className="customButton buttonSpacer otherButtonColors">Github</Button>
                        </a>
                        <a href="https://github.com/lancemgit/Steam-Visualizer" target="_blank">
                            <Button className="customButton buttonSpacer otherButtonColors">Repository</Button>
                        </a>
                        <a href="https://www.linkedin.com/in/lance-meara/" target="_blank">
                            <Button className="customButton buttonSpacer otherButtonColors">LinkedIn</Button>
                        </a>
                    </div>

                </CardBody>
            </Card>
        </Col>
    );
}

export default HomeFAQ;