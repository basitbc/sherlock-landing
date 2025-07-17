"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SecondaryButton from '../layout/button/secondaryButton';
import { sendEmail } from '@/utilis/SendEmail';

const LeadsModal = ({ 
  show, 
  handleClose, 
  packageDetails = null,
  title = "Plan Your Dream Journey",
  subtitle = "Tell us about your travel preferences and we'll create the perfect itinerary for you."
}) => {
  const formRef = useRef(); // Add form reference for EmailJS
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tripDate: '',
    numberOfDays: '', // Add numberOfDays field
    adults: 2,
    children: 0,
    infants: 0,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Prevent body scroll when modal is open - improved version
  useEffect(() => {
    if (show) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      const body = document.body;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply styles to prevent scrolling
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.paddingRight = `${scrollbarWidth}px`;
      body.style.overflow = 'hidden';
      
      return () => {
        // Restore everything when modal closes
        const storedScrollY = parseInt(body.style.top || '0') * -1;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.paddingRight = '';
        body.style.overflow = '';
        window.scrollTo(0, storedScrollY);
      };
    }
  }, [show]);

  // Reset success state when modal closes
  useEffect(() => {
    if (!show) {
      setShowSuccess(false);
    }
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNumberChange = (field, increment) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + increment)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.tripDate) {
      newErrors.tripDate = 'Trip date is required';
    }

    // Add validation for numberOfDays if package details is not provided
    if (!packageDetails && (!formData.numberOfDays || formData.numberOfDays < 1)) {
      newErrors.numberOfDays = 'Number of days is required';
    }

    if (formData.adults < 1) {
      newErrors.adults = 'At least 1 adult is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await sendEmail(formRef, formData);

      // Show success message
      setShowSuccess(true);
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        tripDate: '',
        numberOfDays: '',
        adults: 2,
        children: 0,
        infants: 0,
        message: ''
      });
      
      // Reset the form element for EmailJS
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Close modal after 5 seconds
      setTimeout(() => {
        handleClose();
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      handleClose();
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const modalClass = packageDetails ? 'leads-modal leads-modal--with-package' : 'leads-modal';

  // Success Message Component
  if (showSuccess) {
    return (
      <Modal 
        show={show} 
        onHide={handleModalClose}
        centered
        className="leads-modal leads-modal--success"
        dialogClassName="leads-modal__dialog leads-modal__dialog--success"
      >
        <Modal.Body className="leads-modal__success-body">
          <div className="leads-modal__success-content">
            <div className="leads-modal__success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2"/>
                <path d="M8 12l2 2 6-6" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="leads-modal__success-title">Thank You!</h2>
            <p className="leads-modal__success-message">
              Your inquiry has been received successfully. Our team will respond back within 24 hours.
            </p>
            
            <div className="leads-modal__success-contact">
              <p className="leads-modal__success-contact-title">
                Meanwhile, you can reach us directly:
              </p>
              
              <div className="leads-modal__success-actions">
                <a href="tel:+919797009339" className="leads-modal__success-button leads-modal__success-button--phone">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Call +91-9797009339
                </a>
                
                <a href="mailto:thesherlocktravels@gmail.com" className="leads-modal__success-button leads-modal__success-button--email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
            
            <button onClick={handleModalClose} className="leads-modal__success-close">
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal 
      show={show} 
      onHide={handleModalClose}
      centered
      className={modalClass}
      backdrop={isSubmitting ? 'static' : true}
      keyboard={!isSubmitting}
      dialogClassName="leads-modal__dialog"
    >
      <Modal.Header closeButton className="leads-modal__header">
        <div className="leads-modal__title-section">
          <Modal.Title className="leads-modal__title">
            {packageDetails ? `Book ${packageDetails.packageName}` : title}
          </Modal.Title>
          <p className="leads-modal__subtitle">
            {packageDetails ? 'Complete the form below to book this amazing package' : subtitle}
          </p>
        </div>
      </Modal.Header>

      <Modal.Body className="leads-modal__body">
        <div className="leads-modal__content">
          {/* Package Details Section - Hidden on mobile */}
          {packageDetails && (
            <div className="leads-modal__package-section">
              <div className="package-card">
                <div 
                  className="package-card__image"
                  style={{ backgroundImage: `url(${packageDetails.bgImage})` }}
                >
                  <div className="package-card__overlay">
                    {packageDetails.duration && (
                      <div className="package-card__duration">{packageDetails.duration}</div>
                    )}
                  </div>
                </div>
                
                <div className="package-card__details">
                  <h3 className="package-card__name">{packageDetails.packageName}</h3>
                  
                  <div className="package-card__meta">
                    {packageDetails.location && (
                      <div className="package-card__location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {packageDetails.location}
                      </div>
                    )}
                    
                    {packageDetails.price && (
                      <div className="package-card__price">
                        ₹{parseInt(packageDetails.price).toLocaleString('en-IN')}
                        <span className="package-card__price-unit">per person</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="package-card__extras">
                    {packageDetails.mealsPlan && (
                      <div className="package-card__feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M3 11h18v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {packageDetails.mealsPlan}
                      </div>
                    )}
                    
                    {packageDetails.vehicle && (
                      <div className="package-card__feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M3 12h18v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M21 12H3l2-6h14l2 6z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="8" cy="16" r="2" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {packageDetails.vehicle}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Package Summary */}
          {packageDetails && (
            <div className="leads-modal__mobile-package">
              <div className="mobile-package-summary">
                <h4 className="mobile-package-summary__name">{packageDetails.packageName}</h4>
                <div className="mobile-package-summary__details">
                  {packageDetails.location && (
                    <span className="mobile-package-summary__location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {packageDetails.location}
                    </span>
                  )}
                  {packageDetails.duration && (
                    <span className="mobile-package-summary__duration">{packageDetails.duration}</span>
                  )}
                  {packageDetails.price && (
                    <span className="mobile-package-summary__price">
                      ₹{parseInt(packageDetails.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form Section */}
          <div className="leads-modal__form-section">
            <form ref={formRef} onSubmit={handleSubmit} className="leads-modal__form" id="leadsForm">
              {/* Hidden fields for EmailJS */}
              <input type="hidden" name="from_name" value={formData.name} />
              <input type="hidden" name="from_email" value={formData.email} />
              <input type="hidden" name="phone" value={formData.phone} />
              <input type="hidden" name="trip_date" value={formData.tripDate} />
              <input type="hidden" name="number_of_days" value={formData.numberOfDays} />
              <input type="hidden" name="adults" value={formData.adults} />
              <input type="hidden" name="children" value={formData.children} />
              <input type="hidden" name="infants" value={formData.infants} />
              <input type="hidden" name="message" value={formData.message} />
              {packageDetails && (
                <>
                  <input type="hidden" name="package_name" value={packageDetails.packageName} />
                  <input type="hidden" name="package_id" value={packageDetails.id} />
                </>
              )}

              {/* Personal Information */}
              <div className="leads-modal__section">
                <h3 className="leads-modal__section-title">Personal Information</h3>
                
                <div className="leads-modal__row">
                  <div className="leads-modal__field">
                    <label className="leads-modal__label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`leads-modal__input ${errors.name ? 'leads-modal__input--error' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="leads-modal__error">{errors.name}</span>}
                  </div>

                  <div className="leads-modal__field">
                    <label className="leads-modal__label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`leads-modal__input ${errors.email ? 'leads-modal__input--error' : ''}`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <span className="leads-modal__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="leads-modal__row">
                  <div className="leads-modal__field">
                    <label className="leads-modal__label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`leads-modal__input ${errors.phone ? 'leads-modal__input--error' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="leads-modal__error">{errors.phone}</span>}
                  </div>

                  <div className="leads-modal__field">
                    <label className="leads-modal__label">Preferred Travel Date *</label>
                    <input
                      type="date"
                      name="tripDate"
                      value={formData.tripDate}
                      onChange={handleInputChange}
                      min={getTomorrowDate()}
                      className={`leads-modal__input ${errors.tripDate ? 'leads-modal__input--error' : ''}`}
                    />
                    {errors.tripDate && <span className="leads-modal__error">{errors.tripDate}</span>}
                  </div>
                </div>

                {/* Add Number of Days field if package details is not provided */}
                {!packageDetails && (
                  <div className="leads-modal__row">
                    <div className="leads-modal__field">
                      <label className="leads-modal__label">Number of Days *</label>
                      <input
                        type="number"
                        name="numberOfDays"
                        value={formData.numberOfDays}
                        onChange={handleInputChange}
                        min="1"
                        max="30"
                        className={`leads-modal__input ${errors.numberOfDays ? 'leads-modal__input--error' : ''}`}
                        placeholder="Enter number of days"
                      />
                      {errors.numberOfDays && <span className="leads-modal__error">{errors.numberOfDays}</span>}
                    </div>
                  </div>
                )}
              </div>

              {/* Guest Information */}
              <div className="leads-modal__section">
                <h3 className="leads-modal__section-title">Guest Information</h3>
                
                <div className="leads-modal__guests">
                  <div className="leads-modal__guest-field">
                    <label className="leads-modal__label">Adults (12+ years) *</label>
                    <div className="leads-modal__counter">
                      <button
                        type="button"
                        onClick={() => handleNumberChange('adults', -1)}
                        className="leads-modal__counter-btn"
                        disabled={formData.adults <= 1}
                      >
                        -
                      </button>
                      <span className="leads-modal__counter-value">{formData.adults}</span>
                      <button
                        type="button"
                        onClick={() => handleNumberChange('adults', 1)}
                        className="leads-modal__counter-btn"
                        disabled={formData.adults >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="leads-modal__guest-field">
                    <label className="leads-modal__label">Children (2-11 years)</label>
                    <div className="leads-modal__counter">
                      <button
                        type="button"
                        onClick={() => handleNumberChange('children', -1)}
                        className="leads-modal__counter-btn"
                        disabled={formData.children <= 0}
                      >
                        -
                      </button>
                      <span className="leads-modal__counter-value">{formData.children}</span>
                      <button
                        type="button"
                        onClick={() => handleNumberChange('children', 1)}
                        className="leads-modal__counter-btn"
                        disabled={formData.children >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="leads-modal__guest-field">
                    <label className="leads-modal__label">Infants (0-2 years)</label>
                    <div className="leads-modal__counter">
                      <button
                        type="button"
                        onClick={() => handleNumberChange('infants', -1)}
                        className="leads-modal__counter-btn"
                        disabled={formData.infants <= 0}
                      >
                        -
                      </button>
                      <span className="leads-modal__counter-value">{formData.infants}</span>
                      <button
                        type="button"
                        onClick={() => handleNumberChange('infants', 1)}
                        className="leads-modal__counter-btn"
                        disabled={formData.infants >= 5}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {errors.adults && <span className="leads-modal__error">{errors.adults}</span>}
              </div>

              {/* Additional Requirements */}
              <div className="leads-modal__section">
                <h3 className="leads-modal__section-title">Additional Requirements</h3>
                
                <div className="leads-modal__field">
                  <label className="leads-modal__label">
                    Special Requests or Requirements (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="leads-modal__textarea"
                    placeholder="Tell us about any special requirements, preferences, or questions you have about your trip..."
                    rows="3"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="leads-modal__footer">
        <SecondaryButton
          variant="outline"
          onClick={handleModalClose}
          disabled={isSubmitting}
        >
          Cancel
        </SecondaryButton>
        
        <SecondaryButton
          variant="pink"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : packageDetails ? 'Book Now' : 'Send Inquiry'}
        </SecondaryButton>
      </Modal.Footer>
    </Modal>
  );
};

export default LeadsModal;