import { useState } from 'react'
import SidebarItem from './components/SidebarItem.jsx'
import globe from './assets/earth.png'

export default function App() {
    var placesData
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            placesData = JSON.parse(xhr.responseText)
            console.log(placesData)
        }
    }
    xhr.open("GET", "data.json", true)
    xhr.send()

    return (
        <div className="App">
            <aside className="sidebar">
                <SidebarItem
                    icon={globe}
                    name="Browse"
                />
                <SidebarItem
                    icon={globe}
                    name="Suggest Attraction"
                />
                <SidebarItem
                    icon={globe}
                    name="Videos"
                />
                <SidebarItem
                    icon={globe}
                    name="Blog"
                />
                <SidebarItem
                    icon={globe}
                    name="About"
                />
            </aside>
            
            <div className="sidebar-detail">
                <div className="menu">Merlion</div>
                <div className="menu">Marina Bay Sands</div>
                <div className="menu">Merlion</div>
            </div>
        </div>
    )
}