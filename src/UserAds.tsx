import React, { useEffect, useState } from 'react';
import { createClient, User } from '@supabase/supabase-js';

interface Ad {
  id: number;
  title: string;
  description: string;
}

const UserAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const supabaseUrl = 'https://bgaydzvzygwloqajwwxh.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXlkenZ6eWd3bG9xYWp3d3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTEwNzIsImV4cCI6MjAxNDI4NzA3Mn0.sHgZChaAnqArS03-XSIQkL4nxDzMbnn8kT-u2gHIojc';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (userData) {
          const { data: adsData, error } = await supabase
            .from('ads')
            .select('*')
            .eq('user_id', userData);

          if (error) {
            throw error;
          }

          // Mapear os dados retornados para o tipo Ad
          const mappedAdsData = adsData.map((ad: any) => ({
            id: ad.id,
            title: ad.title,
            description: ad.description,
          }));

          setAds(mappedAdsData);
        }
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [supabase]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Meus Anúncios</h1>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id} className="mb-4">
            <h2 className="text-xl font-semibold">{ad.title}</h2>
            <p>{ad.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAds;







