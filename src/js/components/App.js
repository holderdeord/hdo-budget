import React, { Component, PropTypes } from 'react';
import mui from 'material-ui';
import superagent from 'superagent';

const {
    AppBar,
    Avatar,
    Card,
    CardHeader,
    LeftNav,
    MenuItem,
    Styles,
} = mui;
const ThemeManager = new Styles.ThemeManager();

export default class App extends Component {
    static childContextTypes = {
        muiTheme: PropTypes.object
    }

    state = {
        budgets: [],
        query: `budgets { name }`,
        data: { hello: 'world' }
    }

    getChildContext() {
        return { muiTheme: ThemeManager.getCurrentTheme() };
    }

    componentDidMount() {
    }

    render() {
        let menuItems = [
            { type: MenuItem.Types.SUBHEADER, text: 'Budsjetter' },
        ].concat(this.state.budgets.map(({id, name}) => ({ route: id, text: name })));

        return (
            <div>
                <div>
                    <AppBar
                      title="Budsjetter"
                      iconClassNameRight="muidocs-icon-navigation-expand-more"
                      onLeftIconButtonTouchTap={::this.handleMenuToggle} />

                     <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
                 </div>

                 <div>
                    <Card>
                        <CardHeader
                              title="GraphQL"
                              subtitle="Query"
                              avatar={<Avatar>Q</Avatar>}/>

                        <div style={{padding: '2rem'}}>
                            <textarea
                                style={{fontFamily: 'Consolas, monospace', fontSize: '1rem', height: '500px', width: '48%'}}
                                value={this.state.query}
                                onChange={::this.handleQueryChange}
                                onKeyUp={::this.handleKeyPress} />

                            <div style={{padding: '2rem'}}>
                                <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                            </div>
                        </div>

                    </Card>
                 </div>
            </div>
        );
    }

    handleQueryChange(e) {
        this.setState({query: e.target.value });
    }

    handleKeyPress(e) {
        if (e.ctrlKey && e.keyCode === 13) {
            e.preventDefault();

            superagent
                .post(`/query`)
                .send(this.state.query)
                .set('Content-Type', 'application/graphql')
                .end((err, res) => {
                    if (err) {
                        throw err;
                    } else {
                        this.setState({data: res.body});
                    }
                });
        }
    }

    handleMenuToggle() {
        this.refs.leftNav.toggle();
    }
}
