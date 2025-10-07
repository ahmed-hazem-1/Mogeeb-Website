'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function Custom404() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-teal to-brand-teal/80 text-white p-4">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl mb-8">
            We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link href="/" className="bg-white text-brand-teal hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button onClick={() => window.history.back()} className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>
      </div>
    </main>
  )
}