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

    //just grab the first image and make it the thumbnail
    if(data.images.length>0){
      var thumbnail = data.images[0].url;
      data.thumbnail = thumbnail;
    } else {
      data.thumbnail = data.favicon_url;
    }

    //cache this crunched data in a session var
    Session.set('post_cache', data);
  },
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
