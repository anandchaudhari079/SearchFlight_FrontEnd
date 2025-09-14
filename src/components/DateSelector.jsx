import React from "react";

function DateSelector({
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  tripMode,
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <label className="block mb-2 font-medium me-3" style={{color:"black"}}>Select departure date:</label>
      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        className="w-full p-2 border rounded-lg me-3"
        style={{ backgroundColor: "lightcyan" }}
      />
      {tripMode === "return" && (
        <>
          <label className="block mb-2 font-medium me-3" style={{color:"black"}}>Select return date:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full p-2 border rounded-lg me-3"
            style={{ backgroundColor: "lightcyan" }}
          />
        </>
      )}
    </div>
  );
}

export default DateSelector;