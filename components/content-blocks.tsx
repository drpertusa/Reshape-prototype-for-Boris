// AI-optimized content blocks for better parsing and featured snippets
import { cn } from "@/lib/utils"

interface DefinitionBlockProps {
  term: string
  definition: string
  className?: string
}

// Definition block - perfect for "What is X?" queries
export function DefinitionBlock({ term, definition, className }: DefinitionBlockProps) {
  return (
    <div className={cn("definition-block", className)}>
      <dl>
        <dt className="font-semibold text-lg mb-2">
          What is {term}?
        </dt>
        <dd className="text-muted-foreground leading-relaxed">
          <strong>{term}</strong> is {definition}
        </dd>
      </dl>
    </div>
  )
}

interface QuickAnswerProps {
  question: string
  answer: string
  className?: string
}

// Quick answer format - designed for voice assistants and AI summaries
export function QuickAnswer({ question, answer, className }: QuickAnswerProps) {
  return (
    <div className={cn("quick-answer bg-muted/30 p-6 rounded-lg", className)}>
      <h3 className="font-medium mb-3">{question}</h3>
      <p className="text-muted-foreground">
        <strong>Quick Answer:</strong> {answer}
      </p>
    </div>
  )
}

interface StepByStepProps {
  title: string
  steps: Array<{
    title: string
    description: string
    duration?: string
  }>
  className?: string
}

// Step-by-step guide - great for "How to" featured snippets
export function StepByStep({ title, steps, className }: StepByStepProps) {
  return (
    <div 
      className={cn("step-by-step", className)}
      itemScope 
      itemType="https://schema.org/HowTo"
    >
      <h3 className="text-2xl font-display mb-6" itemProp="name">{title}</h3>
      
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex gap-4"
            itemScope
            itemProp="step"
            itemType="https://schema.org/HowToStep"
          >
            <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
              {index + 1}
            </span>
            <div className="flex-grow">
              <h4 className="font-medium mb-1" itemProp="name">
                {step.title}
              </h4>
              <p className="text-muted-foreground" itemProp="text">
                {step.description}
              </p>
              {step.duration && (
                <meta itemProp="performTime" content={`PT${step.duration}`} />
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

interface ComparisonTableProps {
  title: string
  items: Array<{
    feature: string
    optionA: string | boolean
    optionB: string | boolean
  }>
  optionALabel: string
  optionBLabel: string
  className?: string
}

// Comparison table - helps AI understand differences between options
export function ComparisonTable({ 
  title, 
  items, 
  optionALabel, 
  optionBLabel, 
  className 
}: ComparisonTableProps) {
  return (
    <div className={cn("comparison-table", className)}>
      <h3 className="text-2xl font-display mb-6">{title}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Feature</th>
              <th className="text-left py-3 px-4">{optionALabel}</th>
              <th className="text-left py-3 px-4">{optionBLabel}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 font-medium">{item.feature}</td>
                <td className="py-3 px-4">
                  {typeof item.optionA === 'boolean' 
                    ? (item.optionA ? '✓' : '✗')
                    : item.optionA
                  }
                </td>
                <td className="py-3 px-4">
                  {typeof item.optionB === 'boolean' 
                    ? (item.optionB ? '✓' : '✗')
                    : item.optionB
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface KeyPointsProps {
  title?: string
  points: string[]
  className?: string
}

// Key points list - perfect for AI to extract main ideas
export function KeyPoints({ title = "Key Takeaways", points, className }: KeyPointsProps) {
  return (
    <div className={cn("key-points bg-primary/5 p-6 rounded-lg", className)}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface ExpertQuoteProps {
  quote: string
  author: string
  title?: string
  credentials?: string
  className?: string
}

// Expert quote - builds E-E-A-T signals
export function ExpertQuote({ quote, author, title, credentials, className }: ExpertQuoteProps) {
  return (
    <blockquote 
      className={cn("expert-quote border-l-4 border-primary pl-6 py-4 my-8", className)}
      itemScope 
      itemType="https://schema.org/Quotation"
    >
      <p className="text-lg italic mb-4" itemProp="text">
        &ldquo;{quote}&rdquo;
      </p>
      <footer>
        <cite itemProp="author" itemScope itemType="https://schema.org/Person">
          <span className="font-semibold" itemProp="name">{author}</span>
          {title && (
            <span className="text-muted-foreground">
              , <span itemProp="jobTitle">{title}</span>
            </span>
          )}
          {credentials && (
            <span className="text-muted-foreground">
              {' '}({credentials})
            </span>
          )}
        </cite>
      </footer>
    </blockquote>
  )
}