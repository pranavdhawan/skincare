import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface SkinAnalysisFormProps {
    onSubmit: (data: {
        images: File[];
        interests: string[];
        budget: string;
    }) => void;
}

const SkinAnalysisForm: React.FC<SkinAnalysisFormProps> = ({ onSubmit }) => {
    const [images, setImages] = useState<File[]>([]);
    const [interests, setInterests] = useState<string[]>([]);
    const [budget, setBudget] = useState<string>('');

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        multiple: true,
        onDrop: (acceptedFiles) => {
            setImages(acceptedFiles);
        },
    });

    const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInterests((prev) =>
            prev.includes(value)
                ? prev.filter((interest) => interest !== value)
                : [...prev, value]
        );
    };

    const handleBudgetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBudget(event.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ images, interests, budget });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Upload Your Photos</label>
                <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-pink-200 rounded-lg p-6 text-center cursor-pointer hover:bg-pink-50 transition-colors"
                >
                    <input {...getInputProps()} />
                    <p className="text-gray-500 mb-2">Drag & drop your photos here, or click to select files</p>
                    <p className="text-xs text-gray-400">You can upload multiple photos for better analysis ✨</p>

                    {images.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-pink-600 font-medium">{images.length} photo(s) selected</p>
                            <div className="flex flex-wrap gap-2 mt-2 justify-center">
                                {images.map((file, index) => (
                                    <div key={index} className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">What are you interested in?</label>
                <div className="flex flex-wrap gap-3">
                    {['skincare', 'beauty', 'both', 'general'].map((option) => (
                        <label key={option} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value={option}
                                checked={interests.includes(option)}
                                onChange={handleInterestChange}
                                className="form-checkbox h-5 w-5 text-pink-500 rounded focus:ring-pink-400"
                            />
                            <span className="ml-2 text-gray-700 capitalize">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="budget" className="block text-gray-700 text-sm font-medium mb-2">Your Budget Range</label>
                <select
                    id="budget"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    required
                >
                    <option value="" disabled>Select your budget</option>
                    <option value="₹0-500">₹0-500</option>
                    <option value="₹500-1000">₹500-1000</option>
                    <option value="₹1000-2000">₹1000-2000</option>
                    <option value="₹2000+">₹2000+</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium rounded-lg shadow-sm hover:from-pink-500 hover:to-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
            >
                Analyze My Skin ✨
            </button>
        </form>
    );
};

export default SkinAnalysisForm;