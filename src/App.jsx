import { useState, useEffect } from 'react'
import SidebarItem from './components/SidebarItem.jsx'
import globe from './assets/earth.png'

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
            }})
        })
    }, [])

    console.log("placesElements: ", placesElements)

    return (
        <div className="App">
            <aside className="sidebar">
                <nav>
                    <SidebarItem
                        key="1"
                        icon={globe}
                        name="Browse"
                    />
                    <SidebarItem
                        key="2"
                        icon={globe}
                        name="Suggest Attraction"
                    />
                    <SidebarItem
                        key="3"
                        icon={globe}
                        name="Videos"
                    />
                    <SidebarItem
                        key="4"
                        icon={globe}
                        name="Blog"
                    />
                    <SidebarItem
                        key="5"
                        icon={globe}
                        name="About"
                    />
                </nav>
            </aside>
            
            <div className="sidebar-detail">
                <div className="filter">Filter by favorite</div>
                {placesElements}
            </div>
        </div>
    )
}