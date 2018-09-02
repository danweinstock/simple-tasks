import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarPlus, faClock } from '@fortawesome/free-regular-svg-icons';
import '../css/components/App.sass';

import Task from './Task';
import AddTaskForm from './AddTaskForm';

class App extends Component {
  constructor() {
    super();

    //font awesome
    library.add(faCalendarPlus, faClock);

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);


    this.state = {
      tasks: {},
      colors: [
        '#f1c40f',
        '#f8a5c2',
        '#81ecec',
        '#58B19F',
        '#f3a683',
        '#D6A2E8',
        '#f7d794',
        '#dfe6e9',
        '#f78fb3',
        '#a29bfe',
        '#f19066',
        '#596275',
        '#c44569',
        '#b8e994',
        '#f8c291',
        '#81ecec',
        '#ffeaa7',
        '#f1c40f',
        '#f8a5c2',
        '#81ecec',
        '#58B19F',
        '#f3a683',
        '#D6A2E8',
        '#f7d794',
        '#dfe6e9',
        '#f78fb3',
        '#a29bfe',
        '#f19066',
        '#596275',
        '#c44569',
        '#b8e994',
        '#f8c291',
        '#81ecec',
        '#ffeaa7'
      ]
    };
  }

  //**** when load the page get all tasks from local storage if case
  componentWillMount = () => {
    //Convert back to JS object, reading from LocalStorage
    const tasksFromLocalState = JSON.parse(localStorage.getItem('tasks'));
    //copy from local to state
    let tasks = Object.assign(this.state.tasks, tasksFromLocalState);
    //set state
    this.setState({
      tasks
    });
  };

  addTask = task => {
    //update state
    const tasks = { ...this.state.tasks };
    //add in new task
    const timestamp = Date.now(); //for unique key
    tasks[`task-${timestamp}`] = task; //this is the updated tasks but not yet set on state

    //set state and update local storage
    this.setState({ tasks }, this.saveToLocalStorage);
  };

  removeTask(key) {
    const tasks = {...this.state.tasks};
    delete tasks[key];
    this.setState({tasks});
  }

  saveToLocalStorage = () => {
    const tasks = this.state.tasks;
    //Convert it to String before saving to LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  render() {
    const tasks = this.state.tasks;
    let i = 0;
    return (
      <MuiThemeProvider>
        <div className="simple-tasks">
          <div className="container-tasks-list">
            {tasks
              ? Object.keys(tasks).map(key => (
                  <Task
                    key={key}
                    index={key}
                    taskBackgroundColor={this.state.colors[i++]}
                    taskName={tasks[key].name}
                    taskDuration={tasks[key].time}
                    removeTask={this.removeTask} 
                  />
                ))
              : null}
            <AddTaskForm addTask={this.addTask} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
