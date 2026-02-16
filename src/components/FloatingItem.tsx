import { motion } from 'framer-motion';

export default function FloatingItem({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.6}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            animate={{
                y: [0, -15, 0], // Fluttuazione lenta
                rotate: [0, 1, -1, 0]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={`cursor-grab active:cursor-grabbing ${className}`}
        >
            {children}
        </motion.div>
    );
}