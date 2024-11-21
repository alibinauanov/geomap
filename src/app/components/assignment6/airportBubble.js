import React from "react";
import { groupByCity } from "./utils";
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";


function AirportBubble(props){
    // console.log(groupByCity(routes));
    const { width, height, routes, selectedAirline } = props;

    // Helper function to create bubble chart
    const createBubbleChart = (cities) => {
        // Sort cities by Count ascendingly
        cities.sort((a, b) => a.Count - b.Count);

        // Define a scale for the radius of bubbles
        const radiusScale = scaleLinear()
            .domain([min(cities, (d) => d.Count), max(cities, (d) => d.Count)])
            .range([2, width * 0.15]);

        // Force simulation for positioning the bubbles
        forceSimulation(cities)
            .velocityDecay(0.2)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide((d) => radiusScale(d.Count) + 2))
            .tick(200);

        // Return circles and labels
        return cities.map((d, idx) => {
            const isTop5 = idx >= cities.length - 5; // Top 5 hubs
            return (
                <g key={idx}>
                    <circle
                        cx={d.x}
                        cy={d.y}
                        r={radiusScale(d.Count)}
                        fill={isTop5 ? "#ADD8E6" : "#2a5599"}
                        stroke="black"
                        strokeWidth="2"
                    />
                    {isTop5 && (
                        <text
                            x={d.x}
                            y={d.y}
                            style={{
                                textAnchor: "middle",
                                stroke: "pink",
                                strokeWidth: "0.5em",
                                fill: "#992a2a",
                                fontSize: 16,
                                fontFamily: "cursive",
                                paintOrder: "stroke",
                                strokeLinejoin: "round",
                            }}
                        >
                            {d.City}
                        </text>
                    )}
                </g>
            );
        });
    };

    if (selectedAirline) {
        // Case when selectedAirline is not null
        const selectedRoutes = routes.filter((route) => route.AirlineID === selectedAirline);
        const cities = groupByCity(selectedRoutes);
        return <g>{createBubbleChart(cities)}</g>;
    } else {
        // Case when selectedAirline is null
        const cities = groupByCity(routes);
        return <g>{createBubbleChart(cities)}</g>;
    }
}

export { AirportBubble }