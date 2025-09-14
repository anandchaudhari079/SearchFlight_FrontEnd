import React from "react";

function TripModeSelector({ tripMode, setTripMode }) {
  return (
    <div className="flex space-x-6 mb-4">
      <div>
        <label className="flex items-center space-x-2 me-3" style={{ color: "black" }}>
          <input
            type="radio"
            name="choice"
            value="oneway"
            checked={tripMode === "oneway"}
            onChange={(e) => setTripMode(e.target.value)}
          />
          <span className="font-medium">Oneway</span>
        </label>
        <label className="flex items-center space-x-2" style={{color:"black"}}>
          <input
            type="radio"
            name="choice"
            value="return"
            checked={tripMode === "return"}
            onChange={(e) => setTripMode(e.target.value)}
          />
          <span className="font-medium">Return</span>
        </label>
      </div>
    </div>
  );
}

export default TripModeSelector;