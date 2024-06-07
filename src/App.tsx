import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Ad {
  name: string;
  price: number;
  location: string;
  img: string;
  id: string;
  category: string;
}

const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    let { data, error } = await supabase
      .from('Homepage Ads')
      .select('*');

    if (error) console.log('Error: ', error);
    else if (data) setAds(data as Ad[]);
  };

  const estadosSiglas = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  // Declaração das funções PrevArrow e NextArrow antes de usá-las
  const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={className + ' absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer'}
        onClick={onClick}
      >
        {/* Ícone da seta para a esquerda */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    );
  };

  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={className + ' absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'}
        onClick={onClick}
      >
        {/* Ícone da seta para a direita */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Habilita as setas de navegação
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    centerMode: true, // Centraliza o slide atual
    centerPadding: '0px', // Remove o padding do centro
  };

  return (
    <div className="min-h-screen flex flex-col">
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
      <div className="container mx-auto px-8 mt-8 w-4/5">
        <div className="hidden sm:block">
          <Slider {...settings}>
            <div className="flex justify-center">
              <img src="/assets/carro_slide.png" alt="Slide 1" className="rounded-lg w-full h-auto max-h-64" />
            </div>
            <div className="flex justify-center">
              <img src="/assets/celulares_slide.png" alt="Slide 2" className="rounded-lg w-full h-auto max-h-64" />
            </div>
            <div className="flex justify-center">
              <img src="/assets/imoveis_slide.png" alt="Slide 3" className="rounded-lg w-full h-auto max-h-64" />
            </div>
          </Slider>
        </div>
        <div className="flex justify-center mt-4">
          <div className="mr-4">
            <Link to="/pagina-de-imoveis">
              <img
                src="/assets/imoveis.png"
                alt="Imóveis"
                className="w-20 h-20 border border-gray-300 rounded-full transition duration-300 hover:rounded-lg hover:border-transparent hover:bg-blue-200 cursor-pointer"
              />
            </Link>
          </div>
          <div className="mr-4">
            <Link to="/pagina-de-celulares">
              <img
                src="/assets/celulares.png"
                alt="Celulares"
                className="w-20 h-20 border border-gray-300 rounded-full transition duration-300 hover:rounded-lg hover:border-transparent hover:bg-blue-200 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <Link to="/pagina-de-carros">
              <img
                src="/assets/carros.png"
                alt="Carros"
                className="w-20 h-20 border border-gray-300 rounded-full transition duration-300 hover:rounded-lg hover:border-transparent hover:bg-blue-200 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-8 mt-8 mb-20">
        <div className="max-w-full overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 ml-4">Alguns produtos</h2>  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {ads.map((ad) => (
              <Link to={`/ProductsDescription/${ad.id}`} key={ad.id} className="card ml-4 ">
                <div className="max-w-52 sm:max-w-100 rounded-lg overflow-hidden shadow-lg border border-gray-300">
                  <img className="w-full h-64 object-cover max-h-64" src={ad.img} alt={ad.name} />
                  <div className="px-6 py-4">
                    <p className="font-bold text-gray-700 text-base text-base">R$ {Number(ad.price).toLocaleString('en-US', { minimumFractionDigits: 3 })}</p>
                    <div className="text-xl mb-2 truncate text-xs">{ad.name}</div>
                    <p className="text-gray-700 text-base">{ad.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
























