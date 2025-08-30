import React, { useState } from 'react';
import { Loader2, AlertTriangle, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DiagnosisResult } from '@/types/skin';
import { analyzeSkinImage } from '@/services/diagnosisService';
import { useToast } from '@/hooks/use-toast';

const DiagnosePage = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const { toast } = useToast();

  const handleImageCapture = (image: string) => {
    setCapturedImage(image);
    toast({
      title: "Image uploaded",
      description: "Your image is ready for analysis.",
      duration: 3000,
    });
  };

  const handleAnalyzeImage = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    
    try {
      const result = await analyzeSkinImage(capturedImage);
      setDiagnosisResult(result);
      
      toast({
        title: "Analysis complete",
        description: `Condition identified: ${result.condition.name}`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis failed",
        description: "An error occurred while analyzing your image. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDiagnosis = () => {
    setCapturedImage(null);
    setDiagnosisResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Skin Condition Diagnosis</h1>
          <p className="text-gray-600 text-center mb-8">Upload a clear photo of the affected skin area for analysis</p>
          
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              This tool is for educational purposes only and is not a substitute for professional medical advice.
              Always consult with a healthcare provider for proper diagnosis and treatment.
            </AlertDescription>
          </Alert>
          
          {!diagnosisResult ? (
            <div className="max-w-3xl mx-auto">
              <ImageUpload onImageCapture={handleImageCapture} />
              
              {capturedImage && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleAnalyzeImage} 
                    disabled={isAnalyzing}
                    className="bg-skin-primary hover:bg-skin-primary/90"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </Button>
                </div>
              )}
              
              {isAnalyzing && (
                <div className="mt-8">
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-skin-primary" />
                    <h3 className="text-xl font-medium mb-2">Analyzing your image</h3>
                    <p className="text-gray-600">Our AI is examining the skin condition. This will only take a moment...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{diagnosisResult.condition.name}</h2>
                  <div className="flex items-center mb-6">
                    <div className={`h-2.5 rounded-full w-full ${
                      diagnosisResult.confidence > 80 ? 'bg-green-200' : 
                      diagnosisResult.confidence > 70 ? 'bg-yellow-200' : 'bg-orange-200'
                    }`}>
                      <div 
                        className={`h-2.5 rounded-full ${
                          diagnosisResult.confidence > 80 ? 'bg-green-500' : 
                          diagnosisResult.confidence > 70 ? 'bg-yellow-500' : 'bg-orange-500'
                        }`} 
                        style={{ width: `${diagnosisResult.confidence}%` }}>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{diagnosisResult.confidence}% confidence</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">About this condition</h3>
                      <p className="text-gray-700 mb-4">{diagnosisResult.condition.description}</p>
                      
                      <h3 className="font-semibold text-lg mb-2">Common symptoms</h3>
                      <ul className="list-disc pl-5 mb-4 text-gray-700">
                        {diagnosisResult.condition.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className={`mb-4 p-3 rounded-lg ${
                        diagnosisResult.condition.risk === 'High' ? 'bg-red-50 border border-red-200' : 
                        diagnosisResult.condition.risk === 'Moderate' ? 'bg-yellow-50 border border-yellow-200' : 
                        'bg-green-50 border border-green-200'
                      }`}>
                        <div className="flex items-start">
                          <div className={`rounded-full p-1 mr-2 ${
                            diagnosisResult.condition.risk === 'High' ? 'bg-red-100 text-red-500' : 
                            diagnosisResult.condition.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-600' : 
                            'bg-green-100 text-green-500'
                          }`}>
                            <Info className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium">Risk Level: {diagnosisResult.condition.risk}</h4>
                            <p className="text-sm">
                              {diagnosisResult.condition.needsMedicalAttention
                                ? "Medical attention recommended"
                                : "Usually doesn't require immediate medical attention"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">Treatment options</h3>
                      <p className="text-gray-700 mb-4">{diagnosisResult.condition.treatment}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      onClick={resetDiagnosis}
                      variant="outline"
                      className="mr-4"
                    >
                      Upload Another Photo
                    </Button>
                    <Button
                      onClick={() => window.print()}
                      variant="secondary"
                    >
                      Print Results
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Remember</h3>
                    <p className="text-blue-700 text-sm">
                      This analysis is provided for educational purposes only. For proper medical diagnosis and treatment,
                      please consult with a qualified healthcare professional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiagnosePage;
