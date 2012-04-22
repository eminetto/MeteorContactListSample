Contacts = new Meteor.Collection("contacts");

if (Meteor.is_client) {
  
  Session.set('action','add');
  
  Template.add_contact.action = function () {
    var action = Session.get("action") || "add";  
    return action;
  };

  Template.add_contact.events = {
    'click input#actionButton' : function (evt) {
      var $action = Session.get('action'),
          $name = $("#name").val(),
          $email = $("#email").val();

      console.log($action);
      if ($action == 'add') {
        Contacts.insert({
          name:  $name,
          email: $email 
        });
        alert('contact ' + $name +  ' added');
      }
      else {
        Contacts.update($("#id").val(), {$set: {name: $name, email: $email}});
        $("#id").val('');
        Session.set('action', 'add');
        alert('contact ' + $name +  ' modified');
      }
      $("#name").val('');
      $("#email").val('');
    }
  };

  Template.contacts.contact_list = function () {
    return Contacts.find({}, {sort: {name: 1}});
  };

  Template.contacts.events = {
    'click input.del' : function (evt) {
      var $contact = $(evt.target),
          $id = $contact.attr('id');
      Contacts.remove($id);
    },
    'click input.edit' : function (evt) {
      var $contact = $(evt.target),
          $id = $contact.attr('id');
      contact = Contacts.findOne($id);

      $("#id").val(contact._id);
      $("#name").val(contact.name);
      $("#email").val(contact.email);
      $("#name").focus();

      Session.set('action', 'edit');
    },
  };

}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}