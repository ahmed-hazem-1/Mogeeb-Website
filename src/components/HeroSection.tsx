'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Play, CheckCircle, Cloud, Brain, Workflow, Globe, Cpu } from 'lucide-react'

export default function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen bg-white flex items-center section-large-padding pt-24 md:pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center space-y-6 md:space-y-8">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-brand-orange/10 rounded-full border border-brand-orange/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-brand-orange mr-2 md:mr-3" />
            <span className="text-brand-orange font-semibold text-xs md:text-sm">خصيصاً للمطاعم والكافيهات المصرية</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 arabic-text leading-tight" style={{ fontFamily: 'Cairo, Tajawal, system-ui, sans-serif', lineHeight: '1.4' }}>
              مساعدك الذكي{' '}
              <span className="block mt-2">
                <span className="gradient-text">وصل أخيراً</span>
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mt-4 leading-relaxed">
                حوّل رسايل العملاء لأوردرات.. أوتوماتيك
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto arabic-text px-4" style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '2.2' }}>
              ماتشيلش هم الأوردرات تاني. <span className="text-brand-orange font-semibold">"مُجيب"</span> هيرد على العملاء ويسجل الأوردرات بدالك، 
              حتى لو كانوا بيتكلموا باللهجة المصرية العادية.
              <br /><br />
              <span className="text-brand-teal font-semibold">ركز في خدمة زباينك اللي في المحل، وسيب مُجيب يهتم بأوردرات التليجرام والواتساب.</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button 
              onClick={scrollToDemo}
              className="btn-primary btn-arabic text-base md:text-lg px-6 md:px-8 py-3 md:py-4 group w-full sm:w-auto min-h-[52px] touch-target"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
            >
              <Play className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3" />
              جرب مُجيب دلوقتي
              <ArrowRight className="w-5 md:w-6 h-5 md:h-6 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              className="btn-outline btn-arabic text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto min-h-[52px] touch-target"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
            >
              اعرف إزاي يشتغل
            </motion.button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto pt-12 md:pt-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { number: '24/7', label: 'شغال طول الوقت' },
              { number: '0', label: 'أخطاء في الأوردرات' },
              { number: 'فوري', label: 'رد على العميل' },
              { number: '100%', label: 'بيفهم المصري' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center space-y-2 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-4xl font-bold gradient-text arabic-number" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>{stat.number}</div>
                <div className="text-gray-600 font-medium arabic-text text-sm md:text-base" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="pt-16 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p className="text-gray-500 font-medium">Technology partners powering our solutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                { name: 'Google Cloud', icon: Cloud },
                { name: 'Gemini AI', icon: Brain },
                { name: 'n8n Platform', icon: Workflow },
                { name: 'MENA SMEs', icon: Globe },
                { name: 'LLM Technology', icon: Cpu }
              ].map((partner, index) => {
                const IconComponent = partner.icon
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-gray-400 font-semibold text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 0.6, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{partner.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-40 right-20 w-24 h-24 bg-brand-teal/10 rounded-full blur-2xl"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-40 left-20 w-20 h-20 bg-brand-orange/10 rounded-full blur-xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}