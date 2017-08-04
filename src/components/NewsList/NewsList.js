import React, { Component } from 'react';

class NewsList extends Component {
    render() {
        if (this.props.data.loading) {
            return <p>Loading ...</p>;
        }
        if (this.props.data.error) {
            return <p>{this.props.data.error.message}</p>;
        }
        if (this.props.data.news) {
            return <ul>
                { this.props.data.news.map( news => <li key={news.id}>{news.title} {news.url} {news.votes}</li> ) }
            </ul>;
        }
    }
}

export default NewsList;
