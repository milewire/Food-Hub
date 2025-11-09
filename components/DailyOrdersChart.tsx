import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from '../types';

interface ChartProps {
  data: Order[];
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DailyOrdersChart: React.FC<ChartProps> = ({ data }) => {
    const chartData = useMemo(() => {
        const counts = data.reduce((acc, order) => {
            acc[order.dayOfWeek] = (acc[order.dayOfWeek] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return daysOfWeek.map(day => ({
            name: day.substring(0, 3),
            orders: counts[day] || 0,
        }));
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                     contentStyle={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                        borderColor: '#4B5563' 
                    }}
                />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 8 }} name="Number of Orders" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DailyOrdersChart;