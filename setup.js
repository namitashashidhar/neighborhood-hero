function initMap() {
        var loudounCounty = new google.maps.LatLng(39.070144, -77.663148);

        map = new google.maps.Map(document.getElementById('map'), {
        center: loudounCounty,

        zoom: 10, 
    });
        bounds = new google.maps.LatLngBounds();
        // var boundsNew = new google.maps.LatLngBounds();


        var indexValue = [];
        

        /* Data points defined as an array of LatLng objects */



        /*
        low walk score is bad
        */

    var propertyData = [
        {location: new google.maps.LatLng(39.245687, -77.676606), walkscore: 100},
        {location: new google.maps.LatLng(39.299002, -77.69336), walkscore: 90},
            {location: new google.maps.LatLng(39.252226, -77.594483), walkscore: 18},
                {location: new google.maps.LatLng(39.172424, -77.753785), walkscore: 60},
                    {location: new google.maps.LatLng(39.217124, -77.60547), walkscore: 70},
                        {location: new google.maps.LatLng(39.153257, -77.650788), walkscore: 45},
                            {location: new google.maps.LatLng(39.126629, -77.71808), walkscore: 80},
                                {location: new google.maps.LatLng(39.113844, -77.748292), walkscore: 94},
   
   
       ];


        for(let i=0; i<propertyData.length; i++) {
            bounds.extend(propertyData[i].location);
        }
        map.fitBounds(bounds);


    var heatMapData = [];
    var lengthLng = bounds.getNorthEast().lng() - bounds.getSouthWest().lng();
    var lengthLat = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();

    var xres = 50;
    var yres = 50;


    var southwestobj = 0

    var northeastobj = 0

    var xstep = lengthLng/xres;
    var ystep = lengthLat/yres;

    var boundMag = 10;
    
//     for(let i=bounds.getSouthWest().lng(); i<= bounds.getNorthEast().lng(); i+=(xstep)) {
//         for(let j=bounds.getSouthWest().lat(); j<= bounds.getNorthEast().lat(); j+=(ystep)) {
            
//             southwestobj = new google.maps.LatLng((j - (ystep)*boundMag), (i - (xstep)*boundMag));
//             northeastobj = new google.maps.LatLng( (j + (ystep)*boundMag), (i + (xstep)*boundMag));

//             var heatMapPointBound = new google.maps.LatLngBounds(southwestobj, northeastobj);
//             heatMapData.push({location: new google.maps.LatLng(j, i), weight: collectWeight(getPropertyBounds(heatMapPointBound, propertyData))});
            


            




            
//         }
//    }

// for(let i=bounds.getSouthWest().lng(); i<= bounds.getNorthEast().lng(); i+=(xstep)) {
//     for(let j=bounds.getSouthWest().lat(); j<= bounds.getNorthEast().lat(); j+=(ystep)) {
        
//         southwestobj = new google.maps.LatLng((j - (ystep)*boundMag), (i - (xstep)*boundMag));
//         northeastobj = new google.maps.LatLng( (j + (ystep)*boundMag), (i + (xstep)*boundMag));

//         var heatMapPointBound = new google.maps.LatLngBounds(southwestobj, northeastobj);
//         heatMapData.push({location: new google.maps.LatLng(j, i), weight: collectWeight(getPropertyBounds(heatMapPointBound, propertyData))});
        
 
//     }
// }

for(let i=bounds.getSouthWest().lng(); i<= bounds.getNorthEast().lng(); i+=(xstep)) {
    for(let j=bounds.getSouthWest().lat(); j<= bounds.getNorthEast().lat(); j+=(ystep)) {
        
        southwestobj = new google.maps.LatLng((j - (ystep)*boundMag), (i - (xstep)*boundMag));
        northeastobj = new google.maps.LatLng( (j + (ystep)*boundMag), (i + (xstep)*boundMag));

        var heatMapPointBound = new google.maps.LatLngBounds(southwestobj, northeastobj);
        heatMapData.push({location: new google.maps.LatLng(j, i), weight: collectWeight(getPropertyBounds(heatMapPointBound, propertyData))});
        
        
        
    }
}

   


    propertyData.forEach(longlat => {
        new google.maps.Marker({
            position: longlat.location,
            map,
        })
    });
   

    var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData,
    opacity: 0.6,
    gradient: ["rgba(255,255,255,0)", "#ff0000", "#ffff00", "#00ff00" ]
    });
    heatmap.setMap(map);
}





function getPropertyBounds(bounds, propertyData) {
    var markersInBounds = [];
    for(let p=0; p<propertyData.length; p++) {
        if(bounds.contains(propertyData[p].location)) {
            markersInBounds.push(propertyData[p]);
        }
    }
    return markersInBounds;     
}

function collectWeight(markers) {
    
    let total = 10;
    if(markers.length == 0) {
        return 10;
    }
    for(let x=0; x<markers.length; x++) {
        total += markers[x].walkscore;
    }
    let average = total / markers.length;
    return average;
}






  




  
    

  
  
 //window.initMap = initMap;