import './activitys.html';
import './activitySingle.js'
import './maps.js';
import './maps.html';

import { Activity } from '../../../../api/lists/activity.js';

Template.Activity.onCreated(function(){
	$('.modal').leanModal();
	var self = this;
    self.autorun(() => {
        self.subscribe('activity');
    });
});

Template.Activity.helpers({
	activity: function(){
		var id = Meteor.userId();
		var activitys = Activity.find({userId: id}).fetch();
		activitys.sort(function(a,b){
			return new Date(b.date) - new Date(a.date);
		});
		return activitys;
	}
});

Template.Activity.events({
	'click .collection-item': function(){
		setNewCords( this.long, this.lat, this.formatedAddress);
	}
});

function setNewCords(lng,lat, address){
	var map = GoogleMaps.maps.routeMap.instance;

    var myLatlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: address,
        center: myLatlng,
    });

    marker.setMap(map);
    map.setCenter(myLatlng);

    
}