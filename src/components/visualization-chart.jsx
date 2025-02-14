"use client";
import React from "react";

function VisualizationChart({ data = [], width = 600, height = 400 }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    return innerWidth / 10;
  }, [innerWidth]);

  const yScale = useMemo(() => {
    return innerHeight / 10;
  }, [innerHeight]);

  const decisionBoundary = useMemo(() => {
    const boundary = [];
    for (let x = 0; x <= 10; x += 0.5) {
      for (let y = 0; y <= 10; y += 0.5) {
        const healthScore = x * 0.3 + y * 0.25;
        boundary.push({
          x,
          y,
          isHealthy: healthScore >= 3.5,
        });
      }
    }
    return boundary;
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">
        Health Prediction Visualization
      </h3>
      <div className="relative" style={{ width, height }}>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {decisionBoundary.map((point, i) => (
              <rect
                key={i}
                x={point.x * xScale}
                y={point.y * yScale}
                width={xScale * 0.5}
                height={yScale * 0.5}
                fill={
                  point.isHealthy
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(239, 68, 68, 0.1)"
                }
                className="transition-colors duration-200"
                onMouseEnter={() =>
                  setSelectedRegion({
                    x: point.x,
                    y: point.y,
                    isHealthy: point.isHealthy,
                  })
                }
                onMouseLeave={() => setSelectedRegion(null)}
              />
            ))}

            {data.map((point, i) => (
              <circle
                key={i}
                cx={point.physical_fitness * xScale}
                cy={point.mindfulness * yScale}
                r={6}
                fill={point.isHealthy ? "#22c55e" : "#ef4444"}
                stroke="white"
                strokeWidth={2}
                className="transition-all duration-200 hover:r-8"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}

            <line
              x1={0}
              y1={innerHeight}
              x2={innerWidth}
              y2={innerHeight}
              stroke="#666"
              strokeWidth={1}
            />
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={innerHeight}
              stroke="#666"
              strokeWidth={1}
            />

            {Array.from({ length: 11 }).map((_, i) => (
              <text
                key={`x-${i}`}
                x={i * xScale}
                y={innerHeight + 20}
                textAnchor="middle"
                className="text-sm fill-gray-600"
              >
                {i}
              </text>
            ))}

            {Array.from({ length: 11 }).map((_, i) => (
              <text
                key={`y-${i}`}
                x={-10}
                y={innerHeight - i * yScale}
                textAnchor="end"
                alignmentBaseline="middle"
                className="text-sm fill-gray-600"
              >
                {i}
              </text>
            ))}

            <text
              x={innerWidth / 2}
              y={innerHeight + 35}
              textAnchor="middle"
              className="text-sm font-medium fill-gray-700"
            >
              Physical Fitness Score
            </text>

            <text
              transform={`rotate(-90) translate(${-innerHeight / 2}, ${-30})`}
              textAnchor="middle"
              className="text-sm font-medium fill-gray-700"
            >
              Mindfulness Score
            </text>
          </g>
        </svg>

        {(hoveredPoint || selectedRegion) && (
          <div
            className="absolute bg-white shadow-lg rounded-lg p-3 text-sm"
            style={{
              left:
                (hoveredPoint?.physical_fitness || selectedRegion?.x) * xScale +
                margin.left +
                10,
              top:
                (hoveredPoint?.mindfulness || selectedRegion?.y) * yScale +
                margin.top -
                40,
            }}
          >
            {hoveredPoint ? (
              <>
                <p>Physical Fitness: {hoveredPoint.physical_fitness}</p>
                <p>Mindfulness: {hoveredPoint.mindfulness}</p>
                <p>
                  Status:{" "}
                  {hoveredPoint.isHealthy ? "Healthy" : "Needs Improvement"}
                </p>
              </>
            ) : (
              <>
                <p>
                  Region:{" "}
                  {selectedRegion.isHealthy ? "Healthy" : "Needs Improvement"}
                </p>
                <p>Physical Fitness: {selectedRegion.x.toFixed(1)}</p>
                <p>Mindfulness: {selectedRegion.y.toFixed(1)}</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Healthy</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Needs Improvement</span>
        </div>
      </div>
    </div>
  );
}

function VisualizationChartStory() {
  const sampleData = [
    { physical_fitness: 8, mindfulness: 7, isHealthy: true },
    { physical_fitness: 3, mindfulness: 4, isHealthy: false },
    { physical_fitness: 6, mindfulness: 8, isHealthy: true },
    { physical_fitness: 4, mindfulness: 3, isHealthy: false },
    { physical_fitness: 9, mindfulness: 9, isHealthy: true },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Visualization</h3>
        <VisualizationChart data={sampleData} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Empty Visualization</h3>
        <VisualizationChart data={[]} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Custom Size Visualization
        </h3>
        <VisualizationChart data={sampleData} width={800} height={500} />
      </div>
    </div>
  );
}

export default VisualizationChart;