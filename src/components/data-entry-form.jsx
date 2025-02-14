"use client";
import React from "react";

function DataEntryForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    physical_fitness: "",
    diet_preference: "",
    activity_level: "",
    sleep_hours: "",
    mindfulness: "",
    career: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.physical_fitness ||
      formData.physical_fitness < 0 ||
      formData.physical_fitness > 10
    ) {
      newErrors.physical_fitness = "Please enter a value between 0 and 10";
    }

    if (
      !formData.activity_level ||
      formData.activity_level < 0 ||
      formData.activity_level > 10
    ) {
      newErrors.activity_level = "Please enter a value between 0 and 10";
    }

    if (
      !formData.sleep_hours ||
      formData.sleep_hours < 0 ||
      formData.sleep_hours > 24
    ) {
      newErrors.sleep_hours = "Please enter a value between 0 and 24";
    }

    if (
      !formData.mindfulness ||
      formData.mindfulness < 0 ||
      formData.mindfulness > 10
    ) {
      newErrors.mindfulness = "Please enter a value between 0 and 10";
    }

    if (!formData.diet_preference?.trim()) {
      newErrors.diet_preference = "Diet preference is required";
    }

    if (!formData.career?.trim()) {
      newErrors.career = "Career is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        physical_fitness: Number(formData.physical_fitness),
        activity_level: Number(formData.activity_level),
        sleep_hours: Number(formData.sleep_hours),
        mindfulness: Number(formData.mindfulness),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 space-y-4 bg-white rounded-lg shadow"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Physical Fitness (0-10)
        </label>
        <input
          type="number"
          name="physical_fitness"
          value={formData.physical_fitness}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.physical_fitness && (
          <p className="mt-1 text-sm text-red-600">{errors.physical_fitness}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Diet Preference
        </label>
        <input
          type="text"
          name="diet_preference"
          value={formData.diet_preference}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.diet_preference && (
          <p className="mt-1 text-sm text-red-600">{errors.diet_preference}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Activity Level (0-10)
        </label>
        <input
          type="number"
          name="activity_level"
          value={formData.activity_level}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.activity_level && (
          <p className="mt-1 text-sm text-red-600">{errors.activity_level}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sleep Hours (0-24)
        </label>
        <input
          type="number"
          name="sleep_hours"
          value={formData.sleep_hours}
          onChange={handleChange}
          min="0"
          max="24"
          step="0.5"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.sleep_hours && (
          <p className="mt-1 text-sm text-red-600">{errors.sleep_hours}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mindfulness (0-10)
        </label>
        <input
          type="number"
          name="mindfulness"
          value={formData.mindfulness}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.mindfulness && (
          <p className="mt-1 text-sm text-red-600">{errors.mindfulness}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Career
        </label>
        <input
          type="text"
          name="career"
          value={formData.career}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.career && (
          <p className="mt-1 text-sm text-red-600">{errors.career}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

function DataEntryFormStory() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <DataEntryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

export default DataEntryForm;