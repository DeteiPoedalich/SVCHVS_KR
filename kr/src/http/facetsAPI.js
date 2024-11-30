import { $host } from "./index";

export const fetchFacets = async () => {
    try {
        const response = await $host.get('http://localhost:5000/api/facet');
        const facets = response.data; //  Backend возвращает массив напрямую
        return facets; // Возвращаем массив
    } catch (error) {
        console.error("Error fetching facets:", error);
        return []; //  Лучше возвращать пустой массив в случае ошибки
    }
};