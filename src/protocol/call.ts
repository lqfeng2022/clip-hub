// protocol/call.ts
export enum ClientEvent {
  TEXT_PARTIAL = 'text.partial',  // NEW: partial transcript stream from STT
  TEXT_FINAL = 'text.final',
  CALL_END = 'call.end',          // user manually ends the call
}

export enum ServerEvent {
  AGENT_STATE = 'agent.state', // 'idle' | 'thinking' | 'speaking'
  AGENT_TEXT  = 'agent.text',  // final text reply from brain/agent
  ERROR = 'error',
}