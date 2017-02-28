import './dashboard.html';
import './Components/sidebar.js'
import './Components/activitys.js'
import './Components/maps.js'

import { Activity } from '../../../api/lists/activity.js';

var countdown = new ReactiveCountdown(30);

var elemId = 0;

Template.DashboardMain.onCreated(function(){
	$('.modal').leanModal();
	var self = this;
    self.autorun(() => {
        self.subscribe('activity');
    });
});

Template.DashboardMain.onRendered(function() {
    Tracker.autorun(function() {
        var id = Meteor.userId();
        var data = Activity.findOne({
            userId: id
        }, {
            sort: {
                date: -1,
                limit: 1
            }
        });
        if (data){
            if (data.isRead == false) {
                $('#action-modal').openModal();
                elemId = data._id;
                Session.set('long', data.long);
                Session.set('lat', data.lat);
                countdown.start(function() {
                    $('#action-modal').closeModal();
                    Activity.update(elemId, {
                        $set: {
                            isRead: true
                        },
                    });
                });
            }
        }


    });
});

Template.DashboardMain.helpers({
    getCountdown: function() {
        return countdown.get();
    }
});

Template.DashboardMain.events({
	'click #enabled-btn': function(){
		var id = Meteor.userId();

		Activity.update(elemId , {
			$set: { status: true, isRead: true },
		});
	}
});




