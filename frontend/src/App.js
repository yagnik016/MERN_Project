import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserList from "./components/UserLists";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlists" element={<UserList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
