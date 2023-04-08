import { useState, useEffect } from 'react'
import SidebarItem from './components/SidebarItem.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import imgGlobe from './assets/globe.png'
import imgMerlion from './assets/merlion.png'
import imgVideo from './assets/video.png'
import imgBlog from './assets/blog.png'
import imgInfo from './assets/info.png'
import imgMarker from './assets/marker_small.png'
import imgMarkerLarge from './assets/marker_large.png'

export default function App() {
    const [placesElements, setPlacesElements] = useState([])
    const [idSelected, setIdSelected] = useState(null)
    const [data, setData] = useState([])

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

        // Fetch data from data.json with AJAX (jQuery)
        $(document).ready(function(){
            $.ajax({url: "data.json", success: res => {
                var placesData = res.places
                // Set data state with the data fetched from data.json
                setData(placesData)
                // Create an array of elements containing attractions of each place (if any)
                setPlacesElements(placesData.map(place => {
                    let attractionsElements = []
                    if (place.hasOwnProperty("attractions")) {
                        for (var i = 0; i < place.attractions.length; i++) {
                            attractionsElements.push(<div className="attraction-name">{place.attractions[i]}</div>)
                        }
                    }

                    return (
                        <div className="menu">
                            <div className="name" onClick={() => openDetail(place)}>
                                {place.name}
                                {
                                    place.hasOwnProperty('attractions')
                                    &&
                                    <i className="fa fa-caret-down"></i>
                                }
                            </div>
                            <div className="attractions">
                                {attractionsElements}
                            </div>
                        </div>
                    )
                }))

                initMap(placesData);
            }})
        })
    }, [])

    useEffect(() => {
        setPlacesElements(data.map(place => {
            let attractionsElements = []
            if (place.hasOwnProperty("attractions")) {
                for (var i = 0; i < place.attractions.length; i++) {
                    attractionsElements.push(<div className="attraction-name">{place.attractions[i]}</div>)
                }
            }

            return (
                <div className="menu">
                    <div className={`name ${idSelected == place.id ? "menu-selected" : ""}`} onClick={() => openDetail(place)}>
                        {place.name}
                        {
                            place.hasOwnProperty('attractions')
                            &&
                            <i className={`fa ${idSelected == place.id ? "fa-caret-up" : "fa-caret-down"}`}></i>
                        }
                    </div>
                    <div className={`attractions ${idSelected == place.id ? "attractions-active" : ""}`}>
                        {attractionsElements}
                    </div>
                </div>
            )
        }))
    }, [idSelected])

    // Integrate Google Maps API (based on Google Maps API documentation)
    let map;

    async function initMap(placesData) {
        const { Map } = await google.maps.importLibrary("maps")

        // Set the center of the map, I set the center on Merlion
        map = new Map(document.getElementById("map"), {
            center: { lat: 1.286920, lng: 103.854570 },
            zoom: 15,
        })

        // Create marker for each place and join it into an array
        let markers = []

        for (var i = 0; i < placesData.length; i++) {
            // If place's name is longer than 18 characters, show only 18 characters
            let name = placesData[i].name
            if (name.length >= 19) {
                name = name.substring(0, 19) + ".."
            }

            let marker = new google.maps.Marker({
                id: placesData[i].id,
                position: {
                    lat: Number(placesData[i].latitude),
                    lng: Number(placesData[i].langitude)
                },
                map,
                icon: {
                    url: imgMarker,
                    labelOrigin: new google.maps.Point(75, 22)
                },
                name: placesData[i].name,
                description: placesData[i].description,
                address: placesData[i].address,
                label: {
                    text: name,
                    color: "white",
                    className: "marker-label"
                }
            })

            // Set idSelected if a marker is clicked, so the detail panel will be shown
            marker.addListener("click", () => {
                map.setZoom(17)
                map.setCenter(marker.getPosition())
                setIdSelected(marker.id)
            })

            // Enlarge marker if it's hovered
            marker.addListener("mouseover", () => {
                marker.setIcon({
                    url: imgMarkerLarge,
                    labelOrigin: new google.maps.Point(130, 92)
                })
                var label = marker.getLabel()
                label.className = "marker-label-selected"
                label.text = marker.name + '\n' + marker.address
                marker.setLabel(label)
            })

            // Set marker back to normal if it's not hovered
            marker.addListener("mouseout", () => {
                marker.setIcon({
                    url: imgMarker,
                    labelOrigin: new google.maps.Point(75, 22),
                })
                var label = marker.getLabel()
                label.className = "marker-label"

                // If place's name is longer than 18 characters, show only 18 characters
                let name = marker.name
                if (name.length >= 19) {
                    name = name.substring(0, 19) + ".."
                }
                label.text = name
                marker.setLabel(label)
            })

            markers.push(marker)
        }
    }

    // Function to set idSelected that determines which data has to be shown on the detail panel on the left
    function openDetail(obj) {
        setIdSelected(obj.id)
    }

    // Function to set idSelected to null which causes the detail panel to be hidden
    function closeDetail() {
        setIdSelected(null)
    }

    return (
        <div className="App">
            <aside className="sidebar">
                <nav>
                    <SidebarItem
                        key="1"
                        icon={imgGlobe}
                        name="Browse"
                        selected="true"
                    />
                    <SidebarItem
                        key="2"
                        icon={imgMerlion}
                        name="Suggest Attraction"
                        selected="false"
                    />
                    <SidebarItem
                        key="3"
                        icon={imgVideo}
                        name="Videos"
                        selected="false"
                    />
                    <SidebarItem
                        key="4"
                        icon={imgBlog}
                        name="Blog"
                        selected="false"
                    />
                    <SidebarItem
                        key="5"
                        icon={imgInfo}
                        name="About"
                        selected="false"
                    />
                </nav>
            </aside>
            
            <div className="sidebar-detail">
                <div className="filter">
                    <div className="filter-category">Filter by favorite</div>
                    <i className="fa fa-caret-down"></i>
                </div>
                {placesElements}
            </div>

            <div className="main-content">
                <header>
                    <div className="header-title">Top-rated tourist attractions in Singapore</div>
                    <div className="header-actions">
                        <i className="fa fa-cog"></i>
                        <i className="fa fa-question-circle"></i>
                        <i className="fa fa-times-circle" onClick={closeDetail}></i>
                    </div>
                </header>

                <div className="place-container">
                    <div id="map"></div>

                    {
                        data.length > 0 && idSelected !== null &&
                        <DetailPanel
                            idSelected={idSelected}
                            data={data}
                        />
                    }
                </div>
            </div>
        </div>
    )
}