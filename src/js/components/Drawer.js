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
        console.log(this.props.budgets);

        return (
            <div>
                <div style={{paddingTop: '1rem'}}>
                    <Link to="/">
                        <Logo height={60} width={200} color="black" />
                    </Link>
                </div>

                <ul className="list-inline">
                    {this.props.budgets.map(budget =>
                        <li key={budget.id}>
                            <Link
                                to={`/budgets/${budget.id}`}>
                                    {budget.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
