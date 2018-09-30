import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



class Leaderboard extends Component {

    constructor({props}){

        super();

    }

    componentDidMount(){

    }





    render() {

        return (
            <div>
                <h1>LEADERBOARD !!</h1>
            </div>
        );
    }


}

Leaderboard.propTypeps = {
    options: PropTypes.array


}
const mapStateToProps = (state) => {

    return {
        options:state.options

    }
}

export default connect(mapStateToProps)(Leaderboard);