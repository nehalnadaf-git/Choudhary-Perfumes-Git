"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
    whatsappNumber: string;
    loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
    whatsappNumber: '916363278962',
    loading: true,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [whatsappNumber, setWhatsappNumber] = useState('916363278962');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings?key=whatsapp_number');
                if (res.ok) {
                    const data = await res.json();
                    if (data.value) {
                        setWhatsappNumber(data.value);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch WhatsApp number:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ whatsappNumber, loading }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
