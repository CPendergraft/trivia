import React, {Component} from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import VoteCard from "./VoteCard";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiListItem: {
            // Name of the rule
            root: {
                // Some CSS
                background: 'red',
                height:0,
                overflow:"hidden",
                opacity:0,
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


class CustomListCardItem extends Component {

        constructor({props}){

            super(props);



        }

        componentDidMount(){

        }

       render(){

       const {data,questionindex,currentindex,dispatch, score} = this.props;

       const styles = {
           root: {
               minWidth: 275,
               maxWidth:600,
               height:0,
               overflow:'hidden'
           },
           rootactive: {
               minWidth: 275,
               maxWidth:600,
               height:220
           },

           bullet: {
               display: 'inline-block',
               margin: '0 2px',
               transform: 'scale(0.8)',
           },
           title: {
               marginBottom: 16,
               fontSize: 14,
           },
           pos: {
               marginBottom: 12,
           },
       };
        let htm = (<h2>data.question</h2>)


        return (
        <MuiThemeProvider  theme={questionindex===currentindex? themeCorrect:theme }>
            <ListItem classes="{{root: {}" >
                <Card key={questionindex}  >
                    <CardContent className="item_hide">
                        <h2>
                        <div  dangerouslySetInnerHTML={{__html: data.question}}   className={styles.title}  >

                        </div>
                        </h2>
                        <VoteCard  score={score} dispatch={dispatch} questionindex={questionindex} datalist={data} />
                    </CardContent>
                    <CardActions>
                        <Button size="small">question number {questionindex+1} of 20</Button>
                    </CardActions>
                </Card>
            </ListItem>
        </MuiThemeProvider>
    );}
}
CustomListCardItem.propTypes = {
    data: PropTypes.object,
    questionindex:PropTypes.number,
    currentindex:PropTypes.object,
    dispatch:PropTypes.func,
    score:PropTypes.object

}
export default CustomListCardItem;