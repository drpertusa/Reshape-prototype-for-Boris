import { getTranslations } from './server'
import { translate } from './server'

interface TProps {
  id: string
  values?: Record<string, string | number>
}

// Server component for translations
export async function T({ id, values }: TProps) {
  const translations = await getTranslations()
  return <>{translate(translations, id, values)}</>
}