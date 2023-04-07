import { useState, useEffect } from 'react'
import SidebarItem from './components/SidebarItem.jsx'
import imgGlobe from './assets/earth.png'
import imgMarker from './assets/marker.png'

export default function App() {
    const [placesElements, setPlacesElements] = useState([])

    useEffect(() => {
        // var xhr = new XMLHttpRequest()
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         var placesData = JSON.parse(xhr.responseText).places

        //         setPlacesElements(placesData.map(place => {
        //             return (
        //                 <div className="menu">
        //                     <div className="name">
        //                         {place.name}
        //                     </div>
        //                 </div>
        //             )
        //         }))
        //     }
        // }
        // xhr.open("GET", "data.json", true)
        // xhr.send()

        $(document).ready(function(){
            $.ajax({url: "data.json", success: res => {
                var placesData = res.places
                setPlacesElements(placesData.map(place => {
                    return (
                        <div className="menu">
                            <div className="name">
                                {place.name}
                            </div>
                        </div>
                    )
                }))

                initMap(placesData);
            }})
        })
    }, [])

    let map;

    async function initMap(placesData) {
        const { Map } = await google.maps.importLibrary("maps")

        map = new Map(document.getElementById("map"), {
            center: { lat: 1.286920, lng: 103.854570 },
            zoom: 15,
        })

        for (var i = 0; i < placesData.length; i++) {
            new google.maps.Marker({
                position: { lat: Number(placesData[i].latitude), lng: Number(placesData[i].langitude) },
                map,
                icon: imgMarker,
            });
        }

        const merlionMarker = new google.maps.Marker({
            position: { lat: 1.286920, lng: 103.854570 },
            map,
            icon: imgMarker,
        });

        const marinaBaySandsMarker = new google.maps.Marker({
            position: { lat: 1.283099, lng: 103.860295 },
            map,
            icon: imgMarker,
        });
    }

    return (
        <div className="App">
            <aside className="sidebar">
                <nav>
                    <SidebarItem
                        key="1"
                        icon={imgGlobe}
                        name="Browse"
                    />
                    <SidebarItem
                        key="2"
                        icon={imgGlobe}
                        name="Suggest Attraction"
                    />
                    <SidebarItem
                        key="3"
                        icon={imgGlobe}
                        name="Videos"
                    />
                    <SidebarItem
                        key="4"
                        icon={imgGlobe}
                        name="Blog"
                    />
                    <SidebarItem
                        key="5"
                        icon={imgGlobe}
                        name="About"
                    />
                </nav>
            </aside>
            
            <div className="sidebar-detail">
                <div className="filter">Filter by favorite</div>
                {placesElements}
            </div>

            <div className="main-content">
                <header>
                    <div className="header-title">Top-rated tourist attractions in Singapore</div>
                    <div className="header-actions">
                        <i className="fa fa-cog"></i>
                        <i className="fa fa-question-circle"></i>
                        <i className="fa fa-times-circle"></i>
                    </div>
                </header>

                <div id="map"></div>
            </div>
        </div>
    )
}