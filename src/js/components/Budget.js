import React, { Component, PropTypes } from 'react';
import fetch from '../utils/fetch';
import Errors from './Errors';
import { Link } from 'react-router';
import * as format from '../utils/format';

export default class Budget extends Component {
    static propTypes = {
        params: PropTypes.shape({
            budgetId: PropTypes.string.isRequired
        }).isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    state = { errors: null, selectedFrame: null }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.fetchData();
        }
    }

    render() {
        if (this.state.errors) {
            return <Errors errors={this.state.errors} />;
        }

        if (!this.state.data) {
            return null;
        }

        return (
            <div style={{padding: '1rem'}}>
                <div>
                    <h5>{this.state.data.budget.name}</h5>
                </div>

                {this.renderTable()}
            </div>
        );
    }

    renderTable() {
        return (
            <table className="mdl-data-table mdl-js-data-table">
                <thead>
                    <tr>
                        <th>Rammeområde</th>
                        <th className="'mdl-data-table__cell--non-numeric'">Navn</th>
                        <th>Inntekter</th>
                        <th>Utgifter</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.budget.frames.map((frame, i) => (
                        <tr key={i} onClick={this.handleFrameClick.bind(this, frame)}>
                            <td>{frame.id}</td>
                            <td>{frame.name}</td>
                            <td>{format.number(frame.revenue)}</td>
                            <td>{format.number(frame.cost)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    fetchData() {
        fetch(
            `query budgetQuery($budgetId: String!) {
                budget(id: $budgetId) {
                    id
                    name
                    frames {
                        id
                        name
                        revenue
                        cost
                    }
                }
        }`, this.props.params).then(::this.setState);
    }

    handleFrameClick(frame, event) {
        event.preventDefault();
        const { budgetId } = this.props.params;

        this.context.router
            .transitionTo(`/budgets/${budgetId}/frames/${frame.id}`);
    }
}
