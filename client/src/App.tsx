import React from 'react';
import s from './App.module.css';
import Tasks from './components/Tasks/Tasks';
import { Switch, Route, Redirect } from 'react-router-dom';
import NewTask from './components/TaskForm/NewTask';
import EditTask from './components/TaskForm/EditTask';
import ViewTask from './components/ViewTask/ViewTask';

function App() {
  return (
    <div className={s.app}>
        <div className={s.content}>
            <Switch>
                <Route path='/tasks' render={() => <Tasks />} />
                <Route path='/new-task' render={() => <NewTask />} />
                <Route path='/edit-task/:id' render={() => <EditTask />} />
                <Route path='/task/:id' render={() => <ViewTask />} />
                <Route path='*' render={() => <Redirect to={'/tasks'} />} />
            </Switch>
        </div>
        
    </div>
  );
}

export default App;
