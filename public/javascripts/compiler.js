


var baseLogFunction = console.log;
console.log = function () {
    baseLogFunction.apply(console, arguments);

    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        var node = createLogNode(args[i]);
        document.querySelector("#compilerText").appendChild(node);
    }

}

function createLogNode(message) {
    var node = document.createElement("div");
    node.setAttribute('id', 'ouput');
    

    var textNode = document.createTextNode(message);
    node.appendChild(textNode);
    return node;
}

window.onerror = function (message, url, linenumber) {
    var compiler = document.getElementById('compilerText');
    compiler.style.color = "red";
    console.log("JavaScript error: " + message + " on line " +
        linenumber + " for " + url);
}

let theButton = document.getElementById('runButton');

theButton.onclick = compile;

function compile() {
    var js = document.getElementById("js");

    var compiler = document.getElementById('compilerText');

    compiler.innerHTML = "";
    let theFunction = new Function(js.value);
    compiler.style.color = "green";

    compiler.append(theFunction());


}

