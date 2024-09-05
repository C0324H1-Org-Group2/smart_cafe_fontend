import './App.css';
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import MainComponent from "./components/MainComponent";
import Slider from "./components/common/Slider";
import TopNewestServices from "./components/home/TopNewestServices";
import TopMostOrderServices from "./components/home/TopMostOrderServices";

function App() {
  return (
      <>
        <Navbar></Navbar>
        <Slider></Slider>
          <MainComponent></MainComponent>
          <TopNewestServices></TopNewestServices>
          <TopMostOrderServices></TopMostOrderServices>
        <Footer></Footer>
      </>
  );
}

export default App;
