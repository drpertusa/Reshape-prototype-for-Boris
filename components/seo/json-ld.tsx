interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, process.env.NODE_ENV === 'development' ? 2 : 0)
      }}
    />
  )
}