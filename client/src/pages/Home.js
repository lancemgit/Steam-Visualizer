import React, { Component } from 'react';
import UserSearch from "../utils/UserSearch";
import GameSearch from "../utils/GameSearch";

class Home extends Component {


    render() {
        return (
            <div>
                <div>Home</div>
                <UserSearch></UserSearch>
                <GameSearch></GameSearch>
            </div>
        )
    }
}

export default Home;