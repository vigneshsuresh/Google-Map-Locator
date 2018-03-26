function Initialize_MAP() {
    map = new google.maps.Map(
    document.getElementById("map"), {
        center: new google.maps.LatLng(36.8119, -118.1419),   //Intial View of the map with Latitude and Longitude
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder = new google.maps.Geocoder();

    var len=Locations.length;
    for (i = 0; i < len; i++) {
                Calculate_Markon(Locations, i); //Calls the function Calculate_Markon with Locations which is from JSON file.
    }
    
}


function Calculate_Markon(locations, i)
{ 

    var addr = locations[i].City+" "+locations[i].State+","+locations[i].Country;         //Concatenating City Name,State Name together and assigning to addr.
    geocoder.geocode({'address': addr},function (results, status) //geocode fn converts address to its respective lat and lon values
                               {
                                if (status == 'OK')
                                {
                                    var marker = new google.maps.Marker
                                    ({
                                        position: results[0].geometry.location,   //Position of the marker is the lat and lon value of address
                                        animation: google.maps.Animation.DROP,    //Creating animation for marker
                                    });
                                    marker.setMap(map);                           //Setting up the marker with map object
                                    var infowindow = new google.maps.InfoWindow()

                                    google.maps.event.addListener(marker,'click', (function(marker,addr,infowindow){  //Event Handler when marker is clicked
                                    return function() {
                                       infowindow.setContent(addr);   //Set up the content of infowindow as addr which is concatenated above
                                       infowindow.open(map,marker);   //Opening the info window with marker and map obkect
                                       map.setZoom(8);
                                       map.setCenter(marker.getPosition());   // getPosition Returns the lat&lon values of the selected marker
                                    };
                                    })(marker,addr,infowindow));
                                } 
                                else {
                                    alert("Something went wrong with: " + addr);
                                }
                            });
}