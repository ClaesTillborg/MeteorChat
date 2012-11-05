/*
	Subscribes to the collections
*/
Meteor.autosubscribe(function() {
	if (Meteor.user()) {
		Meteor.subscribe("selectedRoom", Session.get("selectedRoom"));
		Meteor.subscribe("rooms");
		Meteor.subscribe("userData");
		Meteor.subscribe("createdRooms", Meteor.userId());
		Meteor.subscribe("lobby");
	};
});