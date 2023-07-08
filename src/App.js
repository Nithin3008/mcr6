import "./App.css";
import { Home1 } from "./Home1";
import { Routes, Route } from "react-router";
import { RestDetails } from "./RestDetails";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home1></Home1>}></Route>
        <Route path={"/RestDetails/:restId"} element={<RestDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
