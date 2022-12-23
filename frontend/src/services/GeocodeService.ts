import { ApiInstance } from './common';

const NOMINATIM_API = 'https://nominatim.openstreetmap.org/search?';

export default async function GeocodeService(params: string) {
    try {
        const response = await ApiInstance.get(
            `${NOMINATIM_API}q=${params}&format=json&limit=3` //&email=jolxxxxxxx@gmail.com
        );
        return response.data;
    } catch (error) {
        return [];
    }
}
