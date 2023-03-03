import { Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie/AddMovie.jsx";
import Collection from "./components/Collection/Collection.jsx";
import Header from "./components/Header/Header.jsx";
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage/RegisterPage.jsx";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth.js";
import { useEffect } from "react";
import Background from "./assets/movies-bg.png";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <section style={{
      backgroundImage: `url(${Background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100%",
    }}>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterPage />} />
      </Routes>
    </section>
  );
}

export default App;
