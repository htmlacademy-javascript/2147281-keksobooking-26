// Можно изменить количество создаваемых объявлений и все будет работать, вне
// зависимости от того, какую функцию-генератор мы вызываем - buildAd (создание
// одиночного объявления) или createAdsVariety (множество объявлений)
const ADS_QUANTITY = 10;

const TITLES = [
  'Удобная Кексоедка рядом с озером',
  'Кесодом со спальней King-size',
  'Кексолет на двоих!',
  'Квартира для кексов без собак',
  'Снять классный дом неподалеко от кексоломни',
  'Кексохата - только 18+',
  'Почасовой отель для ваших кексов',
  'Питомник для кексов - собакам не звонить!!!',
  'Аренда места на Кексоярмарке',
  'Просторный офис для кексизнеса',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const DESCRIPTIONS = [
  'ПРОДАЕТСЯ просторная однокомнатная квартира площадью 43 кв.м. Дом серии ИП-46С, построен в 2010 году, расположен в благоустроенном микрорайоне Балашиха-парк (22 мкрн) с хорошо развитой инфраструктурой: школа и детский сад в двух минутах ходьбы, до гипермаркета АТАК и продуктового рынка Поле Чудес всего 5 минут пешком, поблизости есть и фитнесклуб до него 10 минут пешком. Рядом с домом устроен променад для прогулок (протяженность 1 км).',
  'Дом удачно расположен рядом с лесопарковой зоной с белками, (150 м от подьезда) всегда свежий воздух, не жарко летом и отличное место для отдыха! Удобная транспортная доступность - до остановки маршрутки/автобуса 250 м. Маршруты до м. Щелковская, Новогиреево, Выхино, а также по городу. Рядом щелковское и горьковское шоссе. Электричка до курского вокзала. Квартира просторная и светлая, с отличным ремонтом.',
  'Доброжелательные и тихие соседи. Жилая комната (19 кв.м) зонирована перегородкой (высота 80 см) на спальную и гостиную зоны (см. фото). В комнате два окна (очень светло даже в пасмурную погоду), ламинат, обои, также зонирующие пространство, натяжной потолок, раздвижная дверь. Все двери и фурнитура очень качественные. Просторный коридор, гардеробная (2,5 кв.м). Санузел совмещенный (3,5 кв.м), хорошая сантехника, большая душевая кабина 120х80 с глубоким поддоном, зеркальный шкафчик и удобный комод под раковиной. ',
  'Вместительный застекленный балкон (2,7 кв.м). На кухне (9 кв.м) ламинат, обои под покраску, встроенная отличная кухня с индукционной плитой, духовкой, микроволновой печью и посудомоечной машиной, оставляем также ТВ . Квартира очень хорошая и счастливая! Один собственник, в собственности более 3-х лет, юридически свободна. Продажа БЕЗ ПОСРЕДНИКОВ',
];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

// Сделал все функции стрелочными
const getRandomElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// Переделал с методом слайс - код стал чище и понятней
const getRandomArray = (elements) => {
  const maxNumber = getRandomPositiveInteger(1, elements.length);
  const minNumber = getRandomPositiveInteger(0, maxNumber - 1);
  const randomArray = elements.slice(minNumber, maxNumber);
  return randomArray;
};

//Полностью переделал функцию для генерации аватаров. Удалил лишнюю функцию. Добавил замыкание.
const getUserAvatar = (min = 1, max = ADS_QUANTITY) => {
  const BOUNDARY_NUMBER = 10; //Вынес магическое значение сюда
  const CheckingArray = []; //Избавился от проверяющего массива во внешнем окружении
  return function () {
    if (CheckingArray.length >= (max - min + 1)) {
      (max += CheckingArray.length); //Проверка избавляет от бесконечного цикла и позволяет не переживать, если мы вдруг забудем изменить значение константы ADS_QUANTITY. И не надо сообщения в консоль никакие выводить и прерывать генерацию.
    }
    let randomNumber = getRandomPositiveInteger(min, max);
    while (CheckingArray.includes(randomNumber)) {
      randomNumber = getRandomPositiveInteger(min, max);
    }
    CheckingArray.push(randomNumber);
    if (randomNumber < BOUNDARY_NUMBER) {
      randomNumber = '0'.concat(randomNumber);
    }
    return {avatar: `img/avatars/user${randomNumber}.png`};
  };
};

const getNonrepeatingAvatar = getUserAvatar(); // Замыкание

const buildAd = () => {
  const lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  return {
    author: getNonrepeatingAvatar(),
    offer: {
      title: getRandomElement(TITLES),
      adress: `${lat}, ${lng}`, //адрес не вывелся в прошлый раз, потому что я потерял окружение при изменении декларативной на стрелочную функцию
      price: getRandomPositiveInteger(1, 3e6),
      type: getRandomElement(TYPES),
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 20),
      checkin: getRandomElement(CHECKINS),
      checkout: getRandomElement(CHECKOUTS),
      features: getRandomArray(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS)
    },
    location: {
      lat: lat,
      lng: lng,
    }
  };
};

const createAdsVariety = () => {
  const adsVariety = Array.from({length: ADS_QUANTITY}, buildAd);
  return adsVariety;
};

createAdsVariety();
createAdsVariety();
