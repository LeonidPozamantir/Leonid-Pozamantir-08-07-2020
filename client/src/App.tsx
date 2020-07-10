import React from 'react';
import s from './App.module.css';
import Tasks from './components/Tasks';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className={s.app}>
        <div className={s.content}>
            <Switch>
                <Route path='/tasks' render={() => <Tasks />} />
                <Route path='*' render={() => <Redirect to={'/tasks'} />} />
            </Switch>
        </div>
        
    </div>
  );
}

export default App;
