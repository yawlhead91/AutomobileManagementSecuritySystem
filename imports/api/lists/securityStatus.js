import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const SecurityStatus = new Mongo.Collection('secStat');

ssSchema = new SimpleSchema({
	userId: {
		type: String,
	},
	status: {
		type: Boolean
	},
});

SecurityStatus.allow({
	insert: function (userId, doc) {
		// the user must be logged in, and the document must be owned by the user
		return !!userId;
	},
	update: function (userId, doc) {
		// can only change your own documents
		return !!userId;
	},
	remove: function (userId, doc) {
		// can only remove your own documents
		return doc.owner === userId;
	},
	fetch: ['owner']
});


Meteor.methods({
	insertSS: function(userId, status){

		var setModifier = {};   // Need to build $set object
        setModifier['status'] = status;

		var setOnModifier = {};
		setOnModifier['userId'] = userId;
		setOnModifier['status'] = status;

		SecurityStatus.upsert(
	        {
	            userId: userId,
	        },
	        {
	          $set: setModifier,
	          $setOnInsert: setOnModifier
	        },
	        {upsert: true}
	    );
	},

});


SecurityStatus.attachSchema( ssSchema );