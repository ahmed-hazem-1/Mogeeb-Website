'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="section-large-padding bg-gradient-to-br from-brand-orange via-brand-orange to-brand-teal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative px-4">
        <div className="text-center text-white">
          {/* Main Content */}
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
            >
              خلاص قررت؟{' '}
              <span className="block mt-2">يلا نبدأ!</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto arabic-text px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '2.2' }}
            >
              كلمنا دلوقتي ونشوف إزاي مُجيب ممكن يخلي مطعمك أو كافيهك يشتغل بكفاءة أكتر ومن غير صداع الأوردرات والرسايل.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a 
              href="https://wa.me/201275012177"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-brand-orange hover:bg-gray-100 font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center group w-full sm:w-auto min-h-[52px] touch-target"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
            >
              <MessageCircle className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3" />
              كلمنا على الواتساب
              <ArrowRight className="w-5 md:w-6 h-5 md:h-6 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white hover:bg-white hover:text-brand-orange font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg transition-all duration-300 transform hover:scale-105 flex items-center group w-full sm:w-auto min-h-[52px] touch-target"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
            >
              <Phone className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3" />
              جرب مُجيب دلوقتي
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { number: '50+', label: 'مطعم بيستخدم مُجيب' },
              { number: '0', label: 'أخطاء في الأوردرات' },
              { number: '70%', label: 'توفير في الوقت' },
              { number: '24/7', label: 'شغال طول الوقت' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2 arabic-number" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>{stat.number}</div>
                <div className="text-white/80 font-medium text-sm md:text-base arabic-text" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  )
}