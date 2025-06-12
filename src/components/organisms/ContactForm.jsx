import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
<FormField
        label="Full Name"
        id="name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        placeholder="Enter your full name"
        error={errors.name}
        required
      />
<FormField
        label="Email Address"
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        placeholder="Enter your email address"
        error={errors.email}
        required
      />
<FormField
        label="Phone Number"
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        placeholder="(555) 123-4567"
        error={errors.phone}
        required
      />
<FormField
        label="Message"
        id="message"
        type="textarea"
        value={formData.message}
        onChange={(e) => handleInputChange('message', e.target.value)}
        rows={4}
        placeholder="Tell us about your interest in this property..."
        error={errors.message}
        required
      />
<Button
          type="submit"
          disabled={submitting}
          className="flex-1"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <ApperIcon name="Send" size={16} />
              <span>Send Inquiry</span>
            </>
          )}
        </Button>
<Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="px-6"
        >
          Cancel
        </Button>