import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
<Button
            onClick={() => setMapError(false)}
            className="px-4 py-2"
          >
            Retry
          </Button>
{/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button variant="outline" className="p-2 rounded-md shadow-sm">
            <ApperIcon name="Plus" size={20} className="text-gray-600" />
          </Button>
          <Button variant="outline" className="p-2 rounded-md shadow-sm">
            <ApperIcon name="Minus" size={20} className="text-gray-600" />
          </Button>
        </div>