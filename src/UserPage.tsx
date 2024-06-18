import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';

interface UserAd {
    Título: string;
    Descrição: string;
    Preço: string;
    Fotos: string;
    Local: string;
    category: string;
    id: string;
}

const UserPage = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userFirstName, setUserFirstName] = useState('');
    const [loggedOut, setLoggedOut] = useState(false);
    const [userAds, setUserAds] = useState<UserAd[]>([]);
    const [error, setError] = useState<string | null>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const estadosSiglas = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
        'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO'
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
                const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
                const supabaseClient = createClient(supabaseUrl, supabaseKey);

                const { data: userResponse, error: userError } = await supabaseClient.auth.getUser();
                if (userError) {
                    throw userError;
                }

                if (userResponse.user) {
                    const firstName = userResponse.user.user_metadata.full_name.split(' ')[0];
                    setUserFirstName(firstName);

                    const { data, error: adsError } = await supabaseClient
                        .from('UserAds')
                        .select('*')
                        .eq('user_id', userResponse.user.id);

                    if (adsError) {
                        throw adsError;
                    }

                    if (data) {
                        setUserAds(data as UserAd[]);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        setLoggedOut(true);
    };

    if (loggedOut) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="bg-white border-b-2 border-gray-300 text-gray-700 p-2 mb-24">
                <div className="container mx-auto px-8 md:px-16 flex flex-col sm:flex-row justify-between items-center h-full">
                    <div className="flex items-center mb-2 sm:mb-0">
                        <img src="/assets/logo_olx.png" alt="Logo OLX" className="h-16" />
                    </div>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <button onClick={toggleDropdown} className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600 transition-all duration-300">
                                {userFirstName && (
                                    <span className="mr-2">{userFirstName}</span>
                                )}
                                {dropdownOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                    <Link to="/MyRegistration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meu Cadastro</Link>
                                    <Link to="/UserPage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meus Anúncios</Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</button>
                                </div>
                            )}
                        </div>
                        <Link to="/MyAds" className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-600 transition-all duration-300">Anunciar</Link>
                    </div>
                </div>
            </header>

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md mb-16">
                <h2 className="text-xl font-semibold mb-4">Meus Anúncios</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userAds.map((ad) => (
                        <div key={ad.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                            <img src={ad.Fotos.split(',')[0]} alt={ad.Título} className="w-full h-32 object-cover mb-2 rounded" />
                            <h3 className="text-lg font-semibold mb-1">{ad.Título}</h3>
                            <p className="text-gray-700">{ad.Descrição}</p>
                            <p className="text-green-600 font-bold">Preço: {ad.Preço}</p>
                            <p className="text-gray-500">{ad.Local}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPage;

