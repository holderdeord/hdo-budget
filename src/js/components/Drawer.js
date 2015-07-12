import React, { Component, PropTypes } from 'react';
import Logo from './Logo';
import { Link } from 'react-router';

export default class Drawer extends Component {
    static propTypes = {
        budgets: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequierd,
            name: PropTypes.string.isRequired,
        })).isRequired
    }

    render() {
        return (
            <div className="mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <div style={{paddingTop: '1rem'}}>
                    <Logo height={60} width={200} />
                </div>

                <nav className="mdl-navigation">
                    {this.props.budgets.map(budget =>
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
        );
    }
}
