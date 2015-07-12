import React, { Component, PropTypes } from 'react';
import fetch from '../utils/fetch';
import Budget from './Budget';
import Logo from './Logo';
import Errors from './Errors';

export default class App extends Component {
    static childContextTypes = {
        muiTheme: PropTypes.object
    }

    state = {
        data: { budgets: [] },
    }

    componentDidMount() {
        fetch(`{
            budgets {
                id
                name
            }
        }`).then(::this.setState);
    }

    render() {
        return (
            <div>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                    <div className="mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                        <div style={{paddingTop: '1rem'}}><Logo height={60} width={200} /></div>
                        <nav className="mdl-navigation">
                            {this.state.data.budgets.map(b =>
                                <a key={b.id} className="mdl-navigation__link" onClick={this.handleSelectBudget.bind(this, b)} href="">{b.name}</a>
                            )}
                        </nav>
                    </div>

                    <main className="mdl-layout__content">
                        <div className="page-content">
                            {this.state.errors && <Errors errors={this.state.errors} />}
                            {this.state.selectedBudget ? <Budget budgetId={this.state.selectedBudget.id}/> : null}
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    handleSelectBudget(budget, event) {
        event.preventDefault();
        this.setState({selectedBudget: budget});
    }
}
