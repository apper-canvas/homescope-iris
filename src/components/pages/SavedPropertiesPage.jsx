import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { savedPropertyService, propertyService } from '@/services';

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSavedProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedItems = await savedPropertyService.getAll();
        const propertyIds = savedItems.map(item => item.propertyId);

        if (propertyIds.length === 0) {
          setProperties([]);
          return;
        }

        const allProperties = await propertyService.getAll();
        const savedProperties = allProperties.filter(property =>
          propertyIds.includes(property.id)
        );

        setProperties(savedProperties);
      } catch (err) {
        setError(err.message || 'Failed to load saved properties');
        toast.error('Failed to load saved properties');
      } finally {
        setLoading(false);
      }
    };
    loadSavedProperties();
  }, []);

  const handleRemoveProperty = async (propertyId) => {
    try {
      await savedPropertyService.removeByPropertyId(propertyId);
      setProperties(prev => prev.filter(property => property.id !== propertyId));
      toast.success('Property removed from saved');
    } catch (error) {
      toast.error('Failed to remove property');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display text-gray-900 mb-2">Something went wrong</h2>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-bold text-gray-900 mb-2"
        >
          Saved Properties
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600"
        >
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
        </motion.p>
      </div>

      {/* Properties */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Heart" className="w-16 h-16 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No saved properties</h3>
          <p className="mt-2 text-gray-500 mb-6">
            Start browsing properties and save your favorites here
          </p>
          <Button
            onClick={() => window.location.href = '/buy'}
            className="px-6 py-3"
          >
            Browse Properties
          </Button>
        </motion.div>
      ) : (
        <PropertyGrid
          properties={properties}
          showRemoveButton={true}
          onRemove={handleRemoveProperty}
        />
      )}
    </div>
  );
};

export default SavedPropertiesPage;