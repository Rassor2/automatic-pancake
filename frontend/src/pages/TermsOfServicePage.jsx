import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';

const TermsOfServicePage = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-[#302f2c] py-3 border-b border-[rgba(63,72,22,0.5)]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#888680] hover:text-[#d9fb06] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#888680]" />
            <span className="text-[#d9fb06]">Terms of Service</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-[#1a1c1b] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <h1 className="font-black text-3xl md:text-4xl text-[#d9fb06] uppercase mb-4">
            Terms of Service
          </h1>
          <p className="text-[#888680] mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert max-w-none
            prose-headings:text-[#d9fb06] prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-[#dfddd6] prose-p:leading-relaxed prose-p:mb-4
            prose-li:text-[#dfddd6] prose-li:mb-2
            prose-strong:text-[#d9fb06]">
            
            <h2>Agreement to Terms</h2>
            <p>By accessing or using CareerPath (the "Website"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the Website.</p>

            <h2>Use of the Website</h2>
            <h3>Permitted Use</h3>
            <p>You may use our Website for lawful purposes only. You agree to:</p>
            <ul>
              <li>Use the Website in accordance with all applicable laws and regulations</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Provide accurate information when requested</li>
              <li>Maintain the confidentiality of any account credentials</li>
            </ul>

            <h3>Prohibited Activities</h3>
            <p>You may not:</p>
            <ul>
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Use automated systems to access or scrape the Website</li>
              <li>Interfere with the Website's functionality or security</li>
              <li>Transmit malware, spam, or other harmful content</li>
              <li>Impersonate others or misrepresent your affiliation</li>
              <li>Use the Website for any illegal or unauthorized purpose</li>
            </ul>

            <h2>Content</h2>
            <h3>Our Content</h3>
            <p>All content on this Website, including articles, images, graphics, and logos, is owned by CareerPath or its content suppliers and is protected by copyright and other intellectual property laws.</p>
            <p>You may view and download content for personal, non-commercial use only, provided you maintain all copyright notices.</p>

            <h3>User Submissions</h3>
            <p>If you submit content to our Website (such as comments or feedback), you grant us a non-exclusive, royalty-free license to use, modify, and display that content in connection with our services.</p>

            <h2>Disclaimer of Warranties</h2>
            <p>The Website and its content are provided "as is" without warranties of any kind. We do not warrant that:</p>
            <ul>
              <li>The Website will be uninterrupted or error-free</li>
              <li>The content is accurate, complete, or current</li>
              <li>The Website will meet your specific requirements</li>
              <li>Any defects will be corrected</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, CareerPath shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website, including but not limited to:</p>
            <ul>
              <li>Loss of profits, data, or goodwill</li>
              <li>Career or educational decisions made based on our content</li>
              <li>Interruption of business</li>
              <li>Any other intangible losses</li>
            </ul>

            <h2>Educational Content Disclaimer</h2>
            <p>The information provided on this Website is for general educational and informational purposes only. It is not intended to be professional career counseling, legal, financial, or medical advice.</p>
            <p>We encourage you to:</p>
            <ul>
              <li>Conduct your own research before making important decisions</li>
              <li>Consult with qualified professionals when appropriate</li>
              <li>Verify information with official sources</li>
              <li>Consider your individual circumstances</li>
            </ul>

            <h2>Third-Party Links</h2>
            <p>Our Website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any sites you visit.</p>

            <h2>Newsletter and Communications</h2>
            <p>If you subscribe to our newsletter, you agree to receive periodic emails from us. You may unsubscribe at any time by using the unsubscribe link in our emails or by contacting us directly.</p>

            <h2>Termination</h2>
            <p>We reserve the right to terminate or suspend access to our Website immediately, without prior notice, for any reason, including but not limited to a breach of these Terms.</p>

            <h2>Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after any changes constitutes acceptance of the new Terms.</p>

            <h2>Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>

            <h2>Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at:</p>
            <p>Email: legal@careerpath.com</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfServicePage;
