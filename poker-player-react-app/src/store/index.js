import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger'

import {loginCredentialsReducer,
        usersReducer,
        usersAccountsHistoryReducer,
        usersMoneyTransactionsHistoryReducer,
        gamesReducer,
        gamesActivityHistoryReducer
    } from "./reducers"

import logsReducer from './reducers/logs'
import tableReducer from './reducers/table'
import seatsReducer from './reducers/seats'
import playersReducer from './reducers/players'
import transactionsReducer from './reducers/transactions'
import operationsReducer from './reducers/operations';
import playerReducer from './reducers/player';

import socketEpic from './epics/socket'
import playersEpic from './epics/players'
import adminEpic from './epics/admin'

import * as actions from './actions';
import * as selectors from './selectors';
export { actions, selectors};

export default () => {
    const appReducers = combineReducers({
        admin: loginCredentialsReducer,//To receive Login User Credentials.
        users: usersReducer,
        usersAccountsHistory: usersAccountsHistoryReducer,
        usersMoneyTransactionsHistory:usersMoneyTransactionsHistoryReducer,
        games: gamesReducer,
        gamesActivityHistory: gamesActivityHistoryReducer,
        player: playerReducer,
        logs: logsReducer,
        table: tableReducer,
        seats: seatsReducer,
        players: playersReducer,
        transactions: transactionsReducer,
        operations: operationsReducer,
    })
    
    const appEpics = combineEpics(socketEpic, playersEpic, adminEpic)

    var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    var epicMiddleware = createEpicMiddleware();

    var store = createStore(appReducers, {}, composeEnhancers(applyMiddleware(epicMiddleware, logger)));
    epicMiddleware.run(appEpics);

    return {
        store,
        appReducers,
        appEpics
    }
}