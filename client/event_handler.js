//Handles the validations and creations of roooms
Template.header.events({
	'keyup .createRoom': function(event, template) {
    console.log(event.target);
		if(event.which === 13) {
			if (Validation.validRoomName(event.target.value)) {
				var roomName = event.target.value;
	      Room.create(roomName);
	      event.target.value = "";
			};
      
			//var id = Create.room(event.target.value);
      
		} else if (!Validation.roomNameLength(event.target.value)) {
			event.target.className += " error";
		} else {
			Validation.clear();
			event.target.class = "createRoom";
		};
    event.stopPropagation();
    event.preventDefault();
	}
});

Template.publicRoomList.events({
  'click .roomSelect': function(event, template) {
    Room.join(this);
  }
});


// Handles the event in the chatroom such as creation and validation of messages
Template.chatRoom.events({
	'keypress .addMessage':function(event, template) {
		if(event.which === 13) {
			Create.message(this, event.target.value);
			event.target.value = "";
		}
	}
});

//Handles the navigation between rooms
Template.roomlist.events({
	'click .roomTag': function(event, template) {
		Session.set("selectedRoom", this._id);
	}
});


