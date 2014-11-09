Template.header.helpers({
	user: function(){
		return Meteor.user();
	},
	userLink: function(){
		return Meteor.user()._id;
	}
});
