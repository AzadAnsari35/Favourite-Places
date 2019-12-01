import React, { useState, Fragment } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const mapStyles = {
  width: "100%",
  height: "100%"
};

const MapContainer = ({ google }) => {
  const [places, setPlaces] = useState([
    {
      latitude: 28.7041,
      longitude: 77.1025,
      color: "blue",
      img:
        "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/Summers-in-Delhi-April-to-July.jpg",
      text:
        "Delhi will be always be on top in my list as I born and brought up here."
    },
    {
      latitude: 10.8505,
      longitude: 76.2711,
      color: "red",
      img:
        "https://dmgupcwbwy0wl.cloudfront.net/system/images/000/246/174/b6e6fbfe0a70425bfa209af67b1a1ac6/x1000gt/shutterstock_1154918653.jpg?1552906145",
      text:
        "I have never been to kerala, but I have listened about it from my freind's and brother that it's really nice place to visit."
    },
    {
      latitude: 15.2993,
      longitude: 74.124,
      color: "purple",
      img:
        "https://static.toiimg.com/thumb/msid-51892205,width-748,height-499,resizemode=4,imgsize-266613/Goa.jpg",
      text:
        "Like other boys, I also want to go goa but becuase of my uninterested freinds I've never been their."
    },
    {
      latitude: 32.219,
      longitude: 76.3234,
      color: "yellow",
      img:
        "https://assets.traveltriangle.com/blog/wp-content/uploads/2016/07/Places-to-visit-in-Dharamshala.jpg",
      text:
        "I've been to dharamshala last year in december, the triund trekk was awesome and the view from the top was price less."
    },
    {
      latitude: 24.5926,
      longitude: 72.7156,
      color: "green",
      img: "https://i.ytimg.com/vi/8O6wJQr3kSU/maxresdefault.jpg",
      text:
        "Last year, I've been to mount abu with my freinds. The only think I like their was the seeing the sunrise from the highest peak."
    }
  ]);

  const [showPlaces, setShowPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedColor, setSelectedColor] = useState("all");

  const markerClickHandler = (marker, place) => {
    console.log(place);
    setSelectedPlace(place);
    setActiveMarker(marker);
    setInfoOpen(true);
  };

  const onMapClicked = () => {
    if (infoOpen) {
      setInfoOpen(false);
      setActiveMarker(null);
    }
  };

  const handleFilter = event => {
    setSelectedColor(event.target.value);
  };

  React.useEffect(() => {
    if (selectedColor === "all") setShowPlaces(places);
    else setShowPlaces(places.filter(place => place.color === selectedColor));
  }, [selectedColor]);

  return (
    <div>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selectedColor}
        onChange={handleFilter}
      >
        <MenuItem value="all">
          <em>All</em>
        </MenuItem>
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="yellow">Yellow</MenuItem>
        <MenuItem value="purple">Purple</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
        <MenuItem value="green">Green</MenuItem>
      </Select>

      <Map
        google={google}
        zoom={4}
        style={mapStyles}
        initialCenter={{ lat: 20.5937, lng: 78.9629 }}
        onClick={() => onMapClicked()}
      >
        {showPlaces.map((place, index) => (
          <Marker
            key={index}
            name={"Current location"}
            position={{ lat: place.latitude, lng: place.longitude }}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/${place.color}-dot.png`
            }}
            onClick={(x, marker) => markerClickHandler(marker, place)}
          />
        ))}
        <InfoWindow
          marker={activeMarker}
          onClose={() => setInfoOpen(false)}
          visible={infoOpen}
        >
          <div>
            <img
              src={selectedPlace.img}
              alt={selectedPlace.text}
              width="450px"
              height="350px"
              align="center"
            />
            <div style={{ width: 450 }}>{selectedPlace.text}</div>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAj9zqNZetjUlnf8ztOD2-NGKT1UJwUP8Y"
})(MapContainer);
