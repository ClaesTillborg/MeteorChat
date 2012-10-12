Template.mainPage.events({
  'click .createRoom': function() {
  	var roomName = document.getElementById("createRoomName").value;
  	if (roomName !== "") {
	  	if (Rooms.find({name: roomName}).count() === 0) {
	  		var newRoom = {
					"name": roomName,
					"creater": {
						"id": Meteor.userId(),
						"name": Meteor.user().profile.name
						},
					"perticipants": [
						{
							"id": Meteor.userId(),
							"name": Meteor.user().profile.name,
							"moderator": true
							}
					],
					"messages": []
				};
				var newRoomId = Rooms.insert(newRoom);
				if (newRoomId) {
					Session.set("selectedRoom", newRoomId);
				};
	  	};
  	};
  }
});