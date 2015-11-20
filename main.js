const days = ["M","T","W","R","F","S","U","I"];

function drawTable() {
    drawDayCols((SetArray.gshowNSFW!="hideNSFW")?WCArray:ArraySFW(WCArray));
    drawCatCols((SetArray.gshowNSFW!="hideNSFW")?WCArray:ArraySFW(WCArray));
    highlightDay();
}

function drawWCItem(WCItem) {
  return "<div><a href=\""+WCItem.url+"\">"+WCItem.name+"</a>"+drawNSFWtag(WCItem)+"</div>";
}

function drawNSFWtag(WCItem) { //returns the NSFW tag if item is NSFW, else ""
    return ((WCItem.nsfw && SetArray.gshowNSFW=="tagNSFW")?"<small class=\"NSFW\">NSFW</small>":"");
}

function drawDayCols(WCList) { //Place links under appropriate days (right)
    for (var dc=0; dc<days.length; dc++){
        for (var wcc=0; wcc<WCList.length; wcc++) {
            if (WCList[wcc].days.match(days[dc]) !== null) //day present in wc.days
                document.getElementById(days[dc]).innerHTML += drawWCItem(WCList[wcc]);
        }

    }
}

function drawCatCols(WCList) {  //List all comics by update schedule (left)
    var headList = [];  //List of update category headers
    var weekList = [];  //List of indexs for "weekly" heading
//    var flag;
    for (var wcc = 0; wcc < WCList.length; wcc++) { //Generate list of headers
        if (WCList[wcc].days.length > 1){ //Not just a single day
            if (headList.indexOf(catParse(WCList[wcc].days)) === -1) {
                headList.push(catParse(WCList[wcc].days));
            }
        }
            // flag=false;
            // for (var hc=0; hc<headList.length; hc++) { //Check if it's been added
            //     if (catParse(WCList[wcc].days)==headList[hc]) {
            //         flag=true;
            //     }
            // }
            // if (!flag) {
            //     headList.push(catParse(WCList[wcc].days));
            // }
        else { //If single day, add the index to weekList
            if (WCList[wcc].days!=="I") {
                weekList.push(wcc);
            }
        }
    }
    for (var hc=0; hc<headList.length; hc++){ //Write headers
        document.getElementById("leftCol").innerHTML +=
            "<p><div>"+headList[hc]+":</div><div id=\""+catParse(headList[hc])+"\"></div>";
    }
    if (weekList.length > 0) { //Add "Weekly" header, if not empty.
        document.getElementById("leftCol").innerHTML +=
            "<p><div>Weekly:</div><div id=\"Weekly\"></div>";
    }
    for (var wcc=0; wcc<WCList.length; wcc++) { //Populate categories
        if (WCList[wcc].days.length>1) {
            document.getElementById(catParse(WCList[wcc].days)).innerHTML += drawWCItem(WCList[wcc]);
        }
    }
    for (var wc=0; wc<weekList.length; wc++) { //Populate "weekly" header
        document.getElementById("Weekly").innerHTML += drawWCItem(WCList[weekList[wc]]);
    }
}

function catParse(str) { //Converts day-codes to readable
    if (str.match("MTWRF")!==null) {
        str="Daily";
    }
    str=str.replace("R","Th");
    str=str.replace("S","Sa");
    str=str.replace("U","Su");
    return str;
}

function highlightDay() {
    //var colCurrDay = '#e4eaff';
    //var colNextDay = '#eef2ff';
    var d = new Date();
    //*debug*/d.setDate(d.getDate()+2); //debug; advance day by 2
    //*debug*/d.setHours(23); //debug; set time to 11:00
    document.getElementById(d.getDay() % 6).classList.add("currDayHi");
    if (d.getHours() >= 22) { //if time is after 10:00, highlight next day
        d.setDate(d.getDate() + 1);
        document.getElementById(d.getDay() % 6).classList.add("nextDayHi");
    }
}

document.addEventListener('DOMContentLoaded', function () { //On Load
    drawTable();
    if (SetArray.gshowTitle[0]=="hideTitle")
        document.getElementById("pageTitle").style.display = "none";
    else if (SetArray.gshowTitle[0]=="custTitle")
        document.getElementById("pageTitle").innerHTML=SetArray.gshowTitle[0];
});
