import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Visualizer from './Visualizer';
import LandingPage from './pages/LandingPage';
import { LanguageProvider } from './context/LanguageContext';
import EmailConfirmed from './pages/EmailConfirmed';
import TermsPage from './pages/TermsPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import DocsPage from './pages/DocsPage';
import DownloadPage from './pages/DownloadPage';
import Layout from './components/layout/Layout';


export default function App() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-screen bg-[#050508] flex items-center justify-center font-mono text-indigo-500 animate-pulse">
                INITIALIZING_SESSION...
            </div>
        );
    }

    return (
        <LanguageProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/auth/confirmed" element={<EmailConfirmed />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/docs" element={<DocsPage />} />
                        <Route path="/download" element={<DownloadPage />} />
                    </Route>
                    <Route path="/login" element={!session ? <Login /> : <Navigate to="/app" replace />} />
                    <Route path="/app" element={<Visualizer />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    );
}