import React from 'react';
import { Lightbulb, Loader } from 'lucide-react';

interface InsightsCardProps {
    onGenerate: () => void;
    insights: string;
    isLoading: boolean;
    error: string | null;
}

const InsightsCard: React.FC<InsightsCardProps> = ({ onGenerate, insights, isLoading, error }) => {
    return (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-lg shadow-md border border-amber-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                    <Lightbulb className="w-8 h-8 text-amber-500 mr-3" />
                    <div>
                        <h3 className="text-xl font-semibold">Generate AI-Powered Insights</h3>
                        <p className="text-gray-600 dark:text-gray-400">Get actionable business advice based on your current data.</p>
                    </div>
                </div>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <>
                            <Loader className="animate-spin w-5 h-5 mr-2" />
                            Generating...
                        </>
                    ) : (
                        "Generate Insights"
                    )}
                </button>
            </div>
            
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {insights && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-md whitespace-pre-wrap font-mono text-sm">
                    <h4 className="font-bold text-lg mb-2">Business Insights:</h4>
                    <p>{insights}</p>
                </div>
            )}
        </div>
    );
};

export default InsightsCard;