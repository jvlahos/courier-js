Template.postSubmit.events({
  'change form': function(e){
  	e.preventDefault();

    //get all the embedly stuff
    var data = Embedly.extract($('#url').val());

    //check for dupes
    var postWithSameLink = Posts.findOne({url: data.url});
    if (postWithSameLink) {
      $('#error-dupe').show();
    } else {
      $('#error-dupe').hide();
    }

    //just grab the first thumbnail
    var thumbnail = data.images[0].url;
    data.thumbnail = thumbnail;

    //cache this crunched data in a session var
    Session.set('post_cache', data);
  },
  'submit form': function(){
      var note = $('#note').val();
      var post = Session.get('post_cache');
      post.note = note;

      Meteor.call('postInsert', post, function(error, result) {
          // display the error to the user and abort
          if (error){
            return alert(error.reason);
          }

          // show this result but route anyway
          if (result.postExists){
            alert('This link has already been posted');
          }
      });
      Router.go('postsList');
    }
  }
);

Template.postSubmit.helpers({
  'post_preview': function(){
    return Session.get('post_cache');
  }
});
