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

//Route Controlle to handle pagination and options of other posts routes
PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.postsLimit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    return {posts: Posts.find({}, this.findOptions())};
  }
});

Router.route('/:postsLimit?', {
  name: 'postsList'
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
