'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var axios = require('axios');

var ElectionForm = React.createClass({

    propTypes: {
        name:                   ReactPropTypes.string,
        description:            ReactPropTypes.string,
        urlHandle:              ReactPropTypes.string,
        start:                  ReactPropTypes.string,
        end:                    ReactPropTypes.string,
        privacyStrategy:        ReactPropTypes.bool,
        randomizeAnswerOrder:   ReactPropTypes.bool,
        twoFactorAuth:          ReactPropTypes.bool,
        forceTwoFactorAuth:     ReactPropTypes.bool,
        locked:                 ReactPropTypes.bool,
        timed:                  ReactPropTypes.bool,
        acceptingVotes:         ReactPropTypes.bool
    },

    contextTypes: {
        router: React.PropTypes.func
    },

    submitNewElection: function(e) {
        e.preventDefault();

        this.props = {
            name:                   React.findDOMNode(this.refs.name).value.trim(),
            description:            React.findDOMNode(this.refs.description).value.trim(),
            url_handle:             React.findDOMNode(this.refs.url_handle).value.trim(),
            start:                  React.findDOMNode(this.refs.start).value,
            end:                    React.findDOMNode(this.refs.end).value,
            privacy_strategy:       React.findDOMNode(this.refs.privacy_strategy).value,
            randomize_answer_order: React.findDOMNode(this.refs.randomize_answer_order).value,
            two_factor_auth:        React.findDOMNode(this.refs.two_factor_auth).value,
            force_two_factor_auth:  React.findDOMNode(this.refs.force_two_factor_auth).value,
            timed:                  React.findDOMNode(this.refs.timed).value,
            accepting_votes:        React.findDOMNode(this.refs.accepting_votes).value
        };

        var elections = this.state.data;
        elections.push(election);

        this.setState({data: elections}, function() {
            axios.post('/', election)
                .then(function(res) {
                    this.setState({data: res});
                });
        });

        this.context.router.transitionTo('electionAdmin');
    },

    render: function() {
        return (
            <form className='election-form' onSubmit={this.handleSubmit}>
                <h1>Create New Election</h1>

                <h3>Election Name</h3>
                <input type='text' placeholder='Enter a name for the election' ref='name' />

                <h3>Description</h3>
                <textarea rows='4' cols='70' className='description-field' placeholder='Enter a detailed description of the election, 1000 characters max' ref='description'></textarea>

                <h3>URL handle</h3>
                <input type='text' placeholder='Enter a URL handle with no spaces (i.e. http://municipal.gov/clark-county-2015-election)' ref='url_handle' />

                <h3>Timed Election</h3>
                <input type='checkbox' ref='timed' defautChecked='true' />Election has preset start and end dates

                <h3>Election date</h3>
                    <h5>Start date</h5>
                    <input type='date' ref='start' />
                    <h5>End date</h5>
                    <input type='date' ref='end' />

                <h3>Ballot Privacy</h3>
                    <input type='radio' ref='privacy_strategy' name='privacy_strategy' value='open_ballot' />Public ballot, public voter participation<br />
                    <input type='radio' ref='privacy_strategy' name='privacy_strategy' value='secret_ballot_public_voter' />Private ballot, public voter participation<br />
                    <input type='radio' ref='privacy_strategy' name='privacy_strategy' value='secret_ballot_anonymized_voter' />Private ballot, anonymized voter participation

                <h3>Options</h3>
                <input type='checkbox' ref='randomize_answer_order' name='randomize_answer_order' />Randomize answer choice order

                <h3>Security</h3>
                <input type='checkbox' ref='two_factor_auth' name='two_factor_auth' defautChecked='true' />Allow voters to enable Two-Factor Authentication<br />
                <input type='checkbox' ref='force_two_factor_auth' name='force_two_factor_auth' defautChecked='false'/>Force Two-Factor Authentication for all voters
                <br />

                <a href='#' className='cancel'>CANCEL</a>
                <input type='submit' action='Post' value='PROCEED' onClick={this.submitElection}/>
            </form>
        );
    }
});

module.exports = ElectionForm;
