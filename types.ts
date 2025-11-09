
export interface Order {
  orderId: string;
  restaurantName: string;
  cuisine: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  costForTwo: number;
  deliveryTimeMinutes: number;
  rating: number;
}

export interface Restaurant {
    name: string;
    cuisine: string;
    avgCost: number;
    baseRating: number;
}
