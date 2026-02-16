import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, isVisible }: { message: string, isVisible: boolean }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-2xl shadow-indigo-500/40 flex items-center gap-3 border border-indigo-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}