let randomInt;
let randomFloat;

// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomInt (min, max) {
  if (min < 0) {
    min = 0;
  }
  if (min >= max) {
    return 0;
  }
  min = Math.floor(min);
  max = Math.floor(max);
  randomInt = Math.floor(Math.random() * (max - min + 1) + min);
  return randomInt;
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getRandomFloat (min, max, decimals) {
  if (min < 0) {
    min = 0;
  }
  if (min >= max) {
    return 0;
  }
  min = Math.abs(min);
  max = Math.abs(max);
  randomFloat = Math.random() * (max - min + 1) + min;
  return randomFloat.toFixed(decimals);
}

//Тестовый вызов функций - удалить потом
getRandomInt(0, 5);
getRandomFloat(0.5, 1.5);
