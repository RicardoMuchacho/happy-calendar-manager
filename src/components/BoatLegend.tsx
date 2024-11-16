import { Circle } from "lucide-react";

const boats = [
  { id: 1, name: "Sunshine", color: "boats-1" },
  { id: 2, name: "Moonlight", color: "boats-2" },
  { id: 3, name: "Sunset", color: "boats-3" },
  { id: 4, name: "Breeze", color: "boats-4" },
];

export const BoatLegend = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      {boats.map((boat) => (
        <div key={boat.id} className="flex items-center gap-2">
          <Circle className={`h-4 w-4 fill-${boat.color} text-${boat.color}`} />
          <span className="text-sm font-medium text-gray-700">{boat.name}</span>
        </div>
      ))}
    </div>
  );
};