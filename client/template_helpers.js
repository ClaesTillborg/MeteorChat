Template.chatRoom.isSelectedRoom = function() {
	return Session.get("selectedRoom") || false;
}

//roomhander handlers
Template.publicRoomList.roomsExist = function() {
	return Rooms.find({}).count() !== 0;
};

Template.publicRoomList.publicRooms = function() {
	return Rooms.find({});
};
Template.publicRoomList.isActiveRoom = function() {
	return Session.equals("selectedRoom", this._id);
};

//roomlist handlers
Template.roomlist.joinedRooms = function() {
	return Meteor.user().joinedRooms;
};
Template.roomlist.active = function() {
	return Session.equals("selectedRoom", this._id) ? " active" : "";
};

//Chatroom handlers
Template.chatRoom.room = function() {
	return Rooms.findOne({_id: Session.get("selectedRoom")});
};


//--------------------------------------------------Helpers----------------------------------------------------->
Handlebars.registerHelper('logDate', function(date) {
	var newDate = new Date(date);
	var hours = timeConverter(newDate.getHours());
	var minutes = timeConverter(newDate.getMinutes());
	var seconds = timeConverter(newDate.getSeconds());

	return new Handlebars.SafeString(hours + ":" + minutes + ":" + seconds);
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

Handlebars.registerHelper('error', function() {
	return Session.get("error");
});

var timeConverter = function(time) {
	if (time<10) {
		return "0" + time; 
	};
	return time;
};