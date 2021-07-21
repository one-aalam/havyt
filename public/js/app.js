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
        })
    })
})
