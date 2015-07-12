import React, { Component, PropTypes } from 'react';
import fetch from '../utils/fetch';
import Errors from './Errors';
import Frame from './Frame';
import * as format from '../utils/format';

export default class Budget extends Component {
    static propTypes = {
        budgetId: PropTypes.string.isRequired
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
                    <h5>{this.renderBreadCrumb()}</h5>
                </div>

                {this.renderTable()}
            </div>
        );
    }

    renderBreadCrumb() {
        let crumb = this.state.data.budget.name;
        let selectedFrame = this.state.selectedFrame;

        if (selectedFrame) {
            crumb = (
                <div>
                    <a onClick={::this.clearSelectedFrame}style={{borderRight: '2px solid #ccc', paddingRight: '1rem', marginRight: '1rem'}}>{crumb}</a>
                    <span>{selectedFrame.id} {selectedFrame.name}</span>
                </div>
            );
        }

        return crumb;
    }

    clearSelectedFrame(event) {
        event.preventDefault();
        this.setState({selectedFrame: null});
    }

    renderTable() {
        if (this.state.selectedFrame) {
            return (
                <Frame budgetId={this.props.budgetId} frameId={this.state.selectedFrame.id} />
            );
        } else {
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
                                <td>{frame.revenue > 0 ? format.number(frame.revenue) : ''}</td>
                                <td>{frame.cost > 0 ? format.number(frame.cost) : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }

    fetchData() {
        fetch(`{
            budget(id: ${JSON.stringify(this.props.budgetId)}) {
                id
                name
                frames {
                    id
                    name
                    revenue
                    cost
                }
            }
        }`).then(::this.setState);
    }

    handleFrameClick(frame) {
        this.setState({selectedFrame: frame});
    }
}
