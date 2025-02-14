"use client";
import React from "react";

function PredictionResult({ prediction, confidenceScore }) {
  const isHealthy = prediction;
  const confidencePercentage = (confidenceScore * 100).toFixed(1);

  const getRecommendation = () => {
    if (isHealthy) {
      return "Great job! Keep maintaining your healthy lifestyle. Consider setting new wellness goals to further improve your health journey.";
    }
    return "Consider making lifestyle adjustments. Focus on improving your physical activity, sleep quality, and stress management. Small changes can lead to significant health benefits.";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isHealthy ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <i
              className={`fas ${
                isHealthy ? "fa-check text-green-500" : "fa-times text-red-500"
              } text-xl`}
            ></i>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">
              {isHealthy ? "Healthy" : "Needs Improvement"}
            </h2>
            <div className="flex items-center mt-1">
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    isHealthy ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${confidencePercentage}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {confidencePercentage}% confident
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
        <p className="text-gray-600">{getRecommendation()}</p>
      </div>
    </div>
  );
}

function PredictionResultStory() {
  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Healthy Prediction</h3>
        <PredictionResult prediction={true} confidenceScore={0.92} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Needs Improvement Prediction
        </h3>
        <PredictionResult prediction={false} confidenceScore={0.78} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Low Confidence Prediction
        </h3>
        <PredictionResult prediction={true} confidenceScore={0.45} />
      </div>
    </div>
  );
}

export default PredictionResult;