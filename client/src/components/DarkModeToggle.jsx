import { useState, useEffect } from 'react';
import Switch from 'react-switch';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleThemeChange = (checked) => {
        setDarkMode(checked);
    };

    const toggleButtonStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        /*  background: darkMode ? '#4B5563' : '#F3F4F6', */
        borderRadius: '9999px',
        padding: '10px',
    };

    const labelStyles = {
        marginLeft: '10px',
        color: darkMode ? '#F9FAFB' : '#374151',
    };

    return (
        <label style={toggleButtonStyles}>
            {/* <span style={labelStyles}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span> */}
            <Switch
                checked={darkMode}
                onChange={handleThemeChange}
                onColor="#68D391"
                offColor="#E53E3E"
                onHandleColor="#68D391"
                offHandleColor="#E53E3E"
                uncheckedIcon={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            fontSize: 25,
                            color: '#F9FAFB',
                            padding: 2,
                        }}
                    >
                        ☀
                    </div>
                }
                checkedIcon={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            fontSize: 25,
                            color: '#F9FAFB',
                            padding: 2,
                            marginRight: 5
                        }}
                    >
                        ☾
                    </div>
                }
                height={30}
                width={60}
            />
        </label>
    );
};

export default DarkModeToggle;
