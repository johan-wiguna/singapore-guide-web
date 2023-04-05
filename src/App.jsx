import { useState } from 'react'
import SidebarItem from './components/SidebarItem.jsx'
import globe from './assets/earth.png'

export default function App() {
    const [count, setCount] = useState(0)

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
        </div>
    )
}