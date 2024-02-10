import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="text-black">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
