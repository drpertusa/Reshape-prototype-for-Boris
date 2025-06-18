"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

interface VitalsData {
  timeRange: string
  totalEntries: number
  metrics: {
    [key: string]: {
      count: number
      average: number
      median: number
      p75: number
      p95: number
      ratings: {
        good: number
        needsImprovement: number
        poor: number
      }
    }
  }
  recentEntries: Array<{
    metric: string
    value: number
    rating: string
    url: string
    timestamp: string
  }>
}

const METRIC_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25, unit: '' },
  INP: { good: 200, poor: 500, unit: 'ms' },
  LCP: { good: 2500, poor: 4000, unit: 'ms' },
  FCP: { good: 1800, poor: 3000, unit: 'ms' },
  TTFB: { good: 800, poor: 1800, unit: 'ms' },
}

export function VitalsMonitor() {
  const [data, setData] = useState<VitalsData | null>(null)
  const [timeRange, setTimeRange] = useState('24h')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/vitals?timeRange=${timeRange}`)
      if (!response.ok) throw new Error('Failed to fetch vitals')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [timeRange]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading && !data) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading metrics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button onClick={fetchData} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  if (!data || data.totalEntries === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No performance data available yet. Visit some pages to start collecting metrics.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['1h', '24h', '7d', '30d'].map((range) => (
          <Button
            key={range}
            onClick={() => setTimeRange(range)}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
          >
            {range}
          </Button>
        ))}
        <Button
          onClick={fetchData}
          variant="outline"
          size="sm"
          className="ml-auto"
        >
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(data.metrics).map(([metric, values]) => {
          const threshold = METRIC_THRESHOLDS[metric as keyof typeof METRIC_THRESHOLDS]
          const goodPercent = (values.ratings.good / values.count) * 100
          
          return (
            <div key={metric} className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">{metric}</h3>
              
              {/* Rating Bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${goodPercent}%`,
                    backgroundColor: goodPercent >= 90 ? '#22c55e' : goodPercent >= 75 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </div>
              
              {/* Values */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average:</span>
                  <span className="font-mono">
                    {values.average.toFixed(metric === 'CLS' ? 3 : 0)}{threshold.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P75:</span>
                  <span className="font-mono">
                    {values.p75.toFixed(metric === 'CLS' ? 3 : 0)}{threshold.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P95:</span>
                  <span className="font-mono">
                    {values.p95.toFixed(metric === 'CLS' ? 3 : 0)}{threshold.unit}
                  </span>
                </div>
              </div>
              
              {/* Ratings */}
              <div className="mt-4 pt-4 border-t space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-green-600">Good:</span>
                  <span>{values.ratings.good} ({goodPercent.toFixed(1)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-600">Needs Improvement:</span>
                  <span>{values.ratings.needsImprovement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">Poor:</span>
                  <span>{values.ratings.poor}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Entries */}
      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Recent Measurements</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Time</th>
                <th className="text-left p-4">Metric</th>
                <th className="text-left p-4">Value</th>
                <th className="text-left p-4">Rating</th>
                <th className="text-left p-4">URL</th>
              </tr>
            </thead>
            <tbody>
              {data.recentEntries.map((entry, idx) => {
                const threshold = METRIC_THRESHOLDS[entry.metric as keyof typeof METRIC_THRESHOLDS]
                return (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-mono text-xs">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="p-4 font-semibold">{entry.metric}</td>
                    <td className="p-4 font-mono">
                      {entry.value.toFixed(entry.metric === 'CLS' ? 3 : 0)}{threshold?.unit || ''}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        entry.rating === 'good' ? 'bg-green-100 text-green-800' :
                        entry.rating === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {entry.rating}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground truncate max-w-xs">
                      {entry.url}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Total measurements: {data.totalEntries}</p>
        <p className="mt-2">
          Note: This is using in-memory storage. For production, integrate with a proper analytics service 
          like Google Analytics, Vercel Analytics, or a custom database.
        </p>
      </div>
    </div>
  )
}