import React, { Component, PropTypes } from 'react';

export default class Errors extends Component {
    static propTypes = {
        errors: PropTypes.arrayOf(PropTypes.shape({
            message: PropTypes.string.isRequired
        })).isRequired
    }

    render() {
        return (
            <ul>
                {this.props.errors.map((e, i) =>
                    <li key={i}>
                        {e.message} @ {e.locations.map(({line, column}) => [line, column].join(':'))}
                    </li>
                )}
            </ul>
        );
    }
}
