//Handles the validations and creations of roooms
Template.roomHandler.events({
	'keyup .createRoom': function() {
		if(event.which === 13) {
			Create.room(event.target.value);
		} else if (!Validation.roomNameLength(event.target.value)) {
			event.target.className += " error";
		} else {
			Validation.clear();
			event.target.class = "createRoom";
		};
	},
  'change .roomSelect': function() {
  	var roomId = event.target.value;
  	Session.set("selectedRoom", roomId);
  	var room = Rooms.find({_id: roomId});
  	
  	Create.log(roomId, "loggade in!");
  }
});


// Handles the event in the chatroom such as creation and validation of messages
Template.chatRoom.events({
	'keypress .addMessage':function() {
		if(event.which === 13) {
			Create.message(this, event.target.value);
			event.target.value = "";
		}
	}
});

//Handles the navigation between rooms
Template.roomlist.events({
	'click .roomTag': function() {
		Session.set("selectedRoom", this._id);
	}
});

//A method of creating rooms and messages.
var Create = {
	room: function(name) {
		if (Validation.validRoomName(name)) {
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
        "privateRoom": document.getElementById("roomAccess").checked
      };
      var newRoomId = Rooms.insert(newRoom);
			Session.set("selectedRoom", newRoomId);
			this.log(newRoomId, "skapade detta rum!");
  	}

  },
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