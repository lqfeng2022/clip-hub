import { FormEvent } from 'react'
import { Subtitle } from './entities/Subtitle'


export const autoGrow = (e: FormEvent<HTMLTextAreaElement>) => {
  const target = e.currentTarget
  target.style.height = 'auto'
  target.style.height = `${target.scrollHeight}px`
}

export const parseTimeline = (timeline: string): number => {
    const [minStr, secStr] = timeline.split(':').map(s => s.trim())
    const minutes = parseInt(minStr, 10)
    const seconds = parseInt(secStr, 10)
    return minutes * 60 + seconds
  }


// `[...data]`: to avoid mutating the original array
// `-`: is a simple way to tell TS how to order two items
export const sortSubtitlesByTimeline = (data: Subtitle[]) => {
  return [...data].sort((a, b) => 
   parseTimeline(a.timeline) - parseTimeline(b.timeline))
}


// 1. `replace()`: This escapes any special regex characters in the title so it becomes a safe literal string.
//  - `[*+?^${}()|[\]\\]`: is a character class: match one of any characters inside.
//  - `/[...]/g`: the g flag, means global, replace all matches, not just first.
//  - `'\\$&'`: inserts a literal backslash before it, `$&` = the actual text matched, `//` to get a literal `\`
// 2. `new RegExp((${escaped}), 'gi')`: 
//  -	(${escaped}) puts your phrase in a capturing group
//  -	'g' = global (find all matches, not just the first)
//  -	'i' = case-insensitive (so "Pizza" matches "pizza")
// 3. split(): "I love pizza very much".split(/(pizza)/gi) -> ["I love ", "pizza", " very much"]
// src/utils/splitByPhrase.ts
export function splitByPhrase(text: string, phrase: string): string[] {
  if (!phrase) return [text]
  // Escape regex special chars
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.split(regex)
}


interface ExplainPart {
  label: string
  text: string
}
export function splitExplain(text: string): ExplainPart[] {
  const labels = [
    "Meaning", "In this scene", "Like saying", "Tone",
    "含义", "在这个场景中", "就像在说", "语气"
  ]

  // WE use `/.../` this most typical and common way to create a RegExp in JavaScript and TypeScript
  // `regex` to capture label and following text until next label or end
  // const regex = /(Meaning|In this scene|Like saying|Tone):\s*([^]*?)(?=(?:Meaning|In this scene|Like saying|Tone):|$)/gi
  
  // Build a regex dynamically from all labels
  const regex = new RegExp(
    `(${labels.map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})[:：]\\s*([^]*?)(?=(?:${labels.map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})[:：]|$)`,
    'g'
  )

  const parts: ExplainPart[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    parts.push({
      label: match[1].trim(),
      text: match[2].trim()
    })
  }

  return parts
}


// Explore `/(Meaning|In this scene|Like saying|Tone):\s*([^]*?)(?=(?:Meaning|In this scene|Like saying|Tone):|$)/gi`
// 1.`(Meaning|In this scene|Like saying|Tone):`:
//   A capturing group for one of the section names followed by a colon.
//   This will become match[1] in our code.
// 2.`\s*`: Skip any spaces after the colon.
// 3.`([^]*?)`:
//   Capture any characters including newlines (* means "zero or more" of "any char" and [^] is a trick for "any char").
//   The ? makes it non-greedy (stop at the first chance).
//   This will become match[2] in our code.
// 4.`(?=(?:Meaning|In this scene|Like saying|Tone):|$)`:
//   A lookahead that says: keep capturing until you see the start of another label ("Meaning", "In this scene"… etc.) or the end of the string `$`.
//   This prevents one match from gobbling up all the text.
// 5.`g` flag = global: find all matches, not just first.
// 6.`i` flag = case-insensitive: "meaning" also works.


// Explre `RegExpExecArray` using an example
// const regex = /(Meaning):\s*([^]*?)(?=(?:Meaning):|$)/gi;
// const text = "Meaning: This is the meaning text.";
// const match = regex.exec(text);

// console.log(match);
// /*
// [
//   "Meaning: This is the meaning text.",
//   "Meaning",                // match[1] → label
//   "This is the meaning text.", // match[2] → text body
//   index: 0,
//   input: "Meaning: This is the meaning text.",
//   groups: undefined
// ]
// */