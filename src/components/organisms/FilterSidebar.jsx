import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Button from '@/components/atoms/Button';
<Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm px-0 py-0"
          >
            Clear All
          </Button>
<Label className="mb-2">Price Range</Label>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Min price"
              value={localFilters.priceMin}
              onChange={(e) => handleInputChange('priceMin', e.target.value)}
            />
<Input
              type="number"
              placeholder="Max price"
              value={localFilters.priceMax}
              onChange={(e) => handleInputChange('priceMax', e.target.value)}
            />
          </div>
<Label className="mb-2">Bedrooms</Label>
          <Input
            type="select"
            value={localFilters.bedrooms}
            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
            options={[
              { value: '', label: 'Any' },
              { value: '1', label: '1+' },
              { value: '2', label: '2+' },
              { value: '3', label: '3+' },
              { value: '4', label: '4+' },
              { value: '5', label: '5+' },
            ]}
          />
<Label className="mb-2">Bathrooms</Label>
          <Input
            type="select"
            value={localFilters.bathrooms}
            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
            options={[
              { value: '', label: 'Any' },
              { value: '1', label: '1+' },
              { value: '2', label: '2+' },
              { value: '3', label: '3+' },
              { value: '4', label: '4+' },
            ]}
          />
<Label className="mb-2">Location</Label>
          <Input
            type="text"
            placeholder="City or State"
            value={localFilters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
<Label className="mb-3">Property Type</Label>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((type) => (
            <Button
              key={type}
              variant={(localFilters.propertyType || []).includes(type) ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePropertyTypeToggle(type)}
              className="rounded-full"
            >
              {type}
            </Button>
          ))}
        </div>