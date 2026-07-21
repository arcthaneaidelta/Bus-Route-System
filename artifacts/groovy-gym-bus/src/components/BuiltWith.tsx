import React from 'react';
import { Database, Smartphone, CreditCard } from 'lucide-react';

export default function BuiltWith() {
  return (
    <section className="py-16 bg-bg-surface-alt border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        
        <h4 className="text-center text-sm font-medium text-text-secondary uppercase tracking-widest mb-10">
          The Stack Behind The Bus
        </h4>

        <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
          
          <div className="flex flex-col items-center pt-8 md:pt-0 md:px-6 first:pt-0">
            <div className="w-12 h-12 bg-bg-surface rounded-xl border border-border flex items-center justify-center mb-4 text-accent-primary shadow-sm">
              <Database size={24} />
            </div>
            <h5 className="font-medium text-text-primary mb-2">Airtable Core</h5>
            <p className="text-sm text-text-secondary">
              Relational core: student records, schedules, waivers, and capacity management.
            </p>
          </div>

          <div className="flex flex-col items-center pt-8 md:pt-0 md:px-6">
            <div className="w-12 h-12 bg-bg-surface rounded-xl border border-border flex items-center justify-center mb-4 text-accent-secondary shadow-sm">
              <Smartphone size={24} />
            </div>
            <h5 className="font-medium text-text-primary mb-2">Softr / Glide</h5>
            <p className="text-sm text-text-secondary">
              Parent-facing app, staff roster — robust interfaces with no app store downloads required.
            </p>
          </div>

          <div className="flex flex-col items-center pt-8 md:pt-0 md:px-6">
            <div className="w-12 h-12 bg-bg-surface rounded-xl border border-border flex items-center justify-center mb-4 text-accent-tertiary shadow-sm">
              <CreditCard size={24} />
            </div>
            <h5 className="font-medium text-text-primary mb-2">Helcim / Stripe</h5>
            <p className="text-sm text-text-secondary">
              Seamless Canadian Interac, Apple/Google Pay, and tap-to-pay integration on the road.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
