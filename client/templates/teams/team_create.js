Template.teamCreate.events({
  'submit form': function(){
      var teamAttributes = {};
      teamAttributes.teamName = $("#teamName").val();

      Meteor.call('teamInsert', teamAttributes, function(error, result) {
          // display the error to the user and abort
          if (error){
            return alert(error.reason);
          }

          // show this result but route anyway
          if (result.teamExists){
            alert('This team name is taken');
          }
      });
    }
  }
);
