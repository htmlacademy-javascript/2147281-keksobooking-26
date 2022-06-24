import { createAdCard } from './ad-card.js';
import { createAdsVariety } from './ads-generator.js';
import { activeFormState } from './active-form-state.js';

activeFormState(false);

const adsVariety = createAdsVariety();

const adCard = createAdCard(adsVariety[0]);

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.append(adCard);

