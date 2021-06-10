const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    msg1.textContent = "Loading..."
    msg2.textContent = ""

    const location = search.value
    const url = '/weather?search='+location 

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                msg1.textContent = data.error
            }
            else
            {
                msg1.textContent = "Weather for " + data.location
                msg2.textContent = "It is " + data.temperature + " degrees but feels like " + data.feelslike + "."
            }
        })
    })
})