import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main id="home">
            <Hero />
            <div className="section-divider"></div>
            <Testimonials />
            <CTA />

            <style dangerouslySetInnerHTML={{
                __html: `
                .section-divider {
                    height: 1px;
                    background: var(--border);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .hero {
                    height: 90vh;
                    background: linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.4)), 
                                url("https://i.pinimg.com/1200x/06/5a/97/065a971bd2079220ac781b1bc4e956b8.jpg") center/cover no-repeat;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    position: relative;
                }

                .hero-content {
                    max-width: 900px;
                    padding: 60px;
                    z-index: 1;
                    background: var(--glass);
                    backdrop-filter: blur(8px);
                    border-radius: var(--radius);
                    border: 1px solid var(--border);
                }

                .hero h2 {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    line-height: 1.1;
                    margin-bottom: 24px;
                    text-transform: uppercase;
                    letter-spacing: 8px;
                    color: #000;
                    animation: fadeInUp 1s ease-out;
                }

                .hero p {
                    font-size: 1rem;
                    color: var(--text-muted);
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    margin-bottom: 32px;
                    animation: fadeInUp 1s ease-out 0.2s both;
                }

                .primary-btn {
                    background: #1a1a1a;
                    color: white;
                    padding: 16px 44px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.75rem;
                    border-radius: 40px; /* Fully rounded pill */
                    transition: all 0.4s;
                    display: inline-block;
                    animation: fadeInUp 1s ease-out 0.4s both;
                }

                .primary-btn:hover {
                    background: var(--primary);
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }

                .testimonials {
                    padding: 100px 24px;
                    background: white;
                }

                .testimonials h3 {
                    font-size: 0.8rem;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: var(--primary);
                    margin-bottom: 32px;
                }

                .quote-container {
                    max-width: 900px;
                    margin: 0 auto;
                }

                .quote-text {
                    font-size: clamp(1.2rem, 3vw, 2rem);
                    font-style: italic;
                    line-height: 1.5;
                    margin-bottom: 32px;
                    color: #222;
                }

                .video-link {
                    color: #1a1a1a;
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    display: inline-block;
                    padding: 12px 24px;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    margin-top: 24px;
                }

                .video-link:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                }

                .cta {
                    background: var(--bg-card);
                    padding: 80px 24px;
                    text-align: center;
                    border-top: 1px solid var(--border);
                }

                .cta h3 {
                    font-size: clamp(1.8rem, 4vw, 2.5rem);
                    margin-bottom: 12px;
                }

                .cta p {
                    color: var(--text-muted);
                    font-size: 1rem;
                    font-style: italic;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </main>
    );
}

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <p>Establishing Timeless Memories</p>
                <h2>Luxury Wedding Photography</h2>
                <Link to="/gallery" className="primary-btn">
                    Explore The Gallery
                </Link>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section className="testimonials">
            <div className="quote-container">
                <h3>Real Stories</h3>
                <blockquote className="quote-text">
                    "Team Alpha didn't just photograph our wedding, they captured the very soul of our celebration. Every frame tells a story we will cherish forever."
                </blockquote>
                <a href="#" className="video-link">Watch The Experience</a>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section id="contact" className="cta">
            <div className="cta-content">
                <h3>Let's Tell Your Story</h3>
                <p>Limited reservations remaining for the 2026 season.</p>
            </div>
        </section>
    );
}
