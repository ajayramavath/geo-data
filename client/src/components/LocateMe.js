import React from 'react'
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import L from 'leaflet'
const LocateMe = () => {

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
        iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    });

    function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

        return position === null ? null : (
            <Marker position={position} >
                <Popup>You are here</Popup>
            </Marker>
            )
    }

    return (
        <>
        <MapContainer
            className="h-[80vh] md:w-auto"
            center={{ lat: 51.505, lng: -0.09 }}
            zoom={14}
            scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
        <p>*Allow location and click on map to fly to your location</p>
        </>
)

}

export default LocateMe