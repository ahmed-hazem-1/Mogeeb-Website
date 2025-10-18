'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'إيه اللي يخلي مُجيب مختلف عن أي بوت تاني؟',
    answer: 'مُجيب مخصوص للمطاعم والكافيهات المصرية. مش زي البوتات العادية اللي بتقول جمل جاهزة، مُجيب بيفهم اللهجة المصرية الحقيقية ويقدر ياخد أوردرات معقدة. كمان بيديك تقارير عن شغلك وأكتر الأصناف مبيعاً.'
  },
  {
    question: 'مُجيب بيفهم المصري إزاي؟',
    answer: 'مُجيب متدرب على اللهجة المصرية الحقيقية. لو العميل قال "عايز كيلو كفتة وشوية رز" هيفهمها. لو قال "إيه أرخص حاجة عندكم؟" برضه هيرد صح. حتى لو كتب بأخطاء إملائية أو اختصارات، هيفهمه.'
  },
  {
    question: 'مُجيب هيشتغل مع الواتساب والتليجرام؟',
    answer: 'أكيد! مُجيب بيشتغل على الواتساب والتليجرام وحتى صفحة الفيسبوك. العميل يقدر يكلمك على أي منصة والبوت هيرد عليه فوراً ويسجل الأوردر في نفس المكان.'
  },
  {
    question: 'لو احتجت مساعدة، هتساعدوني إزاي؟',
    answer: 'إحنا معاك من البداية للنهاية. هنساعدك تركب البوت، نحط منيو مطعمك، ونعلمك إزاي تشوف التقارير. ولو حصلت أي مشكلة، تقدر تكلمنا على الواتساب أو التليفون وهنحلهالك فوراً.'
  },
  {
    question: 'بيانات مطعمي والعملاء آمنة؟',
    answer: 'طبعاً! بيانات مطعمك والعملاء محمية بأقوى وسائل الحماية. مفيش حد يقدر يشوف أوردراتك أو أرقام عملائك غيرك. وكل حاجة متشفرة ومحفوظة بطريقة آمنة تماماً.'
  },
  {
    question: 'محتاج وقت قد إيه عشان مُجيب يبدأ يشتغل؟',
    answer: 'في خلال ساعات قليلة بس! هنركب مُجيب، ندخل منيو مطعمك، ونخليه جاهز للشغل. مش محتاج تتعلم حاجات معقدة أو تركب برامج. بمجرد ما نخلص، العملاء يقدروا يطلبوا منك على طول.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-large-padding bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            أسئلة{' '}
            <span className="gradient-text">شائعة</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 arabic-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '2.2', marginBottom: '1.5rem' }}
          >
            أجوبة على أهم الأسئلة اللي بيسألها أصحاب المطاعم والكافيهات عن مُجيب
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-brand-orange" />
                  ) : (
                    <Plus className="w-6 h-6 text-brand-teal" />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <motion.p 
                        className="text-gray-600 leading-relaxed"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center pt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            لسه عندك سؤال تاني؟ كلمنا وهنرد عليك فوراً.
          </p>
          <motion.a
            href="https://wa.me/201275012177"
            target="_blank"
            rel="noopener noreferrer" 
            className="btn-primary text-lg px-8 py-4 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            كلمنا على الواتساب
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}