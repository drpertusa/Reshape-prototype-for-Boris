interface TProps {
  id: string
  values?: Record<string, string | number>
  translations?: Record<string, string>
}

// Simple translation component that receives translations via props
export function T({ id, values, translations = {} }: TProps) {
  let text = translations[id] || id;
  
  if (values) {
    Object.entries(values).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  
  return <>{text}</>;
}