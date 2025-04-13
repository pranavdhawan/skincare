import { useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import SkinAnalysisForm from '@/components/SkinAnalysisForm';
import Results from '@/components/Results';
import { getMockAnalysisAndProducts } from '@/data/mockData';
import type { Product } from '@/data/mockData';
import { analyzeSkinImages } from '@/services/geminiService';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [skinAnalysis, setSkinAnalysis] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Add new state variables at the top with other state declarations
  const [lastSubmittedData, setLastSubmittedData] = useState<{
    images: File[];
    budget: string;
  } | null>(null);

  // Update handleFormSubmit to store the data
  const handleFormSubmit = async (data: {
    images: File[];
    interests: string[];
    budget: string;
  }) => {
    setIsLoading(true);
    setLastSubmittedData({ images: data.images, budget: data.budget });

    try {
      const { skinAnalysis, prodcuts: products } = await analyzeSkinImages(data.images, data.budget);
      setSkinAnalysis(skinAnalysis);
      setProducts(await products);
      setShowResults(true);
    } catch (error) {
      console.error('Error analyzing skin images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update handleRegenerate to use Gemini API
  const handleRegenerate = async () => {
    if (!lastSubmittedData) return;

    setIsLoading(true);
    try {
      const { skinAnalysis, prodcuts: products } = await analyzeSkinImages(
        lastSubmittedData.images,
        lastSubmittedData.budget
      );
      setSkinAnalysis(skinAnalysis);
      setProducts(await products);
    } catch (error) {
      console.error('Error regenerating analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const detectSkinTypeFromAnalysis = (analysis: string): string => {
    const types = ['oily', 'dry', 'combination', 'sensitive', 'normal'];
    return types.find(type => analysis.toLowerCase().includes(type)) || 'normal';
    // return skinTypes[Math.floor(Math.random() * skinTypes.length)];
  };


  const handleUploadMore = () => {
    setShowResults(false);
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 font-[family-name:var(--font-geist-sans)]`}
    >
      <Header />

      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Analyzing your skin...</p>
          </div>
        ) : showResults ? (
          <Results
            skinAnalysis={skinAnalysis}
            products={products}
            onRegenerate={handleRegenerate}
            onUploadMore={handleUploadMore}
          />
        ) : (
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-medium text-gray-800 mb-2">Get Personalized Skincare Recommendations ✨</h2>
              <p className="text-gray-600">Upload your photos and tell us what you're looking for</p>
            </div>
            <SkinAnalysisForm onSubmit={handleFormSubmit} />
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© 2025 Skincare Advisor. All rights reserved.</p>
      </footer>
    </div>
  );
}
