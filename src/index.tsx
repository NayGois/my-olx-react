import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPassword from './ForgotPassword';
import App from './App';
import ProductsDescription from './ProductsDescription';
import Footer from './Footer';
import VerificationEmail from './VerificationEmail';
import UserPage from './UserPage';
import MyRegistration from './MyRegistration'; // Importe a página MyRegistration aqui
import MyAds from './MyAds'; // Importe a página MyAds aqui
import UserAds from './UserAds';

const AppRouter = () => {
  const [userEmail, setUserEmail] = React.useState("");

  return (
    <React.StrictMode>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/ProductsDescription/:id" element={<ProductsDescription />} />
            <Route path="/verificationEmail" element={<VerificationEmail userEmail={userEmail} />} />
            <Route path="/UserPage" element={<UserPage />} />
            <Route path="/MyRegistration" element={<MyRegistration />} /> {/* Adicione a rota para MyRegistration aqui */}
            <Route path="/MyAds" element={<MyAds />} /> {/* Adicione a rota para MyAds aqui */}
            <Route path="/UserAds" element={<UserAds />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);










