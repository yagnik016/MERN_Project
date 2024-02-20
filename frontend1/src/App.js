import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserList from "./components/UserLists";
import UserForm from "./components/UserForm";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlists" element={<UserList />} />
          <Route path="/:id" element={<UserForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
