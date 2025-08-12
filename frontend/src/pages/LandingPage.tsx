import React,{useState} from "react";
import LoginModal from "../components/LoginModal";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeatureSection";
import CTASection from "../components/CTASection";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";



const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleSignUp = () => {
    alert('Redirecting to sign up page...');
  };

  return (
    <div className="min-h-screen gradient-background transition-colors duration-500">
      <Navigation onLoginClick={() => setShowLogin(true)} />
      
      <LoginModal 
        show={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSignUp={handleSignUp}
      />

      <div className="relative">
        <HeroSection onSignUp={handleSignUp} />
        <FeaturesSection />
        <CTASection onSignUp={handleSignUp} />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;