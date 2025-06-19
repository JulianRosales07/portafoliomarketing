import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import HowCanIHelp from './components/HowCanIHelp';
import Clients from './components/Clients';
import Results from './components/Results';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Introduction />
      <AboutMe />
      <Services />
      <HowCanIHelp />
      <Clients />
      <Results />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;