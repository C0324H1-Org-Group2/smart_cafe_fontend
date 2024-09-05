import './App.css';
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import MainComponent from "./components/MainComponent";
import Slider from "./components/common/Slider";
import TopNewestServices from "./components/home/TopNewestServices";

function App() {
  return (
      <>
        <Navbar></Navbar>
        <Slider></Slider>
          <MainComponent></MainComponent>
          <TopNewestServices></TopNewestServices>
        <Footer></Footer>
      </>
  );
}

export default App;
