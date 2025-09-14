import { Row } from "react-bootstrap";

const fareTypes = [
  { value: "Regular", label: "Regular", sub: "Regular fares" },
  { value: "Student", label: "Student", sub: "Extra discounts/baggage" },
  { value: "SeniorCitizen", label: "Senior Citizen", sub: "Up to ₹ 600 off" },
  { value: "ArmedForces", label: "Armed Forces", sub: "Up to ₹ 600 off" },
  { value: "DoctorNurses", label: "Doctor and Nurses", sub: "Up to ₹ 600 off" },
];

function FareTypeSelector({ fareType, setFareType }) {
  return (
    <div className="border rounded-lg mt-3 container-sub">
      <Row>
        <h4 className="header-sub">Select a special fare</h4>
      </Row>
      <div className=" flex-wrap">
        {fareTypes.map((fare) => (
          <label
            key={fare.value}
            className={`flex flex-col items-start px-2 cursor-pointer min-w-[100px] ${
              fareType === fare.value ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } `}
          >
            <input
              type="radio"
              name="fareType"
              value={fare.value}
              checked={fareType === fare.value}
              onChange={() => setFareType(fare.value)}
              className="hidden"
            />
            <span className="font-semibold">{fare.label}</span>
            <span className="text-xs text-gray-600">({fare.sub})</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FareTypeSelector;