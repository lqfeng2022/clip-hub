// src/helps/fileLogger.ts
class FileLogger {
  private logs: string[] = []

  debug(...args: any[]) { this.add('DEBUG', ...args) }
  info(...args: any[]) { this.add('INFO', ...args) }
  warn(...args: any[]) { this.add('WARN', ...args) }
  error(...args: any[]) { this.add('ERROR', ...args) }

  private add(level: string, ...args: any[]) {
    const timestamp = new Date().toISOString()
    const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ')
    this.logs.push(`[${timestamp}] [${level}] ${msg}`)
    console.log(`[${level}]`, ...args) // optional console log
  }

  getLogs() { return this.logs.join('\n') }

  // Programmatic download
  download(filename = `voiceRecorder-log-${Date.now()}.txt`) {
    const blob = new Blob([this.getLogs()], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  clear() { this.logs = [] }
}

export const logger = new FileLogger()