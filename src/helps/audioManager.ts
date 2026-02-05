// Global audio manager to ensure only one audio plays at a time
let currentlyPlayingAudio: HTMLAudioElement | null = null

export const audioManager = {
  play(audioElement: HTMLAudioElement) {
    // Stop any currently playing audio
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audioElement) {
      currentlyPlayingAudio.pause()
      currentlyPlayingAudio.currentTime = 0
    }
    
    // Play the new audio
    currentlyPlayingAudio = audioElement
    audioElement.play()
  },

  pause(audioElement: HTMLAudioElement) {
    if (currentlyPlayingAudio === audioElement) {
      audioElement.pause()
      currentlyPlayingAudio = null
    }
  },

  stop() {
    if (currentlyPlayingAudio) {
      currentlyPlayingAudio.pause()
      currentlyPlayingAudio.currentTime = 0
      currentlyPlayingAudio = null
    }
  },

  getCurrent() {
    return currentlyPlayingAudio
  }
}