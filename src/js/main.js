import '../css/main.scss';
import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    return (
      <h1>Hei budsjett!</h1>
    );
  }
}

React.render(<App />, document.getElementById('root'));
