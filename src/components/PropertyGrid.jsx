import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { useNavigate } from 'react-router-dom';

const PropertyGrid = ({ properties, showRemoveButton = false, onRemove }) => {
  const navigate = useNavigate();

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
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
            showRemoveButton={showRemoveButton}
            onRemove={onRemove}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;