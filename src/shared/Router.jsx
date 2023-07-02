import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Profile from '../pages/Profile';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
