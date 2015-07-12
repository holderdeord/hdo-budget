import React, { Component, PropTypes } from 'react';
import fetch from '../utils/fetch';
import Logo from './Logo';
import Errors from './Errors';
import { Link } from 'react-router';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.any
    }

    state = {
        data: { budgets: [] },
    }

    componentDidMount() {
        fetch(`{ budgets { id, name } }`).then(::this.setState);
    }

    render() {
        return (
            <div>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                    <div className="mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                        <div style={{paddingTop: '1rem'}}>
                            <Logo height={60} width={200} />
                        </div>

                        <nav className="mdl-navigation">
                            {this.state.data.budgets.map(budget =>
                                <Link
                                    key={budget.id}
                                    className="mdl-navigation__link"
                                    activeClassName="mdl-navigation__link--current"
                                    to={`/budgets/${budget.id}`}>
                                        {budget.name}
                                </Link>
                            )}
                        </nav>
                    </div>

                    <main className="mdl-layout__content">
                        <div className="page-content">
                            {this.state.errors && <Errors errors={this.state.errors} />}
                            {this.props.children &&
                              React.cloneElement(this.props.children, this.props)}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}
