
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
              <Route path="/restaurant/:id" element={<MainLayout><RestaurantPage /></MainLayout>} />
              <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
              <Route path="/auth" element={<MainLayout><AuthPage /></MainLayout>} />
              <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
