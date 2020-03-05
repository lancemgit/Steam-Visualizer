import React, { Component } from 'react';
import UserMainCard from '../utils/UserMainCard';
import UserRecentGames from '../utils/UserRecentGames';
import FailedSearch from '../utils/FailedSearch';
import axios from 'axios';

class UserResult extends Component {

    state = {
        status: 2,
        steamid: null,
        profileurl: null,
        steam_level: null,
        avatar: null,
        communityvisibilitystate: null,
        personaname: null,
        games: null,
        game_count: null,
        friend_count: null,
        views: null,
        game_info: null,
        noTime: null,
        oneHour: null,
        aboveOneHour: null
    }

    componentDidMount() {
        if (this.props.location.state) {
            axios.get("/api/user/?id=" + this.props.location.state.trim()).then((res) => {
                let data = res.data;
                if (data.user.status === "Invalid SteamID") {
                    this.setState({ status: 1 });
                } else {
                    let visibility = res.data.communityvisibilitystate
                    if (visibility === 3) {
                        visibility = "Public";
                    } else if (visibility === 2) {
                        visibility = "Friends-Only";
                    } else {
                        visibility = "Public";
                    }

                    this.setState({
                        // Good status
                        status: 3,
                        steamid: data.user.steamid,
                        profileurl: data.user.profileurl,
                        steam_level: data.user.steam_level,
                        avatar: data.user.avatar,
                        communityvisibilitystate: visibility,
                        personaname: data.user.personaname,
                        games: data.user.games,
                        game_count: data.user.game_count,
                        friend_count: data.user.friend_count,
                        views: data.user.views,
                        game_info: data.gameInfo,
                        noTime: data.gameList.noTime,
                        oneHour: data.gameList.oneHour,
                        aboveOneHour: data.gameList.aboveOneHour
                    });
                };
            }).catch((err) => {
                this.setState({ status: 1 });
            });
        } else {
            // Bad status
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
                                < UserMainCard
                                    personaName={this.state.personaname}
                                    avatar={this.state.avatar}
                                    steamId={this.state.steamid}
                                    profileUrl={this.state.profileurl}
                                    steamLevel={this.state.steam_level}
                                    communityVisibility={this.state.communityvisibilitystate}
                                    gameCount={this.state.game_count}
                                    friendCount={this.state.friend_count}
                                    views={this.state.views}
                                    NoTime={this.state.noTime}
                                    SubOne={this.state.oneHour}
                                    AboveOne={this.state.aboveOneHour}
                                />
                                <UserRecentGames
                                    games={this.state.game_info}
                                />
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

export default UserResult;