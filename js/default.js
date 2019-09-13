

const editor = CodeMirror.fromTextArea(document.querySelector('#code'), {
    lineNumbers: true,
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,

})

editor.setValue("//Enter your code here//")
editor.fr

console.log = function () {
    let args = Array.prototype.slice.call(arguments);
    for (let i = 0; i < args.length; i++) {
        let node = createLogNode(args[i]);
        document.querySelector(".console").append(node);

    }
}





function createLogNode(message) {
    let node = document.createElement("div");
    let textNode = document.createTextNode(message);
    node.append(textNode);
    return node;

}

$('.run').click(function () {
    $(".console").html("")
    let jsx = editor.getValue()
    let s = document.createElement('script')
    s.textContent = jsx;
    document.body.append(s)
    $(".pconsole").remove();

})
