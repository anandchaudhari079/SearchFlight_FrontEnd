import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import  axios  from "axios";

function SearchFlight() {
  const [tripMode, setTripMode] = useState("oneway");
  const [departureAirports, setDepartureAirports] = useState(["Banglore","Chennai","Delhi","Kolkata","Mumbai",]);
  const [arrivalAirports, setArrivalAirports] = useState("");
  const [origin, setOrigin] = useState("Mumbai");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // useEffect(()=>{
  //   axios.get("https://api-cert.ezycommerce.sabre.com/apj/v1/Airport/OriginsWithConnections/en-us",{
  //       headers: {
  //         "Tenant-Identifier":
  //           "9d7d6eeb25cd803e0df323a0fff258e59398a702fac09131275b6b1911e202d",
  //       },
  //     })
  //   .then((res)=>{
  //     setAirports(res.data);
  //   })
  //   .catch((err)=>{alert(err)})
  // })

  useEffect(()=>{
    const fetchOrigin = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7061/api/SearchFlight/GetOriginAirports"
        );
        setDepartureAirports(res.data); 
      } catch (err) {
        console.error("Error fetching origin airports:", err);
        setDepartureAirports([]);        
        alert(err.response.data)
        return
      }
    };

    fetchOrigin();
  });

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
        alert(err.response.data)
        return
      }
    };

    fetchDestinations();
  }, [origin]);

  const handleSearch = () => {
    
    if (!origin) {
      alert("Origin cannot be empty");
      return;
    }
    if(!destination){
      alert("Destination cannot be empty")
      return;
    }

    if(!departureDate){
      alert("Departure date canot be empty")
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

    if(adults===0){
      alert("Please select number of adults. Atleast one adult must be there")
      return;
    }

    const searchData={
      tripMode:tripMode,
      origin: origin,
      destination: destination,
      departureDate: departureDate,
      returnDate: tripMode === "return" ? returnDate : null,
      adults: adults,
      children: children,
      infants: infants
    };

    alert("Trip mode="+searchData.tripMode +
      "\nOrigin="+searchData.origin+
      "\nDestination="+searchData.destination+
      "\nDeparture date="+searchData.departureDate+
      (searchData.returnDate ? "\nReturn date = " + searchData.returnDate : "")+
      "\nNumber of adults="+searchData.adults+
      (searchData.children>0?"\nNumber of children="+searchData.children:"")+
      (searchData.infants>0?"\nNumber of infants="+searchData.infants:"")
    );
  };

  return (
     <Container className="mx-auto p-6 rounded-2xl shadow-lg mt-6" style={{ backgroundColor:"lightcyan", color:"black", minHeight: '100vh' }}>
      <h2 className="font-bold text-blue-500 mb-6 text-center"> ✈️ Search Flight</h2>  
      <div className="flex space-x-6 mb-4">
        <div >
          <label className="flex items-center space-x-2 me-3">
            <input type="radio" name="choice"  value="oneway"
              checked={tripMode === "oneway"}
              onChange={(e) => setTripMode(e.target.value)}
            />
            <span className="font-medium">Oneway</span>
          </label>
        
          <label className="flex items-center space-x-2">
            <input
              type="radio" name="choice" value="return"
              checked={tripMode === "return"}
              onChange={(e) => setTripMode(e.target.value)}
            />
            <span className="font-medium">Return</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label className="block text-sm mb-2 font-semibold me-3 mt-1 mb-1">Origin</label>
        <select 
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-2  border rounded-lg me-3 mt-1 mb-1"  style={{backgroundColor:"lightcyan"}}
        >
          <option value="">Select origin</option>
          {departureAirports.map((airport,index)=>(
            <option key={index} value={airport}>
                {airport}
            </option>
          ))}
        </select>
        <label className="block text-sm font-semibold me-3 mt-1 mb-1">Destination</label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded-lg me-3 mt-1 mb-1" style={{backgroundColor:"lightcyan"}}
        >
          <option value="">Selct destination</option>
         {arrivalAirports && arrivalAirports.map((airport,index)=>(
            <option key={index} value={airport}>
                {airport}
            </option>
          ))
        }
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label className="block mb-2 font-medium me-3">Select departure date:</label>
        <input type="date" value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="w-full p-2 border rounded-lg me-3" style={{backgroundColor:"lightcyan"}}
        /> 
         {tripMode === "return" &&(
          <>
      <label className="block mb-2 font-medium me-3">Select return date:</label>
        <input type="date" value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="w-full p-2 border rounded-lg me-3" style={{backgroundColor:"lightcyan"}}
        /> 
        </>  
         )} 
      </div>
      <div>
           <label className="block mb-2 font-medium me-1">Passengers:</label>
           <br/>
           <label className="block mb-2 font-medium">Adult(s):</label>
           <input
                type="number"
                min={1}
                value={adults}
                onChange={(e) =>setAdults(e.target.value)}
                className="w-10 p-2 border rounded-lg text-center" style={{backgroundColor:"lightcyan"}}
              />
            <label className="block mb-2 font-medium ms-3">Children:</label>
           <input
                type="number"         
                value={children}
                onChange={(e) =>setChildren(e.target.value)}
                className="w-10 p-2 border rounded-lg text-center" style={{backgroundColor:"lightcyan"}}
              />
              <label className="block mb-2 font-medium ms-3">Infant(s):</label>
           <input
                type="number"         
                value={infants}
                onChange={(e) =>setInfants(e.target.value)}
                className="w-10 p-2 border rounded-lg text-center" style={{backgroundColor:"lightcyan"}}
              />
        </div>
         <button type="submit" onClick={handleSearch} className="px-4 py-2 bg-blue-600 font-semibold text-black mt-4" style={{backgroundColor:"lightcyan"}}  >
        🔍 Search
      </button>
    </Container>
  );
}

export default SearchFlight;
