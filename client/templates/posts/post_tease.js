Template.postTease.helpers({
  save: function(){
  	var post = Posts.findOne(this._id);
  	var text = '';
  	if(Meteor.userId() != undefined){
  		if(_.find(post.savedBy, function(id){ return id === Meteor.userId()})){
  			return "Saved!";
  		} else {
  			return "Save";
  		}
  	} else {
  		return false;
  	}
  },
  saveCount: function(){
  	var post = Posts.findOne(this._id);
  	if (post.savedBy.length > 0 && !undefined){
      return post.savedBy.length;
    } else {
      return "0";
    }
  }
});

Template.postTease.events({
  "click .saveThis": function(){
  	var post = Posts.findOne(this._id);

  	if(_.find(post.savedBy, function(id){ return id === Meteor.userId()})){
  		return false;
  	} else {
  		Posts.update(this._id, {$push: {savedBy: Meteor.userId()}});
  	}
  }
});
