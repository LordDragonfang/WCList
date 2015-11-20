function drawSettings() { //for on load
  drawOrderedListBlank();
  fillOrderedList();
  fillSettings();
}

function drawOrderedListBlank() { //Draw table with row for each WCList value

  function makeOLButtons(wcc) {
    var rstr = "";
    if (wcc != 0)
      rstr += "<a style=\"cursor:pointer\" id=\"olCPUp"+wcc+"\">&#9650;</a>"; //move up
    if (wcc !== WCArray.length - 1)
      rstr += "<a style=\"cursor:pointer\" id=\"olCPDown"+wcc+"\">&#9660;</a>" + //move down
        "<a style=\"cursor:pointer\" id=\"olCPRemove"+wcc+"\">&#9473;</a>"; //remove
    else
      rstr += "<a style=\"cursor:pointer\" id=\"olCPAdd\">&#10010;</a>"; //add
    return rstr;
  }

  var str="<table class=\"WCmodule\"><tr id=\"WCmoduleHead\">" +
    "<th>#</th><th>Name:</th><th>URL:</th><th>Updates:</th><th>NSFW?</th>"/*"<th>imgurl</th>*/+"</tr>";
  for (var wcc=0;wcc<WCArray.length;wcc++) {
    str=str +
      "<tr><td>"/*<input type=\"text\" size=\"2\" id=\"olNum"+wcc+"\">"*/+(wcc+1)+"</td>"+
      "<td><input type=\"text\" size=\"20\" id=\"olName"+wcc+"\"></td>"+
      "<td><input type=\"text\" size=\"15\" id=\"olURL"+wcc+"\"></td>"+
      "<td><input type=\"text\" size=\"5\" id=\"olUpdates"+wcc+"\"></td>"+
      "<td><input type=\"checkbox\" id=\"olNSFW"+wcc+"\"></td>"+
      /*<td><input type=\"text\" size=\"10\" id=\"olImgurl"+wcc+"\" placeholder=\"(blank for none)\"></td>*/
      "<td class= \"olCP\" id=\"olCP"+wcc+"\">"+makeOLButtons(wcc)+"</td></tr>";
  }
  str=str + "</table>";

  document.getElementById("orderedList").innerHTML=str;
  for (var wcc=1;wcc<WCArray.length;wcc++) { //add button listenners
    document.getElementById("olCPUp"+wcc).onclick=function(){olCPmoveUp(parseInt(this.id.replace( /^\D+/g, '')))};
  }
  for (var wcc=0;wcc<(WCArray.length-1);wcc++) { //add button listenners
    document.getElementById("olCPDown"+wcc).onclick=function(){olCPmoveDown(parseInt(this.id.replace( /^\D+/g, '')))};
    document.getElementById("olCPRemove"+wcc).onclick=function(){olCPremoveRow(parseInt(this.id.replace( /^\D+/g, '')))}
  }
  document.getElementById("olCPAdd").onclick=function(){olCPaddRow();};
}

function fillOrderedList() { //fill OL table with WCList
  var idprefix = ["olNum","olName","olURL","olUpdates","olNSFW","olImgurl"];
  for (var wcc=0;wcc<WCArray.length;wcc++) {
    //document.getElementById(idprefix[0]+wcc).value = wcc+1;
    document.getElementById(idprefix[1]+wcc).value = WCArray[wcc].name;
    document.getElementById(idprefix[2]+wcc).value = WCArray[wcc].url;
    document.getElementById(idprefix[3]+wcc).value = WCArray[wcc].days;
    document.getElementById(idprefix[4]+wcc).checked = WCArray[wcc].nsfw;
    //document.getElementById(idprefix[5]+wcc).value = WCArray[wcc].imgurl;
  }
}

function fillSettings() {
  document.getElementById(SetArray.gshowNSFW).checked=true;
  document.getElementById(SetArray.gHNext).checked=true;
  document.getElementById(SetArray.gshowTitle[0]).checked=true;
}

function returnOrderedList(len) { //return updated array from the HTML fields
  var idprefix = ["olNum","olName","olURL","olUpdates","olNSFW","olImgurl"];
  var WCListR = []; //Temp to return
  for (var wcc=0;wcc<len;wcc++) {
    WCListR.push({
      name:   document.getElementById(idprefix[1]+wcc).value,
      url:    document.getElementById(idprefix[2]+wcc).value,
      days:   document.getElementById(idprefix[3]+wcc).value,
      nsfw:   document.getElementById(idprefix[4]+wcc).checked,
      imgurl: ""//document.getElementById(idprefix[5]+wcc).value
    });
  }
  return WCListR;
}

