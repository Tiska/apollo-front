import React, { Component } from 'react';
import NewsListConnector from './components/NewsList/NewsListConnector';
import AddNewsConnector from './components/AddNews/AddNewsConnector';
import logo from './logo.svg';
import './App.css';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:4000/graphql'
});
const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
    reconnect: true,
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);
const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <Router>
                    <div>
                        <ul>
                            <li><Link to="/">Add News</Link></li>
                            <li><Link to="/news">News</Link></li>
                        </ul>

                        <hr/>

                        <Route exact path="/" component={AddNewsConnector}/>
                        <Route path="/news" component={NewsListConnector}/>
                    </div>
                </Router>
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
