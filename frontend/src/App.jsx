import Paths from "./Paths";
import { useState } from "react";
import AuthContext from "./contexts/authContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [logged, setLogged] = useState(false);
  return (
    <AuthContext.Provider value={{ logged, setLogged }}>
      <Paths />
    </AuthContext.Provider>
  );
}

export default App;
