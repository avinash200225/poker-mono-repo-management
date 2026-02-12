import React, {useEffect} from 'react'
import {Route} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {preventZoom} from "./util";

import socketActions from "./store/actions/socket";

import TablePage from './pages/TablePage'
import AppTopbarFn from './AppTopbarFn';

const App = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        preventZoom();
        dispatch(socketActions.socket.request());
    }, []);

    return (
        <div>
            <AppTopbarFn/>
            <Route path="/" exact
                render={
                    () => (
                        <TablePage></TablePage>
                    )
                }/>
        </div>
    );
}

export default App;
