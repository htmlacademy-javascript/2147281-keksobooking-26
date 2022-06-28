import { createAdCard } from './ad-card.js';
import { MAP_VIEW, MAIN_PIN_ICON, AD_PIN_ICON } from './ads-data.js';

const mainPinIcon = L.icon(MAIN_PIN_ICON);

const mainPinMarker = L.marker(
  MAP_VIEW,
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const adPinIcon = L.icon(AD_PIN_ICON);

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
