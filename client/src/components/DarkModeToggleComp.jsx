import { useState, useEffect } from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

const DarkModeToggleComp = () => {
    const [darkMode, setDarkMode] = useState('dark');

    useEffect(() => {
        if (darkMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <DarkModeToggle
            mode={darkMode}
            dark="Dark"
            light="Light"
            size="sm"
            inactiveTrackColor="#e2e8f0"
            inactiveTrackColorOnHover="#f8fafc"
            inactiveTrackColorOnActive="#cbd5e1"
            activeTrackColor="#334155"
            activeTrackColorOnHover="#1e293b"
            activeTrackColorOnActive="#0f172a"
            inactiveThumbColor="#1e293b"
            activeThumbColor="#e2e8f0"
            inactiveLabelColor="#F2F2F2"
            activeLabelColor="#111827"
            onChange={(darkMode) => {
                setDarkMode(darkMode);
            }}
        />
    );
};

export default DarkModeToggleComp;
