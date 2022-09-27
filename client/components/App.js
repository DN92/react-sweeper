import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FrontEndRoutes from '../FrontEndRoutes';

function App() {
  return (
    <BrowserRouter>
      <div id="App">
        APP COMPONENT PLACEHOLDER
        <FrontEndRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
