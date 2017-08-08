import React, { Component } from 'react';

class AddNews extends Component {

    handleKeyUp (evt) {
        if (evt.keyCode === 13) {
            evt.persist();
            this.props.mutate({
                variables: { url: evt.target.value }
            })
                .then( res => {
                    evt.target.value = '';
                });
        }
    };

    render() {
        return (
            <input
                type="text"
                placeholder="New news"
                onKeyUp={this.handleKeyUp.bind(this)}
            />
        )
    }
}

export default AddNews;
