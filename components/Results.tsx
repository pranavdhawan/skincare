import React from 'react';
import refineSkinAnalysis from './SkinAnalysisForm';
import ReactMarkdown from 'react-markdown';

interface Product {
    name: string;
    price: string;
    description: string;
    platform: string;
    link: string;
}

interface ResultsProps {
    skinAnalysis: string;
    products: Product[];
    onRegenerate: () => void;
    onUploadMore: () => void;
}


const Results: React.FC<ResultsProps> = ({
    skinAnalysis,
    products,
    onRegenerate,
    onUploadMore,
}) => {


    return (
        <div className="w-full max-w-md mx-auto">
            {/* Skin Analysis Report */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium text-gray-800 mb-3">Your Skin Analysis ✨</h2>
                    <div className="prose prose-sm text-gray-700">
                        <ReactMarkdown>
                            {skinAnalysis || 'Upload your photos to get a personalized skin analysis.'}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
            {/* Product Recommendations */}
            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 mb-3">Recommended Products 🌿</h2>
                {products && products.length > 0 ? (
                    <div className="space-y-4">
                        {products.map((product, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-md font-medium text-gray-800">{product.name}</h3>
                                    <span className="text-pink-500 font-medium">{product.price}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                <div className="mt-3 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Available on {product.platform}</span>
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-purple-500 hover:text-purple-700 font-medium"
                                    >
                                        View Product →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center p-4 bg-white rounded-lg shadow-sm">
                        No products to display yet. Upload your photos to get personalized recommendations.
                    </p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
                <button
                    onClick={onRegenerate}
                    className="flex-1 py-3 px-4 bg-purple-100 text-purple-700 font-medium rounded-lg shadow-sm hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
                >
                    Regenerate 🔄
                </button>
                <button
                    onClick={onUploadMore}
                    className="flex-1 py-3 px-4 bg-pink-100 text-pink-700 font-medium rounded-lg shadow-sm hover:bg-pink-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
                >
                    Upload More 📸
                </button>
                <button
                    className="flex-1 py-3 px-4 bg-blue-100 text-blue-700 font-medium rounded-lg shadow-sm hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                    Share 📱
                </button>
            </div>
        </div>
    );
};

export default Results;