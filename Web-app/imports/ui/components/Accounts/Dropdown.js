import {
    Template
} from 'meteor/templating';
import {
    SecurityStatus
} from '../../../api/lists/securityStatus.js'
import './Dropdown.html'

Template.Dropdown.onCreated(function() {
    var self = this;
    self.autorun(() => {
        self.subscribe('secStat');
    });
})

Template.Dropdown.onRendered(function() {
    $(".dropdown-button").dropdown({
        belowOrigin: true // Displays dropdown below the button
    });
});

Template.Dropdown.events({
    'click .signOut': () => {
        AccountsTemplates.logout();
    },
    'click #secStatus': () => {
    	var id = Meteor.userId();
    	var ss = SecurityStatus.find({userId: id}).fetch();
    	if(ss.length){
    		if (ss[0].status == true) {
                Meteor.call("insertSS", id, false);
            }else {
                Meteor.call("insertSS", id, true);
            }
    	}

    }
});


Template.Dropdown.helpers({
    'status': function() {
        var id = Meteor.userId();
        var ss = SecurityStatus.find({
            userId: id
        }).fetch();

        if (ss.length) {
            if (ss[0].status == true) {
                return "Enabled";
            } else {
                return "Disabled";
            }
        }else{
        	Meteor.call("insertSS", id, false);
        	return "Disabled";
        }

    }
})