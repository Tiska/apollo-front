import React, { Component } from 'react';

class AddNews extends Component {
    
    constructor(){
        super();
        this.state = {
            showValidationMessage: false
        }
    }

    handleKeyUp (evt) {
        if (evt.keyCode === 13) {
            evt.persist();
            this.props.mutate({
                variables: { url: evt.target.value }
            })
            .then( res => {
                evt.target.value = '';
                this.setState({
                    showValidationMessage: true
                });
                setTimeout(() => {
                    this.setState({
                        showValidationMessage: false
                    });
                }, 2000);
            });
        }
    };

    render() {
        return (
            <div>
                <p>Add a new url</p>
                <input
                    type="text"
                    placeholder="New news"
                    onKeyUp={this.handleKeyUp.bind(this)}
                />
                <p style={this.state.showValidationMessage ? {} : { display: 'none' }} >News added with success</p>
            </div>
        )
    }
}

export default AddNews;
