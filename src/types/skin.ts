
export type SkinCondition = {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  treatment: string;
  risk: 'Low' | 'Moderate' | 'High';
  needsMedicalAttention: boolean;
  imageUrl?: string;
};

export type DiagnosisResult = {
  condition: SkinCondition;
  confidence: number;
  timestamp: string;
};
