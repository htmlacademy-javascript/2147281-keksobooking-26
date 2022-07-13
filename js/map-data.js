import { createAdCard } from './create-ad-card.js';
import { MAP_VIEW, MAIN_PIN_ICON, AD_PIN_ICON } from './data.js';

const map = L.map('map');

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

const clearLayers = () => {
  if (markerGroup.getLayers().length > 0) {
    markerGroup.clearLayers();
  }
};

export { map, mainPinMarker, adPinIcon, markerGroup, createAdMarker, clearLayers };
