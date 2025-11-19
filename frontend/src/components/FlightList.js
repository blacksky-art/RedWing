import { useEffect, useState } from "react";
import API from "../api";

export default function FlightList({ onSelect }) {
  const [flights, setFlights] = useState([]);

  const load = async () => {
    const res = await API.get("/");
    setFlights(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>All Flights</h2>

      {flights.map((f) => (
        <div key={f._id} style={{ marginBottom: 10 }}>
          <b>{f.flightNumber}</b>
          <button onClick={() => onSelect(f)}>View</button>
        </div>
      ))}
    </div>
  );
}

