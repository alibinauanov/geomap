import React, { useCallback } from "react";
import { max as d3Max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedAirlineID, setSelectedAirlineID } = props;

    const xScale = scaleLinear().domain([0, 2500]).range([0, width]);
    const yScale = scaleBand().domain(data.map(d => d.AirlineName)).range([0, height]).padding(0.2);
    const color = (d) => d.AirlineID === selectedAirlineID ? "#992a5b" : "#2a5599";

    const onMouseOver = useCallback((d) => {
        if (selectedAirlineID !== d.AirlineID) {
            setSelectedAirlineID(d.AirlineID);
        }
    }, [selectedAirlineID, setSelectedAirlineID]);

    const onMouseOut = useCallback(() => {
        setSelectedAirlineID(null);
    }, [setSelectedAirlineID]);

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {data.map((d, index) => (
                <rect
                    key={d.AirlineID || index}
                    x={0}
                    y={yScale(d.AirlineName)}
                    width={xScale(d.Count)}
                    height={yScale.bandwidth()}
                    fill={color(d)}
                    stroke="black"
                    strokeWidth={1}
                    onMouseOver={() => onMouseOver(d)}
                    onMouseOut={onMouseOut}
                />
            ))}

            <XAxis xScale={xScale} width={width} height={height} />
            <YAxis yScale={yScale} height={height} offsetX={offsetX} />
        </g>
    );
}
