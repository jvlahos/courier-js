Template.postSubmit.events({
  'change form': function(e){
  	e.preventDefault();

    var data = Embedly.extract($('#url').val());
    var thumbnail = data.images[0].url;
    data.thumbnail = thumbnail;

    Session.set('post_cache', data);
  }

  //todo: parse link info with embedly

  //todo: method to insert into db
});

Template.postSubmit.helpers({
  'post_preview': function(){
    return Session.get('post_cache');
  }
});
