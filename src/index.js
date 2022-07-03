import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
    titleChanged,
    taskDeleted, 
    completeTask,
    createTask,
    loadTasks,
    getLTasksLoadingStatus,
    getTasks
} from "./store/task";
import configureStore from './store/store';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getError } from './store/errors';

const store = configureStore();
const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getLTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTasks());
    }, []);
    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    const addNewTask = () => {
        dispatch(createTask({
            userId: 1,
            title: "some title",
            completed: "false"
        }))
    };
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <>
            <h1>App</h1>
            <button onClick={() => addNewTask()}>Add task</button>
            <ul>
                {state.map(el => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Complete: ${el.completed}`}</p>
                        <button
                            onClick={() => dispatch(completeTask(el.id))}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => changeTitle(el.id)}
                        >
                            changeTitle
                        </button>
                        <button
                            onClick={() => deleteTask(el.id)}
                        >
                            Delete
                        </button>
                        <hr></hr>
                    </li>
                ))}
            </ul>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

