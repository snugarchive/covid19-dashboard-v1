import './App.css';
import Home from './pages/Home'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar title="COVID19 코로나 현황 모니터링" />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer
          developer="도비"
          email="bhan.universe@gmail.com"
          website="https://snugdev.netlify.app/"
          disclaimer="본 사이트의 모든 내용은 대한민국 공공데이터 포털 및 세계 코로나 API 제공 사이트에서 얻은 자료를 민간에서 취합한 것으로, 
            정보 사용에 대한 책임은 전적으로 이를 사용하는 주체에게 있음을 알립니다."
        />
      </div>
    </Router>
  );
}

export default App;
