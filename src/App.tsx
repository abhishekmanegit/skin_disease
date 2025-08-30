
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import DiagnosePage from "./pages/DiagnosePage";
import ConditionsPage from "./pages/ConditionsPage";
import ConditionDetailPage from "./pages/ConditionDetailPage";
import NotFound from "./pages/NotFound";
import { Chatbot, ChatbotButton } from "@/components/Chatbot";

const queryClient = new QueryClient();

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diagnose" element={<DiagnosePage />} />
            <Route path="/conditions" element={<ConditionsPage />} />
            <Route path="/conditions/:id" element={<ConditionDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* Chatbot Components */}
        <ChatbotButton onClick={() => setIsChatbotOpen(true)} />
        <Chatbot 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
