
import { Order, Restaurant } from '../types';

const restaurants: Restaurant[] = [
    { name: 'Pizza Palace', cuisine: 'Italian', avgCost: 25, baseRating: 4.5 },
    { name: 'Taco Town', cuisine: 'Mexican', avgCost: 20, baseRating: 4.2 },
    { name: 'Wok World', cuisine: 'Chinese', avgCost: 30, baseRating: 4.0 },
    { name: 'Sushi Station', cuisine: 'Japanese', avgCost: 45, baseRating: 4.8 },
    { name: 'Burger Barn', cuisine: 'American', avgCost: 18, baseRating: 3.9 },
    { name: 'Curry House', cuisine: 'Indian', avgCost: 35, baseRating: 4.6 },
    { name: 'Pasta Place', cuisine: 'Italian', avgCost: 28, baseRating: 4.3 },
    { name: 'Noodle Nirvana', cuisine: 'Chinese', avgCost: 22, baseRating: 4.1 },
    { name: 'Burrito Boulevard', cuisine: 'Mexican', avgCost: 23, baseRating: 4.4 },
    { name: 'Steak Sanctuary', cuisine: 'American', avgCost: 60, baseRating: 4.7 },
];

const daysOfWeek: Order['dayOfWeek'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (min: number, max: number): number => Math.random() * (max - min) + min;

export const generateMockOrders = (count: number): Order[] => {
    const orders: Order[] = [];
    for (let i = 0; i < count; i++) {
        const restaurant = getRandomElement(restaurants);
        
        // Slightly randomize cost and rating around the restaurant's average
        const costForTwo = restaurant.avgCost + getRandomNumber(-5, 5);
        const rating = Math.max(1, Math.min(5, restaurant.baseRating + getRandomNumber(-0.5, 0.5)));

        const order: Order = {
            orderId: `ORD-${String(i).padStart(4, '0')}`,
            restaurantName: restaurant.name,
            cuisine: restaurant.cuisine,
            dayOfWeek: getRandomElement(daysOfWeek),
            costForTwo: parseFloat(costForTwo.toFixed(2)),
            deliveryTimeMinutes: Math.floor(getRandomNumber(15, 50)),
            rating: parseFloat(rating.toFixed(1)),
        };
        orders.push(order);
    }
    return orders;
};
