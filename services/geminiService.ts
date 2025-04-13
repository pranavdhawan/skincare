import { gemini } from "@/config/gemini";
import { FileData } from "@google/genai";
import { Product } from "@/data/mockData";


export async function analyzeSkinImages(images: File[], budget: string) {
    try {
        const imageFiles = await Promise.all(
            images.map(async (image) => ({
                inlineData: {
                    data: await convertToBase64(image),
                    mimeType: image.type
                }
            }))
        );

        //         const prompt = `Analyze these skin images and provide:
        // 1. Detailed skin analysis including type, concerns, and overall health
        // 2. Recommend 3 specific skincare products within ${budget} budget range. For each product include:
        //    - Exact product name
        //    - Price in INR (₹)
        //    - Brief description of benefits
        //    - Where to buy (Amazon/Nykaa/Myntra)
        // Format the product recommendations as a JSON array.`;

        const prompt = `
        You're a friendly and smart beauty + skincare expert.

The user has uploaded image(s) of their face and answered a few quick preferences.

Here is what you need to do:
1. **Analyze their skin** using the image(s). Identify:
   - Skin tone + undertone
   - Skin type (oily, dry, combination, sensitive, normal)
   - Visible concerns (acne, dark spots, dullness, redness, dryness, etc.)
2. Based on that analysis, and within ${budget} budget range, recommend **3 great products** across Amazon, Nykaa, or Myntra.

For each product, return:
- Product Name
- One-line about what it's great for
- Price
- Product Link (use dummy URLs if needed)

Give the products in JSON format.
{
    "productName": "Product Name",
    "priceINR": "Price",
    "description": "One-line about what it's great for",
    "whereToBuy": "Amazon/Nykaa/Myntra"
}

Use a tone that’s chill, confidence-boosting, and beginner-friendly. Don’t overload with technical jargon. If you can't find exact matches, suggest similar alternatives.
`




        // const response = await ai.models.generateContent({
        //     model: 'gemini-2.0-flash-exp-image-generation',
        //     contents: prompt,
        //     config: {
        //         responseModalities: ['Text', 'Image']
        //     },
        // });

        // const result = await gemini.generateContent([prompt, ...imageFiles]);

        const result = await gemini.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                        ...imageFiles
                    ]
                }
            ],
        })

        // const response = await result.response;
        const text = await result.text;
        const [analysis, productsJson] = separateAnalysisAndProducts(text!);
        const prodcuts = parseProducts(productsJson)
        console.log(productsJson);

        return {
            skinAnalysis: analysis,
            prodcuts
        }
    } catch (error) {
        console.error('Error analyzing skin images:', error);
        throw error;
    }
}

function separateAnalysisAndProducts(text: string): [string, string] {
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('No product recommendations found in response');
    }
    return [
        text.slice(0, jsonStart).trim(),
        text.slice(jsonStart, jsonEnd)
    ];
}

function parseProducts(json: string): Product[] {
    try {
        // const cleanJson = json.replace(/[\n\r]/g, '')
        //     .replace(/,\s*]/g, ']')
        //     .replace(/\s+/g, ' ')
        //     .trim();
        const products = JSON.parse(json);
        return products.map((p: any) => ({
            name: p.productName,
            price: p.priceINR,
            description: p.description,
            platform: p.whereToBuy || 'Amazon',
            link: getPlatformLink(p.platform || 'Amazon')
        }));
    } catch (error) {
        console.error('Error parsing products:', error);
        return []
    }
}

function getPlatformLink(platform: string): string {
    const links = {
        'Amazon': 'https://www.amazon.in/',
        'Nykaa': 'https://www.nykaa.com/',
        'Myntra': 'https://www.myntra.com/'
    };
    return links[platform as keyof typeof links] || links.Amazon;
}

async function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}