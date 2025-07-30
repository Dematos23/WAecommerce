"use server";

import { generateProductDescription, type GenerateProductDescriptionInput, type GenerateProductDescriptionOutput } from "@/ai/flows/generate-product-description";

export async function generateDescriptionAction(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
    console.log("Generating description for:", input.name);
    try {
        const result = await generateProductDescription(input);
        return result;
    } catch (error) {
        console.error("Error generating product description:", error);
        throw new Error("Failed to generate description");
    }
}