function returnSet() { //unfinished
  var setArrayR = {};
  function getCheckedID(idList) {
    for(i=0;i<idList.length;i++){
      if (document.getElementById(idList[i]).checked === true) return idList[i];
    }
  }
  setArrayR.gshowNSFW = getCheckedID(["showNSFW","tagNSFW","hideNSFW"]);
  setArrayR.gHNext = getCheckedID(["HNextFalse","HNextTrue"]);
  setArrayR.gshowTitle =
    [getCheckedID(["showTitle","hideTitle","custTitle"]), document.getElementById("customTitleText").value];
  return setArrayR;
}

function toggleHideDiv(id) {
  var elem = document.getElementById(id);
  if (elem.style.display=="none") {
    elem.style.display="block";
  } else {
    elem.style.display="none";
  }
}

function toggleHideElem(elem) {
  if (elem !== undefined) {
    if (elem.classList.contains("hide")) {
      elem.classList.remove("hide");
    } else {
      elem.classList.add("hide");
    }
  } else {
    console.log("Element to hide is undefined");
  }
}

function toggleHSwitch(id1,id2) { //performed by "hide" switch
  var elem = document.getElementById(id1);
  if (elem.innerHTML=="+") {
    elem.innerHTML="-";
  } else  if (elem.innerHTML=="-") {
    elem.innerHTML="+";
  }
  toggleHideElem(document.getElementById(id2));
}

function reloadList() {
  WCArray = JSON.parse(window.localStorage.getItem("WCList:WCArray"));
  drawOrderedListBlank();
  fillOrderedList();
}

function saveList() {
  updateList();
  window.localStorage.setItem("WCList:WCArray", JSON.stringify(WCArray));
}

function loadList(inList) {
  WCArray = inList;
  window.localStorage.setItem("WCList:WCArray", JSON.stringify(inList));
  drawOrderedListBlank();
  fillOrderedList();
}

function updateList() { //update the WCArray var with the values from the HTML
  WCArray = returnOrderedList(WCArray.length);
}

function saveSettings(inSetArray) {
  window.localStorage.setItem("WCList:SetArray", JSON.stringify(inSetArray));
}

function loadSettings(inSetArray) {
  SetArray = inSetArray;
  saveSettings(inSetArray);
  fillSettings();
}

function olCPmoveUp(wcn) {
  updateList();
  WCArray.swap(wcn,wcn-1);
  fillOrderedList();
}

function olCPmoveDown(wcn) {
  updateList();
  WCArray.swap(wcn+1,wcn);
  fillOrderedList();
}

function olCPremoveRow(wcn) {
  updateList();
  WCArray.splice(wcn,1);
  drawOrderedListBlank();
  fillOrderedList();
}

function olCPaddRow() {
  updateList();
  WCArray.push(WCBlankItem);
  drawOrderedListBlank();
  fillOrderedList();
}

function WCcompare(WCI1,WCI2) {
  return (WCI1.name==WCI2.name) && (WCI1.url==WCI2.url) && (WCI1.days==WCI2.days) &&
    (WCI1.NSFW==WCI2.NSFW);// && (WCI1.imgurl==WCI2.imgurl);
}

function WCAcompare(WCA1,WCA2) {
  var flag = (WCA1.length==WCA2.length);
  if (flag) for (var wcc=0;wcc<WCA1.length;wcc++) {
    flag = flag && WCcompare(WCA1[wcc],WCA2[wcc]);
    //console.log(WCcompare(WCA1[wcc],WCA2[wcc]))
  }
  return flag;
}

document.addEventListener('DOMContentLoaded', function () { //when page loads, draw and set listeners
  drawSettings();
  document.getElementById("togWCList").onclick=function(){toggleHSwitch("togWCList","orderedList");};
  document.getElementById("togMainSet").onclick=function(){toggleHSwitch("togMainSet","mainSet");};
  document.getElementById("togAdvSet").onclick=function(){toggleHSwitch("togAdvSet","advSet");};
  document.getElementById("loadDefButton").onclick=function(){
    if (confirm("Warning: this will replace all entries in the current webcomic list. Proceed?"))
      loadList(WCArrayDefault);
  };
  document.getElementById("clearButton").onclick=function(){
    if (confirm("Warning: this will clear ALL entries in the current webcomic list. Proceed?"))
      loadList([WCBlankItem]);
  };
  document.getElementById("saveOLButton").onclick=function(){saveList();};
  document.getElementById("resetOLButton").onclick=function(){
    if (confirm("Reset list to saved state?"))
      reloadList();
  };
  document.getElementById("exportButton").onclick=function(){
    document.getElementById("importExportBox").value=JSON.stringify(returnOrderedList(WCArray.length));
  };
  document.getElementById("importButton").onclick=function(){
    if (document.getElementById("importExportBox").value != "" &&
        confirm("Replace current list with text? (Export a copy of the current list to a file first!)"))
      loadList(JSON.parse(document.getElementById("importExportBox").value));
  };
});
