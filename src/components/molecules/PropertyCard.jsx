import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { savedPropertyService } from '@/services';
{/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={property.forRent ? 'info' : 'success'}>
            {property.forRent ? 'For Rent' : 'For Sale'}
          </Badge>
        </div>
{showRemoveButton ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveClick}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white"
            >
              <ApperIcon name="X" size={16} className="text-red-500" />
            </Button>
          ) : (
<Button
              variant="ghost"
              size="sm"
              onClick={handleSaveClick}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white"
            >
              <motion.div animate={isSaved ? { scale: [1, 1.2, 1] } : {}}>
                <ApperIcon
                  name="Heart"
                  size={16}
                  className={`${isSaved ? 'text-red-500 fill-current' : 'text-gray-600'}`}
                />
              </motion.div>
            </Button>
          )}