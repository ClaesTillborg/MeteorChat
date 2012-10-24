/*
  Server methods
*/
Meteor.methods({
  addMessage: function(room, text) {
    var uuid =  Meteor.uuid();
    var newMessage = {
      "_id": uuid,
      "parentId": room._id,
      "userId": Meteor.userId(),
      "userName": Meteor.user().profile.name,
      "message": text
    };
    Rooms.update({ _id: room._id }, { $addToSet: { messages: newMessage}});
    return uuid;
  },
  removeMessage: function(message) {
    if (message.userId !== Meteor.userId()) {
      throw new Meteor.Error(404, "Can't remove a message you did't create!");
      return false;
    };
    
    Rooms.update({ _id: message.parentId }, { $pull: { messages: { _id: message._id}}});
    return true;
  },
  createRoom: function(name, access) {
    var newRoom = {
        "name": name,
        "date": new Date(),
        "createrId": Meteor.userId(),
        "createrName": Meteor.user().profile.name,
        "perticipants": [
          {
            "userId": Meteor.userId(),
            "userName": Meteor.user().profile.name,
            "moderator": true
            }
        ],
        "messages": [],
        "roomlog": [],
        "privateRoom": access
      };
      var id = Rooms.insert(newRoom)
      console.log(id);
      return id;
  },
  removeRoom: function(room) {
    if (room.createrId !== Meteor.userId()) {
      throw new Meteor.Error(404, "Can't remove a room you did't create!");
    return false;
    };
    Rooms.remove(room);
    return true;
  },
  addLog: function(roomId, text) {
    var newLog = {
      "date": new Date(),
      "logtext": text,
      "userName": Meteor.user().profile.name
    }
    Rooms.update({ _id: roomId }, { $addToSet: { roomlog: newLog}});
  }
});

Meteor.startup(function() {
  Meteor.default_server.method_handlers['/room/insert'] = function () {};
  Meteor.default_server.method_handlers['/room/update'] = function () {};
  Meteor.default_server.method_handlers['/room/remove'] = function () {};
});
