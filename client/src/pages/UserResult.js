import React, { Component } from 'react';

class UserResult extends Component {

    componentDidMount() {
        console.log(this.props.location);
    }

    render() {
        return (
            <div>User

            </div>
        )
    }
}

export default UserResult;