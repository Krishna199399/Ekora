'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type OpenSource = 'click' | 'exit_intent' | 'scroll_trigger' | string;

interface ConsultationModalContextType {
  isOpen: boolean;
  triggerSource: OpenSource | null;
  openModal: (source?: OpenSource) => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerSource, setTriggerSource] = useState<OpenSource | null>(null);

  const openModal = (source: OpenSource = 'click') => {
    // Check local storage for 7-day cooldown (only if it's an auto-trigger like scroll or exit intent)
    if (source === 'exit_intent' || source === 'scroll_trigger') {
      const dismissedAt = localStorage.getItem('egc-consultation-modal-dismissed');
      if (dismissedAt) {
        const dismissedTime = parseInt(dismissedAt, 10);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - dismissedTime < sevenDays) {
          // Cooldown active, do not open automatically
          return;
        }
      }
    }

    setIsOpen(true);
    setTriggerSource(source);

    // Google Analytics Event Tracking
    if (typeof window !== 'undefined') {
      const gtag = (window as any).gtag;
      if (gtag) {
        gtag('event', 'open_consultation_modal', {
          event_category: 'engagement',
          event_label: source,
        });
      } else {
        console.log(`[GA Event - Simulated] open_consultation_modal | label: ${source}`);
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    // When closed, if it was opened by scroll or exit intent, or just closed in general, set 7-day cooldown
    localStorage.setItem('egc-consultation-modal-dismissed', Date.now().toString());

    if (typeof window !== 'undefined') {
      const gtag = (window as any).gtag;
      if (gtag) {
        gtag('event', 'close_consultation_modal', {
          event_category: 'engagement',
          event_label: triggerSource || 'unknown',
        });
      } else {
        console.log(`[GA Event - Simulated] close_consultation_modal | label: ${triggerSource || 'unknown'}`);
      }
    }
    setTriggerSource(null);
  };

  return (
    <ConsultationModalContext.Provider value={{ isOpen, triggerSource, openModal, closeModal }}>
      {children}
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const context = useContext(ConsultationModalContext);
  if (!context) {
    throw new Error('useConsultationModal must be used within a ConsultationModalProvider');
  }
  return context;
}
