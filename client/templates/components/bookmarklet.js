Template.bookmarklet.events({
  'blur #headline': function(){
    var post = _.extend(Session.get('post_cache'), {
      custom_title: $("#headline").html()
    });

    Session.set('post_cache', post);
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
            $('#error-dupe').show();
          }
      });

      Router.go('postsList');
    }
  }
);

Template.bookmarklet.helpers({
  'post_preview': function(){
    return Session.get('post_cache');
  },
  'error_message': function(){
    //check for dupes
    var url = Session.get('url');
    return Posts.findOne({url: url});
  }
});
