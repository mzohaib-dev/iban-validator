
import IbanValidator from "@/components/IbanValidator";
import { CheckCircle, Info, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="py-6 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">IBAN Sense Check</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Validate Your International Bank Account Number
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Quick, free, and secure IBAN validation to ensure your banking details are correct
          </p>
          
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700">
              <span>No registration required</span>
            </div>
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700">
              <span>Data never stored</span>
            </div>
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700">
              <span>Instant verification</span>
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2">
            <IbanValidator />
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why validate your IBAN?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                  <span>Avoid failed payments and transaction fees</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                  <span>Ensure your money reaches the correct account</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                  <span>Verify the bank country and check digits</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                  <span>Prevent delays in payment processing</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto mb-12">
           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
             <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
             Frequently Asked Questions
           </h2>
           
           <Accordion type="single" collapsible className="bg-white shadow-sm rounded-lg">
             <AccordionItem value="item-1">
               <AccordionTrigger className="px-6">What is an IBAN?</AccordionTrigger>
               <AccordionContent className="px-6 text-gray-700">
                 An International Bank Account Number (IBAN) is a standardized international numbering system developed to identify bank accounts across national borders. It was designed to minimize the risk of transcription errors and facilitate international payments.
               </AccordionContent>
             </AccordionItem>
             
             <AccordionItem value="item-2">
               <AccordionTrigger className="px-6">How is an IBAN structured?</AccordionTrigger>
               <AccordionContent className="px-6 text-gray-700">
                 An IBAN consists of up to 34 alphanumeric characters: a two-letter country code, followed by two check digits, and finally a country-specific Basic Bank Account Number (BBAN) which includes the domestic bank account number, branch identifier, and potential routing information.
               </AccordionContent>
             </AccordionItem>
             
             <AccordionItem value="item-3">
               <AccordionTrigger className="px-6">Is my data secure?</AccordionTrigger>
               <AccordionContent className="px-6 text-gray-700">
                 Yes, our IBAN validation service processes your data locally in your browser. We don't store, transmit, or share your IBAN or any other information you enter. All validation happens on your device, providing complete privacy.
               </AccordionContent>
             </AccordionItem>
             
             <AccordionItem value="item-4">
               <AccordionTrigger className="px-6">What countries use IBAN?</AccordionTrigger>
               <AccordionContent className="px-6 text-gray-700">
                 Most European countries use IBAN, along with several Middle Eastern, North African, and Caribbean nations. Major economies like the United States, Canada, Australia, and most of Asia don't use the IBAN system but may process payments to IBAN countries.
               </AccordionContent>
             </AccordionItem>
             
             <AccordionItem value="item-5">
               <AccordionTrigger className="px-6">How does IBAN validation work?</AccordionTrigger>
               <AccordionContent className="px-6 text-gray-700">
                 Our validator checks several aspects of your IBAN: correct length for the specified country, proper country code format, and passes the MOD-97 verification algorithm (ISO 7064) which validates the check digits. This helps identify most input errors and typos.
               </AccordionContent>
             </AccordionItem>
           </Accordion>
         </section>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="mb-2">IBAN Sense Check — A reliable IBAN validation tool</p>
          <p className="text-sm">This tool is provided for informational purposes. While we strive for accuracy, we recommend double-checking with your bank for official verification.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
