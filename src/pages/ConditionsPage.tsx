
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, AlertTriangle, Heart, ArrowRight } from 'lucide-react';
import { skinConditions } from '@/data/skinConditions';

const ConditionsPage = () => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Skin Conditions Information</h1>
          <p className="text-gray-600 text-center mb-8">
            Learn about common skin conditions and their treatments
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {skinConditions.map((condition) => (
              <Card key={condition.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{condition.name}</CardTitle>
                  <CardDescription>
                    <Badge 
                      variant="outline" 
                      className={`mt-1 ${getRiskBadgeColor(condition.risk)}`}
                    >
                      {condition.risk} Risk
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{condition.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Common Symptoms:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                      {condition.symptoms.slice(0, 2).map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                      {condition.symptoms.length > 2 && (
                        <li key="more">And {condition.symptoms.length - 2} more...</li>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <div className="text-sm text-gray-500 flex items-center">
                    {condition.needsMedicalAttention ? (
                      <>
                        <AlertTriangle className="h-3.5 w-3.5 mr-1 text-yellow-600" />
                        Needs medical attention
                      </>
                    ) : (
                      <>
                        <Info className="h-3.5 w-3.5 mr-1 text-blue-600" />
                        Self-care may be sufficient
                      </>
                    )}
                  </div>
                  <Link 
                    to={`/conditions/${condition.id}`} 
                    className="text-skin-primary hover:text-skin-primary/80 font-medium text-sm flex items-center"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-skin-secondary/30 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="flex items-start">
              <Heart className="h-6 w-6 text-skin-primary mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Taking care of your skin</h3>
                <p className="text-gray-700 mb-3">
                  Regardless of your skin condition, these general skin care tips can help maintain healthy skin:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-skin-primary mr-2"></span>
                    Use gentle, fragrance-free cleansers
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-skin-primary mr-2"></span>
                    Apply moisturizer daily
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-skin-primary mr-2"></span>
                    Protect your skin from the sun
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-skin-primary mr-2"></span>
                    Stay hydrated by drinking plenty of water
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-skin-primary mr-2"></span>
                    Avoid irritating or harsh products
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-skin-primary mr-2"></span>
                    Consider using humidifiers in dry environments
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConditionsPage;
