import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
}

export default function Typewriter({ text, speed = 100, delay = 0, onComplete }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const hasFinished = useRef(false); // Blocca il loop

    useEffect(() => {
        if (hasFinished.current) return;

        let i = 0;
        const startTimeout = setTimeout(() => {
            const timer = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;

                if (i >= text.length) {
                    clearInterval(timer);
                    if (!hasFinished.current) {
                        hasFinished.current = true;
                        onComplete?.();
                    }
                }
            }, speed);

            return () => clearInterval(timer);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, speed, delay]); // Rimosso onComplete dalle dipendenze per evitare il loop

    // Cursore indipendente
    useEffect(() => {
        const cursorTimer = setInterval(() => setShowCursor(prev => !prev), 500);
        return () => clearInterval(cursorTimer);
    }, []);

    return (
        <span>
            {displayedText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-indigo-500`}>_</span>
        </span>
    );
}