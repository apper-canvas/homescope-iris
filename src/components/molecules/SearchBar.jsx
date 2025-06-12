import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
<Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by location, address, or property name..."
          className="block w-full pl-12 pr-12 py-4 shadow-sm"
        />
<Button
        type="submit"
        className="absolute right-2 top-2 bottom-2 px-6"
      >
        Search
      </Button>