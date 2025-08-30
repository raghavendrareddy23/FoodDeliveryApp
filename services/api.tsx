import { Restaurant } from '../components/types';
import restaurants from '../data/restaurants.json';

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  await delay(300);
  return restaurants as Restaurant[];
}

export async function fetchRestaurantById(id: string): Promise<Restaurant | undefined> {
  await delay(200);
  return (restaurants as Restaurant[]).find((r) => r.id === id);
}
