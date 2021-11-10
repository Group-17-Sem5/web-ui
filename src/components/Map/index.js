import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Button from '@material-ui/core/Button';

const MapContainer = ({ array, isAdding, getLocation }) => {

  const [ selected, setSelected ] = useState({});
  const [ currentPosition, setCurrentPosition ] = useState({});
  const [markerMap, setMarkerMap] = useState({});
  const markerRef = useRef(null);

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  const onSelect = item => {
    setSelected(item);
  }

  const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const currentPosition = {
      lat: latitude,
      lng: longitude
    }
    setCurrentPosition(currentPosition);
  }

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng})
  };

  const footer = (
    <div className="footer">
      <div className="inner-footer">
      <span className="location-text">Choose location and press</span>
      <Button variant="contained" color="primary" onClick={() => getLocation(currentPosition)}>
        Next
      </Button>
      </div>
    </div>
  );

  const mapStyles = () => {
    if (!isAdding) {
      return {
        marginTop: "20px",
        height: "80vh",
        width: "100%"
      }
    } else {
      return {
        marginTop: "20px",
        height: "80vh",
        width: "100%"
      }
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

     return (
    <>
      <LoadScript
        id="script-loader"
        googleMapsApiKey='AIzaSyB0Qrw5K3v0SmLcaNA8J9CLLUzzUnGf-yQ'
      >
        <GoogleMap
          id='example-map'
          mapContainerStyle={mapStyles()}
          draggable={true}
          zoom={13}
          center={currentPosition.lat ? currentPosition : defaultCenter}
        >
          {
            array ?
            array.map(item => {
                // console.log(item)
              return (
              <Marker 
            //   visible={true}
              key={item.id}
              position={item.location}
              label="Location"
              onLoad={marker => markerLoadHandler(marker, item)}
              onClick={() => onSelect(item)}
              icon={{
                path:
                  "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                fillColor: "#0000ff",
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 1.25
              }}
              />
              )
            }) : null
          }
          {
            isAdding ? 
            <Marker
            position={currentPosition}
            ref={() => markerRef}
            icon={{
                path:
                  "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                fillColor: "#0000ff",
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 1.25
              }}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true} /> :
            null
          }
          {
            selected.location ?
            (
              <InfoWindow
              position={selected.location}
              onCloseClick={() => setSelected({})}
            >
              <div className="infowindow">
                <p>{selected.title}</p>
                {/* <img src={selected.image} className="small-image" alt="rental"/> */}
                {/* <p>price: {selected.price}</p>
                <p>sqm2: {selected.sqm}</p>
                <p>bedrooms: {selected.bedrooms}</p> */}
              </div>
            </InfoWindow>
            ) : null
          }
        </GoogleMap>
      </LoadScript>
      {
        isAdding ?
        footer :
        null
      }
    </>
     )
  }

export default MapContainer;