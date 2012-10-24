var Validation = {
  clear: function () { 
    Session.set("error", undefined); 
  },
  setError: function (message) {
    Session.set("error", message);
  },
  roomNameLength: function(name) {
    if(name.length > 20) {
      this.setError("Namnet är för långt! max 20 tecken");
      return false;
    }
    return true;
  },
  validRoomName: function (name) {
    this.clear();
    if(name.length === 0) {
      this.setError("Rummet måste ha ett namn!");
      return false;
    }
    if(!this.roomNameLength(name)){
      return false;
    }
    if(this.roomExists(name)) {
      this.setError("Detta namn finns redan, försök igen!");
      return false;
    } 
    return true;
  },
  roomExists: function(name) {
    if(Rooms.find({privateRoom: false, name: name}).count() === 0) {
      return false;
    }
    return true;
  }
};