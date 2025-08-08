import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import RegisterFarmer from "./pages/RegisterFarmer";
import RegisterBuyer from "./pages/RegisterBuyer";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import { LanguageProvider } from "./components/language/LanguageProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/farmer" element={<RegisterFarmer />} />
            <Route path="/register/buyer" element={<RegisterBuyer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
