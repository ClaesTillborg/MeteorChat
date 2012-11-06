Room = {
  join: function(room) {
    var selectedRoomId = Session.get("selectedRoom");

    var participant = { "userId": Meteor.userId(), "userName": profileName(), "moderator": false };

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
        "createrName": profileName(),
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
      "userName": profileName(),
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
      "userName": profileName()
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
      "userName": profileName(),
      "message": text
    };
    Rooms.update({ _id: room._id }, { $addToSet: { messages: newMessage}});
  },
  log: function(roomId, text) {
    var newLog = {
      "date": new Date(),
      "logtext": text,
      "userName": profileName()
    }
    Rooms.update({ _id: roomId }, { $addToSet: { roomlog: newLog}});
  }
};

var profileName = function() {
  if(Meteor.userLoaded()) {
    var user = Meteor.user();
    
    if (user.profile) {
      return user.profile.name;
    }
    return user.emails[0].address;
  };
  return null;
};