/*
	Publishes the collections
 */

Meteor.publish("joinedRooms", function() {
	return Rooms.find({});
});