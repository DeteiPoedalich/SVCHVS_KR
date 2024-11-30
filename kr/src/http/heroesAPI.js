import { $host } from "./index";

export const fetchHeroes = async () => {
    try {
        const response = await $host.get('http://localhost:5000/api/heroes');
        const heroes = response.data; //  Backend возвращает массив напрямую
        return heroes; // Возвращаем массив
    } catch (error) {
        console.error("Error fetching heroes:", error);
        return []; //  Лучше возвращать пустой массив в случае ошибки
    }
};