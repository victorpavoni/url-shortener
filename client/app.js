const el = document.getElementById('app')
const API_URL = "http://localhost:5000/"
const form = document.querySelector('form')

const getInfo = async () => {
  const info = await fetch(API_URL)
  const data = await info.json()
  data.reverse()
  data.forEach(item => {
    el.innerHTML += `
      <tr>
        <td><a href="${item.full}">${item.full}</a></td>
        <td><a href="${API_URL}${item.short}">${item.short}</a></td>
      </tr>
    `
  });
}

getInfo()

form.addEventListener('submit', e => {
  e.preventDefault()

  const formData = new FormData(form)

  const url = formData.get("url")

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ "fullUrl": url }),
    headers: {
      'content-type': 'application/json'
    }
  })
})

