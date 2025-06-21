"use client"

import { useEffect } from 'react'

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

// Network Information API type
interface NetworkInformation {
  effectiveType?: string;
}

interface WebVitalsData {
  name: string
  value: number
  delta: number
  id: string
  navigationType: string
  rating: 'good' | 'needs-improvement' | 'poor'
}

// Send analytics data to our endpoint
async function sendToAnalytics(metric: WebVitalsData) {
  const body = {
    metric: metric.name,
    value: metric.value,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    rating: metric.rating,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    connection: 'connection' in navigator && navigator.connection ? ((navigator.connection as NetworkInformation).effectiveType || 'unknown') : 'unknown'
  }
  
  // Send to our analytics endpoint
  try {
    await fetch('/api/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch (error) {
    console.error('Failed to send vitals:', error)
  }
}

export function WebVitals() {
  useEffect(() => {
    // Core Web Vitals
    onCLS((metric) => sendToAnalytics({
      ...metric,
      rating: metric.value < 0.1 ? 'good' : metric.value < 0.25 ? 'needs-improvement' : 'poor'
    }))
    
    onINP((metric) => sendToAnalytics({
      ...metric,
      rating: metric.value < 200 ? 'good' : metric.value < 500 ? 'needs-improvement' : 'poor'
    }))
    
    onLCP((metric) => sendToAnalytics({
      ...metric,
      rating: metric.value < 2500 ? 'good' : metric.value < 4000 ? 'needs-improvement' : 'poor'
    }))
    
    // Other Web Vitals
    onFCP((metric) => sendToAnalytics({
      ...metric,
      rating: metric.value < 1800 ? 'good' : metric.value < 3000 ? 'needs-improvement' : 'poor'
    }))
    
    onTTFB((metric) => sendToAnalytics({
      ...metric,
      rating: metric.value < 800 ? 'good' : metric.value < 1800 ? 'needs-improvement' : 'poor'
    }))
  }, [])
  
  return null
}