import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from '../types';

interface ChartProps {
  data: Order[];
}

const COLORS = ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'];

const CuisineDistributionChart: React.FC<ChartProps> = ({ data }) => {
    const chartData = useMemo(() => {
        const counts = data.reduce((acc, order) => {
            acc[order.cuisine] = (acc[order.cuisine] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                        borderColor: '#4B5563' 
                    }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CuisineDistributionChart;