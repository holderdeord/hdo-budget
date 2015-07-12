import React, { Component, PropTypes } from 'react';
import fetch from '../utils/fetch';
import Errors from './Errors';
import Drawer from './Drawer';

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
                    <Drawer budgets={this.state.data.budgets} />

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
