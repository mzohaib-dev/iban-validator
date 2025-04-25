/**
 * Utility functions for IBAN validation and information extraction
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
    : { isValid: false, message: 'Invalid IBAN.' };
};

/**
 * Extracts bank account information from a valid IBAN
 * Returns bank code, branch code, and account number based on country-specific formats
 */
export const extractBankAccountInfo = (iban: string): {
  isValid: boolean;
  countryCode: string;
  bankCode: string;
  branchCode: string;
  accountNumber: string;
  message: string;
} => {
  const cleanedIban = iban.replace(/\s/g, '').toUpperCase();
  const countryCode = getCountryFromIban(cleanedIban);
  
  // Validate IBAN first
  const isValid = validateIban(cleanedIban);
  if (!isValid) {
    return {
      isValid: false,
      countryCode,
      bankCode: '',
      branchCode: '',
      accountNumber: '',
      message: 'Invalid IBAN. Cannot extract account information.'
    };
  }

  let bankCode = '';
  let branchCode = '';
  let accountNumber = '';

  // Country-specific IBAN parsing
  switch (countryCode) {
    case 'DE': // Germany (22 characters: DEkk bbbb bbbb cccc cccc cc)
      if (cleanedIban.length === 22) {
        bankCode = cleanedIban.slice(4, 12); // 8-digit bank code
        accountNumber = cleanedIban.slice(12, 22); // 10-digit account number
        branchCode = ''; // Germany doesn't use branch code in IBAN
      }
      break;

    case 'FR': // France (27 characters: FRkk bbbb bsss sscc cccc cccc ckk)
      if (cleanedIban.length === 27) {
        bankCode = cleanedIban.slice(4, 9); // 5-digit bank code
        branchCode = cleanedIban.slice(9, 14); // 5-digit branch code
        accountNumber = cleanedIban.slice(14, 25); // 11-digit account number
      }
      break;

    case 'GB': // United Kingdom (22 characters: GBkk bbbb ssss sscc cccc cc)
      if (cleanedIban.length === 22) {
        bankCode = cleanedIban.slice(4, 8); // 4-character bank code
        branchCode = cleanedIban.slice(8, 14); // 6-digit sort code
        accountNumber = cleanedIban.slice(14, 22); // 8-digit account number
      }
      break;

    default:
      // Generic fallback: assume bank code is after country code + check digits
      // and account number is the rest. No branch code for unknown formats.
      if (cleanedIban.length >= 15) {
        bankCode = cleanedIban.slice(4, 8); // Assume first 4 digits after check digits
        accountNumber = cleanedIban.slice(8); // Rest is account number
        branchCode = '';
      }
  }

  return {
    isValid: true,
    countryCode,
    bankCode,
    branchCode,
    accountNumber,
    message: bankCode ? 'Successfully extracted bank account information' : 'Partial information extracted due to unknown country format'
  };
};