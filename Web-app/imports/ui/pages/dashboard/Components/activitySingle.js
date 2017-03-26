import './activitySingle.html'

Template.ActivitySingle.onRendered(function(){
});

Template.ActivitySingle.helpers({
	date: function(){
		return this.date;
	},
	enDis: function(){
		if(this.status == true){
			return 'Enabled';
		}else{
			return 'Disabled';
		}
	},
	isDes: function(){
		return this.status;
	},
	location: function(){
		return this.formatedAddress;
	}

});