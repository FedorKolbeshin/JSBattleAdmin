/**
 * Created by fReDDy on 06.05.2016.
 */
document.addEventListener("DOMContentLoaded",function(){
    //setInterval(updateLayout,500);
    var Button=document.getElementById("boldBut");
    Button.addEventListener("click",function(){
        var textDiv=document.getElementById("textEdit"),
            result=document.getElementById("textShow"),
            textHTML=textDiv.innerHTML;
        var newString=textHTML.slice(textDiv.selectionStart,textDiv.selectionEnd);
        newString="<strong>"+newString+"</strong>";
        textHTML=textHTML.replaceBetween(textDiv.selectionStart,textDiv.selectionEnd,newString);
        alert(textHTML);
        textDiv.innerHTML=textHTML;
        result.innerHTML=textHTML;
    });
    var textEdit=document.getElementById("textEdit");
    textEdit.addEventListener("keydown",function(event) {
        var currentString=textEdit.value.slice(textEdit.selectionStart,textEdit.selectionEnd);
        if (+event.keyCode == 8)
        {
            var pattern=/<image[\d]+>/;
            alert(currentString);
            if (pattern.test(currentString))
            {
                var textDiv=document.getElementById("textShow"),
                    images=textDiv.getElementsByTagName("img");
                textDiv.removeChild(images[currentString.slice(6,currentString.length-1)-1]);
                alert(currentString.slice(6,currentString.length-1));
            }
            else
            {
                alert("NO!");
                //event.preventDefault();
            }
        }
    });
    var input=document.getElementById("fileID");
    input.addEventListener("change",function(e) {
        console.dir(e);
        for (var i = 0; i < e.srcElement.files.length; i++) {
            var file = e.srcElement.files[0],
                img = document.createElement("img"),
                reader = new FileReader(),
                textdiv=document.getElementById ("textShow"),
                textEdit=document.getElementById("textEdit");
            reader.onloadend = function() {
                img.src = reader.result;
                console.dir(reader.result);
            }
            reader.readAsDataURL(file);
            img.style.width="inherit";
            textdiv.appendChild(img);
            addImageOption("image"+textdiv.getElementsByTagName("img").length);
            textEdit.value+="\r\n"+"<image"+document.getElementById("textShow").getElementsByTagName("img").length+">";
            getImagesInEditor(textEdit.value);
        }
    });
    function addImageOption (source) {
        var currentDiv = document.getElementById("textArea"),
            currentParag=document.createElement("p"),
            currentElement = source + ' <span style="color:red;">x</span>';
        currentParag.setAttribute("class","button");
        currentParag.innerHTML=currentElement;
        var span=currentParag.getElementsByTagName("span")[0];
        span.onclick = function() {
            var pattern=/\d+/;
            var match=pattern.exec(this.parentNode.textContent);
            if (match)
                console.log(match[0]);
            removeCurrentImage(match[0]);
            //console.dir(this.parentNode.parentNode);
            changeImageOptionIndexes(match[0]);
            this.parentNode.parentNode.removeChild(this.parentNode);
        };
        currentDiv.appendChild(currentParag);

    }
    function changeImageOptionIndexes (currentIndex){
        var imageOptions=document.getElementById("textArea").getElementsByTagName("p");
        while (currentIndex<imageOptions.length)
        {
            imageOptions[currentIndex].innerHTML=imageOptions[currentIndex].innerHTML.replace(
                imageOptions[0].innerHTML.slice(5,imageOptions[0].innerHTML.indexOf("<span")-1),currentIndex
            );
            currentIndex++;
        }
        console.dir(imageOptions[0]);
        console.log(imageOptions[0].innerHTML);
        console.log("-------------------"+imageOptions[0].innerHTML.indexOf("<span"));
        console.log(imageOptions[0].innerHTML.slice(5,imageOptions[0].innerHTML.indexOf("<span")-1))
        /*while (currentIndex<=imageOptions.length)
        {

        }*/
    }
    function removeCurrentImage(number) {
        var textEditor=document.getElementById("textEdit"),
            currentDiv=document.getElementById("textShow"),
            images=currentDiv.getElementsByTagName("img");
        textEditor.value=textEditor.value.replace("<image"+number+">","");
        images[number-1].remove();
    }
    function getImagesInEditor(source){

        var results=[];
        var pattern=/<image[\d]+>/g;
        var res;
        console.log(source);
        while ((res = pattern.exec(source)) != null) {
            console.log("Найдено " + res + " по индексу " + res.index);
            results.push(res);

        }
        alert(results.toString());
        /*while(a!=-1){
            source=source.slice(a*1+string.length);
            results.push();
            a=source.indexOf(string);
        }

        return results;*/

    }
    String.prototype.replaceBetween = function(start,end,string) {
        return this.slice(0, start) + string + this.slice(end);
    };
    function updateLayout() {
        console.log("функция работает");
        var textShow=document.getElementById("textShow"),
            textEdit=document.getElementById("textEdit");
        textShow.innerHTML=textEdit.value;
    }
});