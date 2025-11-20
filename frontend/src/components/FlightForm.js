import { useState } from "react";
import API from "../api";

export default function FlightForm({ onCreated }) {
  const [formData, setFormData] = useState({
    flightNumber: "",
    filedBy: "",
    filingTime: "",
    departureLocation: "",
    departureTime: "",
    arrivalLocation: "",
    estimatedArrivalTime: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const createFlight = async () => {
    if (!validateForm()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await API.post("/", formData);

      setFormData({
        flightNumber: "",
        filedBy: "",
        filingTime: "",
        departureLocation: "",
        departureTime: "",
        arrivalLocation: "",
        estimatedArrivalTime: ""
      });

      if (onCreated) onCreated();
    } catch (err) {
      setError("Failed to create flight. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Create Flight</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px"
        }}
      >
        <div>
          <label htmlFor="flightNumber">Flight Number:</label>
          <input
            id="flightNumber"
            type="text"
            name="flightNumber"
            placeholder="e.g., F102"
            value={formData.flightNumber}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="filedBy">Filed By:</label>
          <input
            id="filedBy"
            type="text"
            name="filedBy"
            placeholder="Officer name"
            value={formData.filedBy}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="filingTime">Filing Time:</label>
          <input
            id="filingTime"
            type="datetime-local"
            name="filingTime"
            value={formData.filingTime}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="departureLocation">Departure Location:</label>
          <input
            id="departureLocation"
            type="text"
            name="departureLocation"
            placeholder="City / Coordinates"
            value={formData.departureLocation}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="departureTime">Departure Time:</label>
          <input
            id="departureTime"
            type="datetime-local"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="arrivalLocation">Arrival Location:</label>
          <input
            id="arrivalLocation"
            type="text"
            name="arrivalLocation"
            placeholder="City / Coordinates"
            value={formData.arrivalLocation}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="estimatedArrivalTime">Estimated Arrival Time:</label>
          <input
            id="estimatedArrivalTime"
            type="datetime-local"
            name="estimatedArrivalTime"
            value={formData.estimatedArrivalTime}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={createFlight} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Flight"}
        </button>
      </div>
    </div>
  );
}
