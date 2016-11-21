import React from 'react';
import $ from 'jquery';

import PersonList from './personList';
import PersonForm from './personForm';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadPersonsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
        })
         .done(function(result){
              console.log(this.props.url);
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    },
    handlePersonSubmit: function(person) {
        var persons = this.state.data;
        person.id_num = Date.now();
        var newPersons = persons.concat([person]);
        this.setState({data: newPersons});
        console.log(person);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: person,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: persons});
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.loadPersonsFromServer();
        setInterval(this.loadPersonsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="personBox">
                <h1>Persons</h1>
                <PersonList data={this.state.data} />
                <PersonForm onPersonSubmit={this.handlePersonSubmit} />
            </div>
        );
    }
});
