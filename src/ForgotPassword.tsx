import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setMessage('Erro ao enviar instruções de redefinição de senha. Por favor, verifique seu e-mail e tente novamente.');
      } else {
        setMessage('Instruções de redefinição de senha foram enviadas para o seu e-mail. Por favor, verifique sua caixa de entrada.');
      }
    } catch (error) { // Corrigido o tipo de error para 'Error'
      console.error('Erro ao redefinir senha:',);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-0.3">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg border border-gray-300">
        <img src= "/assets/logo_olx.png" alt="Logo OLX" className="mx-auto h-20 mb-4" /> {/* Adicione a logo aqui */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Esqueceu sua senha?</h2>
        <p className="text-gray-600 text-center mb-4">
          Não se preocupe! Insira o seu e-mail de cadastro e enviaremos instruções para você.
        </p>
        <form className="max-w-xs mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleResetPassword}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600 transition-all duration-300 mb-7"
            >
              Receber instruções
            </button>
          </div>
          {message && (
            <div className="text-center text-sm text-gray-600">
              {message}
            </div>
          )}
          <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
            <span className="mt-4 mr-2">Lembrou a senha?</span>
            <Link to="/login" className="text-blue-500 hover:underline mt-4 focus:outline-none">
              Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;


