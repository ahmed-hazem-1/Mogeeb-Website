'use client'

import { motion } from 'framer-motion'
import { Bot, MessageSquare, Zap, Globe, Shield, Cpu, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const features = [
  {
    icon: Bot,
    title: 'أوردرات من غير أخطاء',
    description: 'البوت مش بينسى ومبيتلغبطش. الأوردر بيتسجل بدقة في قاعدة بيانات منظمة، وبيوصلك مظبوط مع كل التفاصيل (الاسم، العنوان، رقم التليفون، والطلب).',
    color: 'bg-blue-500'
  },
  {
    icon: MessageSquare,
    title: 'بيفهم المصري زي ما هو',
    description: 'العميل هيطلب باللغة العامية والطبيعية كأنه بيكلم بني آدم، والبوت هيفهمه ويسجل الأوردر. "عايز كيلو كفتة وشوية رز" - هيفهمها كده!',
    color: 'bg-emerald-500'
  },
  {
    icon: Zap,
    title: 'تقارير تعرفك شغلك',
    description: 'لأول مرة، هتعرف بيانات شغلك الحقيقية. إيه أكتر صنف مطلوب؟ إيه أوقات الذروة عندك؟ مين أهم عملائك؟ كل ده في تقارير واضحة.',
    color: 'bg-orange-500'
  },
  {
    icon: Globe,
    title: 'موظفين مركزين في شغلهم',
    description: 'حرر الموظفين من الرد على الرسايل والمكالمات المتكررة عشان يركزوا في خدمة العملاء الموجودين في المكان وتحسين جودة الطعام.',
    color: 'bg-purple-500'
  },
  {
    icon: Shield,
    title: 'شغال حتى في وقت الذروة',
    description: 'مهما كان الضغط كتير، البوت مش بيتعب ومش بيغلط. هيفضل ياخد أوردرات ويرد على الاستفسارات حتى لو كان عندك 50 عميل في نفس الوقت.',
    color: 'bg-indigo-500'
  },
  {
    icon: Cpu,
    title: 'مش محتاج خبرة تقنية',
    description: 'مفيش تعقيد ولا برمجة. البوت بيتركب في دقايق، وتقدر تعدل في المنيو أو الأسعار بسهولة من غير ما تحتاج مطور أو خبير تقني.',
    color: 'bg-green-500'
  }
]

export default function FeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  
  // Show different number of features per slide based on screen size
  // We'll show all features in one slide for simplicity, but make it scrollable
  const totalSlides = features.length

  // Auto-scroll functionality (right to left)
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides)
  }

  // Touch/drag functionality
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    
    const endX = e.changedTouches[0].clientX
    const diff = startX - endX
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide() // Swipe left = next slide
      } else {
        prevSlide() // Swipe right = previous slide
      }
    }
    
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }
  return (
    <section id="features" className="section-large-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            ليه تختار{' '}
            <span className="gradient-text">مُجيب</span>؟
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto arabic-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '2.4', marginBottom: '2rem' }}
          >
            مُجيب مش مجرد بوت عادي. ده مساعدك الذكي اللي هيوفر عليك ضغط الشغل اليدوي والوقت اللي بيضيع في الرد على رسايل متكررة، ويديك بيانات حقيقية عن شغلك لأول مرة.
          </motion.p>
        </motion.div>

        {/* Features Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="overflow-hidden rounded-2xl w-full"
            style={{ height: '650px', minHeight: '650px', width: '100%' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex h-full"
              style={{
                transform: `translateX(${currentIndex * 100}%)`,
                transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
                width: `100%`,
                height: '100%'
              }}
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 px-4 py-4 h-full"
                    style={{ 
                      width: '100%',
                      minWidth: '100%',
                      display: 'flex',
                      alignItems: 'stretch'
                    }}
                  >
                    <div
                      className="group bg-white rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center border border-gray-100"
                      style={{ 
                        backgroundColor: '#ffffff',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Icon */}
                      <div 
                        className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {IconComponent ? (
                          <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-white" />
                        ) : (
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 group-hover:text-brand-orange transition-colors duration-300 arabic-text" style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '1.6', color: '#1f2937' }}>
                          {feature.title || 'Feature Title'}
                        </h3>
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 arabic-text leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '2.0', color: '#4b5563' }}>
                          {feature.description || 'Feature description goes here'}
                        </p>
                      </div>

                      {/* Hover Effect */}
                      <div 
                        className="mt-8 flex items-center justify-center text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <span className="font-semibold mr-2 text-lg">Learn More</span>
                        <svg 
                          className="w-6 h-6" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2 flex-wrap">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 mb-2 ${
                  index === currentIndex
                    ? 'bg-brand-orange w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-teal to-brand-orange"
              initial={{ width: '0%' }}
              animate={{ 
                width: isAutoPlaying ? '100%' : `${((currentIndex + 1) / totalSlides) * 100}%`
              }}
              transition={{ 
                duration: isAutoPlaying ? 4 : 0.3,
                ease: isAutoPlaying ? 'linear' : 'easeOut'
              }}
              key={currentIndex}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center pt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to transform your business with Arabic AI? Join hundreds of thousands of users.
          </p>
          <motion.button 
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your AI Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}