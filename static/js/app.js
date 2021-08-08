
function clearOut() {
    var words = $('#wordsTextArea').val().split('\n').filter(Boolean);
    var jsonText = JSON.parse($('#jsonTextArea').val());
    var removedKeys = {}

    Object.keys(jsonText).forEach(key => {
        var searchFlag = false;
        words.forEach(word => {
            if (!word.localeCompare(key)) {
                //console.log(word + " " + key + " => " + !word.localeCompare(key));
                searchFlag = true;
            }
        });
        if (!searchFlag) {
            removedKeys[key] = jsonText[key]
            // removedKeys.push(key,JSON.stringify(jsonText[key]));
            delete jsonText[key];
        }
    });

    console.log(jsonText);
    console.log(removedKeys);

    $('#resultTextArea').val(JSON.stringify(jsonText, undefined, 4))
    $('#deletedTextArea').val(JSON.stringify(removedKeys, undefined, 4))
    $('body,html').animate({ scrollTop: 730 }, 100);
}
document.querySelector("#resultTextArea").onclick = function () {
    document.querySelector("#resultTextArea").select();
    document.execCommand('copy');
}

document.querySelector("#deletedTextArea").onclick = function () {
    document.querySelector("#deletedTextArea").select();
    document.execCommand('copy');
}