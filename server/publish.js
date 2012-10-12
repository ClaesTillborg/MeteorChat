/*
	Publishes the collections
 */

Meteor.publish("rooms", function() {
	return Rooms.find({});
});
