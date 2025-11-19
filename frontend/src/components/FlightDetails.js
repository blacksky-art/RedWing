import { useState } from "react";
import CheckListItem from "./CheckListItem";
import API from "../api";

export default function FlightDetails({ flight, onClose, onDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFlight = async () => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      setIsDeleting(true);
      try {
        await API.delete(`/${flight._id}`);
        alert("Flight deleted successfully!");
        onDeleted();
        onClose();
      } catch (error) {
        alert("Error deleting flight: " + error.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div style={{ marginTop: 20, padding: 20, border: "1px solid #ccc" }}>
      <h2>Flight Details</h2>

      <p><b>Flight Number:</b> {flight.flightNumber}</p>
      <p><b>Date:</b> {new Date(flight.date).toLocaleDateString()}</p>
      <p><b>Filed By:</b> {flight.filedBy}</p>
      <p><b>Filing Time:</b> {flight.filingTime ? new Date(flight.filingTime).toLocaleString() : ''}</p>
      <p><b>Departure Location:</b> {flight.departureLocation}</p>
      <p><b>Departure Time:</b> {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : ''}</p>
      <p><b>Arrival Location:</b> {flight.arrivalLocation}</p>
      <p><b>Estimated Arrival Time:</b> {flight.estimatedArrivalTime ? new Date(flight.estimatedArrivalTime).toLocaleString() : ''}</p>

      <h3>Pre-Flight Checklist</h3>
      {flight.checklist.map((item) => (
        <CheckListItem
          key={item._id}
          flightId={flight._id}
          item={item}
        />
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={onClose} style={{ marginRight: 10 }}>Close</button>
        <button
          onClick={deleteFlight}
          disabled={isDeleting}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            padding: "8px 16px",
            cursor: isDeleting ? "not-allowed" : "pointer"
          }}
        >
          {isDeleting ? "Deleting..." : "Delete Flight"}
        </button>
      </div>
    </div>
  );
}
