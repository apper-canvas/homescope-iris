import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import ImageGallery from '@/components/organisms/ImageGallery';
import ContactForm from '@/components/organisms/ContactForm';
import Button from '@/components/atoms/Button';
import { propertyService, savedPropertyService } from '@/services';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getById(id);
        if (!result) {
          setError('Property not found');
          return;
        }
        setProperty(result);

        // Check if property is saved
        const saved = await savedPropertyService.getAll();
        setIsSaved(saved.some(item => item.propertyId === id));
      } catch (err) {
        setError(err.message || 'Failed to load property');
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  const handleSaveProperty = async () => {
    try {
      if (isSaved) {
        await savedPropertyService.removeByPropertyId(id);
        setIsSaved(false);
        toast.success('Property removed from saved');
      } else {
        await savedPropertyService.create({
          propertyId: id,
          savedDate: new Date().toISOString()
        });
        setIsSaved(true);
        toast.success('Property saved successfully');
      }
    } catch (error) {
      toast.error('Failed to update saved properties');
    }
  };

  const handleContactSubmit = (formData) => {
    // Simulate contact form submission
    toast.success('Your inquiry has been sent successfully!');
    setShowContactForm(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ApperIcon name="Home" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-display text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-4">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="px-4 py-2"
          >
            Browse Properties
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ApperIcon name="ArrowLeft" size={20} />
        <span>Back to listings</span>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ImageGallery images={property.images} title={property.title} />
          </motion.div>

          {/* Property Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600 flex items-center">
                  <ApperIcon name="MapPin" size={16} className="mr-1" />
                  {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={handleSaveProperty}
                className={`p-2 rounded-full ${
                  isSaved ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <motion.div animate={isSaved ? { scale: [1, 1.2, 1] } : {}}>
                  <ApperIcon name="Heart" size={24} className={isSaved ? 'fill-current' : ''} />
                </motion.div>
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <ApperIcon name="Bed" size={16} className="mr-1" />
                <span>{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" size={16} className="mr-1" />
                <span>{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Square" size={16} className="mr-1" />
                <span>{property.squareFeet?.toLocaleString()} sq ft</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Calendar" size={16} className="mr-1" />
                <span>Listed {format(new Date(property.listingDate), 'MMM d, yyyy')}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features & Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <ApperIcon name="Check" size={16} className="text-green-500" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
          >
            <div className="text-center mb-6">
              <div className="text-3xl font-display font-bold text-primary mb-2">
                ${property.price?.toLocaleString()}
                {property.forRent && <span className="text-lg text-gray-600">/month</span>}
              </div>
              <div className="text-sm text-gray-600">
                {property.propertyType} • {property.squareFeet?.toLocaleString()} sq ft
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setShowContactForm(true)}
                className="w-full"
              >
                Contact Agent
              </Button>

              <Button
                variant="secondary"
                className="w-full flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Calendar" size={18} />
                <span>Schedule Tour</span>
              </Button>

              <Button
                variant={isSaved ? 'outline-red' : 'outline'}
                onClick={handleSaveProperty}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Heart" size={18} className={isSaved ? 'fill-current' : ''} />
                <span>{isSaved ? 'Saved' : 'Save Property'}</span>
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={20} className="text-gray-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Real Estate Agent</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowContactForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Agent</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-gray-600 p-0"
                  >
                    <ApperIcon name="X" size={20} />
                  </Button>
                </div>
                <div className="p-6">
                  <ContactForm
                    property={property}
                    onSubmit={handleContactSubmit}
                    onCancel={() => setShowContactForm(false)}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyDetailPage;