import { Anchor } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img width={70} src="../../public/logo.png" alt="happy playero logo" />
          {/* <Anchor className="h-8 w-8 text-ocean" /> */}
          <span className="ml-1 text-xl font-semibold text-gray-900">Happy Playero</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-700">Calendario Reservas</h1>
      </div>
    </header>
  );
};