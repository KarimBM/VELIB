'use strict';

 var map;
 var marker;

function getPosition(position)
{

    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    map.setCenter({

        lat: position.coords.latitude,
        lng: position.coords.longitude
    });
    marker.setPosition(map.getCenter());

}

function initialize()
{
    //Création de la carte google
    map = new google.maps.Map(document.getElementById('map'), {

        center: {
            lat: 48.8632915,
            lng: 2.3243405
        },
        zoom: 16

    });

    //Géolocalisation
    if(navigator.geolocation)
    {
        //Récupération de la position dans une fonction callback
        navigator.geolocation.getCurrentPosition(getPosition)

    }

    //Autocomplete de google

    //Récupération du champ html
    var search = document.getElementById('search');

    //Mise en place de l'autocomplétion des adresses lorsque l'on tape dans le champ
    new google.maps.places.Autocomplete(search, {
        types: ['geocode']

    });
    marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        title: "Ma position",
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
    });

};

function getGeocodingResults(results, status)
{
    var lat = results[0].geometry.location.lat();
    var lng = results[0].geometry.location.lng();
    // mise à jour de la carte avec les données reçues
    map.setCenter({

        lat: lat,
        lng: lng
    });
    marker.setPosition(map.getCenter());
    //Récupération les informations de l'api velib
    $.getJSON("https://api.jcdecaux.com/vls/v1/stations/", {
        contract : 'paris',
        apiKey : '24f34eb81d66e7da0652637589c70bc1cc58df5c'
    }, getStations);

};

function getStations(stations)
{
    //console.log(stations[1].address);
    // boucle foreach qui appelle une fction display pour chaque station
    stations.forEach(displayStation);

};

function displayStation(station)
{
    //console.log(station);

    var stationMarker = new google.maps.Marker({
        map: map,
        position: station.position,
        title: station.name

    });
    var content ='<h1>' + station.name + '</h1><p>Nombre de vélos disponibles:' +station.available_bikes + '</p>';

    var infoWindow = new google.maps.InfoWindow({
        content: content
    });
    stationMarker.addListener('click', function() {
        infoWindow.open(map, stationMarker);
    });


};

function onSearchAddress(event)
{
    event.preventDefault();
    //Récupération de l'adresse
    var address = $('#search').val();

    //Création d'un geocoder
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        address: address

    }, getGeocodingResults);
};

$(function()
{
    $('#btn-search').on('click', onSearchAddress);
});