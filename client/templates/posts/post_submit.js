Template.postSubmit.events({
  'submit form': function(e){
  	e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

  	alert(post.url);
  }

  //todo: parse link info with embedly

  //todo: method to insert into db
});
