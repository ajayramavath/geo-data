import React ,{useState , useRef , useEffect} from 'react'
import { MapContainer, TileLayer, useMap , Marker,Polygon , Polyline , Popup, GeoJSON ,FeatureGroup  } from 'react-leaflet'
import osm from './osm-provider'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {EditControl} from 'react-leaflet-draw'
import "leaflet-draw/dist/leaflet.draw.css"


const Render = (props) => {
    const [center, setCenter] = useState({ lat: 0.5, lng: 102.0 });
    const ZOOM_LEVEL = 13;
    const mapRef = useRef();


    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    // function Mygeo() {
    //     const map = useMap()
    //     L.geoJSON(props.data).addTo(map)
    // }

    L.Marker.prototype.options.icon = DefaultIcon;
  return (
      <MapContainer className="h-[100vh] md:w-auto" center={center} zoom={ZOOM_LEVEL} ref={mapRef} >
           <FeatureGroup>
                <EditControl position="topleft" />
            </FeatureGroup> 
          <TileLayer url={osm.openStreet.url} />
          {/* <Mygeo key={props.data}/> */}
          <GeoJSON data={props.data} key={JSON.stringify(props.data)} ></GeoJSON>
      </MapContainer>
  )
}

export default Render