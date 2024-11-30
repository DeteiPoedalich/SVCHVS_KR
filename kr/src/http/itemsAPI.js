import { $host } from "./index";

export const fetchItems = async () => {
    try {
        const response = await $host.get('http://localhost:5000/api/item');
        const items = response.data; //  Backend возвращает массив напрямую
        return items; // Возвращаем массив
    } catch (error) {
        console.error("Error fetching items:", error);
        return []; //  Лучше возвращать пустой массив в случае ошибки
    }
};