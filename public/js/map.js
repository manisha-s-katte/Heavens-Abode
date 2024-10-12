mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // default style
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 12 // starting zoom
});

const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(listing.geometry.coordinates) //listing
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h3>${listing.title}</h3><p>Exact location will be provided after booking</p>`)
) 
    .addTo(map);

    
const styleSelector = document.getElementById('style-selector');
styleSelector.style.display = 'flex';
styleSelector.style.gap = '10px';
styleSelector.style.backgroundColor = '#fff';
styleSelector.style.padding = '10px';
styleSelector.style.borderRadius = '5px';


const styles = [
    { title: 'Streets', url: 'mapbox://styles/mapbox/streets-v11' },
    { title: 'Dark', url: 'mapbox://styles/mapbox/dark-v10' },
    { title: 'Satellite', url: 'mapbox://styles/mapbox/satellite-v9' }
];

styles.forEach((style, index) => {
   
    const styleDiv = document.createElement('div');
    styleDiv.style.display = 'flex';
    styleDiv.style.alignItems = 'center';
    styleDiv.style.gap = '5px';

   
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.id = 'style' + index;
    radioButton.name = 'style';
    radioButton.value = index;

    const label = document.createElement('label');
    label.htmlFor = 'style' + index;
    label.textContent = style.title;

    radioButton.addEventListener('change', (event) => {
        const style = styles[event.target.value];
        map.setStyle(style.url);
    });

    styleDiv.appendChild(radioButton);
    styleDiv.appendChild(label);

    styleSelector.appendChild(styleDiv);
});

map.on('load', function () {
    map.loadImage(
        'https://path-to-your-icon/home-icon.png', // replace this with the path to your icon
        function (error, image) {
            if (error) throw error;
            map.addImage('home-icon', image);

            // Add a GeoJSON source with your features
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [0, 0] // replace this with your coordinates
                            }
                        }
                    ]
                }
            });

            // Add a layer to use the image to represent the data
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'home-icon',
                    'icon-size': 0.25
                }
            });
        }
    );
});