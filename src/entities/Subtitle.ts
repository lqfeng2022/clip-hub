import { Character } from "./Character";
import Expression from "./Expression";

export interface Subtitle {
  id: number,
  timeline: string,
  content: string,
  characters: Character[],
  expressions: Expression[],
}