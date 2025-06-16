import { notFound } from 'next/navigation'

export default function CatchAll() {
  notFound() // Forces the nearest not-found.tsx to render
}