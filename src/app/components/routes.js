import React from "react";

function Routes(props) {
    const { projection, routes, selectedAirlineID } = props;

    if (!selectedAirlineID) {
        return <g></g>;
    }

    const selectedRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);

    return (
        <g>
            {selectedRoutes.map((route, index) => {
                const [x1, y1] = projection([route.SourceLongitude, route.SourceLatitude]) || [NaN, NaN];
                const [x2, y2] = projection([route.DestLongitude, route.DestLatitude]) || [NaN, NaN];

                if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return null;

                return (
                    <line
                        key={index}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#992a5b"
                        strokeWidth={0.3}
                        opacity={0.35}
                    />
                );
            })}
        </g>
    );
}

export { Routes };
