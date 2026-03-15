import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import ScrollToTop from "./components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Movies = lazy(() => import("./pages/Movies"));
const Movie = lazy(() => import("./pages/Movie"));
const Write = lazy(() => import("./pages/Write"));
const MyClimaxes = lazy(() => import("./pages/MyClimaxes"));
const Auth = lazy(() => import("./pages/Auth"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const WhyEndingsMatter = lazy(() => import("./pages/WhyEndingsMatter"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Index />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:slug" element={<Movie />} />
            <Route path="/write" element={<Write />} />
            <Route path="/my-climaxes" element={<MyClimaxes />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/why-endings-matter" element={<WhyEndingsMatter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
