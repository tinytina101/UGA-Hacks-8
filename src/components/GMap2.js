import React from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function GMap2() {
  // this hook loads the googlr script from the CDN to be used in this application
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCgALevD1fTag-VA8KWj4wLBfL1fqHoRhg",
    libraries: ["places"],
  });

  //initial state is null cause map might not be loaded
  const [map, setMap] = useState(/** @type google.maps.Map*/ (null));
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [lat, setLat] = useState(33.95389735235166);
  const [long, setLong] = useState(-83.37558446436425);

  const [waypointForm, setWaypointForm] = useState([{ location: "" }]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      console.log("my position lat" + lat);
      setLong(position.coords.longitude);
      console.log("my position long :" + long);
    });
  });
  //set to my current location
  const center = { lat: lat, lng: long };

  console.log("my center is " + center.lat + center.lng);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const waypointRef1 = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const waypointRef2 = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const waypointRef3 = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const waypointRef4 = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const waypointRef5 = useRef();

  //if the script isnt' load-- until the script is loaded
  if (!isLoaded) {
    //until script gets loaded, will display the loading
    return <div>Loading...</div>;
  }

  const createPost = async () => {
    const postsCollectionRef = collection(db, localStorage.getItem("email"));
    await addDoc(postsCollectionRef, {
      title: localStorage.getItem("title"),
      postText: localStorage.getItem("ck"),
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      w1: waypointRef1.current.value,
      w2: waypointRef2.current.value,
      w3: waypointRef3.current.value,
      w4: waypointRef4.current.value,
      w5: waypointRef5.current.value,
      time: Date().toLocaleString(),
    });
    ////page redirection after submit
    window.location = "/Link2/";
  };

  async function calculateRoute() {
    console.log("the ref" + originRef.current.value);
    //will only calculate when the input values are not empty
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    const waypts = [];
    if (waypointRef1.current.value !== "") {
      waypts.push({
        location: waypointRef1.current.value,
        stopover: true,
      });
    }
    if (waypointRef2.current.value !== "") {
      waypts.push({
        location: waypointRef2.current.value,
        stopover: true,
      });
    }
    if (waypointRef3.current.value !== "") {
      waypts.push({
        location: waypointRef3.current.value,
        stopover: true,
      });
    }
    if (waypointRef4.current.value !== "") {
      waypts.push({
        location: waypointRef4.current.value,
        stopover: true,
      });
    }
    if (waypointRef5.current.value !== "") {
      waypts.push({
        location: waypointRef5.current.value,
        stopover: true,
      });
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    //want to call direction service to get the results
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING, //caculate by driiving
      waypoints: waypts,
      optimizeWaypoints: true,
    });
    setDirectionResponse(results);
    let totaldistance = 0;
    let totalduration = 0;
    for (let i = 0; i < results.routes[0].legs.length; i++) {
      totaldistance += results.routes[0].legs[i].distance.value;
      totalduration += results.routes[0].legs[i].duration.value;
    }
    console.log("============" + results.routes[0].legs[0].distance.value);
    // setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setDistance(totaldistance);
    //totalduration(totalduration);
  }

  //clear the entire results
  function clearRoute() {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";

    destinationRef.current.value = "";
    waypointRef1.current.value = "";
    waypointRef2.current.value = "";
    waypointRef3.current.value = "";
    waypointRef4.current.value = "";
    waypointRef5.current.value = "";
    map.setMap(null);

    //waypts = [];
  }

  return (
    <div>
      <div className="map_locations">
        <div>
          <h3>Set destinations:</h3>
          <label>Starting Point:</label>
          <Autocomplete>
            <input
              type="text"
              placeholder="Starting Origin..."
              ref={originRef}
            />
          </Autocomplete>
          <label>Final Destination:</label>
          <Autocomplete>
            <input
              type="text"
              placeholder="Final Destination..."
              ref={destinationRef}
            />
          </Autocomplete>
        </div>

        <div className="waypoint_input">
          <h3>The inbetween destinations:</h3>

          <Autocomplete>
            <input type="text" placeholder="WayPoint 1..." ref={waypointRef1} />
          </Autocomplete>
          <Autocomplete>
            <input type="text" placeholder="WayPoint 2..." ref={waypointRef2} />
          </Autocomplete>
          <Autocomplete>
            <input type="text" placeholder="WayPoint 3..." ref={waypointRef3} />
          </Autocomplete>
          <Autocomplete>
            <input type="text" placeholder="WayPoint 4..." ref={waypointRef4} />
          </Autocomplete>
          <Autocomplete>
            <input type="text" placeholder="WayPoint 5..." ref={waypointRef5} />
          </Autocomplete>
        </div>
      </div>
      <div className="map_buttons">
        <button onClick={calculateRoute}>Calculate</button>
        <button onClick={clearRoute}>Clear Map</button>

        {/**This makes it that when you click on the button it pans back to the cneter coordinates [lat,lgn] */}
        <button onClick={() => map.panTo(center)}>CENTER MAP</button>
      </div>
      <div className="map_cal">
        <p>Distance: {distance} km</p>
        <p>Duration: {duration}</p>
      </div>
      {/**display markers and direction */}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        onLoad={(map) => setMap(map)}
      >
        {/**min requirement for marker is the position, can add as many markers as wanted */}
        <Marker
          key={1}
          position={center}
          options={{
            icon: "	https://8.ugahacks.com/_next/image?url=%2Ficons%2FHeaderImages%2Fimages%2Fbyte_mini.png&w=48&q=75",
          }}
        />
        {/**only want to display the direction render inside map when we have directionResponse */}
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
      <div className="stage">
        <button onClick={createPost} className="savePlan_button">
          Save Plan
        </button>
      </div>
    </div>
  );
}
