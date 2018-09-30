import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchEasyTrivialistIfNeeded,
    fetchMediumTrivialistIfNeeded,
    fetchHardTrivialistIfNeeded,
    selectIndex,
    invalidateTrivialist,
    selectUpvote, receiveTrivialist
} from "../actions";
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";
import {createMuiTheme} from "@material-ui/core/styles";
import CustomListCardItem from "../components/CustomListCardItem";
import Sound from "react-sound";
import Grid from '@material-ui/core/Grid';
import CardContent from "@material-ui/core/CardContent";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiListItem: {
            // Name of the rule
            root: {
                // Some CSS
                background: 'white',
                color:"red"
            },
        },
    },
});
const themeCorrect = createMuiTheme({
    overrides: {

        MuiListItem: {

            root: {
                // Some CSS
                background: 'white',
                color:"green"
            },
        },
    },
});

class QuizView extends Component {

    constructor({props}){

        super();
        this.state = {
            selectedIndex: 1,
            url:require('../assets/inceptionbutton.mp3')
        };

        this.processQuestions = this.processQuestions.bind(this);
        this.replay = this.replay.bind(this);


    }
    replay(){
        const {history,dispatch} = this.props;
        dispatch(selectIndex({index:0, score:0}));
        dispatch(invalidateTrivialist( ))
        history.push('/');
    }
    componentDidMount(){
        const { dispatch, selectedTrivia, selectedDifficulty, score } = this.props;


        switch(selectedDifficulty.difficulty){
            case 'easy':
                    dispatch(fetchEasyTrivialistIfNeeded(selectedTrivia));
                break;
            case 'medium':
                    dispatch(fetchMediumTrivialistIfNeeded(selectedTrivia));
                break;
            case 'hard':
                    dispatch(fetchHardTrivialistIfNeeded(selectedTrivia));
                break;
        }


        dispatch(selectIndex({index:0, score:0}));


    }

    processQuestions( ){

        const {questions,dispatch, selectedIndex } = this.props;

        let payload = questions.items;
        let newscore = 0;
        let currentindex = 0;

        if(selectedIndex.selectedIndex!=undefined){
            currentindex =selectedIndex.selectedIndex.index;
            newscore = selectedIndex.selectedIndex.score;

        }

        let rewr = payload[currentindex];
        console.log('currentindex newscore', newscore);
        let list =(<div></div>);

        if(rewr){
            list =  (
                <CustomListCardItem
                    key={currentindex.toString()}
                    data={payload[currentindex]}
                    questionindex={currentindex}
                    currentindex={currentindex}
                    dispatch={dispatch}
                    score={newscore}
                ></CustomListCardItem>

            );
        }



        return (<div>{list}</div>);
    }



    render() {
        Sound.status.PLAYING = "STOPPED";
        const {questions, selectedIndex, score, history} = this.props;
        const {url} = this.state;

        let msg = " ";
        let msg2 = "Good Job!";
        let showScore= false;
        if(selectedIndex.selectedIndex){
            let index = selectedIndex.selectedIndex.index;
            let index2 = questions.items.length;

            if( index == index2 && index!==0 ){
                showScore = true;
                Sound.status.PLAYING = "PLAYING";
                msg = (100*((selectedIndex.selectedIndex.score)/(selectedIndex.selectedIndex.index)));
                if(msg>80){
                    msg2 = "EXCELLENT!";
                }
                if(msg<70){
                    msg2 = "Come ON!!!!!";
                }
                if(msg<69){
                    msg2 = "FAIL!!!!";
                }
            }



        }
        const styles = theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                height: 140,
                width: 100,
            },
            control: {
                padding: theme.spacing.unit * 2,
            },
        });
        return (
            <div className="quiz_bg" >
                <Grid container className={styles.root} spacing={16}>
                    <Grid item xs={12}>
                        {score && <div className="no_margin" >{this.processQuestions( )}</div>}
                    </Grid>
                </Grid>



                {showScore &&<div className="leaderboard">
                    <Card   >
                        <CardContent className="item_hide">
                            <Typography variant="headline">
                                {msg2}
                            </Typography>
                            <Typography variant="headline" >
                                {msg } %
                            </Typography>
                            <CardActions>
                                <Button onClick={()=> this.replay()} size="small">Play Again</Button>
                            </CardActions>
                        </CardContent>

                    </Card>

                </div>
                }
            </div>
        );
    }


}

QuizView.propTypes = {
    questions: PropTypes.object,
    dispatch: PropTypes.func,
    selectedIndex:PropTypes.object,
    selectedDifficulty:PropTypes.object,
    score:PropTypes.object


}
QuizView.defaultProps = {
    selectedIndex:0
};

const mapStateToProps = (state) => {

    return {
        questions: state.posts,
        selectedIndex: state.selectIndex,
        selectedDifficulty: state.selectDifficulty,
        score:state.selectUpvote
    }
}

export default  connect(mapStateToProps)(QuizView);