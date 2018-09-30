import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchTrivialistIfNeeded} from "../actions";
import Typography from "@material-ui/core/Typography";
import '../App.css';
import Sound from "react-sound";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {selectDifficulty} from '../actions'
import { BrowserRouter as Router } from 'react-router-dom'



class LevelSelector extends Component {

    constructor({props}){

        super();
        this.setDifficulty = this.setDifficulty.bind(this);

    }

    componentDidMount(){


    }

    setDifficulty(difficulty){
        const {dispatch, history} = this.props;

        if(dispatch){
            dispatch(selectDifficulty(difficulty));
        }

        history.push('/quiztime')

    }



    render() {

        const styles = theme => ({
            button: {
                margin: theme.spacing.unit,
            },
            input: {
                display: 'none',
            },
        });
        return (
            <div className="intro_bg">
                <div className="col_1" >

                </div>
                <div className="col_2" >
                    <img src="https://res.cloudinary.com/sickluggage-com/image/upload/v1538347292/triviaLogo.png" />
                    <div>
                        <Button color="primary" onClick={()=> this.setDifficulty('easy')} variant="contained" className={styles.button}>
                            Easy
                        </Button>
                        <Button color="primary" onClick={()=> this.setDifficulty('medium')}  variant="contained" className={styles.button}>
                            Medium
                        </Button>
                        <Button color="primary" onClick={()=> this.setDifficulty('hard')}  variant="contained" className={styles.button}>
                            Hard
                        </Button>

                    </div>




                </div>
                <div container className="col_3" >

                </div>
            </div>
        );
    }


}

LevelSelector.propTypeps = {
    options: PropTypes.array,
    selectIllustrations: PropTypes.string,
    classes: PropTypes.object.isRequired,
    dispatch:PropTypes.func


}
const mapStateToProps = (state) => {
    const { selectedTrivia, postsByTrivia, selectItem   } = state

    return {

        selectedTrivia,
        postsByTrivia,
        selectItem

    }
}

export default connect(mapStateToProps)(LevelSelector);