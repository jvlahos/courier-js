Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/posts/:_id', {
  name: 'postPermalink',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/users/:_id', {
  name: 'userPosts',
  data: function() {
    Session.set('userId', this.params._id);
  }
});

Router.route('/:postsLimit?', {
  name: 'postsList',
  waitOn: function() {
    var limit = parseInt(this.params.postsLimit) || 5;
    return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
  },
  data: function() {
    var limit = parseInt(this.params.postsLimit) || 5;
    return {
      posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
    };
  }
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/saved', {name: 'savedPosts'});


var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
