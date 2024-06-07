import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import VerificationEmail from './VerificationEmail'; // Importe o componente VerificationEmail

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            nickname: nickname
          }
        }
      });

      if (error) {
        throw new Error('Erro ao registrar usuário: ' + error.message);
      }

      console.log('Usuário registrado com sucesso:', data);
      setUserEmail(data?.user?.email || '');
      setRegistered(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-0.3">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4 text-center">Crie sua Conta. É grátis!</h2>
        <form className="max-w-xs mx-auto space-y-4" onSubmit={(e) => { e.preventDefault(); registered && navigate('/verificationEmail'); }}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
              Apelido
            </label>
            <input
              type="text"
              id="nickname"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length > 0 && password.length < 8 && (
              <p className="text-xs text-gray-500 mt-1">
                Use letras, números e caracteres especiais. A senha deve ter pelo menos 8 caracteres.
              </p>
            )}
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600 transition-all duration-300 mb-7"
          >
            Registrar
          </button>
          <div className="text-center mt-4">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Entrar
            </Link>
          </div>
        </form>
      </div>
      {registered && <VerificationEmail userEmail={userEmail} />}
    </div>
  );
};

export default RegisterPage;



















