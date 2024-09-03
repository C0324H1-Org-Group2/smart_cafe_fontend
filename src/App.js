import './App.css';
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import MainComponent from "./components/MainComponent";
import Slider from "./components/common/Slider";

function App() {
  return (
      <>
        <Navbar></Navbar>
        <Slider></Slider>
          <MainComponent></MainComponent>
        <Footer></Footer>
      </>
  );
}

export default App;
