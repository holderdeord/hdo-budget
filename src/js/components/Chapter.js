import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import fetch from '../utils/fetch';
import Errors from './Errors';
import * as format from '../utils/format';

export default class Chapter extends Component {
    static propTypes = {
        params: PropTypes.shape({
            budgetId: PropTypes.string.isRequired,
            frameId: PropTypes.string.isRequired,
            chapterId: PropTypes.string.isRequired,
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

        const data = this.state.data;

        return (
            <div style={{padding: '1rem'}}>
                <div>
                    <h5>
                        <Link to={`/budgets/${data.budget.id}`}>
                            {data.budget.name}
                        </Link>

                        <span> - </span>

                        <Link to={`/budgets/${data.budget.id}/frames/${data.budget.frame.id}`}>
                            {data.budget.frame.name}
                        </Link>

                        <span> - </span>

                        {data.budget.frame.chapter.name}
                    </h5>
                </div>

                {this.renderTable()}
            </div>
        );
    }

    renderTable() {
        console.log('Chapter.state', this.state);

        return (
            <table className="mdl-data-table mdl-js-data-table">
                <thead>
                    <tr>
                        <th>Post</th>
                        <th className="'mdl-data-table__cell--non-numeric'">Navn</th>
                        <th>Beløp</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.data.budget.frame.chapter.posts.map((post, i) => (
                        <tr key={i}>
                            <td>{post.id}</td>
                            <td>{post.description}</td>
                            <td>{post.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    fetchData() {
        fetch(`
            query chapterQuery($budgetId: String!, $frameId: String!, $chapterId: String!) {

                budget(id: $budgetId) {
                    id
                    name

                    frame(id: $frameId) {
                        id
                        name

                        chapter(id: $chapterId) {
                            id
                            name
                            posts {
                                id
                                description
                                amount
                            }
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
