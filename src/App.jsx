import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import GetQuote from './components/GetQuote';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Portal imports
import ClientDashboard from './pages/client/ClientDashboard';
import ClientGallery from './pages/client/Gallery';
import Chats from './pages/client/Chats';
import Cloud from './pages/client/Cloud';
import ClientHeader from './components/client/Header';
import ClientFooter from './components/client/Footer';

const PortalLayout = () => {
  return (
    <div className="app-container">
      <ClientHeader />
      <main className="content">
        <Outlet />
      </main>
      <ClientFooter />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-[#1C1C1C] bg-[#F7F5F2] min-h-screen selection:bg-black selection:text-white">
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Services />
              <Gallery />
              <Testimonials />
              <Footer />
            </>
          } />
          <Route path="/quote" element={<><Navbar /><GetQuote /><Footer /></>} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Portal Routes */}
          <Route element={<ProtectedRoute allowedRoles={['client']} />}>
            <Route path="/portal" element={<PortalLayout />}>
              <Route index element={<ClientDashboard />} />
              <Route path="gallery" element={<ClientGallery />} />
              <Route path="chats" element={<Chats />} />
              <Route path="cloud" element={<Cloud />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
