import { useState, useEffect } from 'react';

const useFullScreen = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Function to toggle full-screen mode
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // Full-screen change detection
    const handleFullScreenChange = () => {
        setIsFullScreen(!!document.fullscreenElement);
    };

    // Listen for full-screen change events
    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    // Handle F11 key to toggle full-screen
    const handleKeyDown = (e) => {
        if (e.key === 'F11') {
            toggleFullScreen();
        }
    };

    // Add keydown listener for F11
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return { isFullScreen, toggleFullScreen };
};

export default useFullScreen;
