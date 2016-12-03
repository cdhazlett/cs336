import React from 'react';
// import $ from 'jquery';

import CommentList from './commentList';
import CommentForm from './commentForm';
// import { API_URL, POLL_INTERVAL } from './global';

import { store, ActionTools } from './flux';

module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  // loadCommentsFromServer: function() {
  //     $.ajax({
  //         url: API_URL,
  //         dataType: 'json',
  //         cache: false,
  //     })
  //      .done(function(result){
  //          this.setState({data: result});
  //      }.bind(this))
  //      .fail(function(xhr, status, errorThrown) {
  //          console.error(this.props.url, status, errorThrown.toString());
  //      }.bind(this));
  // },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    store.dispatch(ActionTools.addComment(comment));
  },
  // componentDidMount: function() {
  //     this.loadCommentsFromServer();
  //     setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
  // },
  render: function() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  },
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        data: store.getState().data
      });
    });
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  }
});
