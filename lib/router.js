Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/saved', {name: 'savedPosts'});

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
