import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import Layout from '../components/layout/Layout';
import { toast } from 'sonner';
import { submitContactForm } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      setIsSubmitted(true);
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="bg-[#1a1c1b] py-20 md:py-32">
          <div className="max-w-xl mx-auto px-5 md:px-10 text-center">
            <div className="w-20 h-20 rounded-full bg-[#3f4816] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#d9fb06]" />
            </div>
            <h1 className="font-black text-3xl md:text-4xl text-[#d9fb06] uppercase mb-4">
              Message Sent!
            </h1>
            <p className="text-[#888680] text-lg mb-8">
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] font-semibold rounded-full px-6"
            >
              Back to Home
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-[#1a1c1b] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <h1 className="font-black text-3xl md:text-4xl text-[#d9fb06] uppercase mb-4">
            Contact Us
          </h1>
          <p className="text-[#888680] text-base md:text-lg max-w-2xl">
            Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-[#302f2c] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-bold text-xl text-[#d9fb06] mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1c1b] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#d9fb06]" />
                  </div>
                  <div>
                    <h3 className="text-[#d9fb06] font-medium mb-1">Email</h3>
                    <p className="text-[#888680] text-sm">contact@careerpath.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1c1b] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#d9fb06]" />
                  </div>
                  <div>
                    <h3 className="text-[#d9fb06] font-medium mb-1">Location</h3>
                    <p className="text-[#888680] text-sm">Available worldwide online</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-[#1a1c1b] rounded-lg border border-[rgba(63,72,22,0.5)]">
                <h3 className="text-[#d9fb06] font-medium mb-2">Response Time</h3>
                <p className="text-[#888680] text-sm">
                  We typically respond to inquiries within 24-48 business hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-[#1a1c1b] rounded-xl p-6 md:p-8 border border-[rgba(63,72,22,0.5)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-[#888680] text-sm mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#302f2c] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[#888680] text-sm mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#302f2c] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-[#888680] text-sm mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#302f2c] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06]"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-[#888680] text-sm mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-[#302f2c] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] font-semibold rounded-full px-8 py-5 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
