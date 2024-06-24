import React, { Component, ChangeEvent } from 'react';
import './TodoApp.css';

interface Task {
    text: string;
    completed: boolean;
}

interface State {
    tasks: Task[];
    filter: 'All' | 'Completed' | 'Backlog';
    newTask: string;
}

class TodoApp extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tasks: [],
            filter: 'All',
            newTask: ''
        };
    }

    componentDidMount() {
        console.log('Component did mount');
    }

    componentDidUpdate(prevProps: {}, prevState: State) {
        if (prevState.tasks !== this.state.tasks || prevState.filter !== this.state.filter) {
            console.log('The task list or the selected filter has changed');
        }
    }

    inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newTask: event.target.value });
    };

    addTask = () => {
        if (this.state.newTask.trim() !== '') {
            this.setState((prevState) => ({
                tasks: [...prevState.tasks, { text: prevState.newTask, completed: false }],
                newTask: ''
            }));
        }
    };

    deleteTask = (index: number) => {
        this.setState(
            (prevState) => ({ tasks: prevState.tasks.filter((_, i) => i !== index) })
        );
    };

    switchTaskCompletion = (index: number) => {
        this.setState(
            (prevState) => ({ tasks: prevState.tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task) })
        );
    };

    changeFilter = (filter: 'All' | 'Completed' | 'Backlog') => {
        this.setState({ filter });
    };

    render() {
        const filteredTasks = this.state.tasks.filter(task => {
            if (this.state.filter === 'All') return true;
            if (this.state.filter === 'Completed') return task.completed;
            if (this.state.filter === 'Backlog') return !task.completed;
            return true;
        });

        return (
            <div className="todo-container">
                <h1>Task list</h1>
                <div className="todo-input-container">
                    <input
                        type="text"
                        value={this.state.newTask}
                        onChange={this.inputChange}
                        placeholder="Input new task"
                    />
                    <button onClick={this.addTask}>
                        Add task
                    </button>
                </div>
                <div className="filter-buttons">
                    <button
                        className={this.state.filter === 'All' ? 'active' : ''}
                        onClick={() => this.changeFilter('All')}
                    >
                        All tasks
                    </button>
                    <button
                        className={this.state.filter === 'Completed' ? 'active' : ''}
                        onClick={() => this.changeFilter('Completed')}
                    >
                        Completed tasks
                    </button>
                    <button
                        className={this.state.filter === 'Backlog' ? 'active' : ''}
                        onClick={() => this.changeFilter('Backlog')}
                    >
                        Backlog
                    </button>
                </div>
                <p>Click on the task name to mark completion</p>
                
                <ul className="todo-list">
                    {filteredTasks.map((task, index) => (
                        <li key={index}>
                            <span
                                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                                onClick={() => this.switchTaskCompletion(index)}
                            >
                                {task.text}
                            </span>
                            <button onClick={() => this.deleteTask(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoApp;
