Room = {
  join: function(room) {
    var selectedRoomId = Session.get("selectedRoom");

    var participant = { "userId": Meteor.userId(), "userName": Meteor.user().profile.name, "moderator": false };

    if (room.createrId == Meteor.userId()) {
      participant.moderator = true;
    };


    if (selectedRoomId) {
      Create.log(selectedRoomId, "lämnade rummet");
      Rooms.update({_id: selectedRoomId}, {$pull: {participants: {userId: Meteor.userId()}}});
    };

    Rooms.update({_id: room._id}, {$addToSet: {participants: participant}});
      
    Session.set("selectedRoom", room._id);

    Create.log(room._id, "gick in i rummet");
  },
  create: function(name, access) {
    var newRoom = {
        "name": name,
        "date": new Date(),
        "createrId": Meteor.userId(),
        "createrName": Meteor.user().profile.name,
        "participants": [],
        "messages": [],
        "roomlog": [],
        "privateRoom": access
      };
      var id = Rooms.insert(newRoom);

      newRoom = Rooms.findOne({_id: id});
      Create.log(id, "Skapade rummet");
      this.join(newRoom);
      return newRoom;
  }
};


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
  addLog: function(roomId, text) {
    var newLog = {
      "date": new Date(),
      "logtext": text,
      "userName": Meteor.user().profile.name
    }
    Rooms.update({ _id: roomId }, { $addToSet: { roomlog: newLog}});
  }
});

//A method of creating rooms and messages.
var Create = {
	
  message: function(room, text) {
  	var uuid =  Meteor.uuid();
    var newMessage = {
      "_id": uuid,
      "parentId": room._id,
      "userId": Meteor.userId(),
      "userName": Meteor.user().profile.name,
      "message": text
    };
    Rooms.update({ _id: room._id }, { $addToSet: { messages: newMessage}});
  },
  log: function(roomId, text) {
    var newLog = {
      "date": new Date(),
      "logtext": text,
      "userName": Meteor.user().profile.name
    }
    Rooms.update({ _id: roomId }, { $addToSet: { roomlog: newLog}});
  }
};