import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import { savedPropertyService } from '../services';

const PropertyCard = ({ property, onClick, showRemoveButton = false, onRemove, showFullDetails = false }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    try {
      if (isSaved) {
        await savedPropertyService.removeByPropertyId(property.id);
        setIsSaved(false);
        toast.success('Property removed from saved');
      } else {
        await savedPropertyService.create({
          propertyId: property.id,
          savedDate: new Date().toISOString()
        });
        setIsSaved(true);
        toast.success('Property saved successfully');
      }
    } catch (error) {
      toast.error('Failed to update saved properties');
    }
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(property.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={property.images?.[0] || '/placeholder-house.jpg'}
          alt={property.title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        )}
        
        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            property.forRent 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {property.forRent ? 'For Rent' : 'For Sale'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {showRemoveButton ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemoveClick}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <ApperIcon name="X" size={16} className="text-red-500" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSaveClick}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <motion.div animate={isSaved ? { scale: [1, 1.2, 1] } : {}}>
                <ApperIcon 
                  name="Heart" 
                  size={16} 
                  className={`${isSaved ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                />
              </motion.div>
            </motion.button>
          )}
        </div>

        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="text-white font-display font-bold text-xl">
            ${property.price?.toLocaleString()}
            {property.forRent && <span className="text-sm font-normal">/month</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <ApperIcon name="MapPin" size={14} className="mr-1 flex-shrink-0" />
          <span className="text-sm truncate">
            {property.address?.street}, {property.address?.city}, {property.address?.state}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ApperIcon name="Bed" size={14} className="mr-1" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <ApperIcon name="Bath" size={14} className="mr-1" />
              <span>{property.bathrooms} baths</span>
            </div>
          </div>
          {property.squareFeet && (
            <div className="flex items-center">
              <ApperIcon name="Square" size={14} className="mr-1" />
              <span>{property.squareFeet.toLocaleString()} sq ft</span>
            </div>
          )}
        </div>

        {showFullDetails && property.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {property.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {property.propertyType}
          </span>
          <span className="text-xs text-gray-500">
            Listed {new Date(property.listingDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;