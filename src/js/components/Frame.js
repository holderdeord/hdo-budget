import React, { Component, PropTypes } from 'react';
import fetch from '../utils/fetch';
import Errors from './Errors';
import * as format from '../utils/format';

export default class Frame extends Component {
    static propTypes = {
        budgetId: PropTypes.string.isRequired,
        frameId: PropTypes.string.isRequired,
    }

    state = { errors: null, selectedChapter: null }

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
            <table className="mdl-data-table mdl-js-data-table">
                <thead>
                    <tr>
                        <th>Kapittel</th>
                        <th className="'mdl-data-table__cell--non-numeric'">Navn</th>
                        <th>Inntekter</th>
                        <th>Utgifter</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.budget.frame.chapters.map((chapter, i) => (
                        <tr key={i} onClick={this.handleChapterClick.bind(this, chapter)}>
                            <td>{chapter.id}</td>
                            <td>{chapter.name}</td>
                            <td>{chapter.revenue > 0 ? format.number(chapter.revenue) : ''}</td>
                            <td>{chapter.cost > 0 ? format.number(chapter.cost) : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    fetchData() {
        fetch(`{
            budget(id: ${JSON.stringify(this.props.budgetId)}) {
                id
                name

                frame(id: ${JSON.stringify(this.props.frameId)}) {
                    id
                    name

                    chapters {
                        id
                        name
                        revenue
                        cost
                        posts {
                            id
                            description
                            amount
                        }
                    }
                }
            }
        }`).then(::this.setState);
    }

    handleChapterClick(chapter) {
        this.setState({selectedChapter: chapter});
    }
}
