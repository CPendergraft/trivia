import React, {Component} from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {selectIndex,selectUpvote} from "../actions";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText";
import Sound from 'react-sound';


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


    class CustomListItem extends Component {

        constructor({props}){

            super(props);
            this.state = { url:require('../assets/win.mp3') }
            this.handleListItemClick = this.handleListItemClick.bind(this);

        }
        handleListItemClick(  data ){
            const {questionindex, dispatch,score} = this.props;
            let newScore = 1;

            newScore = newScore + score;



            if(data.correct){
                console.log("The Answer is Correct to question number: ",questionindex,' :', score, ' : ', data.answer );



                this.setState({url:require('../assets/win.mp3')});
                Sound.status.PLAYING = "PLAYING";

                dispatch(selectIndex( {index:questionindex+1, score: newScore}));

            }else{
                 this.setState({url:require('../assets/fail.mp3')});


                dispatch(selectIndex( {index:questionindex, score: score-.333}));
            }




        }
        componentDidMount(){

        }

       render(){
        const {data, score} = this.props;
        console.log("data", data);
        const {url} = this.state;


        return (


            <MuiThemeProvider theme={data.correct? themeCorrect:theme }>
                <ListItem onClick={()=> this.handleListItemClick(data)} button={true} >
                    <ListItemText primary={ <div  dangerouslySetInnerHTML={{__html: data.answer}} >

                    </div>} />

                    <Sound
                        url={url}
                        playStatus={Sound.status.PLAYING}
                        playFromPosition={300}
                        autoLoad={true}
                        volume="20"
                    />
                </ListItem>
            </MuiThemeProvider>
        );

        }
}
CustomListItem.propTypes = {
    data: PropTypes.object,
    questionindex:PropTypes.number,
    dispatch:PropTypes.func,
    score:PropTypes.object


}
export default CustomListItem;