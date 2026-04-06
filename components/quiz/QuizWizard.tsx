'use client'

import { useReducer, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { QuizState, QuizResult } from '@/types'
import { quizQuestions } from '@/lib/quiz/questions'
import { computeResult } from '@/lib/quiz/rules-engine'
import { useAnalytics } from '@/lib/analytics/events'
import { QuizQuestion } from './QuizQuestion'
import { QuizProgress } from './QuizProgress'
import { ResultsEngine } from './ResultsEngine'
import { ShortlistCapture } from './ShortlistCapture'

// ─── State machine ────────────────────────────────────────────────────────────

type QuizAction =
  | { type: 'ANSWER'; questionId: string; answerId: string }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'COMPLETE' }
  | { type: 'SHOW_CAPTURE' }
  | { type: 'RESTART' }

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answerId },
      }
    case 'NEXT': {
      const nextStep = state.currentStep + 1
      if (nextStep >= quizQuestions.length) {
        return { ...state, phase: 'results' }
      }
      return { ...state, currentStep: nextStep }
    }
    case 'BACK':
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
        phase: 'questions',
      }
    case 'COMPLETE':
      return { ...state, phase: 'results' }
    case 'SHOW_CAPTURE':
      return { ...state, phase: 'capture' }
    case 'RESTART':
      return { currentStep: 0, answers: {}, phase: 'questions' }
    default:
      return state
  }
}

const initialState: QuizState = {
  currentStep: 0,
  answers: {},
  phase: 'questions',
}

// ─── Component ────────────────────────────────────────────────────────────────

export function QuizWizard() {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const { track } = useAnalytics()
  const startTimeRef = useRef<number>(Date.now())
  const hasTrackedStart = useRef(false)

  useEffect(() => {
    if (!hasTrackedStart.current) {
      track('quiz_start', { entry_point: window.location.pathname })
      hasTrackedStart.current = true
      startTimeRef.current = Date.now()
    }
  }, [track])

  const currentQuestion = quizQuestions[state.currentStep]
  const selectedAnswer = state.answers[currentQuestion?.id] as string | undefined

  const canProceed = !!selectedAnswer

  function handleAnswer(answerId: string) {
    if (!currentQuestion) return
    dispatch({ type: 'ANSWER', questionId: currentQuestion.id, answerId })
    track('quiz_step_complete', {
      step: state.currentStep + 1,
      question_id: currentQuestion.id,
      answer_id: answerId,
    })
  }

  function handleNext() {
    if (!canProceed) return
    const isLastQuestion = state.currentStep === quizQuestions.length - 1
    if (isLastQuestion) {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000)
      const result = computeResult(state.answers)
      track('quiz_complete', {
        result_type: result.primaryRecommendation,
        duration_seconds: durationSeconds,
      })
      track('quiz_result_view', {
        result_type: result.primaryRecommendation,
        primary_brand: result.recommendedBrandSlugs[0] ?? 'none',
      })
    }
    dispatch({ type: 'NEXT' })
  }

  function handleBack() {
    track('quiz_back_clicked', { from_step: state.currentStep + 1 })
    dispatch({ type: 'BACK' })
  }

  function handleRestart() {
    track('quiz_restart', {})
    dispatch({ type: 'RESTART' })
  }

  // Compute result when in results phase
  const result: QuizResult | null =
    state.phase === 'results' || state.phase === 'capture'
      ? computeResult(state.answers)
      : null

  // ─── Render ──────────────────────────────────────────────────────────────

  if (state.phase === 'capture' && result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <ShortlistCapture result={result} onRestart={handleRestart} />
      </div>
    )
  }

  if (state.phase === 'results' && result) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <ResultsEngine
          result={result}
          onStartOver={handleRestart}
          onEmailShortlist={() => dispatch({ type: 'SHOW_CAPTURE' })}
        />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <QuizProgress
        currentStep={state.currentStep}
        totalSteps={quizQuestions.length}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={state.currentStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {currentQuestion && (
            <QuizQuestion
              question={currentQuestion}
              selectedAnswer={selectedAnswer ?? null}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onBack={handleBack}
              canProceed={canProceed}
              isFirst={state.currentStep === 0}
              isLast={state.currentStep === quizQuestions.length - 1}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
