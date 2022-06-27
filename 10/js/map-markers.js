import { createAdCard } from './ad-card.js';

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.67500,
    lng: 139.75000,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup();

const createAdMarker = (ad) => {
  const adPinMarker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      draggable: false,
      icon: adPinIcon,
    }
  );
  adPinMarker.addTo(markerGroup).bindPopup(createAdCard(ad));
};

export { mainPinMarker, adPinIcon, markerGroup, createAdMarker };
