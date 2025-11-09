
import React, { useMemo, useState } from 'react';
import { Order } from '../types';
import { ArrowUpDown } from 'lucide-react';

interface TableData {
    name: string;
    cuisine: string;
    orders: number;
    avgRating: string;
    avgCost: string;
}

type SortKey = keyof TableData;
type SortDirection = 'asc' | 'desc';

const RestaurantDataTable: React.FC<{ data: Order[] }> = ({ data }) => {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'orders', direction: 'desc' });

    const tableData = useMemo<TableData[]>(() => {
        const restaurantData: Record<string, { orders: number; totalRating: number; totalCost: number; cuisine: string }> = {};

        data.forEach(order => {
            if (!restaurantData[order.restaurantName]) {
                restaurantData[order.restaurantName] = { orders: 0, totalRating: 0, totalCost: 0, cuisine: order.cuisine };
            }
            restaurantData[order.restaurantName].orders++;
            restaurantData[order.restaurantName].totalRating += order.rating;
            restaurantData[order.restaurantName].totalCost += order.costForTwo;
        });

        return Object.entries(restaurantData).map(([name, d]) => ({
            name,
            cuisine: d.cuisine,
            orders: d.orders,
            avgRating: (d.totalRating / d.orders).toFixed(2),
            avgCost: (d.totalCost / d.orders).toFixed(2),
        }));
    }, [data]);

    const sortedData = useMemo(() => {
        const sortableItems = [...tableData];
        sortableItems.sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aVal > bVal) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sortableItems;
    }, [tableData, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    
    const SortableHeader: React.FC<{ sortKey: SortKey, children: React.ReactNode }> = ({ sortKey, children }) => (
      <th className="p-3 text-left">
        <button onClick={() => requestSort(sortKey)} className="flex items-center space-x-1 font-bold">
          <span>{children}</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      </th>
    );

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <SortableHeader sortKey="name">Restaurant</SortableHeader>
                        <SortableHeader sortKey="cuisine">Cuisine</SortableHeader>
                        <SortableHeader sortKey="orders">Total Orders</SortableHeader>
                        <SortableHeader sortKey="avgRating">Avg. Rating</SortableHeader>
                        <SortableHeader sortKey="avgCost">Avg. Cost ($)</SortableHeader>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {sortedData.map(item => (
                        <tr key={item.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="p-3 font-medium">{item.name}</td>
                            <td className="p-3">{item.cuisine}</td>
                            <td className="p-3">{item.orders}</td>
                            <td className="p-3">{item.avgRating}</td>
                            <td className="p-3">{item.avgCost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantDataTable;
