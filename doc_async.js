// Set content
function setOnload() {
    // ex)loadDocFile("[file name]", "[output destination id]");
    loadDocFile("doc/sample.txt", "result");
}

// Entry
$(function() {
    setOnload();
});

// Obtain documents via HTTP communication ⇒ Output
function createXMLHttpRequest() {
    try {
        return new XMLHttpRequest();
    } catch (e) {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Load document file
var targetObj = new Array();
function loadDocFile(fileName, idName) {
    targetObj[idName] = createXMLHttpRequest()
    if (targetObj[idName]) {
        targetObj[idName].open("get", fileName);
        targetObj[idName].onreadystatechange = function() {
            document.getElementById(idName).innerHTML = (targetObj[idName].readyState == 4 && targetObj[idName].status == 200) ? targetObj[idName].responseText : "Loading...";
        }
        targetObj[idName].send(null);
    }
}