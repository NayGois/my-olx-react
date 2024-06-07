import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Galleria } from 'primereact/galleria';
import { FiPackage } from 'react-icons/fi';

interface Ad {
  name: string;
  price: number;
  location: string;
  img: string | string[]; // Alterada para string ou array de strings
  id: string;
  category: string;
  description: string;
}

const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
const supabase = createClient(supabaseUrl, supabaseKey);

const ProductsDescription = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Ad | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
        setShowFullDescription(!showFullDescription); 
    };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('Recent Ads')
        .select('*')
        .eq('id', id)
        .single<Ad>();

      if (error) {
        console.error('Error fetching product:', error.message);
      } else if (data) {
        console.log('Product fetched successfully:', data);
        // Dividindo a string img em um array de URLs de imagem usando '\n' como delimitador
        const imgArray = typeof data.img === 'string' ? data.img.split('\n') : data.img;
        // Atualizando a propriedade img no objeto product com o array de URLs de imagem
        const updatedProduct: Ad = { ...data, img: imgArray };
        setProduct(updatedProduct);
      } else {
        console.log('No product found with ID:', id);
      }
    } catch (error) {
      console.error('Error fetching product:', (error as Error).message);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const estadosSiglas = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  const responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4
    },
    {
      breakpoint: '767px',
      numVisible: 3
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  const itemTemplate = (item: any) => {
    return <img src={item.src} alt={item.alt} style={{ width: '100%' }} />
  }

  const thumbnailTemplate = (item: any) => {
    return <img src={item.thumbnailSrc} alt={item.alt} />
  }

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
        {/* Verificar se product.img é uma string ou um array antes de renderizar */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                {/* Renderizar anúncio do produto */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mx-auto mt-10 p-6 max-w-2xl flex justify-center items-center">
                    <div className="px-4 py-5 sm:px-6 ">
                        <h3 className="text-xl leading-6 font-medium text-gray-900 mb-4">{product.name}</h3>
                        {/* Verifica se o produto tem uma galeria de imagens */}
                        {Array.isArray(product.img) ? (
                        // Renderizar Galleria se houver várias imagens
                        <Galleria
                            value={product.img.map((src: string) => ({ src, alt: product.name, thumbnailSrc: src })).filter(item => item.src)}
                            responsiveOptions={responsiveOptions}
                            numVisible={3}
                            className="max-w-full mx-auto"
                            item={(item: any) => (
                                <img src={item.src} alt={item.alt} className="object-cover h-96 w-full" />
                            )}
                            thumbnail={(item: any) => (
                                <img src={item.thumbnailSrc} alt={item.alt} className="h-12 w-auto" />
                            )}
                        />
                    
                        ) : (
                        // Renderizar imagem única se houver apenas uma imagem
                        <img src={product.img} alt={product.name} className="object-cover h-64 w-full" />
                        )}
                        {/* Informações do produto */}
                        <div className="mt-4">  
                        <p className="mt-1 text-xl text-black-500 font-semibold">R$ {Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 3 })}</p>
                        <p className="mt-2 text-sm text-gray-500"> {product.description}
                        </p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
};

export default ProductsDescription;















