import Image from "next/image"

import { cn } from "@/lib/utils"

interface AuthorBioProps {
  name: string
  title: string
  qualification?: string
  bio: string
  image?: string
  expertise?: string[]
  socialLinks?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  className?: string
}

// Author bio component with schema markup for E-E-A-T
export function AuthorBio({
  name,
  title,
  qualification,
  bio,
  image,
  expertise,
  socialLinks,
  className
}: AuthorBioProps) {
  const imageSrc = image || `/team/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`
  
  return (
    <div 
      className={cn("author-bio bg-muted/30 rounded-lg p-6", className)}
      itemScope 
      itemType="https://schema.org/Person"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-cover"
              itemProp="image"
            />
          </div>
        </div>
        
        {/* Author Details */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-1">
            <span itemProp="name">{name}</span>
            {qualification && (
              <span className="text-muted-foreground font-normal ml-2" itemProp="honorificSuffix">
                {qualification}
              </span>
            )}
          </h3>
          
          <p className="text-muted-foreground mb-3" itemProp="jobTitle">
            {title}
          </p>
          
          <div className="prose prose-sm max-w-none text-muted-foreground mb-4" itemProp="description">
            {bio}
          </div>
          
          {expertise && expertise.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">Areas of Expertise:</h4>
              <div className="flex flex-wrap gap-2">
                {expertise.map((area, index) => (
                  <span 
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    itemProp="knowsAbout"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {socialLinks && (
            <div className="flex gap-4">
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  itemProp="sameAs"
                >
                  LinkedIn
                </a>
              )}
              {socialLinks.twitter && (
                <a 
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  itemProp="sameAs"
                >
                  Twitter
                </a>
              )}
              {socialLinks.website && (
                <a 
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  itemProp="url"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Hidden schema data */}
      <meta itemProp="worksFor" content="Reshape Clinic" />
    </div>
  )
}

// Compact author byline for articles
interface AuthorBylineProps {
  name: string
  title?: string
  date?: string
  readTime?: string
  className?: string
}

export function AuthorByline({
  name,
  title,
  date,
  readTime,
  className
}: AuthorBylineProps) {
  return (
    <div className={cn("author-byline flex items-center gap-4 text-sm text-muted-foreground", className)}>
      <div itemScope itemType="https://schema.org/Person">
        <span className="font-medium" itemProp="name">{name}</span>
        {title && (
          <>
            <span className="mx-1">·</span>
            <span itemProp="jobTitle">{title}</span>
          </>
        )}
      </div>
      
      {date && (
        <>
          <span>·</span>
          <time dateTime={date} itemProp="datePublished">
            {new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </>
      )}
      
      {readTime && (
        <>
          <span>·</span>
          <span>{readTime} read</span>
        </>
      )}
    </div>
  )
}

// Medical disclaimer with author credentials
interface MedicalDisclaimerProps {
  authorName: string
  authorTitle: string
  authorQualification?: string
  className?: string
}

export function MedicalDisclaimer({
  authorName,
  authorTitle,
  authorQualification,
  className
}: MedicalDisclaimerProps) {
  return (
    <div className={cn("medical-disclaimer bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4", className)}>
      <p className="text-sm text-amber-900 dark:text-amber-100">
        <strong>Medical Disclaimer:</strong> This content is for informational purposes only and should not replace professional medical advice. 
        Always consult with a qualified healthcare provider for personalized medical guidance.
      </p>
      <p className="text-sm text-amber-800 dark:text-amber-200 mt-2">
        <strong>Reviewed by:</strong>{' '}
        <span itemScope itemType="https://schema.org/Person">
          <span itemProp="name">{authorName}</span>
          {authorQualification && <span itemProp="honorificSuffix">, {authorQualification}</span>}
          <span itemProp="jobTitle"> - {authorTitle}</span>
        </span>
      </p>
    </div>
  )
}