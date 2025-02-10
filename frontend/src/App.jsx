import React from 'react';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import { Outlet } from 'react-router-dom';
import useFullScreen from '../hooks/useFullScreen.js'; 

function App() {
  const { isFullScreen } = useFullScreen();

  return (
    <>
      {!isFullScreen && <Header />}
      <Outlet />
      {!isFullScreen && <Footer />}
    </>
  );
}

export default App;
