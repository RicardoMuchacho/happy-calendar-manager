import { Circle } from "lucide-react";

const boats = [
  { id: 1, name: "Fondo de Bikini", color: "#4CAF50" },
  { id: 2, name: "Los cayos", color: "#2196F3" },
  { id: 3, name: "Playero Happy", color: "#F44336" },
  { id: 4, name: "Sirenita", color: "#9C27B0" },
];

// --boats-1: #4CAF50;
// --boats-2: #2196F3;
// --boats-3: #F44336;
// --boats-4: #9C27B0;

export const BoatLegend = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      {boats.map((boat) => (
        <div key={boat.id} className="flex items-center gap-2">
          {/* <Circle className="h-4 w-4 fill-current" style={{ fill: boat.color }} /> */}
          <Circle className="h-4 w-4 text-current" style={{ color: boat.color }} />
          <span className="text-sm font-medium text-gray-700">{boat.name}</span>
        </div>
      ))}
    </div>
  );
};