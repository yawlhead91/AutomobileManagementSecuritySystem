import { Template } from 'meteor/templating';
import './Dropdown.html'

Template.Dropdown.onRendered(function(){
  $(".dropdown-button").dropdown({
    belowOrigin: true // Displays dropdown below the button
  });
});

Template.Dropdown.events({
    'click .signOut': () => {
        AccountsTemplates.logout();
    }
});