import { useState, ChangeEvent } from 'react';
import { formatIban, getValidationMessage, getCountryFromIban, extractBankAccountInfo } from '@/utils/ibanUtils';
import Button from './Button';
import Input from './Input';
import IbanHistory from './IbanHistory';
import ReactCountryFlag from "react-country-flag";

const IbanValidator = () => {
  const [iban, setIban] = useState('');
  const [formattedIban, setFormattedIban] = useState('');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);
  const [bankInfo, setBankInfo] = useState<{
    isValid: boolean;
    countryCode: string;
    bankCode: string;
    branchCode: string;
    accountNumber: string;
    message: string;
  } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setIban(input.replace(/\s/g, ''));
    setFormattedIban(formatIban(input));
    
    if (isSubmitted) {
      const result = getValidationMessage(input);
      setValidationResult(result);
      if (result.isValid) {
        const info = extractBankAccountInfo(input);
        setBankInfo(info);
      } else {
        setBankInfo(null);
      }
    }
  };

  const handleSubmit = () => {
    const result = getValidationMessage(iban);
    setValidationResult(result);
    setIsSubmitted(true);

    if (result.isValid) {
      const info = extractBankAccountInfo(iban);
      setBankInfo(info);

      const history = JSON.parse(localStorage.getItem('ibanHistory') || '[]');
      if (!history.includes(formattedIban)) {
        const newHistory = [formattedIban, ...history].slice(0, 5);
        localStorage.setItem('ibanHistory', JSON.stringify(newHistory));
      }
    } else {
      setBankInfo(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedIban);
      alert('IBAN copied to clipboard');
    } catch (err) {
      alert('Failed to copy IBAN');
    }
  };

  const countryCode = getCountryFromIban(iban);

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">IBAN Validator</h2>
        <p className="text-sm text-gray-600">Enter your IBAN number for validation</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="relative">
            <Input
              value={formattedIban}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g. DE89 3704 0044 0532 0130 00"
              className={`h-12 text-lg font-mono pl-12 ${
                validationResult?.isValid === true
                  ? 'border-green-500'
                  : validationResult?.isValid === false
                  ? 'border-red-500'
                  : ''
              }`}
            />
            {countryCode && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
                  style={{
                    width: '1.2em',
                    height: '1.2em',
                  }}
                  title={countryCode}
                />
              </div>
            )}
          </div>
          
          {validationResult && (
            <div
              className={`flex items-center mt-2 text-sm ${
                validationResult.isValid ? 'text-green-600' : 'text-red-600'
              } animate-fade-in`}
            >
              <span>{validationResult.message}</span>
            </div>
          )}
        </div>

        {validationResult?.isValid && bankInfo?.isValid && (
          <div className="bg-blue-50 rounded-lg p-4 animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Bank Account Information</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <span className="font-medium">Country Code:</span> {bankInfo.countryCode || 'Not available'}
              </li>
              <li>
                <span className="font-medium">Bank Code:</span> {bankInfo.bankCode || 'Not available'}
              </li>
              {bankInfo.branchCode && (
                <li>
                  <span className="font-medium">Branch Code:</span> {bankInfo.branchCode}
                </li>
              )}
              <li>
                <span className="font-medium">Account Number:</span> {bankInfo.accountNumber || 'Not available'}
              </li>
            </ul>
            <p className="text-xs text-gray-600 mt-2">{bankInfo.message}</p>
          </div>
        )}

        {validationResult?.isValid && (
          <div className="flex justify-end gap-2 animate-fade-in">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              Copy IBAN
            </Button>
          </div>
        )}
        
        <IbanHistory onSelect={setFormattedIban} />
      </div>

      <div className="mt-6">
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={!iban}
        >
          Validate IBAN
        </Button>
      </div>
    </div>
  );
};

export default IbanValidator;