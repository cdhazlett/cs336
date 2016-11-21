import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
    getInitialState: function() {
        return {full_name: '', startDate: ''};
    },
    handleNameChange: function(e) {
        this.setState({full_name: e.target.value});
    },
    handleDateChange: function(e) {
        this.setState({startDate: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var full_name = this.state.full_name.trim();
        console.log(full_name);
        var startDate = this.state.startDate.trim();
        if (!full_name || !startDate) {
            return;
        }
        this.props.onPersonSubmit({"full_name":full_name, "startDate":startDate});
        this.setState({full_name:'', startDate:''});
    },
    render: function() {
        return (
            <form className="personForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="name..."
                    value={this.state.full_name} onChange={this.handleNameChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="person..."
                    value={this.state.startDate} onChange={this.handleDateChange}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});
