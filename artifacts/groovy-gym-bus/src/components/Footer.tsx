import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Footer() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const onSubmit = (data: FormData) => {
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      reset();
      setTimeout(() => setFormState('idle'), 3000);
    }, 1200);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-bg-surface-alt dark:bg-[#11141b] pt-24 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 mb-16">
        
        {/* Brand */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div 
            className="font-display font-semibold text-2xl tracking-wide text-text-primary"
          >
            GROOVY GYM BUS
          </div>
          <p className="text-text-secondary max-w-sm">
            Moving gymnastics forward, one route at a time. Built for operators who never stop moving.
          </p>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-5 bg-bg-surface p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-medium text-lg mb-4 text-text-primary">Request a Demo</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input 
                {...register('name', { required: true })}
                placeholder="Name" 
                className="w-full bg-bg-base border border-border rounded-lg p-3 text-sm text-text-primary focus:outline-none focus:border-accent-primary"
                disabled={formState !== 'idle'}
              />
            </div>
            <div>
              <input 
                {...register('email', { required: true })}
                type="email"
                placeholder="Email Address" 
                className="w-full bg-bg-base border border-border rounded-lg p-3 text-sm text-text-primary focus:outline-none focus:border-accent-primary"
                disabled={formState !== 'idle'}
              />
            </div>
            <div>
              <textarea 
                {...register('message')}
                placeholder="How many buses do you run?" 
                rows={3}
                className="w-full bg-bg-base border border-border rounded-lg p-3 text-sm text-text-primary focus:outline-none focus:border-accent-primary resize-none"
                disabled={formState !== 'idle'}
              />
            </div>
            <button 
              type="submit"
              disabled={formState !== 'idle'}
              className="w-full bg-accent-primary text-white py-3 rounded-lg text-sm font-medium hover:bg-[#233d65] transition-colors flex justify-center items-center h-[46px]"
            >
              {formState === 'idle' && (
                <span className="flex items-center gap-2">Send Message <Send size={16} /></span>
              )}
              {formState === 'loading' && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {formState === 'success' && (
                <span className="flex items-center gap-2"><Check size={16} /> Message Sent</span>
              )}
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="md:col-span-3 flex flex-col gap-3 md:items-end">
          <h3 className="font-medium text-text-primary mb-2 hidden md:block">Navigation</h3>
          {['Fleet', 'Parents', 'Parties', 'Staff', 'Reporting'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(`#${item.toLowerCase()}`)}
              className="text-text-secondary hover:text-accent-primary transition-colors text-left md:text-right w-fit md:w-auto"
            >
              {item}
            </button>
          ))}
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border flex justify-center">
        <p className="text-xs text-text-secondary">
          © {new Date().getFullYear()} Groovy Gym Bus. All rights reserved. M Akram
        </p>
      </div>
    </footer>
  );
}
