import React, { Component } from 'react';
import VotesButtonConnector from './../VotesButton/VotesButtonConnector';
import styles from './NewsList.css';

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
                    <table className="darkTable">
                        <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Url</th>
                            <th>Votes</th>
                            <th>Up vote</th>
                            <th>Down Vote</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.props.data.news.concat().sort(this.props.compareNombres).map( news =>
                            <tr key={news.id}>
                                <td>{news.title}</td>
                                <td>{news.url}</td>
                                <td>{news.votes}</td>
                                <td><VotesButtonConnector type="UP" newsId={news.id} /></td>
                                <td><VotesButtonConnector type="DOWN" newsId={news.id} /></td>
                            </tr>
                        ) }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default NewsList;
