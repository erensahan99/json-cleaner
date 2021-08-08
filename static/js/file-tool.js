/**
 *  Simple JavaScript Promise that reads a file as text.
 *  https://ourcodeworld.com/articles/read/1438/how-to-read-multiple-files-at-once-using-the-filereader-class-in-javascript
 **/

let jsons = [];
let fileNames = [];

function readFileAsText(file) {
    return new Promise(function (resolve, reject) {
        let fr = new FileReader();

        fr.onload = function () {
            resolve(fr.result);
        };

        fr.onerror = function () {
            reject(fr);
        };

        fr.readAsText(file);
    });
}

// Handle multiple fileuploads
document.getElementById("fileinput").addEventListener("change", function (ev) {
    let files = ev.currentTarget.files;

    // Abort if there were no files selected
    if (!files.length) return;

    // Store promises in array
    for (let i = 0; i < files.length; i++) {
        jsons.push(readFileAsText(files[i]));
        fileNames.push(files[i].name);
    }

    // Trigger Promises
    Promise.all(jsons).then((values) => {
        // Values will be an array that contains an item
        // with the text of every selected file
        // ["File1 Content", "File2 Content" ... "FileN Content"]
        var table = "";
        var index = 0
        values.forEach(value => {
            if (delete_hash.checked == 1) {
                value = value.replace(": #", ": \"");
                value = value.replace("#,", "#\",");
            }
            // console.log(JSON.parse(value));
            table += "<tr> <td>" + fileNames[index] + "</td></tr>";
            index += 1;
            table += "<tr> <td><textarea class=\"form-control h-10 bg-white\" id=\"deletedTextArea\" rows=\"15\" readonly>" + JSON.stringify(JSON.parse(value), undefined, 4) + "</textarea></td></tr>";
        });

        document.getElementById("before_table").innerHTML = table;
    });
}, false);

function clearOut() {
    var keysWillStay = $('#keysWillStay').val().split('\n').filter(Boolean);
    Promise.all(jsons).then((values) => {
        var table = "";
        var index = 0
        values.forEach(json => {
            if (delete_hash.checked == 1) {
                json = json.replace(": #", ": \"");
                json = json.replace("#,", "#\",");
            }
            json = JSON.parse(json)
            var removedKeys = {}
            Object.keys(json).forEach(key => {
                var searchFlag = false;
                keysWillStay.forEach(word => {
                    if (!word.localeCompare(key)) {
                        //console.log(word + " " + key + " => " + !word.localeCompare(key));
                        searchFlag = true;
                    }
                });
                if (!searchFlag) {
                    removedKeys[key] = json[key]
                    // removedKeys.push(key,JSON.stringify(json[key]));
                    delete json[key];
                }
            });
            table += "<tr> <td>" + fileNames[index] + "</td></tr>";
            index += 1;
            table += "<tr> <td><textarea class=\"form-control h-10 bg-white\" id=\"deletedTextArea\" rows=\"15\" readonly>" + JSON.stringify(json, undefined, 4) + "</textarea></td></tr>";
            console.log(JSON.stringify(json, undefined, 4));
        });
        document.getElementById("after_table").innerHTML = table;
    });
}