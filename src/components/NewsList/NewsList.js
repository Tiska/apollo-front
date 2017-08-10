import React, { Component } from 'react';
import AddNewsConnector from './../AddNews/AddNewsConnector';

class NewsList extends Component {

    componentWillMount() {
        this.props.subscribeToNewNews();
    }

    render() {
        if (this.props.data.loading) {
            return <p>Loading ...</p>;
        }
        if (this.props.data.error) {
            return <p>{this.props.data.error.message}</p>;
        }
        if (this.props.data.news) {
            return (
                <div>
                    <AddNewsConnector />
                    <ul>
                        { this.props.data.news.map( news => <li key={news.id}>{news.title} {news.url} {news.votes}</li> ) }
                    </ul>
                </div>
            )
        }
    }
}

export default NewsList;
