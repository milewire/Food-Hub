import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Order } from '../types';
import { generateMockOrders } from '../services/dataService';
import KpiCard from './KpiCard';
import RestaurantOrdersChart from './RestaurantOrdersChart';
import CuisineDistributionChart from './CuisineDistributionChart';
import DailyOrdersChart from './DailyOrdersChart';
import RestaurantDataTable from './RestaurantDataTable';
import InsightsCard from './InsightsCard';
import { getBusinessInsights } from '../services/geminiService';
import { Rocket, Wallet, Star, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
    const [insights, setInsights] = useState<string>('');
    const [isLoadingInsights, setIsLoadingInsights] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setOrders(generateMockOrders(500));
    }, []);

    const cuisines = useMemo(() => {
        const uniqueCuisines = new Set(orders.map(order => order.cuisine));
        return ['All', ...Array.from(uniqueCuisines)];
    }, [orders]);

    const filteredOrders = useMemo(() => {
        if (selectedCuisine === 'All') {
            return orders;
        }
        return orders.filter(order => order.cuisine === selectedCuisine);
    }, [orders, selectedCuisine]);

    const kpiData = useMemo(() => {
        if (filteredOrders.length === 0) {
            return { totalOrders: 0, avgRating: 0, avgCost: 0, avgDeliveryTime: 0 };
        }
        const totalOrders = filteredOrders.length;
        const totalRating = filteredOrders.reduce((sum, order) => sum + order.rating, 0);
        const totalCost = filteredOrders.reduce((sum, order) => sum + order.costForTwo, 0);
        const totalDeliveryTime = filteredOrders.reduce((sum, order) => sum + order.deliveryTimeMinutes, 0);
        
        return {
            totalOrders,
            avgRating: (totalRating / totalOrders).toFixed(2),
            avgCost: (totalCost / totalOrders).toFixed(2),
            avgDeliveryTime: (totalDeliveryTime / totalOrders).toFixed(0),
        };
    }, [filteredOrders]);

    const generateInsights = useCallback(async () => {
        setIsLoadingInsights(true);
        setError(null);
        setInsights('');

        const dataSummary = `
        Analysis for cuisine: ${selectedCuisine}.
        Total Orders: ${kpiData.totalOrders}.
        Average Customer Rating: ${kpiData.avgRating} out of 5.
        Average Cost for Two: $${kpiData.avgCost}.
        Average Delivery Time: ${kpiData.avgDeliveryTime} minutes.
        Order data available across various days of the week and multiple restaurants.
      `;

        try {
            const result = await getBusinessInsights(dataSummary);
            setInsights(result);
        } catch (e) {
            console.error(e);
            // FIX: Per @google/genai guidelines, do not prompt the user about API keys. Provide a generic error.
            setError('Failed to generate insights. Please try again.');
        } finally {
            setIsLoadingInsights(false);
        }
    }, [selectedCuisine, kpiData]);

    if (orders.length === 0) {
        return <div className="text-center p-10">Loading data...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold mb-2">Dashboard Overview</h2>
                <div className="flex items-center space-x-4">
                     <p className="text-gray-600 dark:text-gray-400">Filter by cuisine:</p>
                     <select
                        value={selectedCuisine}
                        onChange={(e) => setSelectedCuisine(e.target.value)}
                        className="p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500"
                    >
                        {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Orders" value={kpiData.totalOrders.toString()} icon={<Rocket className="w-8 h-8"/>} />
                <KpiCard title="Average Rating" value={`${kpiData.avgRating} / 5`} icon={<Star className="w-8 h-8"/>} />
                <KpiCard title="Avg. Cost for Two" value={`$${kpiData.avgCost}`} icon={<Wallet className="w-8 h-8"/>} />
                <KpiCard title="Avg. Delivery Time" value={`${kpiData.avgDeliveryTime} min`} icon={<Clock className="w-8 h-8"/>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                     <h3 className="text-lg font-semibold mb-4">Top 10 Restaurants by Orders</h3>
                    <RestaurantOrdersChart data={filteredOrders} />
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Cuisine Distribution</h3>
                    <CuisineDistributionChart data={filteredOrders} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Orders by Day of the Week</h3>
                <DailyOrdersChart data={filteredOrders} />
            </div>

            <InsightsCard 
                onGenerate={generateInsights}
                insights={insights}
                isLoading={isLoadingInsights}
                error={error}
            />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Restaurant Performance Details</h3>
                <RestaurantDataTable data={filteredOrders} />
            </div>

        </div>
    );
};

export default Dashboard;