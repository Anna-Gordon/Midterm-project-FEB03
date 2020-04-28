// Function that generates points on map

function initMap() {

  fetch("/api/points").then((response) => {
    response.json().then((text) => {
      return text.users;
    })
    .then((data) => {
      let places = [];

      const param = parseInt(window.location.pathname.slice(5));

      for (let i = 0; i < data.length; i++) {
        if(data[i].map_id === param) {
          places.push({
            name: data[i].name,
            lat: parseFloat(data[i].lat),
            lng: parseFloat(data[i].lng),
            content: data[i].description
          });
        }
      }


      // The map
      let centerPoint = { lat: 49.2945789, lng: -123.1182459 };
      let map = new google.maps.Map(
        document.getElementById('map'), { zoom: 12, center: centerPoint }
        );

      for (let i = 0; i < places.length; i++) {
        let nameMarker = new google.maps.Marker({
          position: { lat: places[i].lat, lng: places[i].lng },
          map: map,
          animation: google.maps.Animation.DROP
        });

        let contentString = places[i].name + '</br></br>' + '"' + places[i].content + '"';

        let infoWin = new google.maps.InfoWindow({
          content: contentString
        });

        nameMarker.addListener('click', function () {
          infoWin.open(map, nameMarker);
        });
      }
    });
  });
}


function goGoFunction() {
  initMap();
  initAutocomplete();
};
