import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import fetch from '../utils/fetch';
import Errors from './Errors';
import * as format from '../utils/format';

export default class Frame extends Component {
    static propTypes = {
        params: PropTypes.shape({
            budgetId: PropTypes.string.isRequired,
            frameId: PropTypes.string.isRequired,
        })
    }

    static contextTypes = {
        router: PropTypes.object
    }

    state = { errors: null }

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
                    <h5>
                        <Link to={`/budgets/${this.state.data.budget.id}`}>
                            {this.state.data.budget.name}
                        </Link> - {this.state.data.budget.frame.name}
                    </h5>
                </div>

                {this.renderTable()}
            </div>
        );
    }

    renderTable() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Kapittel</th>
                        <th>Navn</th>
                        <th>Inntekter</th>
                        <th>Utgifter</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.data.budget.frame.chapters.map((chapter, i) => (
                        <tr key={i} onClick={this.handleChapterClick.bind(this, chapter)}>
                            <td>{chapter.id}</td>
                            <td>{chapter.name}</td>
                            <td>{format.number(chapter.revenue)}</td>
                            <td>{format.number(chapter.cost)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    fetchData() {
        fetch(`
            query frameQuery($budgetId: String!, $frameId: String!) {
                budget(id: $budgetId) {
                    id
                    name

                    frame(id: $frameId) {
                        id
                        name

                        chapters {
                            id
                            name
                            revenue
                            cost
                        }
                    }
                }
            }`, this.props.params).then(::this.setState);
    }

    handleChapterClick(chapter, event) {
        event.preventDefault();
        const { budgetId, frameId } = this.props.params;

        this.context.router
            .transitionTo(`/budgets/${budgetId}/frames/${frameId}/chapters/${chapter.id}`);
    }
}
