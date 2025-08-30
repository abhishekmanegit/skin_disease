
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Camera, ClipboardList } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-skin-secondary to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-skin-dark mb-4">
                  AI-Powered Skin Disease Detection
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Take a photo of your skin condition and get an instant AI analysis. 
                  Quick, easy, and private.
                </p>
                <Link to="/diagnose">
                  <Button className="bg-skin-primary hover:bg-skin-primary/90 text-white px-8 py-6 rounded-lg text-lg">
                    Start Diagnosis
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Skin Analysis" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How it Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="bg-skin-secondary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-skin-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Take a Photo</h3>
                <p className="text-gray-600">
                  Use your device's camera to capture a clear image of the skin condition.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="bg-skin-secondary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-skin-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI system analyzes the image to identify potential skin conditions.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="bg-skin-secondary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-skin-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                <p className="text-gray-600">
                  Receive instant information about potential conditions and treatment options.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Disclaimer */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-center">Important Disclaimer</h3>
              <p className="text-gray-600 text-center">
                This tool is for educational purposes only and should not replace professional medical advice. 
                Always consult with a healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
