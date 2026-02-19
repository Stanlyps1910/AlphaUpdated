import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import GetQuote from './components/GetQuote';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-[#1C1C1C] bg-[#F7F5F2] min-h-screen selection:bg-black selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Services />
              <Gallery />
            </>
          } />
          <Route path="/quote" element={<GetQuote />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
