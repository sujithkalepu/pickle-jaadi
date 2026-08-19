export const SHIPPING_COUNTRIES = [
  'India',
  'Singapore',
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'Australia',
  'Canada',
  'Malaysia',
  'Germany',
  'France',
  'New Zealand',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Other',
];

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

export function composeCheckoutIdentity(form) {
  const firstName = (form.firstName || '').trim();
  const lastName = (form.lastName || '').trim();
  const name = `${firstName} ${lastName}`.trim() || (form.name || '').trim();
  const addressParts = [
    form.street,
    form.apartment,
    form.city,
    form.state,
    form.pinCode,
    form.country,
  ].map((part) => String(part || '').trim()).filter(Boolean);

  return {
    ...form,
    firstName,
    lastName,
    name,
    address: addressParts.join(', '),
  };
}

export function isIndiaCountry(country) {
  return !country || country === 'India';
}
