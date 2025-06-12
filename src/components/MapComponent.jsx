import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const MapComponent = ({ properties, selectedProperty, onPropertySelect, onPropertyClick }) => {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState(false);

  // Simulate map initialization
  useEffect(() => {
    // In a real app, this would initialize Google Maps, Mapbox, etc.
    const timer = setTimeout(() => {
      // Simulate occasional map loading error
      if (Math.random() > 0.9) {
        setMapError(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (mapError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ApperIcon name="MapPin" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Map Unavailable</h3>
          <p className="text-gray-600 mb-4">Unable to load the map at this time</p>
          <button
            onClick={() => setMapError(false)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-gray-100">
      {/* Map Placeholder with Property Markers */}
      <div ref={mapRef} className="absolute inset-0 overflow-hidden">
        {/* Background pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-1 h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="bg-gray-400 opacity-20"></div>
            ))}
          </div>
        </div>

        {/* Property Markers */}
        <div className="absolute inset-0">
          {properties.map((property, index) => {
            // Simulate random positions for demo
            const top = 20 + (index * 15) % 60;
            const left = 15 + (index * 25) % 70;
            
            return (
              <motion.div
                key={property.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{ top: `${top}%`, left: `${left}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => onPropertySelect(property)}
              >
                <div
                  className={`relative bg-white rounded-lg shadow-lg p-2 border-2 transition-all hover:scale-110 ${
                    selectedProperty?.id === property.id
                      ? 'border-primary shadow-xl scale-110'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        property.forRent ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                    />
                    <span className="text-sm font-semibold text-gray-900">
                      ${property.price?.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Marker point */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
                  </div>
                </div>

                {/* Property popup */}
                {selectedProperty?.id === property.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={property.images?.[0] || '/placeholder-house.jpg'}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {property.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          ${property.price?.toLocaleString()}
                          {property.forRent && '/month'}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 space-x-3">
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <span>{property.squareFeet?.toLocaleString()} sq ft</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPropertyClick(property.id);
                      }}
                      className="w-full mt-3 px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors"
                    >
                      View Details
                    </button>

                    {/* Popup arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <ApperIcon name="Plus" size={20} className="text-gray-600" />
          </button>
          <button className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <ApperIcon name="Minus" size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>For Sale</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>For Rent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;