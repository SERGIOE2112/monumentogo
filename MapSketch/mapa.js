mapboxgl.accessToken = 'pk.eyJ1IjoibW9udW1lbnRnbyIsImEiOiJja3hiN2p4b3MzN2lvMndwYXk1YzA0bzQ4In0.00URHCuH13qHvuh28BYBnA'

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/monumentgo/ckxbh739h2h0v14ppurmslx0l',
	center: [0,0],
	zoom: 1
});

document
.getElementById('listing-group')
.addEventListener('change', function(e)
{
var handler = e.target.id;
if(e.target.checked){
	map[handler].enable();
} else {x
	map[handler].disable();
}
});

var customData = {
	'features': [
	{
		'type': 'Feature',
		'properties': {
			'title': 'Parque la Florida'
		},
	'geometry': {
		'coordinates': [-74.14476235609635,4.730750597247051],
		'type': 'Point'
		}
	},
	{
		'type': 'Feature',
		'properties': {
			'title': 'Parque del Café'
		},
	'geometry': {
		'coordinates': [-75.77064810284882,4.540568666186622],
		'type': 'Point'
		}
	},
	{
		'type': 'Feature',
		'properties': {
			'title': 'Parque Arqueologico San Agustin'
		},
	'geometry': {
		'coordinates': [-76.29526180284667,1.8879367358700043],
		'type': 'Point'
		}
	}
	],
	'type': 'FeatureCollection'
};
 
function forwardGeocoder(query) {
	var matchingFeatures = [];
	for (var i = 0; i < customData.features.length; i++) {
		var feature = customData.features[i];
		// Handle queries with different capitalization
		// than the source data by calling toLowerCase().
		if (
			feature.properties.title
				.toLowerCase()
				.search(query.toLowerCase()) !== -1
		) {
			// Add a tree emoji as a prefix for custom
			// data results using carmen geojson format:
			// https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
			feature['place_name'] = '🌲 ' + feature.properties.title;
			feature['center'] = feature.geometry.coordinates;
			feature['place_type'] = ['park'];
			matchingFeatures.push(feature);
			}
	}
	return matchingFeatures;
}
 
// Add the control to the map.
map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		localGeocoder: forwardGeocoder,
		zoom: 12,
		placeholder: 'Ingrese un lugar a buscar',
		mapboxgl: mapboxgl
	})
);