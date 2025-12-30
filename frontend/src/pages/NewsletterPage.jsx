import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Layout from '../components/layout/Layout';
import { toast } from 'sonner';
import { subscribeNewsletter } from '../services/api';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await subscribeNewsletter(email, name || null);
      setIsSubscribed(true);
      toast.success('Successfully subscribed to the newsletter!');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <Layout>
        <section className="bg-[#1a1c1b] py-20 md:py-32">
          <div className="max-w-xl mx-auto px-5 md:px-10 text-center">
            <div className="w-20 h-20 rounded-full bg-[#3f4816] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#d9fb06]" />
            </div>
            <h1 className="font-black text-3xl md:text-4xl text-[#d9fb06] uppercase mb-4">
              You're Subscribed!
            </h1>
            <p className="text-[#888680] text-lg mb-8">
              Thank you for subscribing to our newsletter. You'll receive the latest career insights and education tips directly in your inbox.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] font-semibold rounded-full px-6"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#1a1c1b] py-16 md:py-24">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block text-[#888680] text-sm font-medium uppercase tracking-wider mb-4">
                Free Newsletter
              </span>
              <h1 className="font-black text-3xl md:text-4xl lg:text-5xl text-[#d9fb06] uppercase leading-tight mb-6">
                Stay Ahead in Your Career
              </h1>
              <p className="text-[#dfddd6] text-lg leading-relaxed mb-8">
                Join thousands of professionals who receive our weekly insights on career development, education trends, and job market analysis.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#d9fb06] mt-0.5 flex-shrink-0" />
                  <span className="text-[#dfddd6]">Weekly career tips and industry insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#d9fb06] mt-0.5 flex-shrink-0" />
                  <span className="text-[#dfddd6]">Latest job market trends and salary data</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#d9fb06] mt-0.5 flex-shrink-0" />
                  <span className="text-[#dfddd6]">Exclusive guides and resources</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#d9fb06] mt-0.5 flex-shrink-0" />
                  <span className="text-[#dfddd6]">No spam, unsubscribe anytime</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-[#302f2c] rounded-xl p-6 md:p-8 border border-[rgba(63,72,22,0.5)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#3f4816] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#d9fb06]" />
                </div>
                <div>
                  <h2 className="text-[#d9fb06] font-bold text-lg">Subscribe Now</h2>
                  <p className="text-[#888680] text-sm">It's free forever</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#888680] text-sm mb-2">
                    Name (optional)
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1a1c1b] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#888680] text-sm mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#1a1c1b] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06]"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] font-semibold rounded-full py-5 text-base disabled:opacity-50"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                </Button>
              </form>

              <p className="text-[#888680] text-xs text-center mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="bg-[#302f2c] py-6">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="border border-dashed border-[#3f4816] rounded-lg py-8 text-center">
            <span className="text-[#888680] text-sm">Advertisement Space</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsletterPage;
