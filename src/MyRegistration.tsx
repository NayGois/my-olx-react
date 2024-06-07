import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom'; // Importe o Link do React Router

const MyRegistration = () => {
    const [fullName, setFullName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
            const supabaseClient = createClient(supabaseUrl, supabaseKey);

            try {
               // Busca o JSON do usuário atual
               const { data: { user }, error } = await supabaseClient.auth.getUser();
               if (error) {
                   throw error;
               }

                if (user) {
                    setFullName(user.user_metadata.full_name);
                    setNickname(user.user_metadata.nickname);
                    if (user.email) {
                        setEmail(user.email);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setErrorMessage('Erro ao buscar dados do usuário. Por favor, tente novamente.');
            }
        };

        fetchUserData();
    }, []);

    const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setPhoto(file || null);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
            const supabaseClient = createClient(supabaseUrl, supabaseKey);

            const { data, error } = await supabaseClient.auth.updateUser({
                data: {
                    full_name: fullName,
                    nickname: nickname,
                    email: email,
                    password: password
                }
            });

            if (error) {
                throw error;
            }

            console.log('Dados atualizados com sucesso:', data);
            setSuccessMessage('Cadastro atualizado com sucesso');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error: any) {
            console.error('Erro ao atualizar os dados do usuário:', error);
            setErrorMessage('Erro ao atualizar os dados do usuário. Por favor, tente novamente.');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 mb-16 px-8 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Meu cadastro</h1>
            {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
            {successMessage && <div className="text-blue-500 text-center mb-4">{successMessage}</div>}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700">Nome completo:</label>
                    <input type="text" id="fullName" value={fullName} onChange={handleFullNameChange} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-purple-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="nickname" className="block text-gray-700">Apelido:</label>
                    <input type="text" id="nickname" value={nickname} onChange={handleNicknameChange} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-purple-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-purple-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Senha:</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={handlePasswordChange} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-purple-500" />
                        <button type="button" className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none" onClick={toggleShowPassword}>
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 19a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v14z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Salvar Alterações</button>
                <Link to="/UserPage" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Voltar</Link>
            </form>
        </div>
    );
    
};

export default MyRegistration;
