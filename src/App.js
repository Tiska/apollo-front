import React, { Component } from 'react';
import NewsListConnector from './components/NewsList/NewsListConnector';
import logo from './logo.svg';
import './App.css';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo';

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
                <NewsListConnector />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
