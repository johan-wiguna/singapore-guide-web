import React from "react"

export default function SidebarItem(props) {
    return (
        <div className="SidebarItem">
            <img className="icon" src={props.icon}></img>
            <div className="name">{props.name}</div>
        </div>
    )
}