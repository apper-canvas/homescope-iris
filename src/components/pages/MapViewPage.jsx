import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MapComponent from '@/components/organisms/MapComponent';
import PropertyCard from '@/components/molecules/PropertyCard';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { propertyService } from '@/services';

const MapViewPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('map'); // 'map' or 'list'

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getAll();
        setProperties(result);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
        toast.error('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display text-gray-900 mb-2">Unable to load map</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="px-4 py-2"
          >
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Map View</h1>
            <p className="text-gray-600">{properties.length} properties shown</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewType === 'map' ? 'primary' : 'ghost'}
              onClick={() => setViewType('map')}
              size="sm"
              className="flex items-center space-x-1"
            >
              <ApperIcon name="Map" size={16} />
              <span>Map</span>
            </Button>
            <Button
              variant={viewType === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewType('list')}
              size="sm"
              className="flex items-center space-x-1"
            >
              <ApperIcon name="List" size={16} />
              <span>List</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {viewType === 'map' ? (
          <>
            {/* Map */}
            <div className="flex-1 relative">
              <MapComponent
                properties={properties}
                selectedProperty={selectedProperty}
                onPropertySelect={handlePropertySelect}
                onPropertyClick={handlePropertyClick}
              />
            </div>

            {/* Selected Property Panel */}
            {selectedProperty && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="w-80 bg-white border-l border-gray-200 flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Property Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProperty(null)}
                    className="text-gray-400 hover:text-gray-600 p-0"
                  >
                    <ApperIcon name="X" size={20} />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <PropertyCard
                    property={selectedProperty}
                    onClick={() => handlePropertyClick(selectedProperty.id)}
                    showFullDetails={true}
                  />
                </div>
              </motion.div>
            )}
          </>
        ) : (
          /* List View */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PropertyCard
                      property={property}
                      onClick={() => handlePropertyClick(property.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapViewPage;