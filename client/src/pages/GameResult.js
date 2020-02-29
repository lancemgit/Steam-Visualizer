import React, { Component } from 'react';
import axios from 'axios';
import GameMainCard from '../utils/GameMainCard';
import GameReviewChart from '../utils/GameReviewChart';

class GameResult extends Component {

    state = {
        status: 2,
        app_name: null,
        appid: null,
        short_description: null,
        appurl: null,
        header_image: null,
        release_date: null,
        developer: null,
        publisher: null,
        positive: null,
        negative: null,
        owners: null,
        average_forever: null,
        average_2weeks: null,
        median_forever: null,
        median_2weeks: null,
        ccu: null,
        genre: null
    }

    componentDidMount() {
        if (this.props.location.state) {
            axios.put("/api/game", { appids: [this.props.location.state.trim()] }).then((res) => {
                const game = res.data[0];
                console.log(game);

                if (res.data.status || res.data[0].appid === "Invalid AppID") {
                    this.setState({ status: 1 });
                } else {
                    this.setState({
                        status: 3,
                        appid: game.appid,
                        app_name: game.name,
                        short_description: game.short_description,
                        appurl: game.appurl,
                        header_image: game.header_image,
                        release_date: game.release_date,
                        developer: game.developer,
                        publisher: game.publisher,
                        positive: game.positive,
                        negative: game.negative,
                        owners: game.owners,
                        average_forever: game.average_forever,
                        average_2weeks: game.average_2weeks,
                        median_forever: game.median_forever,
                        median_2weeks: game.median_2weeks,
                        ccu: game.ccu,
                        genre: game.genre,
                    });
                }
            }).catch((err) => {
                console.log(err);
                this.setState({ status: 1 });
            });;
        } else {
            this.setState({ status: 1 });
        }
    }

    render() {
        return (
            <div>
                {this.state.status === 2 ?
                    (<div>Waiting</div>)
                    :
                    (<div>
                        {this.state.status === 3 ? (
                            <div>
                                <GameMainCard
                                    headerImage={this.state.header_image}
                                    appUrl={this.state.appurl}
                                    appName={this.state.app_name}
                                    appId={this.state.appid}
                                    shortDescription={this.state.short_description}
                                    releaseDate={this.state.release_date}
                                    developer={this.state.developer}
                                    publisher={this.state.publisher}
                                    positive={this.state.positive}
                                    negatvie={this.state.negative}
                                    owners={this.state.owners}
                                    averageForever={this.state.average_forever}
                                    average2Weeks={this.state.average_2weeks}
                                    medianForever={this.state.median_forever}
                                    median2Weeks={this.state.median_2weeks}
                                    ccu={this.state.ccu}
                                    genre={this.state.genre}
                                />

                                <GameReviewChart
                                    positive={Number(this.state.positive)}
                                    negative={Number(this.state.negative)}
                                />
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                        )
                            :
                            (
                                <div>Bad Search</div>
                            )}
                    </div>)}
            </div>
        )
    }
}

export default GameResult;