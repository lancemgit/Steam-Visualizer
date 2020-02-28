import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap"

function UserRecentGames(props) {
    return (
        <Card>
            <Row>
                {props.games.map(game => {
                    if (game.appid !== "invalid appid") {
                        return (
                            <Col md="4" sm="12" key={game.appid}>
                                <img src={game.header_image} alt="" width="100%"></img>
                                <a href={game.appurl}>{game.name}</a>
                            </Col>
                        );
                    }
                })}
            </Row>
        </Card>
    )
}

export default UserRecentGames;