
import { useState, ChangeEvent } from 'react';
import { formatIban, getValidationMessage, getCountryFromIban } from '@/utils/ibanUtils';
import Button from './Button';
import Input from './Input';
import IbanHistory from './IbanHistory';
import ReactCountryFlag from "react-country-flag";

const IbanValidator = () => {
  const [iban, setIban] = useState('');
  const [formattedIban, setFormattedIban] = useState('');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setIban(input.replace(/\s/g, ''));
    setFormattedIban(formatIban(input));
    
    if (isSubmitted) {
      const result = getValidationMessage(input);
      setValidationResult(result);
    }
  };

  const handleSubmit = () => {
    const result = getValidationMessage(iban);
    setValidationResult(result);
    setIsSubmitted(true);

    if (result.isValid) {
      const history = JSON.parse(localStorage.getItem('ibanHistory') || '[]');
      if (!history.includes(formattedIban)) {
        const newHistory = [formattedIban, ...history].slice(0, 5);
        localStorage.setItem('ibanHistory', JSON.stringify(newHistory));
      }
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
