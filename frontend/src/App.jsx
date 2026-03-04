import Navigations from "./Routers/Navigations";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Navigations />
    </>
  );
}

export default App;
