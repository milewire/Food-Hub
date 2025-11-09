import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from '../types';

interface ChartProps {
  data: Order[];
}

// FIX: Define a type for chart data to help TypeScript with type inference in the sort function.
interface RestaurantOrderData {
    name: string;
    orders: number;
}

const RestaurantOrdersChart: React.FC<ChartProps> = ({ data }) => {
    const chartData = useMemo(() => {
        // FIX: Explicitly typing the accumulator argument (`acc`) in `reduce` allows TypeScript
        // to correctly infer the type of `counts`. This resolves both the compile error from the
        // previous syntax and the downstream error in `.sort()` where `orders` was being inferred as `unknown`.
        const counts = data.reduce((acc: Record<string, number>, order) => {
            acc[order.restaurantName] = (acc[order.restaurantName] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts)
            .map(([name, orders]): RestaurantOrderData => ({ name, orders }))
            .sort((a, b) => b.orders - a.orders)
            .slice(0, 10);
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-25} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                        borderColor: '#4B5563' 
                    }}
                />
                <Legend />
                <Bar dataKey="orders" fill="#f59e0b" name="Number of Orders" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RestaurantOrdersChart;