Template.userPosts.helpers({
  userName: function(){
	return Meteor.users.findOne({_id: Session.get('userId')}).username;
  },
  posts: function(){
    return Posts.find({userId: Session.get('userId')},{sort: {submitted : -1}});
  }
});
