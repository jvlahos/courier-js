//Swiping this form Abigail Watson's excellent REST-api thinger

//get all posts in the DB
Router.map(function () {
  this.route("apiRoute", {path: "/api/",
    where: "server",
    action: function(){
      console.log('################################################');
      console.log(this.request.method);
      console.log(this.request.headers);
      console.log('this.params.id: ' + this.params.id);

      console.log('------------------------------');
      console.log(this.request.body);
      console.log('------------------------------');

      this.response.statusCode = 200;
      this.response.setHeader("Content-Type", "application/json");
      this.response.setHeader("Access-Control-Allow-Origin", "*");
      this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      if (this.request.method == 'GET') {
        // LIST
        this.response.end(JSON.stringify(
          Posts.find().fetch()
        ));
      }else if (this.request.method == 'POST') {
        // INSERT
        this.response.end(JSON.stringify(
          Posts.insert(this.request.body)
        ));
      }else if (this.request.method == 'OPTIONS') {
        // OPTIONS
        this.response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
        this.response.end("OPTIONS Response");
      }
    }
  });

  //get a single post
  this.route("apiPostById", {path: "/api/:id",
    where: "server",
    action: function(){
      console.log('################################################');
      console.log(this.request.method);
      console.log(this.request.headers);
      console.log('this.params.id: ' + this.params.id);

      console.log('------------------------------');
      console.log(this.request.body);
      console.log('------------------------------');

      this.response.statusCode = 200;
      this.response.setHeader("Content-Type", "application/json");
      this.response.setHeader("Access-Control-Allow-Origin", "*");
      this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      //Access-Control-Allow-Origin: http://foo.example
      //Access-Control-Allow-Methods: POST, GET, OPTIONS
      //Access-Control-Allow-Headers: X-PINGOTHER

      if (this.request.method == 'GET') {
        // FIND
        this.response.end(JSON.stringify(
          Posts.findOne({_id: this.params.id })
        ));
      }else if (this.request.method == 'PUT') {
        // UPDATE
        // this.response.end(JSON.stringify(
        //   Posts.update({_id: new Meteor.Collection.ObjectID(this.params.id) },{$set:{
        //     title: this.request.body.title,
        //     text: this.request.body.text
        //   }})
        // ));
        // this.response.end("UPDATE Response");
      }else if (this.request.method == 'DELETE') {
        // REMOVE
        // this.response.end(JSON.stringify(
        //   Posts.remove({_id: new Meteor.Collection.ObjectID(this.params.id) })
        // ));
      }else if (this.request.method == 'OPTIONS') {
        // OPTIONS
        this.response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
        this.response.end("OPTIONS Response With Parameter");
      }
    }
  });

  //get all posts by a single user
  this.route("apiPostsByUser", {path: "/api/user/:_id",
    where: "server",
    action: function(){
      console.log('################################################');
      console.log(this.request.method);
      console.log(this.request.headers);
      console.log('this.params.id: ' + this.params.id);

      console.log('------------------------------');
      console.log(this.request.body);
      console.log('------------------------------');

      this.response.statusCode = 200;
      this.response.setHeader("Content-Type", "application/json");
      this.response.setHeader("Access-Control-Allow-Origin", "*");
      this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      //Access-Control-Allow-Origin: http://foo.example
      //Access-Control-Allow-Methods: POST, GET, OPTIONS
      //Access-Control-Allow-Headers: X-PINGOTHER

      if (this.request.method == 'GET') {
        // FIND
        this.response.end(JSON.stringify(
          Posts.find({userId: this.params.id }).fetch()
        ));
      }else if (this.request.method == 'PUT') {
        // UPDATE
        // this.response.end(JSON.stringify(
        //   Posts.update({_id: new Meteor.Collection.ObjectID(this.params.id) },{$set:{
        //     title: this.request.body.title,
        //     text: this.request.body.text
        //   }})
        // ));
        // this.response.end("UPDATE Response");
      }else if (this.request.method == 'DELETE') {
        // REMOVE
        // this.response.end(JSON.stringify(
        //   Posts.remove({_id: new Meteor.Collection.ObjectID(this.params.id) })
        // ));
      }else if (this.request.method == 'OPTIONS') {
        // OPTIONS
        this.response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
        this.response.end("OPTIONS Response With Parameter");
      }
    }
  });
});
