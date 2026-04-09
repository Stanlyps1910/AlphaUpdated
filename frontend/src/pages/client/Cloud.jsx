import React, { useState, useEffect } from 'react';
import { FolderOpen, Lock, Unlock, ExternalLink, Download, Info } from 'lucide-react';

const Cloud = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/auth/me`, {
                        headers: { 'x-auth-token': token }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    }
                }
            } catch (err) {
                console.error("Error fetching user for cloud:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const cloudLink = user?.cloudLink || "https://teamalpha.studio/shared";
    const cloudPassword = user?.cloudPassword || "WAITING...";

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse text-luxury-gold uppercase tracking-[4px] text-[10px] font-bold">Accessing Secure Vault...</div>
        </div>
    );

    return (
        <div className="flex flex-col w-full animate-fade-up dark:text-stone-100">
            {/* Page Header */}
            <header className="text-left mb-10">
                <h1 className="text-4xl md:text-5xl mb-4 uppercase tracking-[8px] font-light text-stone-800 dark:text-stone-100">The Vault</h1>
                <div className="h-1 w-20 bg-gradient-to-r from-luxury-gold to-luxury-gold/20 rounded-full"></div>
                <p className="text-luxury-text-muted dark:text-stone-400 italic max-w-2xl text-base mt-6">
                    Your high-resolution legacy, preserved in our private encrypted laboratory.
                </p>
            </header>

            <div className="max-w-[1000px] w-full mx-auto">
                <div className="glass-card p-6 md:p-10 animate-fade-up border-luxury-gold/20 shadow-2xl border-l-[6px] border-l-green-500/50 dark:bg-stone-900/50 dark:border-white/10 dark:border-l-green-500/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-6 border-b border-black/5 dark:border-white/10 gap-4">
                        <div className="flex items-center gap-5">
                            <div className="icon-wrapper !w-12 !h-12 bg-green-500/10 border-green-500/20">
                                <Unlock size={20} className="text-green-600 dark:text-green-400" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h2 className="text-xl font-medium text-stone-800 dark:text-stone-100 tracking-tight">Vault Unlocked</h2>
                                <p className="text-[9px] uppercase tracking-[3px] text-green-600 dark:text-green-400 font-bold">Authorized</p>
                            </div>
                        </div>
                        <div className="bg-luxury-gold/5 dark:bg-luxury-gold/10 px-4 py-2 rounded-full flex items-center gap-2 text-[9px] font-bold uppercase tracking-[3px] text-luxury-gold border border-luxury-gold/10 dark:border-luxury-gold/20 self-start sm:self-auto">
                            <Info size={12} /> Access Granted
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            className="bg-white/50 dark:bg-stone-800/50 border border-white dark:border-stone-700/50 rounded-[2rem] p-6 md:p-8 hover:bg-white dark:hover:bg-stone-800 transition-all group shadow-sm flex flex-col h-full cursor-pointer hover:-translate-y-2 duration-300"
                            onClick={() => window.open(cloudLink, '_blank')}
                        >
                            <div className="icon-wrapper mb-6 group-hover:scale-110 transition-transform dark:bg-stone-900/50">
                                <FolderOpen size={24} className="text-luxury-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg mb-2 text-stone-800 dark:text-stone-100">{user?.firstName || "Client"}'s Shared Files</h3>
                            <p className="text-[11px] text-luxury-text-muted dark:text-stone-400 mb-8 leading-relaxed italic">
                                Access all your primary cinematic files and high-resolution stills safely.
                            </p>
                            <a
                                href={cloudLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-luxury-primary !py-3.5 !px-8 text-[10px] flex items-center justify-center gap-2 w-fit mt-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Access Files <ExternalLink size={14} />
                            </a>
                        </div>

                        <div className="bg-stone-50 dark:bg-stone-800/30 rounded-[2rem] p-6 md:p-8 border-2 border-dashed border-black/[0.08] dark:border-white/10 relative overflow-hidden flex flex-col h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-luxury-gold">
                                <Lock size={80} />
                            </div>
                            <span className="block text-[9px] uppercase tracking-[3px] text-stone-400 dark:text-stone-500 mb-2 font-bold">Vault Password</span>
                            <div
                                className="text-3xl font-mono font-bold tracking-[8px] text-stone-800 dark:text-stone-100 mb-6 antialiased cursor-text break-words"
                                style={{ userSelect: 'all' }}
                            >
                                {cloudPassword}
                            </div>
                            <div className="p-4 bg-white/60 dark:bg-stone-900/60 rounded-2xl flex items-center gap-3 text-[10px] text-stone-500 dark:text-stone-400 italic border border-white dark:border-stone-700 mt-auto">
                                <Download size={14} className="text-luxury-gold shrink-0" /> <span className="leading-snug">Click the password above to easily copy it for accessing your vault.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .folder-pulse { animation: pulse-gold 3s infinite; }
                @keyframes pulse-gold {
                    0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(212, 175, 55, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
                }
            `}} />
        </div>
    );
};

export default Cloud;
