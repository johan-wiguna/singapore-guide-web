import React from "react"

export default function DetailPanel(props) {
    let data = props.data

    let dataShown
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == props.idSelected) {
            dataShown = data[i]
        }
    }

    return (
        <div className="DetailPanel">
            <img src={dataShown.image} alt="" />
            <div className="name">
                {dataShown.name}
            </div>

            <div className="detail">
                <p className="overview">
                    {dataShown.overview}
                </p>

                <p className="description">
                    {dataShown.description}
                </p>

                <div className="location-container">
                    <i className="fa fa-map-marker icon"></i>
                    <div className="address">
                        {dataShown.address}
                    </div>
                </div>

                <div className="web-container">
                    <i className="fa fa-globe icon"></i>
                    <a className="web" href={dataShown.website} target="_blank">
                        {dataShown.website}
                    </a>
                </div>
            </div>
        </div>
    )
}