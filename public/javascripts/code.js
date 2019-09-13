//var socket = io()
const code = document.getElementById('js')


code.onkeyup = () => {
    let codeVal = document.getElementById('js').value
    axios.post("/code", {
        code: codeVal
    }).catch(err => console.log(err))
}

