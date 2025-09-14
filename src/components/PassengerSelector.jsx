import React from "react";

function PassengerSelector({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium me-1" style={{color:"black"}}>Passengers:</label>
      <br />
      <label className="block mb-2 font-medium" style={{color:"black"}}>Adult(s):</label>
      <input
        type="number"
        min={1}
        value={adults}
        onChange={(e) => setAdults(Number(e.target.value))}
        className="w-10 p-2 border rounded-lg text-center"
        style={{ backgroundColor: "lightcyan" }}
      />
      <label className="block mb-2 font-medium ms-3" style={{color:"black"}}>Children:</label>
      <input
        type="number"
        value={children}
        onChange={(e) => setChildren(Number(e.target.value))}
        className="w-10 p-2 border rounded-lg text-center"
        style={{ backgroundColor: "lightcyan" }}
      />
      <label className="block mb-2 font-medium ms-3" style={{color:"black"}}>Infant(s):</label>
      <input
        type="number"
        value={infants}
        onChange={(e) => setInfants(Number(e.target.value))}
        className="w-10 p-2 border rounded-lg text-center"
        style={{ backgroundColor: "lightcyan" }}
      />
    </div>
  );
}

export default PassengerSelector;