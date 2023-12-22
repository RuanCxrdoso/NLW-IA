import ytdl from "ytdl-core"
import fs from 'fs'
// import { resolve } from "path"
// import { rejects } from "assert"

export const download = async (videoId) => new Promise((resolve, rejects) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log(`Your download will start: ${videoId}`)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
  .on("info",
  (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    if (seconds > 60) {
      throw new Error('The video duration is over than 60 seconds !')
    }
  })
  .on("end", () => {
    console.log('Video download ends !')
    resolve()
  })
  .on("error", (error) => {
    console.log(('Error on video download: ', error))
    rejects(error)
  })
  .pipe(fs.createWriteStream('./tmp/audio.mp4'))
})
