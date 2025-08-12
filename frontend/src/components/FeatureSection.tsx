// Features Section Component
import FeatureCard from "./FeatureCard";
import { BarChart3, TrendingUp, PieChart, Target, Shield, Smartphone } from "lucide-react";

const FeaturesSection: React.FC = () => (
    <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Everything you need to <span className="text-secondary">succeed</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
                Powerful features designed to make financial management simple, smart, and secure.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureCard
                icon={<BarChart3 size={40} />}
                title="Easy Tracking"
                description="Effortlessly monitor your income, expenses, and spending patterns with intuitive categorization and smart automation."
            />
            <FeatureCard
                icon={<TrendingUp size={40} />}
                title="Smart Insights"
                description="Get personalized recommendations and AI-powered insights to optimize your spending and accelerate your savings goals."
            />
            <FeatureCard
                icon={<PieChart size={40} />}
                title="Visual Reports"
                description="Beautiful, interactive charts and graphs that make understanding your financial health simple and engaging."
            />
            <FeatureCard
                icon={<Target size={40} />}
                title="Goal Setting"
                description="Set and track financial goals with milestone celebrations and progress visualization to keep you motivated."
            />
            <FeatureCard
                icon={<Shield size={40} />}
                title="Bank-Level Security"
                description="Your financial data is protected with enterprise-grade encryption and industry-leading security protocols."
            />
            <FeatureCard
                icon={<Smartphone size={40} />}
                title="Mobile Ready"
                description="Access your financial dashboard anywhere with our responsive design and upcoming mobile app."
            />
        </div>
    </section>
);

export default FeaturesSection