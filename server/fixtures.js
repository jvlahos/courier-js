//This just adds sample data if the db is empty
//
if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/',
    description: 'I shared this link because i like it.',
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com',
    description: 'I shared this link because i like it.',
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',
    description: 'I shared this link because i like it.',
  });
}


//This just adds sample data if the db is empty
//
if (Teams.find().count() === 0) {
  Teams.insert({
    teamName: 'Upstatement'
  });

  Teams.insert({
    teamName: 'Bocoup'
  });

  Teams.insert({
    teamName: 'Soso'
  });
}
