import React from "react";

const CTASection: React.FC<{ onSignUp: () => void }> = ({ onSignUp }) => (
    <div className="text-center bg-muted border-border border rounded-3xl p-12 backdrop-blur-sm mb-20 max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to transform your finances?
        </h3>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join Hundred of users who have already taken control of their financial future. Start your journey today.
        </p>
        <button
            onClick={onSignUp}
            className="gradient-primary text-primary-foreground px-12 py-4 rounded-full text-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg"
        >
            Get Started Free
        </button>
        <p className="mt-4 text-muted-foreground">No credit card required • Free forever</p>
    </div>
);

export default CTASection