// Можно изменить количество создаваемых объявлений и все будет работать, вне зависимости от того, какую функцию-генератор мы вызываем - buildAd (создание одиночного объявления) или createAdsVariety (множество объявлений)
const QUANTITY = 10;

// Если в этом массиве есть хотя бы один элемент, то аватары будут генерироваться случайным образом, а если массив полностью пустой, то аватары будут создаваться последовательно по возрастанию айди юзера
const AVATAR_LINKS = [
  {avatar: 'img/avatars/user01.png'},
];
// Этот массив позволяет проводить проверку на повторяющися аватары
const CHECKING_ARRAY = [];

// Сначала я сделал так, что у каждого объявления свой тайтл, но в задании этого не требуется, поэтому тайтлы могут повторяться от объявления к объявлению
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

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

//Функция взята из курса программы, как и две предыдущие
function getRandomElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

//Функция, которая возвращает из массива новый массив со случайной длиной элементов, причем расчет длины производится от случайных минимального и максимального значений, например из массива [1, 2, 3, 4] можно случайно получить [4] или [2, 3]
function getRandomArray (elements) {
  const maxNumber = getRandomPositiveInteger(0, elements.length - 1);
  let minNumber = getRandomPositiveInteger(0, maxNumber);
  const newMassive = [];
  for (minNumber; minNumber <= maxNumber; minNumber++) {
    newMassive.push(elements[minNumber]);
  }
  return newMassive;
}

// Функция, при вызове которой пополняется массив с ссылками на аватар, в зависимости от его длины
function pushNewAvatar () {
  if (AVATAR_LINKS.length < 10) {
    AVATAR_LINKS.push({avatar: `img/avatars/user0${AVATAR_LINKS.length + 1}.png`});
  } else {
    AVATAR_LINKS.push({avatar: `img/avatars/user${AVATAR_LINKS.length + 1}.png`});
  }
}

// Самая неочевидная функция из представленных - по сути, она просто после всех нужных проверок возвращает случайно сгенерированную ссылку на аватар, но так, чтобы она не повторялась с другими при многократном вызове данной функции.
function getNonrepeatingAvatar (avatarLinks, checkingAddedUsers) {
  // Эти две проверки с оператором ИЛИ предотваращают бесконечный цикл в любом случае:
  if (avatarLinks.length < QUANTITY || avatarLinks.length === checkingAddedUsers.length) {
    pushNewAvatar();
  }
  let avatar = getRandomElement(avatarLinks);
  // А это сам цикл, который без двух проверок выше запросто перерастает в бесконечный. И именно данный цикл заставляет ссылки при генерации новых объявлений группироваться последовательно, если AVATAR_LINK изначально пустой. Можно еще добавить один if (AVATAR_LINKS.length === 0) но я считаю и так громоздко. Если есть более простое решение для поставленных условий, с удовольствием исправлю
  while (checkingAddedUsers.includes(avatar)) {
    avatar = getRandomElement(avatarLinks);
  }
  checkingAddedUsers.push(avatar);
  return avatar;
}

const buildAd = () => ({
  author: getNonrepeatingAvatar(AVATAR_LINKS, CHECKING_ARRAY),
  offer: {
    title: getRandomElement(TITLES),
    adress: (this.location.lat + this.location.lng).toString,
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
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5)
  }
});


const createAdsVariety = () => {
  const adsVariety = Array.from({length: QUANTITY}, buildAd);
  return adsVariety;
};

createAdsVariety();
