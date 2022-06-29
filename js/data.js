const MAX_GUESTS = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};

const TYPES_DICTIONARY = {
  flat: 'Квартира',
  palace: 'Дворец',
  bungalow: 'Бунгало',
  hotel: 'Отель',
  house: 'Дом'
};

const MIN_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const MAP_VIEW = {
  lat: 35.67500,
  lng: 139.75000,
};

const MAP_ZOOM = 13;

const DIGITS_LAT_LNG = 5;

const PRICE_SLIDER_STEP = 10;

const AD_PIN_ICON = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const MAIN_PIN_ICON = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const SHOW_ERROR_TIME = 5000;

const ERROR_MESSAGE_GET_ADS_DATA = 'К сожалению, сейчас мы не можем отобразить похожие объявления в данном регионе. Работаем над исправлением этого недоразумения.';

export { MAX_GUESTS, MIN_PRICES, MAP_VIEW, MAP_ZOOM, DIGITS_LAT_LNG, AD_PIN_ICON, MAIN_PIN_ICON, SHOW_ERROR_TIME, ERROR_MESSAGE_GET_ADS_DATA, PRICE_SLIDER_STEP, TYPES_DICTIONARY };
