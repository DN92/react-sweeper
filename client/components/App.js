import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FrontEndRoutes from './routes/FrontEndRoutes';

function App() {
  return (
    <BrowserRouter>
      <div id="App ">
        <FrontEndRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
