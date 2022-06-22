import { adsFragment } from './ads-fragment.js';
import { insertFragmentInDom } from './dom-manipulators.js';

insertFragmentInDom('#map-canvas', adsFragment, '.popup', true);

