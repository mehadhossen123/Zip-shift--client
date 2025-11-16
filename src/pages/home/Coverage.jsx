import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLoaderData } from "react-router";
import { useRef } from "react";
import { Zoom } from "swiper/modules";

// Fix leaflet icon problem
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = defaultIcon;

const Coverage = () => {
  const services = useLoaderData();
  const markRef = useRef();
  console.log(services);

  const position = [23.685, 90.3563];
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    // console.log(location)
    const city = services.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (city) {
      const coord = [city.latitude, city.longitude];
      markRef.current.flyTo(coord,13)
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mt-5 ">
        We are available in 64 districts
      </h1>
      {/* search box */}
      <div className="my-10">
        <form onSubmit={handleSearch} className="join">
          <div>
            <div>
              <input
                name="location"
                className="input join-item"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="indicator">
            <button className="btn join-item">Search</button>
          </div>
        </form>
      </div>

      <div className="border w-full h-[600px]">
        <MapContainer
          className="h-[600px]"
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref={markRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {services.map((center) => (
            <Marker
              key={center._id}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                {center.district} <br />
                Coverage area:{center.covered_area.join(" ,")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
