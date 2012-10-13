Template.mainPage.isSelectedRoom = function() {
	return Session.get("selectedRoom") || false;
};

Template.roomHandler.roomsExist = function() {
	return Rooms.find({privateRoom: false}).count() !== 0;
};

Template.roomHandler.publicRooms = function() {
	return Rooms.find({privateRoom: false});
};

Template.roomlist.joinedRooms = function() {
	var rooms = [];
	var userId = Meteor.userId();
	Rooms.find({}).forEach(function(room){
		room.perticipants.forEach(function(person){
			if (person.id === userId) {
				rooms += room;
			};
		});
	});
	return rooms;
}
//--------------------------------------------------Helpers----------------------------------------------------->
Handlebars.registerHelper('header', function() {
//TODO: return User.findOne({_id : userId}, {fields: {name: 1}});
	return "Meteor bloggen";
});
Handlebars.registerHelper('formatDate', function(date) {
	var date = new Date(date);
	months = new Array("Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December");
	days = new Array("söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag");
	var month = months[date.getMonth()];
	var dayName = days[date.getDay()];
	var ret = dayName + " " + date.getDate() + " " + month + " " + date.getFullYear();
	return new Handlebars.SafeString(ret);

});

Handlebars.registerHelper('user', function() {
//TODO: return Meteor.user().profile.name;
	return "Claes Tillborg";
});

Handlebars.registerHelper('error', function() {
	return Session.get("error");
});