import { useContext } from 'react';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import BuyCredit from './pages/BuyCredit';
import Home from './pages/Home';
import Result from './pages/Result';
import Gallery from './pages/Gallery';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import { Route, Routes } from 'react-router-dom';
import { AppContext, type AppContextValue } from './context/AppContext';
import { ThemeContext } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const { showLogin } = useContext(AppContext) as AppContextValue;
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      <ToastContainer position="bottom-right" theme={isDark ? 'dark' : 'light'} />
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 max-w-7xl mx-auto">
        <Navbar />
        {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;