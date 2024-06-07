import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Importe os ícones de olho aberto e fechado
import { createClient } from '@supabase/supabase-js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar se a senha está visível ou não
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          setErrorMessage('Credenciais de login inválidas. Por favor, verifique seu e-mail e senha e tente novamente.');
        } else {
          setErrorMessage(error.message);
        }
        console.error('Erro ao logar:', error.message);
      } else {
        console.log('Usuário logado com sucesso.');
        navigate('/UserPage');
      }
    } catch (error: any) {
      setErrorMessage('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
      console.error('Erro ao logar:', error.message);
    }
  };

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-0.3">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg border border-gray-300">
        <img src="/logo_olx.png" alt="Logo OLX" className="mx-auto h-20 mb-4" />
        <h2 className="text-2xl font-semibold mb-4 text-center">Acesse sua Conta</h2>
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Ícone de olho para alternar a visibilidade da senha */}
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            <Link to="/ForgotPassword" className="block text-sm text-blue-500 mt-1">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="space-y-2">
            <button
              type="submit"
              onClick={handleSignUp}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600 transition-all duration-300 mb-7"
            >
              Entrar
            </button>
            <div className="flex items-center">
              <div className="w-full border-t border-gray-300"></div>
              <div className="flex text-gray-500">
                <div className="mr-2">Ou</div>
                <div className="mr-2">conecte</div>
                <div>com</div>
              </div>
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 bg-white text-gray-600 rounded-full border border-gray-300 focus:outline-none hover:bg-gray-200 transition-all duration-300 mt-4 mr-4"
              >
                <FcGoogle className="w-8 h-8" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 bg-blue-800 rounded-full focus:outline-none hover:bg-blue-600 transition-all duration-300 mt-4"
              >
                <BsFacebook className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
              <span className="mt-4 mr-2">Não tem uma conta?</span>
              <Link to="/Register" className="text-blue-500 hover:underline mt-4 focus:outline-none">
                    Registre-se
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
























