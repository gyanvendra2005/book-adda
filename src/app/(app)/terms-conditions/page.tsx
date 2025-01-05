"use client"
import React from 'react';

export default function TermsAndConditions(){
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions for Book Swap</h1>

      <p>Welcome to Book Swap! Please read these Terms and Conditions ("Terms") carefully before using our services. By accessing or using our platform, you agree to comply with these Terms.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Information</h2>
      <ul className="list-disc pl-8">
        <li>Book Swap is a platform dedicated to the exchange, sale, and purchase of second-hand books. We are committed to fostering literacy and sustainability.</li>
        {/* <li>By using Book Swap, you represent that you are at least 18 years of age or have parental consent to use our services.</li> */}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Responsibilities</h2>
      <ul className="list-disc pl-8">
        <li>Users must provide accurate and truthful information when registering and conducting transactions on the platform.</li>
        <li>Users are responsible for ensuring that all books listed for exchange or sale meet the conditions specified in the product description (e.g., new, used, refurbished).</li>
        <li>Users must not engage in any fraudulent activities, such as misrepresentation of book conditions, duplicate listings, or unauthorized payments.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Listings and Transactions</h2>
      <ul className="list-disc pl-8">
        <li>Sellers must include clear and accurate descriptions of the books, including their condition, category, location, and price.</li>
        <li>Buyers are encouraged to verify the details provided by sellers before completing a transaction. Book Swap is not liable for disputes arising from misinformation.</li>
        <li>Payments must be processed as outlined on our platform. Book Swap does not store credit card details.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Refunds</h2>
       <ul className="list-disc pl-8">
         <li>Refunds will only be issued if you do not receive the seller's contact details. If this occurs, please raise a request or send an email. We will verify your claim and process the refund accordingly.</li>
       </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
      <ul className="list-disc pl-8">
        <li>All content, including logos, designs, and trademarks, associated with Book Swap are the property of Book Swap.</li>
        <li>Unauthorized use of our intellectual property is prohibited.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Prohibited Activities</h2>
      <ul className="list-disc pl-8">
        <li>Users must not:
          <ul className="list-disc pl-8">
            <li>Post illegal, offensive, or copyrighted material without proper authorization.</li>
            <li>Use the platform for spam or harassment.</li>
          </ul>
        </li>
        <li>Violations of these prohibitions may result in suspension or termination of your account.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
      <ul className="list-disc pl-8">
        <li>Book Swap is not liable for any direct, indirect, or consequential damages arising from the use of our platform.</li>
        <li>Book Swap does not guarantee uninterrupted access to the platform and is not responsible for technical issues.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
      <ul className="list-disc pl-8">
        <li>Book Swap reserves the right to modify these Terms at any time. Updates will be communicated via the platform or email.</li>
        <li>Continued use of the platform after updates constitutes acceptance of the revised Terms.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Information</h2>
      <p>For any questions, please contact us at <a href="mailto:support@bookswap.com" className="text-indigo-600 hover:underline">support@bookswap.com</a>.</p>
    </div>
  );
};


