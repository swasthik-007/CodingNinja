'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CandidateInfo {
  name: string;
  email: string;
}

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: string;
  order: number;
}

interface Evaluation {
  score: number;
  feedback: string;
}

interface Progress {
  current: number;
  total: number;
}

interface InterviewChatProps {
  candidateInfo: CandidateInfo;
}

export function InterviewChat({ candidateInfo }: InterviewChatProps) {
  const [interviewId, setInterviewId] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState<Progress>({ current: 0, total: 5 });
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [messages, setMessages] = useState<Array<{
    type: 'ai' | 'user';
    content: string;
    timestamp: Date;
  }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    startInterview();
  }, []);

  const startInterview = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidateInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to start interview');
      }

      const data = await response.json();
      setInterviewId(data.interviewId);
      setCurrentQuestion(data.question);
      
      setMessages([{
        type: 'ai',
        content: data.message,
        timestamp: new Date(),
      }]);

      setProgress({ current: 1, total: 5 });
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim() || !currentQuestion) return;

    setIsLoading(true);
    
    // Add user message
    const userMessage = {
      type: 'user' as const,
      content: answer,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/interview/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewId,
          questionId: currentQuestion.id,
          answerText: answer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      const data = await response.json();
      setEvaluation(data.evaluation);

      // Add AI feedback
      const feedbackMessage = {
        type: 'ai' as const,
        content: `**Feedback:** ${data.evaluation.feedback}\n\n**Score:** ${data.evaluation.score}/10`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, feedbackMessage]);

      if (data.isComplete) {
        setIsComplete(true);
        const completionMessage = {
          type: 'ai' as const,
          content: data.message,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, completionMessage]);
      } else {
        setCurrentQuestion(data.nextQuestion);
        setProgress(data.progress);
        
        const nextQuestionMessage = {
          type: 'ai' as const,
          content: `**Question ${data.progress.current}:** ${data.nextQuestion.text}`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, nextQuestionMessage]);
      }

      setAnswer('');
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold">
            {line.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{line}</span>;
    });
  };

  if (isLoading && !currentQuestion) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
          >
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Preparing your interview...
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600"
          >
            🤖 Our AI interviewer is getting ready for you
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-8 mx-auto w-48 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {progress.current} of {progress.total}
          </span>
          <span className="text-sm text-gray-500">
            {candidateInfo.name}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(progress.current / progress.total) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Chat Messages */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6 overflow-hidden"
      >
        <div className="p-6 max-h-96 overflow-y-auto space-y-4 scroll-smooth">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-orange-600 to-red-700 text-white'
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {formatMessage(message.content)}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-orange-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Current Question Display */}
        {currentQuestion && !isComplete && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="border-t border-gray-200 p-6 bg-gradient-to-r from-orange-50 to-red-50"
          >
            <div className="flex items-start space-x-3">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-medium">AI</span>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex-grow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Question {currentQuestion.order}
                </h3>
                <p className="text-gray-700 leading-relaxed">{currentQuestion.text}</p>
                <div className="mt-3 flex space-x-4 text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {currentQuestion.category.replace('_', ' ')}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {currentQuestion.difficulty}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Answer Input */}
        {!isComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t border-gray-200 p-6 bg-gray-50"
          >
            <div className="space-y-4">
              <motion.textarea
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200 bg-white shadow-sm"
                rows={4}
                disabled={isLoading}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  💡 Take your time and be as detailed as possible
                </span>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitAnswer}
                  disabled={!answer.trim() || isLoading}
                  className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    !answer.trim() || isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Answer'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Completion Actions */}
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="border-t border-gray-200 p-6 text-center bg-gradient-to-r from-green-50 to-blue-50"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🎉 Interview Complete!
              </h3>
              <div className="space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href={`/interview/${interviewId}/report`}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    📊 View Detailed Report
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href="/interview"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    🔄 Take Another Interview
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Help Text */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
          <p className="text-sm text-orange-700">
            💡 <strong>Tip:</strong> This is an AI-powered mock interview. Answer questions as you would in a real interview setting.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
