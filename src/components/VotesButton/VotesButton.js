import React, { Component } from 'react';

class VotesButton extends Component {

    vote() {
        if(this.props.type === 'UP'){
            this.props.upMutation({
                variables: { newsId: this.props.newsId }
            })
        } else {
            this.props.downMutation({
                variables: { newsId: this.props.newsId }
            })
        }
    };

    render() {
        return (
            <button onClick={this.vote.bind(this)}>{this.props.type === 'UP' ? '+' : '-'}</button>
        )
    }
}

export default VotesButton;
