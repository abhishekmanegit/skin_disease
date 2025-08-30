
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Info } from 'lucide-react';
import { SkinCondition } from '@/types/skin';
import { getDiseaseById } from '@/data/skinConditions';

const ConditionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [condition, setCondition] = useState<SkinCondition | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // In a real app, this might be an API call
      const foundCondition = getDiseaseById(id);
      
      if (foundCondition) {
        setCondition(foundCondition);
      }
      
      setLoading(false);
    }
  }, [id]);
  
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Low':
      default:
        return 'bg-green-100 text-green-800 hover:bg-green-100';
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse-light">Loading condition details...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!condition) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Condition Not Found</h1>
            <p className="text-gray-600 mb-6">The skin condition you're looking for could not be found.</p>
            <Link to="/conditions">
              <Button>Return to Conditions</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/conditions" className="inline-flex items-center text-gray-600 hover:text-skin-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to all conditions
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <h1 className="text-3xl font-bold mr-4">{condition.name}</h1>
                <Badge 
                  variant="outline" 
                  className={`mt-2 sm:mt-0 ${getRiskBadgeColor(condition.risk)}`}
                >
                  {condition.risk} Risk
                </Badge>
              </div>
              
              {condition.needsMedicalAttention && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Medical Attention Recommended</h3>
                      <p className="text-yellow-700 text-sm">
                        This condition typically requires evaluation by a healthcare professional.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">About this condition</h2>
                <p className="text-gray-700">{condition.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Common Symptoms</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {condition.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Treatment Options</h2>
                  <p className="text-gray-700">{condition.treatment}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800">Disclaimer</h3>
                    <p className="text-blue-700 text-sm">
                      This information is provided for educational purposes only and is not intended to be a substitute
                      for professional medical advice, diagnosis, or treatment. Always seek the advice of your 
                      physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <p className="mb-4 text-gray-600">Want to check if you have this condition?</p>
            <Link to="/diagnose">
              <Button className="bg-skin-primary hover:bg-skin-primary/90">
                Start a Diagnosis
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConditionDetailPage;
