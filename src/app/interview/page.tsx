'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InterviewChat } from '@/components/InterviewChat';

export default function InterviewPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    email: '',
  });

  const handleStart = () => {
    setHasStarted(true);
  };

  if (hasStarted) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="interview-chat"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <InterviewChat candidateInfo={candidateInfo} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="interview-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold text-white text-center"
            >
              📊 Excel Mock Interview
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2 text-orange-100 text-center text-lg"
            >
              Welcome! Please provide your information to get started.
            </motion.p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={(e) => { e.preventDefault(); handleStart(); }} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  👤 Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={candidateInfo.name}
                  onChange={(e) => setCandidateInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={candidateInfo.email}
                  onChange={(e) => setCandidateInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email address"
                  required
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200"
              >
                <h3 className="text-lg font-semibold text-orange-900 mb-3 flex items-center">
                  🎯 What to Expect:
                </h3>
                <ul className="text-sm text-orange-800 space-y-2">
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>5 Excel-related questions of progressive difficulty</span>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Questions covering formulas, data analysis, and problem-solving</span>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Instant AI feedback on your responses</span>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Detailed performance report at the end</span>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>⏱️ Estimated time: 15-20 minutes</span>
                  </motion.li>
                </ul>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!candidateInfo.name.trim() || !candidateInfo.email.trim()}
                className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
                  !candidateInfo.name.trim() || !candidateInfo.email.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                🚀 Start Interview
              </motion.button>
            </form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="mt-8 text-center"
            >
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Tip:</strong> This is a practice interview. Take your time and answer to the best of your ability.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
