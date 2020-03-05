import React, { Component } from 'react';
import axios from 'axios';
import GameMainCard from '../utils/GameMainCard';
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap"
import BarTimeChart from '../utils/BarTimeChart';
import ComparisonTimeChart from '../utils/ComparisonTimeChart';
import FailedSearch from '../utils/FailedSearch';

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
        genre: null,
        user_search: "",
        user_time: null,
        user_fail: true,
        ccu_avg: null
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleUserSearch = () => {
        axios.get("/api/user/getgame/?id=" + this.state.user_search.trim() + "&gameid=" + this.state.appid).then((res) => {
            if (res.data.status) {
                this.setState({ user_fail: true });
            } else {
                this.setState({ user_fail: false, user_time: res.data.user_playtime_forever });
            }
        });
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            window.location.reload();
        }
    };

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (this.props.location.state) {
            axios.put("/api/game", { appids: [this.props.location.state.trim()] }).then((res) => {
                const game = res.data[0];
                if (res.data.status || res.data[0].appid === "Invalid AppID") {
                    this.setState({ status: 1 });
                } else {
                    if (user) {
                        user = user.id;
                    } else {
                        user = "";
                    }

                    let ownerSplit = game.owners.split(' ');
                    let ccuAvg = ((Number(ownerSplit[0].replace(/,/g, '')) + Number(ownerSplit[ownerSplit.length - 1].replace(/,/g, ''))) / 2);

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
                        user_search: user,
                        ccu_avg: ccuAvg
                    });
                }
            }).catch((err) => {
                this.setState({ status: 1 });
            });
        } else {
            this.setState({ status: 1 });
        }
    }

    render() {
        return (
            <div>
                {this.state.status === 2 ?
                    (<div></div>)
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
                                    owners={this.state.owners}
                                    averageForever={this.state.average_forever}
                                    average2Weeks={this.state.average_2weeks}
                                    medianForever={this.state.median_forever}
                                    median2Weeks={this.state.median_2weeks}
                                    ccu={this.state.ccu}
                                    genre={this.state.genre}
                                    steamLink={"steam://run/" + this.state.appid}
                                    positive={Number(this.state.positive)}
                                    negative={Number(this.state.negative)}
                                    ccuAvg={this.state.ccu_avg}
                                />

                                <br></br>
                                <br></br>
                                <br></br>

                                <Row>
                                    <Col md="6" sm="12">
                                        <h4 className="text-center underlinedFont">
                                            User Time Stats
                                        </h4>

                                        <Form onSubmit={e => { e.preventDefault(); }} className="text-center">
                                            <FormGroup>
                                                <Label for="user_search"></Label>
                                                <Input
                                                    className="customForm"
                                                    type="text"
                                                    name="user_search"
                                                    id="user_search"
                                                    placeholder="Steam64ID"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.user_search} />
                                            </FormGroup>
                                            <Button className="otherButtonColors customButton justify-content-center"
                                                onClick={this.handleUserSearch}>
                                                Compare Against User
                                                </Button>
                                        </Form>

                                        {!this.state.user_fail ?
                                            (<ComparisonTimeChart
                                                UserTime={this.state.user_time}
                                                GlobalTime={this.state.average_forever}
                                                chartName="Average Time (User VS. Global) (Min)" />)
                                            :
                                            (<div className="text-center">
                                                <br></br>
                                                Please Search for a Valid Steam64ID.
                                                </div>)}
                                    </Col>

                                    <Col md="6" sm="12">
                                        <h4 className="text-center underlinedFont">
                                            Global Time Stats
                                        </h4>
                                        <BarTimeChart
                                            Weeks2={this.state.median_2weeks}
                                            AllTime={this.state.median_forever}
                                            chartName="Median Playtime (Min)" />
                                        <BarTimeChart
                                            Weeks2={this.state.average_2weeks}
                                            AllTime={this.state.average_forever}
                                            chartName="Average Playtime (Min)" />
                                    </Col>
                                </Row>
                                <br></br>
                            </div>
                        )
                            :
                            (
                                <FailedSearch />
                            )}
                    </div>)}
            </div>
        )
    }
}

export default GameResult;