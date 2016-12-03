import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { API_URL } from './global';

import { store, ActionTools, StoreTools } from './flux';

module.exports = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  componentDidMount: function() {
    let commentToEdit = StoreTools.findComment(this.props.params.id, store.getState().data);
    this.setState({author: commentToEdit.author, text: commentToEdit.text});
  },
  componentDidUpdate: function(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadData();
    }
  },
  // loadData: function() {
  //     $.ajax(API_URL + "/" + this.props.params.id) .done(function(comments) {
  //         this.setState(comments[0]);
  //     }.bind(this));
  // },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  contextTypes: {
    router: React.PropTypes.object
  },
  handleUpdate: function() {
    var updatedComment = {
      author: this.state.author.trim(),
      text: this.state.text.trim()
    }
    store.dispatch(ActionTools.editComment(Number(this.props.params.id), updatedComment));
    this.context.router.push('/');
  },
  handleDelete: function() {
    $.ajax({
      url: API_URL + "/" + this.props.params.id,
      type: 'DELETE',
    })
    .done(function(comments){
      this.context.router.push('/');
    }.bind(this))
    .fail(function(xhr, status, errorThrown) {
      console.error(API_URL, status, errorThrown.toString());
    }.bind(this));
  },
  render: function() {
    return (
      <div>
      <form className="commentForm">
      <h1>Comment Edit - {this.state.id}</h1>
      <input
      type="text"
      value={this.state.author}
      onChange={this.handleAuthorChange}
      />
      <input
      type="text"
      value={this.state.text}
      onChange={this.handleTextChange}
      />
      <button type="button" onClick={this.handleUpdate}>Update</button>
      <button type="button" onClick={this.handleDelete}>Delete</button>
      </form>
      <Link to='/'>Cancel</Link>
      </div>
    );
  }
});
