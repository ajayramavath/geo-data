import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";
import Navbar from "./components/Navbar";
import UserPage from "./components/UserPage";
import NewMap from "./components/NewMap";
import LocateMe from "./components/LocateMe";

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <Routes>
        {/* public routes */}

        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/register" element={<RegisterForm />} />


        {/* private routes */}

        
        <Route exact path="/create" element={<CreateBlog />} />
        <Route exact path="/userpage" element={<UserPage/>} />
        <Route exact path="/map" element={<NewMap/>} />
        <Route exact path='/locate' element={<LocateMe/>} />


      </Routes>
    </div>
  );
}

export default App;
