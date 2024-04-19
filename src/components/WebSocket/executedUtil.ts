export const executeCode = (code: string) => {
    try {
      // Виконуємо код за допомогою eval()
      eval(code);
      console.log('Код виконано успішно');
    } catch (error) {
      // Обробка помилок, якщо код не вдалося виконати
      console.error('Помилка при виконанні коду:', error);
    }
  }