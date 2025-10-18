'use client'

import { motion } from 'framer-motion'
import { Bot, MessageSquare, Zap, Globe, Shield, Cpu } from 'lucide-react'

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
  return (
    <section id="features" className="section-large-padding bg-gray-50">
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                className="group card-hover cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* Icon */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {IconComponent && <IconComponent className="w-8 h-8 text-white flex-shrink-0" />}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-brand-orange transition-colors duration-300 arabic-text" style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '1.8' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 arabic-text" style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '2.2' }}>
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <motion.div 
                  className="mt-6 flex items-center text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="font-semibold mr-2">Learn More</span>
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.div>
              </motion.div>
            )
          })}
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