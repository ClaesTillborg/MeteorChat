/*
  Server methods
*/
Meteor.methods({
});  

/*

Exemple of setup funktions

var server_password = 'supersecret';
Meteor.methods({
  update: function(selector, updates, multi, passcode) {
    var show = Shows.findOne(selector.show_id);
    if(show && passcode && (passcode === show.secret)) {
      return Slides.update(selector, updates, multi);
    }
  },
  insert: function(attributes, passcode) {
    var secret = Shows.findOne(attributes.show_id).secret;
    if(passcode && passcode === secret) {
      return Slides.insert(attributes);
    }
  },
  remove: function(selector, passcode) {
    var secret = Shows.findOne(selector.show_id).secret;
    if(passcode && passcode === secret) {
      return Slides.remove(selector);
    }
  },
  // -- Methods for Slideshows -- //
  updateShow: function(show_id, updates, passcode) {
    var show = Shows.findOne(show_id);
    if(show && passcode && (passcode === show.secret)) {
      Shows.update({_id: show_id}, updates);
    }
  },
  newShow: function(code) {
    var show_id = Shows.insert({title: 'Double click to edit', body: "I'm sorry, there isn't a tutorial yet", created_at: Date.now(), secret: code});
    return show_id;
  },
  removeShow: function(show_id, passcode) {
    var secret = Shows.findOne(show_id).secret;
    if(passcode && passcode === secret) {
      Shows.remove({_id: show_id});
      Slides.remove({show_id: show_id});
    }
  },

  confirmSecret: function(show_id, client_secret) {
    var show = Shows.findOne(show_id);
    if(show && show.secret === client_secret) {
      return true;
    } else {
      return false;
    }
  },
  generateSecret: function() {
    var a = animals[Math.floor(Math.random()*num_animals)];
    var c = colors[Math.floor(Math.random()*num_colors)];
    return c+'-'+a;
  }
});
Meteor.startup(function() {
  Meteor.default_server.method_handlers['/slides/insert'] = function () {};
  Meteor.default_server.method_handlers['/slides/update'] = function () {};
  Meteor.default_server.method_handlers['/slides/remove'] = function () {};
  Meteor.default_server.method_handlers['/shows/insert'] = function () {};
  Meteor.default_server.method_handlers['/shows/update'] = function () {};
  Meteor.default_server.method_handlers['/shows/remove'] = function () {};
});
*/

if (true) {};