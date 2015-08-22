import '../css/main.scss';

import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';
import App from './components/App';
import Budget from './components/Budget';
import Frame from './components/Frame';
import Chapter from './components/Chapter';

import { createStore, combineReducers } from 'redux';
import reducers from './reducers';

const initialState = {};
const store = createStore(
    combineReducers({
        router: routerStateReducer,
        test: (state, action) => {
            console.log('action', action);
            return state || null;
        },
        ...reducers}),
    initialState
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
