var myRoutes = Backbone.Router.extend({
  
  routes: {
    "":                     "start",
    ":room":                "room",     // room#
  },
//creating the room-session.
  start: function() {
    console.log("Creating the room-session");
    Session.set("selectedRoom", null);
  },
//Setting the selected room.
  room: function(roomName) {
    console.log("Setting the selected room");
    Session.set("selectedRoom", roomName);
  },

  setStart: function() {
    this.navigate("");
  },

  setRoom: function(roomName) {
    console.log("setRoom");
    this.navigate(roomName);
  }
});

Router = new myRoutes();

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});