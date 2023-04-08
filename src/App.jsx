import { useState, useEffect } from 'react'
import SidebarItem from './components/SidebarItem.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import imgGlobe from './assets/globe.png'
import imgMerlion from './assets/merlion.png'
import imgVideo from './assets/video.png'
import imgBlog from './assets/blog.png'
import imgInfo from './assets/info.png'
import imgMarker from './assets/marker_small.png'
import imgMarkerLarge from './assets/marker.png'

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

        // Fetch data from data.json with AJAX
        $(document).ready(function(){
            $.ajax({url: "data.json", success: res => {
                var placesData = res.places
                setData(placesData)
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

    // Integrate Google Maps API
    let map;

    async function initMap(placesData) {
        const { Map } = await google.maps.importLibrary("maps")

        map = new Map(document.getElementById("map"), {
            center: { lat: 1.286920, lng: 103.854570 },
            zoom: 15,
        })

        let markers = []

        for (var i = 0; i < placesData.length; i++) {
            let marker = new google.maps.Marker({
                id: placesData[i].id,
                position: {
                    lat: Number(placesData[i].latitude),
                    lng: Number(placesData[i].langitude)
                },
                map,
                icon: imgMarker,
                name: placesData[i].name,
                description: placesData[i].description,
                address: placesData[i].address,
                label: {
                    text: placesData[i].name,
                    color: "white",
                    className: "marker-label"
                }
            })

            marker.addListener("click", () => {
                map.setZoom(17)
                map.setCenter(marker.getPosition())
                setIdSelected(marker.id)
            })

            marker.addListener("mouseover", () => {
                marker.setIcon(imgMarkerLarge)
                var label = marker.getLabel()
                label.className = "marker-label-selected"
                label.text = marker.name + '\n' + marker.address
                marker.setLabel(label)
            })

            marker.addListener("mouseout", () => {
                marker.setIcon(imgMarker)
                var label = marker.getLabel()
                label.className = "marker-label"
                label.text = marker.name
                marker.setLabel(label)
            })

            markers.push(marker)
        }
    }

    function openDetail(obj) {
        console.log("map", map)
        console.log("obj", obj)
        if (obj.hasOwnProperty("attractions")) {

        }
        setIdSelected(obj.id)
    }

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