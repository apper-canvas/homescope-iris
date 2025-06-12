import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
<>
            <Button
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100"
              onClick={prevImage}
            >
              <ApperIcon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100"
              onClick={nextImage}
            >
              <ApperIcon name="ChevronRight" size={20} />
            </Button>
          </>
<Button
          variant="ghost"
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100"
          onClick={() => setIsFullscreen(true)}
        >
          <ApperIcon name="Maximize" size={20} />
        </Button>
{images.map((image, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex-shrink-0 w-20 h-16 bg-gray-200 rounded-md overflow-hidden border-2 p-0 ${
                index === currentIndex
                  ? 'border-primary shadow-md'
                  : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => goToImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </Button>
          ))}
<Button
                  variant="ghost"
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full"
                  onClick={() => setIsFullscreen(false)}
                >
                  <ApperIcon name="X" size={24} />
                </Button>
<>
                    <Button
                      variant="ghost"
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full"
                      onClick={prevImage}
                    >
                      <ApperIcon name="ChevronLeft" size={24} />
                    </Button>
                    <Button
                      variant="ghost"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full"
                      onClick={nextImage}
                    >
                      <ApperIcon name="ChevronRight" size={24} />
                    </Button>
                  </>