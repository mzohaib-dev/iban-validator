
/**
 * Utility functions for IBAN validation
 */

/**
 * Formats an IBAN number by adding spaces every 4 characters
 */
export const formatIban = (iban: string): string => {
  // Remove any existing spaces or non-alphanumeric characters
  const cleanedIban = iban.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  // Add a space every 4 characters
  return cleanedIban.replace(/(.{4})(?=.)/g, '$1 ');
};

/**
 * Checks if an IBAN is valid using the standard algorithm
 * 1. Move the first 4 characters to the end
 * 2. Convert letters to numbers (A=10, B=11, etc.)
 * 3. Calculate MOD 97, result should be 1
 */
export const validateIban = (iban: string): boolean => {
  if (!iban) return false;
  
  // Remove spaces and convert to uppercase
  const cleanedIban = iban.replace(/\s/g, '').toUpperCase();
  
  // Basic format check
  if (!/^[A-Z]{2}[0-9A-Z]{2,}$/.test(cleanedIban)) {
    return false;
  }
  
  // Minimum length check (shortest IBAN is 15 characters)
  if (cleanedIban.length < 15 || cleanedIban.length > 34) {
    return false;
  }

  // Move the first 4 characters to the end
  const rearranged = cleanedIban.slice(4) + cleanedIban.slice(0, 4);
  
  // Convert letters to numbers (A=10, B=11, etc.)
  const numeric = rearranged.split('').map(char => {
    const code = char.charCodeAt(0);
    // If it's a letter (A-Z), convert to value 10-35
    return (code >= 65 && code <= 90) ? (code - 55).toString() : char;
  }).join('');
  
  // Calculate mod 97 using a numeric approach
  // (bigint is used since the number may be too large for regular numbers)
  return BigInt(numeric) % 97n === 1n;
};

/**
 * Gets the country code from an IBAN (first two characters)
 */
export const getCountryFromIban = (iban: string): string => {
  if (!iban || iban.length < 2) return '';
  const countryCode = iban.trim().toUpperCase().slice(0, 2);
  return countryCode;
};

/**
 * Returns validation message based on IBAN validity
 */
export const getValidationMessage = (iban: string): { isValid: boolean; message: string } => {
  if (!iban) {
    return { isValid: false, message: 'Please enter an IBAN' };
  }
  
  const cleanedIban = iban.replace(/\s/g, '');
  
  if (cleanedIban.length < 15) {
    return { isValid: false, message: 'IBAN is too short' };
  }
  
  if (cleanedIban.length > 34) {
    return { isValid: false, message: 'IBAN is too long' };
  }
  
  if (!/^[A-Z]{2}/.test(cleanedIban.toUpperCase())) {
    return { isValid: false, message: 'IBAN must start with a country code (2 letters)' };
  }
  
  const isValid = validateIban(cleanedIban);
  
  return isValid 
    ? { isValid: true, message: 'Valid IBAN' }
    : { isValid: false, message: 'Invalid IBAN. Please check and try again' };
};
