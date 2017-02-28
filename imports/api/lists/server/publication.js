import { Activity } from '../activity.js';

if (Meteor.isServer) {
	Meteor.publish('activity', function(){
   		return Activity.find({userId: this.userId});
  	});

}