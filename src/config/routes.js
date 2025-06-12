import HomePage from '@/components/pages/HomePage';
import PropertyDetailPage from '@/components/pages/PropertyDetailPage';
import SavedPropertiesPage from '@/components/pages/SavedPropertiesPage';
import MapViewPage from '@/components/pages/MapViewPage';

export const routes = {
  buy: {
    id: 'buy',
    label: 'Buy',
    path: '/buy',
    icon: 'Home',
icon: 'Home',
    component: HomePage
  },
  rent: {
    id: 'rent',
    label: 'Rent',
    path: '/rent',
    icon: 'Building',
icon: 'Building',
    component: HomePage
  },
  saved: {
    id: 'saved',
    label: 'Saved Properties',
    path: '/saved',
    icon: 'Heart',
icon: 'Heart',
    component: SavedPropertiesPage
  },
  map: {
    id: 'map',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
icon: 'Map',
    component: MapViewPage
  }
};

export const routeArray = Object.values(routes);