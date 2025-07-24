import * as Yup from 'yup';

const shippingSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must contain only numbers')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits'),
  
  alternateNumber: Yup.string()
    .matches(/^\d*$/, 'Alternate number must contain only numbers')
    .min(0, 'Invalid alternate number')
    .max(15, 'Alternate number must be less than 15 digits'),
    
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  district: Yup.string().required('District is required'),
  city: Yup.string().required('City is required'),
  address: Yup.string().required('Address is required'),
  postalCode: Yup.string()
    .required('Postal code is required')
    .matches(/^\d+$/, 'Postal code must contain only numbers')
});

export default shippingSchema;