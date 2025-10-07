'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import ChatbotDemo from '@/components/ChatbotDemo'
// Use dynamic imports for larger components to improve performance
const PricingSection = dynamic(() => import('@/components/PricingSection'))
const FAQSection = dynamic(() => import('@/components/FAQSection'))
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ChatbotDemo />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}