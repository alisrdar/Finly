import React from "react";

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string
}> = ({
    icon,
    title,
    description
}) => (
        <div className="bg-card border-border border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 group backdrop-blur-sm">
            <div className="text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );

export default FeatureCard