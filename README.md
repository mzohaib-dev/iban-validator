# IBAN Sense Check Page

A lightweight web tool to validate International Bank Account Numbers (IBANs) by performing basic checks (format, length, checksum).

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Demo

Check out the live demo of the IBAN validator [here](https://iban-validator.netlify.app/)

## Features

- **Basic IBAN Validation**: Checks if the IBAN follows the correct format.
- **Country Code Validation**: Verifies the 2-letter country code.
- **Length Check**: Ensures the IBAN length matches the country's standard.
- **Checksum Verification**: Uses the Mod-97 algorithm for mathematical validation.
- **User-Friendly UI**: Simple input field with real-time validation feedback.

## How It Works

The validation follows these steps:

- Remove spaces & convert to uppercase.
- Check country code (first 2 letters).
- Verify length (based on country standards).
- Rearrange the IBAN (move first 4 chars to the end).
- Convert letters to numbers (A=10, B=11, etc.).
- Apply Mod-97 check – valid if remainder is 1.

## Example Valid IBANs

- **Germany**: DE89 3704 0044 0532 0130 00
- **France**: FR14 2004 1010 0505 0001 3M02 606
- **UK**: GB29 NWBK 6016 1331 9268 19

## Run Locally

Clone the project

```bash
  git clone https://github.com/mzohaib-dev/iban-validator.git
```

Go to the project directory

```bash
  cd iban-validator
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
