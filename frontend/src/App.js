import { useState } from "react";
import FlightForm from "./components/FlightForm.js";
import FlightList from "./components/FlightList";
import FlightDetails from "./components/FlightDetails";

function App() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFlightDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pre-Flight Checklist App</h1>

      <FlightForm onCreated={() => setSelectedFlight(null)} />

      <FlightList onSelect={setSelectedFlight} refreshTrigger={refreshTrigger} />

      {selectedFlight && (
        <FlightDetails
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
          onDeleted={handleFlightDeleted}
        />
      )}
    </div>
  );
}

export default App;
