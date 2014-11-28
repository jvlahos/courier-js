Teams = new Mongo.Collection('teams');

//Will need to bring these back when we go into secure mode
//
Teams.allow({
  update: function() { return true; }
});

// Posts.deny({
//   update: function(userId, post, fieldNames) {
//     // may only edit the following two fields:
//     return (_.without(fieldNames, 'url', 'title').length > 0);
//   }
// });

Meteor.methods({
  teamInsert: function(teamAttributes) {
    // check(Meteor.userId(), String);

    var teamWithSameName = Teams.findOne({name: teamAttributes.teamName});
    if (teamWithSameName) {
      return {
        teamExists: true,
        _id: teamWithSameName._id
      }
    }

    var users = [];
    users.push(Meteor.userId());

    var team = _.extend(teamAttributes, {
      users: users,
    });

    console.log(team);

    var teamId = Teams.insert(team);

    return {
      _id: teamId
    };
  }
});
