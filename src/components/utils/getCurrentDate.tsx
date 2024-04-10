const getCurrentDate = (): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Додаємо 1, тому що місяці починаються з 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`;
  };
  
export default getCurrentDate;
  