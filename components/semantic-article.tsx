import { cn } from "@/lib/utils"

import { AuthorByline } from "./author-bio"
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb"

interface SemanticArticleProps {
  children: React.ReactNode
  title: string
  description?: string
  author?: {
    name: string
    title?: string
  }
  publishDate?: string
  updateDate?: string
  readTime?: string
  breadcrumbs?: BreadcrumbItem[]
  className?: string
  type?: 'article' | 'service' | 'general'
}

// Semantic article wrapper for blog posts and content pages
export function SemanticArticle({
  children,
  title,
  description,
  author,
  publishDate,
  updateDate,
  readTime,
  breadcrumbs,
  className,
  type = 'general'
}: SemanticArticleProps) {
  const ArticleTag = type === 'article' ? 'article' : 'div'
  const schemaType = type === 'article' ? 'Article' : type === 'service' ? 'Service' : 'WebPageElement'
  
  return (
    <>
      {breadcrumbs && (
        <Breadcrumb items={breadcrumbs} className="mb-6" />
      )}
      
      <ArticleTag
        className={cn("semantic-article", className)}
        itemScope
        itemType={`https://schema.org/${schemaType}`}
      >
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4" itemProp="headline">
            {title}
          </h1>
          
          {description && (
            <p className="text-xl text-muted-foreground mb-4" itemProp="description">
              {description}
            </p>
          )}
          
          {author && (
            <AuthorByline
              name={author.name}
              title={author.title}
              date={publishDate}
              readTime={readTime}
              className="mb-4"
            />
          )}
          
          {publishDate && (
            <meta itemProp="datePublished" content={publishDate} />
          )}
          {updateDate && (
            <meta itemProp="dateModified" content={updateDate} />
          )}
        </header>
        
        <div className="prose prose-lg max-w-none" itemProp={type === 'article' ? 'articleBody' : 'text'}>
          {children}
        </div>
      </ArticleTag>
    </>
  )
}

interface SemanticSectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  id?: string
  as?: 'section' | 'aside' | 'div'
  className?: string
  ariaLabel?: string
}

// Semantic section wrapper with proper heading hierarchy
export function SemanticSection({
  children,
  title,
  subtitle,
  id,
  as: Tag = 'section',
  className,
  ariaLabel
}: SemanticSectionProps) {
  return (
    <Tag
      id={id}
      className={cn("semantic-section", className)}
      aria-label={ariaLabel || title}
    >
      {title && (
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </Tag>
  )
}

interface ServiceListProps {
  services: Array<{
    name: string
    description: string
    url?: string
    price?: string
    duration?: string
  }>
  className?: string
}

// Semantic service list with proper schema
export function ServiceList({ services, className }: ServiceListProps) {
  return (
    <div 
      className={cn("service-list grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}
      itemScope 
      itemType="https://schema.org/ItemList"
    >
      {services.map((service, index) => (
        <div
          key={index}
          className="service-item border rounded-lg p-6"
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/Service"
        >
          <h3 className="text-xl font-medium mb-2" itemProp="name">
            {service.name}
          </h3>
          <p className="text-muted-foreground mb-4" itemProp="description">
            {service.description}
          </p>
          
          <dl className="space-y-1 text-sm">
            {service.price && (
              <div className="flex justify-between">
                <dt className="font-semibold">Price:</dt>
                <dd itemProp="price">{service.price}</dd>
              </div>
            )}
            {service.duration && (
              <div className="flex justify-between">
                <dt className="font-semibold">Duration:</dt>
                <dd>{service.duration}</dd>
              </div>
            )}
          </dl>
          
          {service.url && (
            <a 
              href={service.url} 
              className="inline-block mt-4 text-primary hover:underline"
              itemProp="url"
            >
              Learn more →
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

// Semantic navigation list for footer or sidebar
interface NavListProps {
  title: string
  items: Array<{
    label: string
    href: string
  }>
  className?: string
}

export function NavList({ title, items, className }: NavListProps) {
  return (
    <nav 
      className={cn("nav-list", className)}
      aria-label={title}
    >
      <h3 className="font-bold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <a 
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}