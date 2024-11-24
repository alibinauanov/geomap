import React from "react";
import { groupByCity } from "./utils";
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";


function AirportBubble(props){
    const {width, height, countries, routes, selectedAirline} = props;
    console.log(groupByCity(routes));
    if(selectedAirline){
        // Filter routes based on the selected airline
        let selectedRoutes = routes.filter(a => a.AirlineID === selectedAirline);
        let cities = groupByCity(selectedRoutes);
        cities = cities.sort((a, b) => a.Count - b.Count);

        console.log("Cities for the selected airline:", cities);
        let radius;

        // Create a linear scale for bubble radius based on city route counts
        const radiusScale = scaleLinear()
            .range([2, width * 0.15])
            .domain([min(cities, (d) => d.Count), max(cities, (d) => d.Count)]);
        console.log("Radius scale for selected airline:", radiusScale.domain(), radiusScale.range());

        // Create a force simulation to arrange bubbles
        const simulation = forceSimulation(cities)
            .velocityDecay(0.2)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide((d) => radiusScale(d.Count)))
            .stop();

        for (let i = 0; i < 200; i++) simulation.tick();

        console.log("Cities with positions:", cities);

        return (
            <g>
                {/* Map through the cities and render circles */}
                {cities.map((d, idx) => {
                    const isTop5 = idx >= cities.length - 5;

                    return (
                        <g key={idx} transform={`translate(${d.x}, ${d.y})`}>
                            {/* Circle for the city */}
                            <circle
                                r={radiusScale(d.Count)}
                                fill={isTop5 ? "#ADD8E6" : "#2a5599"}
                                stroke="black"
                                strokeWidth="2"
                            />
                            {/* Attach the names of the top 5 cities to the bubbles */}
                            {isTop5 && (
                                <text
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
                })}
            </g>
        );
        
    } else {
        // Process all routes if no airline is selected
        let cities = groupByCity(routes);
        cities = cities.sort((a, b) => a.Count - b.Count);

        // Create a linear scale for bubble radius
        const radiusScale = scaleLinear()
            .range([2, width * 0.15])
            .domain([min(cities, (d) => d.Count), max(cities, (d) => d.Count)]);

        // Create a force simulation to arrange bubbles
        const simulation = forceSimulation(cities)
            .velocityDecay(0.2)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide((d) => radiusScale(d.Count)))
            .stop();

        for (let i = 0; i < 200; i++) simulation.tick();

        // Render the bubbles for all routes
        return <g>
            {cities.map((d, idx) => {
                    const isTop5 = idx >= cities.length - 5;
                    return (
                        <g key={idx} transform={`translate(${d.x}, ${d.y})`}>
                            {/* Circle for the city */}
                            <circle
                                r={radiusScale(d.Count)}
                                fill={isTop5 ? "#ADD8E6" : "#2a5599"}
                                stroke="black"
                                strokeWidth="2"
                            />
                            {/* Attach the names of the top 5 cities to the bubbles */}
                            {isTop5 && (
                                <text
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
                })}
        </g>
    }
}

export { AirportBubble }