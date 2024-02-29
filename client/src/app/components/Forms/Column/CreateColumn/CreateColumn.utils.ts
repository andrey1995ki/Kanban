/**
 * Функция для генерации случайного цвета
 */
export const randomColor = () => {
    const char = '0123456789ABCDEF'
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += char[Math.floor(Math.random() * char.length)];
    }
    return color
}
