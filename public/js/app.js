// import { render } from './render.js'
document.addEventListener('DOMContentLoaded', () => {
    // const $app = document.querySelector('#app')
    // render($app)

    // Adjust form height
    Array.from(document.forms).forEach((form) => {
        Array.from(form).forEach((elm) => {
            if(elm.nodeName === 'TEXTAREA') {
                elm.style.height = elm.scrollHeight + 'px'
                elm.addEventListener('input', (e) => {
                    e.target.style.height = e.target.scrollHeight + 'px'
                })
            }
            if(elm.type === 'file') {
                elm.addEventListener('change', (e) => {
                    const imgEl = e.target.parentNode.querySelector('img')
                    const fileNameEl = e.target.parentNode.querySelector('small')
                    const file = e.target.files[0]
                    imgEl.src = URL.createObjectURL(file)
                    fileNameEl.innerHTML = file.name
                })
                elm.parentNode.querySelector('img').addEventListener('click', (e) => {
                    e.target.parentNode.querySelector('input').click()
                })
            }
        })
    })
})
