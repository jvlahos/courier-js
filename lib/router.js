Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

//The route for a users saved posts. Uses a diff publication.
Router.route('/saved', {
  name: 'savedPosts',
  waitOn: function(){
    return Meteor.subscribe('savedPosts', Meteor.userId())
  },
  data: function() {
    return Posts.find({savedBy: Meteor.userId()});
  }
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/bookmarklet', {
  name: 'bookmarklet',
  onBeforeAction: function(){
    var data = Embedly.extract(this.params.query.url);
    Session.set('post_cache', data);
    Session.set('url', this.params.query.url);
    this.next();
  },
  data: function(){
    return {
      title: this.params.query.title,
      url: this.params.query.url
    }
  }
});

//The route for a single post. Uses a diff publication.
Router.route('/posts/:_id', {
  name: 'postPermalink',
  waitOn: function(){
    return Meteor.subscribe('singlePost', this.params._id)
  },
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

//Route for seeing all of a user's posts
Router.route('/users/:_id', {
  name: 'userPosts',
  waitOn: function(){
    return Meteor.subscribe('userPosts', this.params._id);
  },
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
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready : this.postsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});

Router.route('/:postsLimit?', {
  name: 'postsList'
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

Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'bookmarklet']});
