import React, { useState, useRef ,useEffect } from 'react'
import { MapContainer, TileLayer, FeatureGroup , useMap} from 'react-leaflet'
import L from 'leaflet'
import osm from './osm-provider'
import filedownload from 'js-file-download'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
import { EditControl } from 'react-leaflet-draw'
import "leaflet-draw/dist/leaflet.draw.css"


const NewMap = ({props}) => {
    const [center, setCenter] = useState({ lat: 0.5, lng: 102.0 });
    const [popup , setPopup] = useState(false)
    const [userID, setUserId] = useState()
    const navigate = useNavigate()
    const ZOOM_LEVEL = 13;
    const mapRef = useRef();
    const fgref = useRef();


    useEffect(() => {
        const User = localStorage.getItem("user");
        if (!User) {
            navigate("/login");
        }
        else {
            const parseUser = JSON.parse(User);

            (() => {
                setUserId(parseUser.ID)
            })()
        }
    }, []);


    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
        iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    });

    const handleDownload = () => {
        var datenow = new Date()
        let datestr = datenow.toLocaleDateString('en-GB');
        let filename = 'export_map_'+datestr+'.geojson'
        let nodata = '{"type":"FeatureCollection","features":[]}';

        let filedata = JSON.stringify(fgref.current.toGeoJSON());

        if(filedata === nodata){
            alert('Add and save features to download');
        }else {
            filedownload(filedata,filename)
        }
    }
    const handleSave = async () => {
        const config = {
            headers: { "content-type": "multipart/form-data" },
            withCredentials: true,
        };
        const config2 = {
            withCredentials: true,
        }
        var title = prompt("Give your map a title")
        console.log(title)
        if(title === ""){
            alert("Title is required to create your map!")
        }else{
            let nodata = '{"type":"FeatureCollection","features":[]}';
            const data = JSON.stringify(fgref.current.toGeoJSON())
            if (data !== nodata) {
                const jsonFile = new File([data], title+".json");
                const postData = {
                    "file": jsonFile,
                }

                try {
                    const response = await api.post('/upload-file',postData,config)
                        console.log(response)
                    const postBody = {
                        "filename": response.data.name,
                        "userid": String(userID),
                        "url": response.data.url,
                        "title": title
                    }
                    try {
                        const resp = await api.post('/post', postBody, config2)
                        navigate('/userpage')

                    } catch (err) {
                        if (err.response) {
                            console.log(err.response.data)
                            console.log(err.response.status)
                            console.log(err.response.headers)
                        } else {
                            console.log(err)
                        }
                    }
                    } catch (err) {
                        if (err.response) {
                            console.log(err.response.data)
                            console.log(err.response.status)
                            console.log(err.response.headers)
                        } else {
                            console.log(err)
                        }
                    }
            }else{
                alert('Add and save features to save map');
            }
        }
    }

    function getGeoJson() {
        return {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": { "type": "Point", "coordinates": [102.0, 0.5] },
                    "properties": { "prop0": "value0" }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
                        ]
                    },
                    "properties": {
                        "prop0": "value0",
                        "prop1": 0.0
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                            [100.0, 1.0], [100.0, 0.0]]
                        ]

                    },
                    "properties": {
                        "prop0": "value0",
                        "prop1": { "this": "that" }
                    }
                }
            ]
        }
    }

    const fgready = (fgref) => {
        let leafletGEOJSON = new L.GeoJSON(getGeoJson());
        let leafletFG = fgref.current;

        leafletGEOJSON.eachLayer((layer)=> {
            console.log(leafletFG)

    })
    }

    


    
  return (
    <div>

      <MapContainer className="h-[80vh] md:w-auto" center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
            <FeatureGroup ref={fgref} >
              <EditControl position="topleft"/>
            </FeatureGroup> 
          <TileLayer url={osm.openStreet.url} />
      </MapContainer>


        <div className='bg-gray-950 flex h-16 justify-center'>
              <button onClick={handleSave} className='bg-[#00df9a] hover:bg-gray-600 font-bold text-center w-24 px-5 ml-24 my-3 rounded-md'>Save</button>
              <button onClick={handleDownload} className='bg-[#00df9a] hover:bg-gray-700 font-bold text-center w-24 px-5 mx-10 my-3 rounded-md'>Export</button>
        </div>
     

    </div>
     
  )
}

export default NewMap