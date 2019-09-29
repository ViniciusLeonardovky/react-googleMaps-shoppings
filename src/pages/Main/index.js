import React, { useState } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import { ShoppingDetails } from "./styles";

import * as shoppingsData from "../../data/shoppings-centers.json";

function Map() {
  const [selectedShopping, setSelectedShopping] = useState(null);

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: -23.5507091, lng: -46.6447555 }}
    >
      {shoppingsData.shoppings.map(shopping => (
        <Marker
          key={shopping.address}
          position={{
            lat: Number(shopping.latitude),
            lng: Number(shopping.longitude)
          }}
          onClick={() => {
            setSelectedShopping(shopping);
          }}
        />
      ))}

      {selectedShopping && (
        <InfoWindow
          position={{
            lat: Number(selectedShopping.latitude),
            lng: Number(selectedShopping.longitude)
          }}
          onCloseClick={() => {
            setSelectedShopping(null);
          }}
        >
          <ShoppingDetails>
            <div>
              <strong>Local: </strong>
              <span>{selectedShopping.place}</span>
            </div>
            <div>
              <strong>Endereço: </strong>
              <span>{selectedShopping.address}</span>
            </div>
            <div>
              <strong>CEP: </strong>
              <span>{selectedShopping.zipcode}</span>
            </div>
            <div>
              <strong>Município: </strong>
              <span>{selectedShopping.city}</span>
            </div>
            <div>
              <strong>Estado: </strong>
              <span>{selectedShopping.state}</span>
            </div>
          </ShoppingDetails>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
