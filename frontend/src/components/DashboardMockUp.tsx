

const DashboardMockup: React.FC = () => (
    <div className="relative max-w-5xl mx-auto">
        <div className="bg-card border-border border rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="bg-muted rounded-2xl p-6 min-h-96">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted-foreground rounded-full"></div>
                        <span className="font-semibold text-foreground">John Doe</span>
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-border rounded-full"></div>
                        <div className="w-3 h-3 bg-border rounded-full"></div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {/* Card 1 - Yellow */}
                    <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-xl p-4 text-black">
                        <div className="text-sm opacity-80 mb-1">Finance</div>
                        <div className="text-xs opacity-70 mb-2">1234 5678 9010 XXXX</div>
                        <div className="text-lg font-bold">$1,234</div>
                    </div>

                    {/* Card 2 - Black */}
                    <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl p-4 text-white">
                        <div className="text-sm opacity-80 mb-1">Finance</div>
                        <div className="text-xs opacity-70 mb-2">1234 5678 9010 XXXX</div>
                        <div className="text-lg font-bold">$2,156</div>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-card border-border border rounded-xl p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
                        <div className="text-2xl font-bold text-foreground">$9,365.34</div>
                        <div className="flex space-x-1 mt-2">
                            <div className="w-6 h-6 bg-yellow-400 rounded-full text-xs flex items-center justify-center text-black">$</div>
                            <div className="w-6 h-6 bg-green-400 rounded-full text-xs flex items-center justify-center text-black">S</div>
                            <div className="w-6 h-6 bg-red-400 rounded-full text-xs flex items-center justify-center text-white">E</div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-card border-border border rounded-xl p-4">
                        <div className="text-sm text-muted-foreground mb-2">This Month</div>
                        <div className="text-xl font-bold text-foreground mb-2">$214.00</div>
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Income: 2,850.00</div>
                            <div className="text-xs text-muted-foreground">Expenses: 1,743.00</div>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
                    <div className="bg-yellow-400 rounded-lg p-3 text-black text-center">
                        <div className="font-bold text-lg">H</div>
                        <div className="text-xs">Home</div>
                        <div className="text-xs font-semibold">+2.5%</div>
                    </div>
                    <div className="bg-blue-400 rounded-lg p-3 text-white text-center">
                        <div className="font-bold text-lg">S</div>
                        <div className="text-xs">Shopping</div>
                        <div className="text-xs font-semibold">-1.48%</div>
                    </div>
                    <div className="bg-green-400 rounded-lg p-3 text-black text-center">
                        <div className="font-bold text-lg">N</div>
                        <div className="text-xs">Netflix</div>
                        <div className="text-xs font-semibold">-2.48%</div>
                    </div>
                    <div className="bg-red-400 rounded-lg p-3 text-white text-center">
                        <div className="font-bold text-lg">P</div>
                        <div className="text-xs">Patreon</div>
                        <div className="text-xs font-semibold">5%</div>
                    </div>
                    <div className="bg-accent rounded-lg p-3 text-center">
                        <div className="font-bold text-lg text-accent-foreground">+</div>
                    </div>
                    <div className="bg-accent rounded-lg p-3 text-center">
                        <div className="font-bold text-lg text-accent-foreground">{'>'}</div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="bg-card border-border border rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-foreground">Transaction History</h3>
                        <div className="text-sm text-muted-foreground">$34,742.00</div>
                    </div>
                    <div className="h-24 flex items-end justify-center">
                        <svg className="w-full h-full" viewBox="0 0 300 60">
                            <path
                                d="M0,40 Q50,20 100,30 T200,25 T300,35"
                                stroke="var(--secondary)"
                                strokeWidth="2"
                                fill="none"
                                className="drop-shadow-sm"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default DashboardMockup