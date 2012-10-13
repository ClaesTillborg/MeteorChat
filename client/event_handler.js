Template.roomHandler.events({
	'keyup #createRoomName': function(){
		if (!Validation.roomNameLength(event.target.value)) {
			event.target.className = "error";
		}
		else {
			Validation.clear();
			event.target.class = "";
		};
	},
	//feching the information and
  'click .createRoom': function() {
  	var roomName = document.getElementById("createRoomName").value;
  	var roomAccess = document.getElementById("roomAccess").checked;
  	if (Validation.validRoomName(roomName)) {
  		var newRoom = {
				"name": roomName,
				"createrId": Meteor.userId(),
				"createrName": Meteor.user().profile.name,
				"perticipants": [
					{
						"id": Meteor.userId(),
						"name": Meteor.user().profile.name,
						"moderator": true
						}
				],
				"messages": [],
				"privateRoom": roomAccess
			};
			var newRoomId = Rooms.insert(newRoom);
			if (newRoomId) {
				Session.set("selectedRoom", newRoomId);
			};
  	}
  }
});