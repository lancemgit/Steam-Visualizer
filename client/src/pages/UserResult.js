import React, { Component } from 'react';
import UserMainCard from '../utils/UserMainCard';
import UserRecentGames from '../utils/UserRecentGames';
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
        game_info: null
    }

    componentDidMount() {

        if (this.props.location.state) {
            axios.get("/api/user/?id=" + this.props.location.state).then((res) => {
                let data = res.data;
                console.log(res.data);
                if (data.status === "Invalid SteamID") {
                    this.setState({ status: "bad" });
                } else {
                    this.setState({
                        // Good status
                        status: 3,
                        steamid: data.user.steamid,
                        profileurl: data.user.profileurl,
                        steam_level: data.user.steam_level,
                        avatar: data.user.avatar,
                        communityvisibilitystate: data.user.communityvisibilitystate,
                        personaname: data.user.personaname,
                        games: data.user.games,
                        game_count: data.user.game_count,
                        friend_count: data.user.friend_count,
                        views: data.user.views,
                        game_info: data.gameInfo
                    });
                };
            }).catch((err) => {
                console.log(err);
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
                    (<div>Waiting</div>)
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
                                />
                                <UserRecentGames
                                    games={this.state.game_info}
                                />
                            </div>
                        )
                            :
                            (
                                <div>bad</div>
                            )}
                    </div>)}
            </div>
        )
    }
}

export default UserResult;