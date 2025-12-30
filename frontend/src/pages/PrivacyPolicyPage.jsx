import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';

const PrivacyPolicyPage = () => {
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
            <span className="text-[#d9fb06]">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-[#1a1c1b] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <h1 className="font-black text-3xl md:text-4xl text-[#d9fb06] uppercase mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#888680] mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert max-w-none
            prose-headings:text-[#d9fb06] prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-[#dfddd6] prose-p:leading-relaxed prose-p:mb-4
            prose-li:text-[#dfddd6] prose-li:mb-2
            prose-strong:text-[#d9fb06]">
            
            <h2>Introduction</h2>
            <p>Welcome to CareerPath ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Subscribe to our newsletter</li>
              <li>Fill out a contact form</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>This information may include your name, email address, and any other information you choose to provide.</p>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Send you our newsletter and updates (if subscribed)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and content</li>
              <li>Analyze website usage and trends</li>
              <li>Display relevant advertisements</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to collect and store information about your interactions with our website. These technologies help us:</p>
            <ul>
              <li>Remember your preferences</li>
              <li>Understand how you use our website</li>
              <li>Deliver targeted advertisements</li>
              <li>Measure the effectiveness of our content</li>
            </ul>
            <p>You can control cookie settings through your browser preferences.</p>

            <h2>Third-Party Services</h2>
            <p>We may use third-party services that collect, monitor, and analyze website data, including:</p>
            <ul>
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Google AdSense:</strong> For displaying advertisements</li>
              <li><strong>Email Service Providers:</strong> For newsletter delivery</li>
            </ul>
            <p>These third parties have their own privacy policies governing how they use your information.</p>

            <h2>Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
            <p>Email: privacy@careerpath.com</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicyPage;
