import 'material-design-lite/material.css';
import '../css/main.scss';

import React from 'react';
import { Router, Route } from 'react-router';
import history from 'react-router/lib/BrowserHistory';

import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';
import App from './components/App';
import Budget from './components/Budget';
import Frame from './components/Frame';
import Chapter from './components/Chapter';

import { createStore, composeReducers } from 'redux';
import reducers from './reducers';

function promiseMiddleware() {
    return (next) => (action) => {
        const { promise, types, ...rest } = action;

        if (!promise) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;
        next({ ...rest, type: REQUEST });

        return promise.then(
            (result) => next({ ...rest, result, type: SUCCESS }),
            (error) => next({ ...rest, error, type: FAILURE })
        );
    };
}

const initialState = {};
const store = createStore(
    composeReducers({
        router: routerStateReducer,
        test: (state, action) => {
            console.log('action', action);
            return state;
        },
        ...reducers}),
    initialState,
    ({ getState }) => [ promiseMiddleware(getState) ]
);

React.render(
    <Router history={history}>
      <Route component={reduxRouteComponent(store)}>
        <Route path="/" component={App}>
            <Route path="budgets/:budgetId" component={Budget} />
            <Route path="budgets/:budgetId/frames/:frameId" component={Frame} />
            <Route path="budgets/:budgetId/frames/:frameId/chapters/:chapterId" component={Chapter} />
        </Route>
      </Route>
    </Router>,
    document.getElementById('root')
);
