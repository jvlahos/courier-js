Template.postsList.helpers({
	group : function(){
		var posts = Posts.find().fetch();
		var groupedDates = _.groupBy(posts, 'cleanDate');
		var groupedPosts = _.toArray(groupedDates);
		var i = 0;
		var arrayDates = _.toArray(_.keys(groupedDates));
		var result = [];

		_.each(groupedDates, function(dates) {
			var dateRange = arrayDates[i];
			result.push({dateGroup:dateRange, posts:groupedPosts[i]})
			i++;
		});

		return result;
	}
});
