import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CustomListItem from "./CustomListItem";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    rootCorrect: {
        width: '100%',
        maxWidth: 360,
        backgroundColor : 'green',
    },
    button: {
        rippleStyle: 'red'
    },
    focusVisible:{
        color:'red',
        rippleStyle: 'red'
    }
});



class VoteCard extends Component {

    constructor({props}){

        super(props);
        this.state = {
            selectedIndex: 1,
        };

        this.processAnswers = this.processAnswers.bind(this);
        this.createList = this.createList.bind(this);

    }

    componentDidMount(){

    }

    createList(collection){

        const {questionindex, dispatch, score} = this.props;

        let list = collection.map((i, index) =>
            <div>
            <CustomListItem score={score} dispatch={dispatch} data={i} questionindex={questionindex}
                onClick={event => this.handleListItemClick(event, i.correct)}
            >


            </CustomListItem>
            <Divider />
            </div>

        );


        return (<List>{list}</List>);

    }


    // correct and incorrect answers are not together so join the data and tag it correct/incorrect

    processAnswers(){

        let {datalist} = this.props;

        let correct = {
            answer: datalist.correct_answer,
            correct:true
        }

        let arr = [];
            datalist.incorrect_answers.forEach(function (val) {

            let obj  = {
                answer: val,
                correct:false
            }

            arr.push(obj);

        })

        let randomIndex = Math.floor(Math.random()*4);

        arr.splice(randomIndex, 0, correct);
        console.log("ret",arr);
        return arr;


    }




    render() {

        return (
            <div>
                <div>{this.createList(this.processAnswers())}</div>
            </div>
        );
    }


}

VoteCard.propTypes = {
    datalist: PropTypes.object,
    questionindex:PropTypes.number,
    dispatch:PropTypes.func,
    score:PropTypes.object


}


export default withStyles(styles)(VoteCard);