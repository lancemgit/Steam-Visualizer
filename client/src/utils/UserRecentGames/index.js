import React from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom";

const UserRecentGames = (props) => {
    return (
        <Card className="customCard">
            <CardBody>
                {props.games ? (<Row>
                    <Col md='12' className="sectionSpacer">
                        <CardTitle>
                            <h4 className='text-center'>Recently Played Games (Past 2 Weeks)</h4>
                        </CardTitle>
                    </Col>
                    {props.games.map(game => {
                        if (game.appid !== "invalid appid") {
                            return (

                                <Col md="4" sm="12" key={game.appid}>
                                    <Link to={{
                                        pathname: '/game',
                                        state: String(game.appid)
                                    }}>
                                        <img className="customImg" src={game.header_image} alt="Recent Game Img" width="100%"></img>
                                        <p className="text-center">{game.name}</p>
                                    </Link>
                                </Col>
                            );
                        }
                    })}</Row>)
                    :
                    (<div className="text-center">No Recently Played Games (Past 2 Weeks)</div>)}
            </CardBody>
        </Card>
    )
}

export default UserRecentGames;