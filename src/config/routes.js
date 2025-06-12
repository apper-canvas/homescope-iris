import Home from '../pages/Home';
import PropertyDetail from '../pages/PropertyDetail';
import SavedProperties from '../pages/SavedProperties';
import MapView from '../pages/MapView';

export const routes = {
  buy: {
    id: 'buy',
    label: 'Buy',
    path: '/buy',
    icon: 'Home',
    component: Home
  },
  rent: {
    id: 'rent',
    label: 'Rent',
    path: '/rent',
    icon: 'Building',
    component: Home
  },
  saved: {
    id: 'saved',
    label: 'Saved Properties',
    path: '/saved',
    icon: 'Heart',
    component: SavedProperties
  },
  map: {
    id: 'map',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
    component: MapView
  }
};

export const routeArray = Object.values(routes);