'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock, Target, Zap, Cloud, Globe, Bot, Workflow, Building, Lightbulb, Star, Users } from 'lucide-react'

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const technologies = [
    {
      name: 'Available 24/7',
      description: 'Round-the-clock chatbot availability',
      icon: Clock,
      color: 'bg-brand-teal'
    },
    {
      name: '95% Accuracy',
      description: 'High precision in Arabic language processing',
      icon: Target,
      color: 'bg-brand-orange'
    },
    {
      name: 'Fast Response',
      description: 'Sub-second response times',
      icon: Zap,
      color: 'bg-blue-500'
    },
    {
      name: '99.9% Uptime',
      description: 'Reliable cloud infrastructure',
      icon: Cloud,
      color: 'bg-yellow-500'
    }
  ]

  const timeline = [
    {
      year: '2025',
      title: 'Foundation',
      titleAr: 'التأسيس',
      description: 'Mogeeb.ai was founded with a vision to create smart chatbots for different purposes',
      milestone: 'Startup Launch'
    },
    {
      year: '2025',
      title: 'LLM Integration',
      titleAr: 'دمج نماذج اللغة الكبيرة',
      description: 'Building intelligent chatbots using advanced Large Language Models',
      milestone: 'Technology Development'
    },
    {
      year: '2025',
      title: 'MENA Focus',
      titleAr: 'التركيز على منطقة الشرق الأوسط',
      description: 'Developing solutions specifically for MENA market needs',
      milestone: 'Market Strategy'
    },
    {
      year: '2025',
      title: 'SME Solutions',
      titleAr: 'حلول الشركات الصغيرة والمتوسطة',
      description: 'Creating cost-effective chatbot solutions for SMEs and social media',
      milestone: 'Product Development'
    }
  ]

  const values = [
    {
      title: 'Google Cloud',
      titleAr: 'جوجل كلاود',
      description: 'Cloud infrastructure partner',
      icon: Globe,
      color: 'bg-blue-500'
    },
    {
      title: 'Gemini AI',
      titleAr: 'ذكاء جيميني',
      description: 'AI technology integration',
      icon: Bot,
      color: 'bg-brand-orange'
    },
    {
      title: 'n8n Platform',
      titleAr: 'منصة أتمتة',
      description: 'Workflow automation tools',
      icon: Workflow,
      color: 'bg-green-500'
    },
    {
      title: 'MENA SMEs',
      titleAr: 'الشركات الصغيرة',
      description: 'Regional business network',
      icon: Building,
      color: 'bg-brand-teal'
    }
  ]

  return (
    <section id="stats" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our{' '}
            <span className="text-brand-orange">
              Performance
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Technical specifications that demonstrate our commitment to reliable and efficient chatbot solutions.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brand-teal rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              To democratize access to advanced Arabic AI technology, enabling small and medium 
              enterprises across the MENA region to leverage the power of artificial intelligence 
              for growth and innovation.
            </p>
            <p className="text-teal font-medium">
              مهمتنا هي جعل تكنولوجيا الذكاء الاصطناعي العربية المتقدمة في متناول الجميع
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              To become the leading Arabic AI platform globally, setting the standard for 
              natural language processing in Arabic and fostering innovation across all 
              industries in the region.
            </p>
            <p className="text-orange font-medium">
              رؤيتنا أن نصبح المنصة الرائدة عالمياً للذكاء الاصطناعي باللغة العربية
            </p>
          </motion.div>
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Technology Stack
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className={`w-12 h-12 ${tech.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                  <tech.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{tech.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-teal font-medium text-sm mb-3">{value.titleAr}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-brand-orange"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl font-bold text-teal mr-3">{item.year}</span>
                        <span className="text-sm text-orange font-medium">{item.milestone}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-teal font-medium text-sm mb-3">{item.titleAr}</p>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-orange rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}