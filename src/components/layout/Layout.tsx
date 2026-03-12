import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="min-h-screen cyber-bg text-white overflow-x-hidden selection:bg-indigo-500/30 font-sans flex flex-col">
            <div className="spotlight fixed inset-0 pointer-events-none z-0" />
            <Navbar />
            <main className="flex-1 w-full flex flex-col relative z-10 pt-[72px]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
