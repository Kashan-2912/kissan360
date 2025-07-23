import * as Yup from 'yup';

const shippingSchema = Yup.object({
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