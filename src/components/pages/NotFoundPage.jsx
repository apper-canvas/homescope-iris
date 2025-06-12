import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-8"
        >
          <ApperIcon name="Home" className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>

        <h1 className="text-6xl font-display font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3"
          >
            Go Home
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3"
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;