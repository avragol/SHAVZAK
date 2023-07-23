import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button onClick={toggleDarkMode} className="p-2 bg-gray-300 dark:bg-gray-700 justify-end">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default DarkModeToggle;
