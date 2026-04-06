import type { QuizQuestion as QuizQuestionType } from '@/types'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface QuizQuestionProps {
  question: QuizQuestionType
  selectedAnswer: string | null
  onAnswer: (answerId: string) => void
  onNext: () => void
  onBack: () => void
  canProceed: boolean
  isFirst: boolean
  isLast: boolean
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onBack,
  canProceed,
  isFirst,
  isLast,
}: QuizQuestionProps) {
  return (
    <div>
      {/* Question */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{question.question}</h2>
        {question.helpText && (
          <p className="text-neutral-500 text-sm leading-relaxed">{question.helpText}</p>
        )}
      </div>

      {/* Answer options */}
      <div className="space-y-3 mb-8">
        {question.answers.map((answer) => {
          const isSelected = selectedAnswer === answer.id
          return (
            <button
              key={answer.id}
              onClick={() => {
                onAnswer(answer.id)
              }}
              className={cn(
                'w-full text-left rounded-2xl border-2 p-4 transition-all duration-150 group',
                isSelected
                  ? 'border-brand-500 bg-brand-50 shadow-sm'
                  : 'border-neutral-200 bg-white hover:border-brand-300 hover:bg-neutral-50'
              )}
              aria-pressed={isSelected}
            >
              <div className="flex items-start gap-3">
                {/* Selection indicator */}
                <div
                  className={cn(
                    'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                    isSelected
                      ? 'border-brand-500 bg-brand-500'
                      : 'border-neutral-300 group-hover:border-brand-300'
                  )}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {answer.icon && (
                      <span className="text-lg" aria-hidden="true">{answer.icon}</span>
                    )}
                    <span
                      className={cn(
                        'font-medium text-sm',
                        isSelected ? 'text-brand-700' : 'text-neutral-800'
                      )}
                    >
                      {answer.label}
                    </span>
                  </div>
                  {answer.helpText && (
                    <p className="text-xs text-neutral-500 mt-0.5 ml-7">{answer.helpText}</p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={isFirst}
          size="md"
        >
          ← Back
        </Button>

        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canProceed}
          size="md"
        >
          {isLast ? 'See my result →' : 'Next →'}
        </Button>
      </div>
    </div>
  )
}
