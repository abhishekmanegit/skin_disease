
import { DiagnosisResult } from "@/types/skin";
import { skinConditions } from "@/data/skinConditions";

// This is a mock service for demonstration purposes
// In a real application, this would connect to a trained model API
export const analyzeSkinImage = (imageData: string): Promise<DiagnosisResult> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, we'll just randomly select a condition
      const randomIndex = Math.floor(Math.random() * skinConditions.length);
      const selectedCondition = skinConditions[randomIndex];
      
      // Generate a random confidence score between 60% and 95%
      const confidence = Math.floor(Math.random() * 36) + 60;
      
      resolve({
        condition: selectedCondition,
        confidence: confidence,
        timestamp: new Date().toISOString()
      });
    }, 2000); // 2 second delay to simulate processing
  });
};
