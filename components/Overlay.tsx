import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Cpu, Menu, Globe, Zap, Layers, Network, Lock, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Overlay: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for animations
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  // Hero elements
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initial Hero Animation
    const tl = gsap.timeline();

    tl.fromTo(navRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out' },
      "-=0.5"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      "-=0.6"
    );

    // Scroll Animations for ABOUT Section
    if (aboutRef.current) {
      const elements = aboutRef.current.querySelectorAll('.animate-about');
      gsap.fromTo(elements, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Scroll Animations for TECH Section
    if (techRef.current) {
      const cards = techRef.current.querySelectorAll('.tech-card');
      gsap.fromTo(cards, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: techRef.current,
            start: "top 80%",
          }
        }
      );
      
      const header = techRef.current.querySelector('.tech-header');
      gsap.fromTo(header,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: techRef.current,
            start: "top 70%",
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="flex items-center gap-2 cursor-pointer z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
           <Cpu className="w-6 h-6" />
           <span className="text-xl font-bold tracking-tighter">AETHER</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <button onClick={() => scrollToSection('about')} className="hover:text-gray-400 transition-colors uppercase">Research</button>
          <button onClick={() => scrollToSection('technology')} className="hover:text-gray-400 transition-colors uppercase">Technology</button>
          <button onClick={() => scrollToSection('footer')} className="hover:text-gray-400 transition-colors uppercase">Company</button>
        </div>

        <button className="hidden md:block border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-wider">
          Access Beta
        </button>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <button onClick={() => scrollToSection('about')} className="text-2xl font-light tracking-wider hover:text-gray-400">RESEARCH</button>
          <button onClick={() => scrollToSection('technology')} className="text-2xl font-light tracking-wider hover:text-gray-400">TECHNOLOGY</button>
          <button onClick={() => scrollToSection('footer')} className="text-2xl font-light tracking-wider hover:text-gray-400">COMPANY</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={heroRef} className="h-screen w-full flex flex-col justify-center items-center text-center px-4 relative">
        <div className="max-w-7xl mx-auto space-y-6 mix-blend-difference text-white z-10">
           <div className="overflow-hidden">
             <h1 ref={titleRef} className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-none">
               INTELLIGENCE
               <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">REFINED</span>
             </h1>
           </div>
           
           <p ref={subtitleRef} className="text-sm md:text-lg max-w-xl mx-auto text-gray-300 font-light tracking-wide leading-relaxed px-4">
             Beyond generative. Beyond predictive. Aether is the first cognitive architecture designed to dream in real-time.
           </p>
           
           <div className="pt-8">
             <button 
               ref={ctaRef}
               onClick={() => scrollToSection('about')}
               className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black border border-white hover:bg-transparent hover:text-white transition-all duration-300 overflow-hidden"
             >
               <span className="font-bold tracking-widest uppercase text-xs sm:text-sm z-10">Initialize System</span>
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform z-10" />
               <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-0"></div>
             </button>
           </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
           <span className="text-[10px] tracking-[0.2em]">SCROLL</span>
           <div className="w-[1px] h-8 bg-white"></div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-12 relative bg-gradient-to-b from-transparent to-black/80 backdrop-blur-sm">
         <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <div className="animate-about">
                 <h2 className="text-sm font-mono text-gray-400 mb-2">// THE PARADIGM SHIFT</h2>
                 <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                   THE SIGNAL IN <br/>
                   <span className="text-gray-500">THE NOISE</span>
                 </h3>
               </div>
               <p className="animate-about text-gray-300 leading-relaxed text-lg font-light">
                 Traditional AI predicts the next token. Aether predicts the next reality. By utilizing our proprietary neural dithering engine, we create a probabilistic field where multiple outcomes coexist until observed.
               </p>
               <div className="animate-about flex gap-8 pt-4">
                  <div>
                    <h4 className="text-3xl font-bold">0.02<span className="text-sm font-normal text-gray-500">ms</span></h4>
                    <p className="text-xs tracking-widest text-gray-400 mt-1">LATENCY</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold">128<span className="text-sm font-normal text-gray-500">k</span></h4>
                    <p className="text-xs tracking-widest text-gray-400 mt-1">NODES</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold">∞</h4>
                    <p className="text-xs tracking-widest text-gray-400 mt-1">SCALE</p>
                  </div>
               </div>
            </div>
            
            {/* Visual/Decorative Element */}
            <div className="animate-about relative h-[400px] w-full border border-white/10 rounded-lg p-4 bg-white/5 backdrop-blur-md hidden md:block">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="h-full w-full flex flex-col justify-between">
                  <div className="flex justify-between text-xs font-mono text-gray-500">
                    <span>SYS.MONITOR</span>
                    <span>RUNNING</span>
                  </div>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-1 bg-white/20 w-full overflow-hidden">
                        <div className="h-full bg-white animate-pulse" style={{width: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 2 + 1}s`}}></div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Technology Section */}
      <section id="technology" ref={techRef} className="min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-black/90 relative">
        <div className="max-w-7xl mx-auto w-full">
           <div className="tech-header mb-20 max-w-2xl">
              <h2 className="text-sm font-mono text-gray-400 mb-2">// CORE ARCHITECTURE</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">
                BUILT FOR THE <br/> UNKNOWN
              </h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: <Network className="w-8 h-8"/>, 
                  title: "Neural Fabric", 
                  desc: "Self-healing mesh network that adapts to localized data density." 
                },
                { 
                  icon: <Layers className="w-8 h-8"/>, 
                  title: "Quantum Dithering", 
                  desc: "Proprietary stochastic processing for non-deterministic output generation." 
                },
                { 
                  icon: <Lock className="w-8 h-8"/>, 
                  title: "Zero-Trust Kernels", 
                  desc: "Hardware-level isolation ensuring data integrity across all nodes." 
                },
                { 
                  icon: <Zap className="w-8 h-8"/>, 
                  title: "Hyper-threading", 
                  desc: "Parallelized cognition streams for multi-modal reasoning." 
                },
                { 
                  icon: <Cpu className="w-8 h-8"/>, 
                  title: "Silicon Synapse", 
                  desc: "Custom FPGA architecture mimicking biological plasticity." 
                },
                { 
                  icon: <Globe className="w-8 h-8"/>, 
                  title: "Planetary Scale", 
                  desc: "Distributed processing across 40 edge locations globally." 
                }
              ].map((item, idx) => (
                <div key={idx} className="tech-card group p-8 border border-white/10 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm rounded-sm">
                   <div className="mb-6 text-gray-400 group-hover:text-white transition-colors duration-300">{item.icon}</div>
                   <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                   <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" ref={footerRef} className="w-full bg-[#050505] border-t border-white/10 py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-gray-400" />
                <span className="text-lg font-bold tracking-tighter">AETHER</span>
              </div>
              <p className="text-xs text-gray-500 max-w-xs">
                Redefining the boundaries of artificial cognition through stochastic rendering and neural dithering.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-sm text-gray-400">
               <div className="flex flex-col gap-2">
                 <span className="font-bold text-white mb-2">PLATFORM</span>
                 <a href="#" className="hover:text-white transition-colors">Solutions</a>
                 <a href="#" className="hover:text-white transition-colors">Integration</a>
                 <a href="#" className="hover:text-white transition-colors">Documentation</a>
               </div>
               <div className="flex flex-col gap-2">
                 <span className="font-bold text-white mb-2">COMPANY</span>
                 <a href="#" className="hover:text-white transition-colors">About</a>
                 <a href="#" className="hover:text-white transition-colors">Careers</a>
                 <a href="#" className="hover:text-white transition-colors">Contact</a>
               </div>
            </div>
         </div>
         
         <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
            <p>AETHER AI © 2024. SYSTEM VERSION 2.5.0-ALPHA</p>
            <div className="flex gap-4 mt-4 md:mt-0">
               <span>PRIVACY POLICY</span>
               <span>TERMS OF SERVICE</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Overlay;