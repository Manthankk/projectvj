"use client";
import React from "react";
import VisualizationChart from "../components/visualization-chart";
import DataEntryForm from "../components/data-entry-form";

function MainComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [stats, setStats] = useState(null);
  const [visualizationData, setVisualizationData] = useState([]);
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/get-statistics", { method: "POST" });
      if (!response.ok) {
        throw new Error(`Error fetching statistics: ${response.status}`);
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
      setError("Unable to load statistics. Please try again later.");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/predict-health", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error making prediction: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result);
      setVisualizationData((prev) => [
        ...prev,
        {
          physical_fitness: formData.physical_fitness,
          mindfulness: formData.mindfulness,
          isHealthy: result.prediction,
        },
      ]);
      fetchStats();
    } catch (err) {
      console.error("Failed to make prediction:", err);
      setError("Unable to process your data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fitness & Lifestyle Prediction Model
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get insights about your health based on your lifestyle choices. Our
            advanced machine learning model analyzes your physical fitness,
            diet, sleep patterns, and more to provide personalized health
            predictions.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-circle text-red-400"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Enter Your Health Data
          </h2>
          <DataEntryForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {prediction && (
          <div className="transition-all duration-300 ease-in-out">
            <PredictionResult
              prediction={prediction.prediction}
              confidenceScore={prediction.confidenceScore}
            />
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Health Prediction Visualization
          </h2>
          <VisualizationChart data={visualizationData} />
        </div>

        {stats && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Model Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">
                  Total Predictions
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.totalPredictions}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">
                  Average Confidence
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {(stats.averageConfidence * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm font-medium text-indigo-600">
                  Model Accuracy
                </p>
                <p className="text-2xl font-bold text-indigo-900">
                  {(stats.accuracyRate * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-600">
                  Healthy Ratio
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {(stats.healthyRatio * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;