'use client'

import { motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navItems = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'المميزات', href: '#features' },
    { name: 'جرب مُجيب', href: '#demo' },
    { name: 'الأسعار', href: '#pricing' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    const handleClickOutside = () => {
      setDropdownOpen(false)
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <motion.nav 
        className="w-full max-w-4xl mx-4 mt-4 md:mt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
      <div className={`transition-all duration-300 rounded-2xl md:rounded-full relative overflow-hidden ${
        scrolled 
          ? 'bg-brand-orange/95 backdrop-blur-xl shadow-2xl border border-orange-300/30' 
          : 'bg-brand-orange/85 backdrop-blur-2xl shadow-xl border border-orange-300/20'
      }`}>
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        <div className="px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center justify-center cursor-pointer flex-shrink-0 gap-3"
              onClick={() => scrollToSection('#home')}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-white flex-shrink-0">
                <Image 
                  src="/logo.svg"
                  alt="Mogeeb.ai Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 md:w-6 md:h-6 object-contain"
                />
              </div>
              <span className="text-white font-bold text-base md:text-lg english-text leading-none self-center" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>mogeeb.ai</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white hover:text-orange-100 px-3 py-2 text-sm font-medium transition-all duration-200 relative group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </motion.button>
              ))}
            </div>

            {/* Language & CTA Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Selector */}
              {/* <div className="flex items-center text-white/90 hover:text-white transition-colors cursor-pointer">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium" 
                style={{ fontFamily: 'Inter, system-ui, sans-serif', margin: '1rem' }}
                >English</span>
              </div> */}
              
              {/* CTA Button */}
              <motion.button 
                onClick={() => scrollToSection('#demo')}
                className="bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                style={{ margin: '1.2rem' }}
              >
                جرب مُجيب
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-orange-100 p-2 rounded-xl transition-colors touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - Outside the main navbar */}
      {isOpen && (
        <motion.div 
          className="md:hidden fixed top-16 md:top-20 left-2 right-2 z-40"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-brand-orange/96 backdrop-blur-xl rounded-3xl border border-orange-300/30 shadow-2xl overflow-hidden">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-brand-orange hover:text-orange-300 block px-6 py-4 text-lg font-medium transition-all duration-200 w-full text-center rounded-2xl hover:bg-white/10 touch-target"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  style={{ fontFamily: 'Cairo, system-ui, sans-serif', minHeight: '52px' }}
                >
                  {item.name}
                </motion.button>
              ))}
              
              <div className="border-t border-white/20 pt-4 mt-4">
                <motion.button 
                  onClick={() => scrollToSection('#demo')}
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold px-6 py-4 rounded-2xl w-full transition-all duration-300 shadow-lg touch-target"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: 'Cairo, system-ui, sans-serif', minHeight: '52px' }}
                >
                  جرب مُجيب
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
    </div>
  )
}