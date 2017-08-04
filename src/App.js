import React, { Component } from 'react';
import NewsList from './components/NewsList/NewsList';
import logo from './logo.svg';
import './App.css';

import {
    ApolloClient,
    gql,
    graphql,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo';
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql'
});
const client = new ApolloClient({
    networkInterface: networkInterface
});

const newsListQuery = gql`
   query {
     news {
       id
       title
       url
       votes
     }
   }
 `;
const NewsListWithData = graphql(newsListQuery)(NewsList);

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <NewsListWithData />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
