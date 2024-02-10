import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="text-black">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
