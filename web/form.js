import { server } from "./server.js"

const form = document.getElementById('form')
const input = document.getElementById('url')
const content = document.getElementById('content')

form.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  content.style.userSelect = 'none'

  const videoUrl = input.value

  if(!videoUrl.includes('shorts')) {
    content.textContent = 'This video is not a Short !'
    content.style.color = '#ff2020'
    return
  }

  input.value = '' // Clear input after the submit

  const [_, params] = videoUrl.split("/shorts/")
  const [id] = params.split('?si')

  content.textContent = 'Getting the audio text ...'
  content.style.color = '#009F00'
  const transcription = await server.get("/summary/" + id)
  content.style.color = '#7c7c8a'
  content.textContent = 'Making the summary...'

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  content.textContent = summary.data.result
  content.style.userSelect = 'auto'
  content.style.color = '#cfcfcf'
})
