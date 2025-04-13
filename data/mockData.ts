// Mock data to simulate Gemini API responses

export interface Product {
    name: string;
    price: string;
    description: string;
    platform: string;
    link: string;
}

export const mockSkinAnalysis = {
    oily: "Your skin appears to have an oily T-zone with some shine on the forehead and nose. I notice some minor congestion in the pore areas. Based on the images, I recommend products that help balance oil production while maintaining hydration.",
    dry: "Your skin shows signs of dryness, particularly on the cheeks and around the mouth area. There are some fine lines that may be due to dehydration. I recommend products focused on deep hydration and moisture retention.",
    combination: "You have combination skin with an oily T-zone but drier cheeks. I notice some congestion around the nose and slight dryness on the cheeks. A balanced routine with targeted treatments for different areas would be beneficial.",
    sensitive: "Your skin appears to be on the sensitive side with some redness around the cheeks and nose. I don't see major concerns, but would recommend gentle, fragrance-free products that won't trigger irritation.",
    normal: "Your skin appears well-balanced with good hydration levels. I don't see significant concerns, but everyone can benefit from a consistent skincare routine focused on protection and prevention."
};

export const mockProducts: Record<string, Product[]> = {
    oily: [
        {
            name: "Minimalist Salicylic Acid Face Wash",
            price: "₹299",
            description: "Gentle cleanser with 2% salicylic acid to control oil and clear pores",
            platform: "Amazon",
            link: "https://www.amazon.in/"
        },
        {
            name: "Plum Green Tea Toner",
            price: "₹427",
            description: "Alcohol-free toner that reduces excess oil and minimizes pores",
            platform: "Nykaa",
            link: "https://www.nykaa.com/"
        },
        {
            name: "The Ordinary Niacinamide 10% + Zinc 1%",
            price: "₹750",
            description: "Serum that regulates sebum production and improves skin texture",
            platform: "Myntra",
            link: "https://www.myntra.com/"
        }
    ],
    dry: [
        {
            name: "Cetaphil Gentle Skin Cleanser",
            price: "₹329",
            description: "Non-stripping cleanser that preserves skin's moisture barrier",
            platform: "Amazon",
            link: "https://www.amazon.in/"
        },
        {
            name: "Laneige Water Sleeping Mask",
            price: "₹1,750",
            description: "Overnight mask that deeply hydrates and revitalizes dry skin",
            platform: "Nykaa",
            link: "https://www.nykaa.com/"
        },
        {
            name: "Neutrogena Hydro Boost Water Gel",
            price: "₹850",
            description: "Lightweight gel moisturizer with hyaluronic acid for intense hydration",
            platform: "Myntra",
            link: "https://www.myntra.com/"
        }
    ],
    combination: [
        {
            name: "Simple Kind To Skin Refreshing Face Wash",
            price: "₹375",
            description: "Gentle cleanser suitable for combination skin types",
            platform: "Amazon",
            link: "https://www.amazon.in/"
        },
        {
            name: "Klairs Supple Preparation Facial Toner",
            price: "₹1,370",
            description: "Hydrating toner that balances skin without irritation",
            platform: "Nykaa",
            link: "https://www.nykaa.com/"
        },
        {
            name: "Clinique Dramatically Different Moisturizing Gel",
            price: "₹2,300",
            description: "Oil-free moisturizer that hydrates dry areas without making oily areas worse",
            platform: "Myntra",
            link: "https://www.myntra.com/"
        }
    ],
    sensitive: [
        {
            name: "Avene Extremely Gentle Cleanser",
            price: "₹1,290",
            description: "Ultra-gentle no-rinse cleanser for reactive skin",
            platform: "Amazon",
            link: "https://www.amazon.in/"
        },
        {
            name: "Cosrx Advanced Snail 96 Mucin Power Essence",
            price: "₹1,150",
            description: "Soothing essence that repairs and calms irritated skin",
            platform: "Nykaa",
            link: "https://www.nykaa.com/"
        },
        {
            name: "Dr. Jart+ Cicapair Tiger Grass Cream",
            price: "₹3,200",
            description: "Color-correcting treatment that reduces redness and strengthens skin barrier",
            platform: "Myntra",
            link: "https://www.myntra.com/"
        }
    ],
    normal: [
        {
            name: "Bioderma Sensibio H2O Micellar Water",
            price: "₹450",
            description: "Gentle makeup remover and cleanser for all skin types",
            platform: "Amazon",
            link: "https://www.amazon.in/"
        },
        {
            name: "The Face Shop Rice Water Bright Cleansing Foam",
            price: "₹540",
            description: "Rice-based cleanser that brightens and maintains skin's natural balance",
            platform: "Nykaa",
            link: "https://www.nykaa.com/"
        },
        {
            name: "Innisfree Green Tea Seed Serum",
            price: "₹1,500",
            description: "Antioxidant-rich serum that hydrates and protects against environmental damage",
            platform: "Myntra",
            link: "https://www.myntra.com/"
        }
    ]
};

// Helper function to get random skin type for demo purposes
export const getRandomSkinType = () => {
    const skinTypes = ['oily', 'dry', 'combination', 'sensitive', 'normal'];
    return skinTypes[Math.floor(Math.random() * skinTypes.length)];
};

// Helper function to get mock analysis and products based on skin type
export const getMockAnalysisAndProducts = (skinType: string = getRandomSkinType()) => {
    return {
        skinAnalysis: mockSkinAnalysis[skinType as keyof typeof mockSkinAnalysis],
        products: mockProducts[skinType as keyof typeof mockProducts] || mockProducts.normal
    };
};