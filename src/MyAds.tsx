import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css'; // Importando os estilos dos PrimeIcons
import { createClient } from '@supabase/supabase-js'; // Importe o cliente do Supabase


const MyAds = () => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [price, setPrice] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState({ bairro: '', cidade: '', estado: '' });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const categories = [
        {
            label: 'Autos e peças',
            icon: 'pi pi-car',
            subcategories: ['Carros', 'Motos', 'Ônibus', 'Caminhões']
        },
        {
            label: 'Imóveis',
            icon: 'pi pi-home',
            subcategories: ['Apartamentos', 'Casas']
        },
        {
            label: 'Celulares',
            icon: 'pi pi-mobile',
            subcategories: ['Smartphones', 'Acessórios de celular']
        }
    ];

    const handleSubcategoryClick = (subcategory: string) => {
        setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory);
        // Atualizar a categoria com base na subcategoria selecionada
        const selectedCategory = categories.find(category => category.subcategories.includes(subcategory));
        if (selectedCategory) {
            setCategory(selectedCategory.label);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const selectedPhotos = Array.from(files).slice(0, 5); // Limitando a 5 fotos
            
            Promise.all<string>(
                selectedPhotos.map(photo => {
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            if (e.target) {
                                resolve(e.target.result as string);
                            } else {
                                reject(new Error("Erro ao carregar a foto"));
                            }
                        };
                        reader.readAsDataURL(photo);
                    });
                })
            )
            .then(photoUrls => {
                setPhotoPreviews(photoUrls);
            })
            .catch(error => {
                console.error("Erro ao carregar fotos:", error);
            });
        }
    };

    const handleRemovePhoto = (index: number) => {
        const updatedPhotoPreviews = [...photoPreviews];
        updatedPhotoPreviews.splice(index, 1);
        setPhotoPreviews(updatedPhotoPreviews);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/[^\d]/g, ''); // Remove tudo exceto números
        const numericValue = parseInt(rawValue, 10); // Converte para número
        const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue / 100);
        setPrice(formattedPrice);
    };

    const handleCepChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCep = event.target.value.replace(/[^\d]/g, ''); // Remove tudo exceto números
        setCep(newCep);
        if (newCep.length === 8) {
            fetch(`https://viacep.com.br/ws/${newCep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        setAddress({ bairro: data.bairro, cidade: data.localidade, estado: data.uf });
                    } else {
                        setAddress({ bairro: '', cidade: '', estado: '' });
                    }
                })
                .catch(() => {
                    setAddress({ bairro: '', cidade: '', estado: '' });
                });
        } else {
            setAddress({ bairro: '', cidade: '', estado: '' });
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          // Verifica se os campos obrigatórios estão preenchidos
          if (!title || !description || !price || !photoPreviews.length || !address.bairro || !address.cidade || !address.estado || !category) {
            console.error('Por favor, preencha todos os campos obrigatórios.');
            return;
          }
    
          // Obter o usuário logado
          const { data: { user }, error: userError } = await supabase.auth.getUser();
    
          if (userError || !user) {
            throw new Error('Erro ao obter usuário logado');
          }
    
          const { data, error } = await supabase
            .from('UserAds')
            .insert([
              {
                Título: title,
                Descrição: description,
                Preço: price,
                Fotos: photoPreviews.join(','), // Convertendo array de URLs em uma string separada por vírgula
                Local: `${address.bairro}, ${address.cidade}, ${address.estado}`,
                category: category, // Adicionando a categoria
              }
            ]);
    
          if (error) {
            console.error('Erro ao enviar anúncio:', error);
          } else {
            console.log('Anúncio enviado com sucesso:', data);
            // Limpar campos após o envio bem-sucedido
            setTitle('');
            setDescription('');
            setPrice('');
            setPhotoPreviews([]);
            setCep('');
            setAddress({ bairro: '', cidade: '', estado: '' });
            setCategory(''); // Limpar o campo categoria
          }
        } catch (error) {
          console.error('Erro ao enviar anúncio:', (error as Error).message);
        }
      };
    
    

      return (
        <div className="container mx-auto py-8 mb-44">
            <header className="flex items-center justify-between py-4 px-6 bg-white shadow-md w-full fixed top-0 left-0 z-10">
                <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    <i className="pi pi-arrow-left text-2xl"></i>
                </button>
                <img src="/assets/logo_olx.png" alt="Logo" className="h-12" />
            </header>
            <div className="pt-20 ml-8 lg:ml-12 xl:ml-16">
                <div className="text-xl font-semibold mb-6">Olá, o que você quer anunciar?</div>
                <div className="bg-white shadow-md rounded-md p-4 w-64">
                    <h2 className="text-lg font-semibold mb-4">Categorias</h2>
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index} className="mb-2">
                                <button
                                    className="text-gray-800 font-medium flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    onClick={() => setExpandedCategory(category.label === expandedCategory ? null : category.label)}
                                >
                                    <i className={`${category.icon} text-lg mr-2`}></i>
                                    <span className="flex-grow text-left">{category.label}</span>
                                    {expandedCategory === category.label ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule ="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 12a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto opacity-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 12a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                {expandedCategory === category.label && (
                                    <ul className="ml-8 mt-2">
                                        {category.subcategories.map((subcategory, subIndex) => (
                                            <li key={subIndex} className="py-1">
                                                <button
                                                    className={`text-gray-600 hover:text-gray-800 focus:outline-none ${selectedSubcategory === subcategory ? 'font-semibold' : ''}`}
                                                    onClick={() => handleSubcategoryClick(subcategory)}
                                                >
                                                    {subcategory}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {selectedSubcategory && (
                    <div className="mt-[-24rem] ml-8 lg:ml-12 xl:ml-16">
                        <div className="bg-white shadow-md rounded-md p-8 mx-auto w-full max-w-2xl">
                            <h2 className="text-lg font-semibold mb-4">Anunciar em {selectedSubcategory}</h2>
                            <form className="max-w-lg mx-auto mb-4" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        Título*
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Insira o título do anúncio"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Descrição*
                                    </label>
                                    <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Insira uma descrição do anúncio"
                                    rows={4}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                    Preço (R$)
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    value={price}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Insira o preço do anúncio"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cep">
                                    CEP*
                                </label>
                                <input
                                    type="text"
                                    id="cep"
                                    value={cep}
                                    onChange={handleCepChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Insira o CEP"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bairro">
                                    Bairro
                                </label>
                                <input
                                    type="text"
                                    id="bairro"
                                    value={address.bairro}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Bairro"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cidade">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    id="cidade"
                                    value={address.cidade}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Cidade"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    id="estado"
                                    value={address.estado}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Estado"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photos">
                                    Fotos
                                    <h6>Adicione até 5 fotos</h6>
                                </label>
                                <div className="flex flex-wrap mb-6">
                                    {photoPreviews.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img src={photo} alt={`Photo ${index}`} className="w-32 h-32 object-cover mr-4 mb-4" />
                                            <button onClick={() => handleRemovePhoto(index)} className="absolute top-0 right-0 p-1 bg-white rounded-full">
                                                <i className="pi pi-times-circle text-red-500 text-lg"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <div className="border-2 border-dashed border-gray-400 rounded-md py-8 px-4  text-center cursor-pointer">
                                        <label htmlFor="photos">
                                            <i className="pi pi-camera text-3xl text-gray-600 mb-2"></i>
                                            <div className="text-sm text-gray-600 font-semibold uppercase">Adicionar Fotos</div>
                                            <div className="text-xs text-gray-500">JPG, PNG, GIF Somente</div>
                                        </label>
                                        <input
                                            id="photos"
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Enviar anúncio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    </div>
);
    
};

export default MyAds;




















