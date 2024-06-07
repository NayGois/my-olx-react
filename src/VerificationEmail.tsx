import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';

const Header = () => {
    const estadosSiglas = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
        'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO'
      ];
    
  return (
    <header className="bg-white border-b-2 border-gray-300 text-gray-700 p-2">
      <div className="container mx-auto px-8 md:px-16 flex flex-col sm:flex-row justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center mb-2 sm:mb-0">
          <img src="/logo_olx.png" alt="Logo OLX" className="h-16" />
          {/* Caixa de Pesquisa */}
          <div className="max-w-md flex flex-grow relative mr-0.5">
            <input type="text" placeholder="Pesquisar..." className="px-6 py-3 w-full sm:w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white border border-gray-300 text-gray-400 transition-all duration-300" />
          </div>
          {/* Dropdown de Estados */}
          <div className="relative flex items-center">
            <select className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white border border-gray-300 text-gray-700 transition-all duration-300">
              {estadosSiglas.map((sigla, index) => (
                <option key={index}>{sigla}</option>
              ))}
            </select>
            {/* Ícone de Lupa */}
            <button onClick={() => console.log('Pesquisando...')} className="px-3 py-3 bg-gray-200 rounded-md focus:outline-none ml-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a6 6 0 11-6-6 6 6 0 016 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
          {/* Ícone de Meus Anúncios */}
          <Link to="/login" className="flex items-center ml-4 mr-2 text-gray-700 cursor-pointer focus:outline-none">
            <span className="mr-1"><FiPackage className="h-6 w-6" /></span>
            Meus Anúncios
          </Link>
        </div>
        {/* Botões */}
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600 transition-all duration-300">Entrar</Link>
          <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-600 transition-all duration-300">Anunciar</Link>
        </div>
      </div>
    </header>
  );
};

interface VerificationEmailProps {
    userEmail?: string; // Tornando email opcional
  }
  const VerificationEmail: React.FC<{ userEmail?: string }> = ({ userEmail }) => {
    return (
      <div>
        <Header /> {/* Renderiza o componente Header */}
        <div className="min-h-screen flex flex-col justify-center items-center mt-0.3">
          <div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">Verifique seu e-mail</h2>
            <p className="text-gray-700 mb-4 text-center">
              Você precisa concluir uma etapa rápida antes de criar sua conta. Clique no link de confirmação que enviamos para o email registrado. {userEmail}
            </p>
            <div className="text-center">
              <Link to="/login" className="text-blue-500 hover:underline">Voltar para a página de login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default VerificationEmail;


