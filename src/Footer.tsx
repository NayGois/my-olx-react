import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-4 text-center flex flex-col items-center">
        {/* Logo */}
        <img src="/logo_olx.png" alt="Logo" className="h-16 w-auto mb-2" /> 
        {/* Conteúdo do footer */}
            © 2024 
    </footer>  
  );
}

export default Footer;
