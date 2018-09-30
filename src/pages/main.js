import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LevelSelector from '../hoc/LevelSelector';
import Leaderboard from '../hoc/Leaderboard';
import QuizView from '../hoc/QuizView';




const Main = () => (
    <main className="center_hold">
        <Switch>
            <Route exact path='/'  component={LevelSelector}    />
            <Route exact path='/quiztime'  component={QuizView}  />
            <Route exact path='/leaderboard'  component={Leaderboard}  />
        </Switch>
    </main>
)

export default Main