/*
	Publishes the collections
 */

// Publicerar alla rum. Men endast rummets namn och lobby-status
Meteor.publish("rooms", function() {
	return Rooms.find({}, {fields: {name: 1, lobby: 1}});
});

// Publicerar samtlig information om det valda rummet
Meteor.publish("selectedRoom", function(roomId) {
	if (roomId) {
		return Rooms.find({_id: roomId}	);
	}
});

// Publicerar skaparens id på dem man själv skapat
Meteor.publish("createdRooms", function(id) {
	return Rooms.find({createrId: id}, {fields: {createrId: 1}});
});

// Publicerar det publicerar lobbyn
Meteor.publish("lobby", function() {
	return Rooms.find({"lobby": true});
})

// Publicerar extra användardata om så behövs
Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'profile': 1, 'joinedRooms': 1}});
});

