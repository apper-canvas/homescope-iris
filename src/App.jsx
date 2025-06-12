import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import SavedProperties from './pages/SavedProperties';
import MapView from './pages/MapView';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="buy" element={<Home />} />
            <Route path="rent" element={<Home />} />
            <Route path="property/:id" element={<PropertyDetail />} />
            <Route path="saved" element={<SavedProperties />} />
            <Route path="map" element={<MapView />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-[9999]"
          toastClassName="bg-white shadow-lg border border-gray-200"
          bodyClassName="text-gray-700"
          progressClassName="bg-primary"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;