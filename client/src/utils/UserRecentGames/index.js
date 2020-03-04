import React from "react";
import { Row, Col, Card } from "reactstrap"

const UserRecentGames = (props) => {
    return (
        <Card className="customCard">
            <Row>
                {props.games ? (<div>{props.games.map(game => {
                    if (game.appid !== "invalid appid") {
                        return (
                            <Col md="4" sm="12" key={game.appid}>
                                <img src={game.header_image} alt="" width="100%"></img>
                                <a href={game.appurl}>{game.name}</a>
                            </Col>
                        );
                    }
                })}</div>)
                    :
                    (<div>Not Available</div>)}
            </Row>
        </Card>
    )
}

export default UserRecentGames;