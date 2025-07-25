'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, getScoreColor, getScoreBackground } from '@/lib/utils';

interface ReportData {
  interview: {
    id: string;
    candidateName: string;
    candidateEmail: string;
    startedAt: string;
    completedAt: string;
    totalScore: number;
  };
  performance: {
    overallScore: number;
    categoryScores: Record<string, number>;
    questionsAnswered: number;
    totalQuestions: number;
  };
  feedback: {
    overallFeedback: string;
    strengths: string[];
    areasForImprovement: string[];
    recommendations: string[];
  };
  questions: Array<{
    id: string;
    question: string;
    category: string;
    difficulty: string;
    answer: {
      text: string;
      score: number;
      feedback: string;
    } | null;
  }>;
}

export default function ReportPage({ params }: { params: { id: string } }) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await fetch(`/api/interview/${params.id}/report`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }

      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError('Failed to load interview report');
      console.error('Error fetching report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getPerformanceLevel = (score: number): string => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Needs Improvement';
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-pulse-slow">
            <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Generating your report...
          </h2>
          <p className="text-gray-600 mt-2">
            Please wait while we analyze your performance
          </p>
        </div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.802-.833-2.572 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Report Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'The interview report could not be loaded.'}
          </p>
          <Link href="/interview" className="btn-primary">
            Start New Interview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Excel Interview Report
        </h1>
        <p className="text-gray-600 mt-2">
          Detailed analysis of your Excel skills assessment
        </p>
      </div>

      {/* Overview Card */}
      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <div className={`card ${getScoreBackground(reportData.performance.overallScore)}`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {reportData.performance.overallScore}/10
            </div>
            <div className={`text-lg font-medium ${getScoreColor(reportData.performance.overallScore)}`}>
              {getPerformanceLevel(reportData.performance.overallScore)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Overall Score
            </div>
          </div>
        </div>

        <div className="card">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {reportData.performance.questionsAnswered}/{reportData.performance.totalQuestions}
            </div>
            <div className="text-lg font-medium text-gray-700">
              Completed
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Questions Answered
            </div>
          </div>
        </div>

        <div className="card">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900 mb-2">
              {reportData.interview.candidateName}
            </div>
            <div className="text-sm text-gray-600">
              {formatDate(new Date(reportData.interview.completedAt))}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Interview Completed
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Performance by Category
        </h2>
        <div className="space-y-4">
          {Object.entries(reportData.performance.categoryScores).map(([category, score]) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                    {score}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      score >= 8 ? 'bg-green-500' :
                      score >= 6 ? 'bg-yellow-500' :
                      score >= 4 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Sections */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* Strengths */}
        <div className="card">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Strengths
          </h3>
          <ul className="space-y-2">
            {reportData.feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="card">
          <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {reportData.feedback.areasForImprovement.map((area, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Recommendations
        </h3>
        <ul className="space-y-3">
          {reportData.feedback.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Overall Feedback */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Overall Assessment
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {reportData.feedback.overallFeedback}
        </p>
      </div>

      {/* Question Details */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Question-by-Question Analysis
        </h3>
        <div className="space-y-6">
          {reportData.questions.map((q, index) => (
            <div key={q.id} className="border-l-4 border-gray-200 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">
                  Question {index + 1}
                </h4>
                {q.answer && (
                  <span className={`text-sm font-medium ${getScoreColor(q.answer.score)}`}>
                    {q.answer.score}/10
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-2">{q.question}</p>
              <div className="text-sm text-gray-500 mb-3">
                {q.category.replace(/_/g, ' ')} • {q.difficulty}
              </div>
              {q.answer && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="mb-2">
                    <strong className="text-sm text-gray-700">Your Answer:</strong>
                    <p className="text-gray-600 mt-1">{q.answer.text}</p>
                  </div>
                  <div>
                    <strong className="text-sm text-gray-700">Feedback:</strong>
                    <p className="text-gray-600 mt-1">{q.answer.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="text-center">
        <Link href="/interview" className="btn-primary mr-4">
          Take Another Interview
        </Link>
        <button
          onClick={() => window.print()}
          className="btn-secondary"
        >
          Print Report
        </button>
      </div>
    </div>
  );
}
