import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import TripModeSelector from "./TripModeSelector";
import AirportSelector from "./AirportSelector";
import DateSelector from "./DateSelector";
import PassengerSelector from "./PassengerSelector";
import FareTypeSelector from "./FareTypeSelector";

function SearchFlight() {
  const [tripMode, setTripMode] = useState("oneway");
  const [departureAirports, setDepartureAirports] = useState([
    "Banglore",
    "Chennai",
    "Delhi",
    "Kolkata",
    "Mumbai",
  ]);
  const [arrivalAirports, setArrivalAirports] = useState([]);
  const [origin, setOrigin] = useState("Mumbai");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);  
 const [fareType, setFareType] = useState("Regular");

  useEffect(() => {
    const fetchOrigin = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7061/api/SearchFlight/GetOriginAirports"
        );
        setDepartureAirports(res.data);
      } catch (err) {
        console.error("Error fetching origin airports:", err);
        setDepartureAirports([]);
        alert(err.response?.data || err.message);
      }
    };

    fetchOrigin();
  }, []);

  useEffect(() => {
    if (!origin) {
      setArrivalAirports([]);
      return;
    }
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7061/api/SearchFlight/GetDestinationAirports?originAirport=${origin}`
        );
        setArrivalAirports(res.data);
      } catch (err) {
        console.error("Error fetching destination airports:", err);
        setArrivalAirports([]);
        alert(err.response?.data || err.message);
      }
    };

    fetchDestinations();
  }, [origin]);

  const handleSearch = () => {
    if (!origin) {
      alert("Origin cannot be empty");
      return;
    }
    if (!destination) {
      alert("Destination cannot be empty");
      return;
    }
    if (!departureDate) {
      alert("Departure date canot be empty");
      return;
    }
    if (tripMode === "return" && !returnDate) {
      alert("Please select a return date.");
      return;
    }
    if (origin === destination) {
      alert("Origin and destination cannot be the same.");
      return;
    }
    if (adults === 0) {
      alert("Please select number of adults. Atleast one adult must be there");
      return;
    }

    const searchData = {
      tripMode: tripMode,
      origin: origin,
      destination: destination,
      departureDate: departureDate,
      returnDate: tripMode === "return" ? returnDate : null,
      adults: adults,
      children: children,
      infants: infants,
    };

    alert(
      "Trip mode=" +
        searchData.tripMode +
        "\nOrigin=" +
        searchData.origin +
        "\nDestination=" +
        searchData.destination +
        "\nDeparture date=" +
        searchData.departureDate +
        (searchData.returnDate ? "\nReturn date = " + searchData.returnDate : "") +
        "\nNumber of adults=" +
        searchData.adults +
        (searchData.children > 0 ? "\nNumber of children=" + searchData.children : "") +
        (searchData.infants > 0 ? "\nNumber of infants=" + searchData.infants : "")
    );
  };

  return (
    <Container
      className="container-main" 
    >
      <h2 className="header-main" style={{ color: "black" }}>
        ✈️ Search Flight
      </h2>
      <div className="border rounded-lg p-4 container-sub">
      <TripModeSelector tripMode={tripMode} setTripMode={setTripMode} />
      <AirportSelector
        departureAirports={departureAirports}
        arrivalAirports={arrivalAirports}
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
      />
      <DateSelector
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        tripMode={tripMode}
      />
      <PassengerSelector
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        infants={infants}
        setInfants={setInfants}
      />
      <FareTypeSelector 
        fareType={fareType}
        setFareType={setFareType}
      />
      <button
        type="submit"
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 font-semibold text-black mt-4"
        style={{ backgroundColor: "lightcyan" }}
      >
        🔍 Search
      </button>
      </div>
    </Container>
  );
}

export default SearchFlight;
