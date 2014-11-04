Template.savedPosts.helpers({
  posts: function(){
  	var user_id = Meteor.userId();
    return Posts.find({savedBy: user_id},{sort: {submitted : -1}});
  }
});
