import { createAdCard } from './ad-card.js';
import { createAdsVariety } from './ads-generator.js';
import { activeFormState } from './active-form-state.js';
import './form-validation.js';

activeFormState(false);

const adsVariety = createAdsVariety();

createAdCard(adsVariety[0]);

activeFormState(true);
