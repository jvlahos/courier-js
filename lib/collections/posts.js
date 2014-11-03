Posts = new Mongo.Collection('posts');

//Will need to bring these back when we go into secure mode
//
// Posts.allow({
//   update: function(userId, post) { return ownsDocument(userId, post); },
//   remove: function(userId, post) { return ownsDocument(userId, post); },
// });

// Posts.deny({
//   update: function(userId, post, fieldNames) {
//     // may only edit the following two fields:
//     return (_.without(fieldNames, 'url', 'title').length > 0);
//   }
// });

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();

    var post = _.extend(postAttributes, {
      userId: user._id,
      userName: user.username,
      submitted: new Date()
    });


    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});
