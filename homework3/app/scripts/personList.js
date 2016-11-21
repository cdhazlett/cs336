import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Person from './person';

module.exports = React.createClass({
    render: function() {
        var personNodes = this.props.data.map(function(person) {
            // console.log(person);
            return (
                <Person name={person.full_name} key={person.id_num}>
                    {person.startDate}
                </Person>
            );
        });
        return (
            <div className="personList">
                {personNodes}
            </div>
        );
    }
});
