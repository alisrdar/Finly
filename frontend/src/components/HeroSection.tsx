import DashboardMockup from "./DashboardMockUp";
// Hero Section Component
const HeroSection: React.FC<{ onSignUp: () => void }> = ({ onSignUp }) => (
    <section className="text-center py-20 px-6 max-w-6xl mx-auto">
        <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
                Track your <span className="text-secondary">money</span>,
                <br />grow your <span className="text-primary">savings</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-muted-foreground">
                Take control of your financial future with smart tracking, AI-powered insights, and beautiful visual reports that make managing money effortless.
            </p>
        </div>

        <div className="mb-16">
            <button
                onClick={onSignUp}
                className="gradient-primary text-primary-foreground px-12 py-4 rounded-full text-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg mr-6 mb-4 md:mb-0"
            >
                Get Started Free
            </button>
            <button className="border-2 border-border text-foreground px-12 py-4 rounded-full text-xl font-semibold hover:bg-accent transition-all duration-300 backdrop-blur-sm">
                Watch Demo
            </button>
        </div>

        <DashboardMockup />
    </section>
);

export default HeroSection