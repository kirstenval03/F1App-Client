import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import { MerchProvider } from './context/merch.context';
import { CartProvider } from './context/cart.context'; // Import CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MerchProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </MerchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
