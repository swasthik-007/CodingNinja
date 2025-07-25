'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent sm:text-5xl md:text-6xl"
        >
          📊 Excel Mock Interviewer
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-8 md:text-xl md:max-w-3xl"
        >
          Practice your Excel skills with our AI-powered interviewer. Get instant feedback and improve your spreadsheet abilities.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div 
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">🎯 Structured Interview</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Experience a realistic Excel interview with progressive difficulty questions
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="w-16 h-16 mx-auto bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">🤖 AI Evaluation</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Get intelligent feedback on your answers with detailed explanations
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="w-16 h-16 mx-auto bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2V5zm0 0h5a2 2 0 012 2v6a2 2 0 01-2 2h-5V5z" />
              </svg>
            </motion.div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">📊 Detailed Report</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Receive comprehensive performance analysis and improvement recommendations
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="mt-16 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link 
            href="/interview" 
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            🚀 Start Mock Interview
            <motion.svg 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-3 w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="mt-20 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-10 border border-orange-100 shadow-lg"
      >
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="text-3xl font-bold text-gray-900 text-center mb-8"
        >
          🎓 What You&apos;ll Learn
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="flex items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">📋 Essential Excel Functions</h3>
              <p className="text-gray-600 mt-1">Master VLOOKUP, INDEX-MATCH, SUMIF, and more</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
            className="flex items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">📊 Data Analysis Techniques</h3>
              <p className="text-gray-600 mt-1">Learn pivot tables, charts, and data visualization</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            className="flex items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">🧩 Problem-Solving Skills</h3>
              <p className="text-gray-600 mt-1">Apply Excel knowledge to real business scenarios</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.8 }}
            className="flex items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">⭐ Best Practices</h3>
              <p className="text-gray-600 mt-1">Learn industry standards and efficient workflows</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
