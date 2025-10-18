'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown } from 'lucide-react'

const plans = [
  {
    name: 'الكافيه الصغير',
    price: '299',
    period: ' جنيه/شهر',
    description: 'مثالي للكافيهات والمحلات الصغيرة اللي بدايتها مع مُجيب',
    features: [
      'البوت بيرد على الرسايل',
      'ياخد أوردرات بسيطة',
      'لحد 500 رسالة في الشهر',
      'منيو لحد 20 صنف',
      'تقارير أساسية',
      'شغال على الواتساب والتليجرام'
    ],
    popular: false,
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'المطعم المتوسط',
    price: '799',
    period: ' جنيه/شهر',
    description: 'الحل الأمثل للمطاعم المتوسطة اللي عايزة تشتغل بشكل احترافي',
    features: [
      'كل حاجة في الباقة الصغيرة',
      'فهم متقدم للهجة المصرية',
      'لحد 2000 رسالة في الشهر',
      'منيو لحد 50 صنف',
      'تقارير مفصلة عن المبيعات',
      'ربط مع أنظمة التوصيل',
      'دعم فني سريع',
      'تحليلات أوقات الذروة'
    ],
    popular: true,
    icon: Star,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    name: 'سلسلة الفروع',
    price: 'حسب المطلوب',
    period: '',
    description: 'حلول مخصصة لسلاسل المطاعم والشركات الكبيرة',
    features: [
      'كل حاجة في الباقة المتوسطة',
      'رسايل مفتوحة',
      'بوت مخصوص لكل فرع',
      'مدير حساب مخصوص',
      'دعم فني 24/7',
      'ربط مع أنظمة المحاسبة',
      'حماية متقدمة للبيانات',
      'ربط مع التطبيقات الخاصة',
      'ضمان جودة الخدمة'
    ],
    popular: false,
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500'
  }
]

export default function PricingSection() {
  return (
    <section id="pricing" className="section-large-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
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
            اختار الباقة{' '}
            <span className="gradient-text">اللي تناسبك</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            مفيش التزام طويل المدى. ابدأ بالباقة اللي تناسب حجم شغلك دلوقتي، وتقدر تغيرها في أي وقت لما شغلك يكبر.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.popular 
                    ? 'border-brand-orange scale-105 lg:scale-110' 
                    : 'border-gray-200 hover:border-brand-teal'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="gradient-bg px-6 py-2 rounded-full text-white font-semibold text-sm shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-xl text-gray-500 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'gradient-bg text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-brand-teal hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="text-center pt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            All plans include our industry-leading Arabic AI technology and dedicated support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Feature Comparison
            </motion.button>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}