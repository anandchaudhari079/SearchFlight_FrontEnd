import React from "react";

function AirportSelector({
  departureAirports,
  arrivalAirports,
  origin,
  setOrigin,
  destination,
  setDestination,
  passengerType,
  setPassengerType,
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <label className="block text-sm mb-2 font-semibold me-3 mt-1 mb-1" style={{ color: "black" }}>
        Origin
      </label>
      <select
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="w-full p-2 border rounded-lg me-3 mt-1 mb-1"
        style={{ backgroundColor: "lightcyan" }}
      >
        <option value="">Select origin</option>
        {departureAirports.map((airport, index) => (
          <option key={index} value={airport}>
            {airport}
          </option>
        ))}
      </select>
      <label className="block text-sm font-semibold me-3 mt-1 mb-1" style={{color:"black"}}>Destination</label>
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full p-2 border rounded-lg me-3 mt-1 mb-1"
        style={{ backgroundColor: "lightcyan" }}
      >
        <option value="">Select destination</option>
        {arrivalAirports &&
          arrivalAirports.map((airport, index) => (
            <option key={index} value={airport}>
              {airport}
            </option>
          ))}
      </select>
    </div>
  );
}

export default AirportSelector;