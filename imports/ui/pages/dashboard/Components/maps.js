import './maps.html';

Template.Map.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('routeMap', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
});

Template.Map.onRendered(function() {
    Session.set('long', 0);
    Session.set('lat', 0);

    GoogleMaps.load({
        key: "AIzaSyCOzfISoah8IT6BVNBoq3rdEmboa9Hox98"
    });

    GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });

})

Template.Map.helpers({
    routeMapHelpers: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            var long = Session.get('long');
            var lat = Session.get('lat');

            return {
                center: new google.maps.LatLng(long, lat),
                zoom: 8
            };

        }
    }


});

function setCord() {

}