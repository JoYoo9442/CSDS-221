import Home from "./components/Home/Home.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div>
      <Home />
      <ToastContainer />
    </div>
  );
}
