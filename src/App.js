import React, { Component } from 'react';
import NewsListConnector from './components/NewsList/NewsListConnector';
import logo from './logo.svg';
import './App.css';

import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo';
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql'
});
const client = new ApolloClient({
    networkInterface: networkInterface
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
