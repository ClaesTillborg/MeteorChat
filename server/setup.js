Meteor.users.allow({
  update: function() {
    return true;
  }
});

Rooms.allow({
  insert: function() {
    return true;
  },
  update: function()  {
    return true;
  }
});

Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    user.profile = options.profile;
  } 
  user.joinedRoom = {};
  return user;  
});
if (Rooms.find({}).count() === 0) {
  var lobby = {
        "name": "Lobby",
        "date": new Date(),
        "participants": [],
        "messages": [],
        "roomlog": [],
        "lobby": true
  };
  Rooms.insert(lobby);
};