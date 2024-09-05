import './App.css';
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import MainComponent from "./components/MainComponent";
import Slider from "./components/common/Slider";
import TopNewestServices from "./components/home/TopNewestServices";
import TopMostOrderServices from "./components/home/TopMostOrderServices";
import Menu from "./components/client/Menu";
import {Route, BrowserRouter, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={
                  <>
                      <Slider />
                      <MainComponent/>
                      <TopNewestServices/>
                      <TopMostOrderServices></TopMostOrderServices>
                  </>
              } />
              <Route path="/menu" element={
                  <>
                      <Slider />
                      <Menu />
                  </>

              } />
          </Routes>
          <Footer />
      </BrowserRouter>
  );
}

export default App;
