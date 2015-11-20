/*  WCArray.js ** Sean Sutherland
    Imports WCArray, SetArray, etc globals, and deals with local storage. */

var WCArrayDefault = [
  {name:"Questionable Content", url:"http://questionablecontent.net/", days:"MTWRF", nsfw:false, imgurl:""},
  {name:"xkcd", url:"http://xkcd.com/", days:"MWF", nsfw:false, imgurl:""},
  {name:"Leftover Soup", url:"http://leftoversoup.com/", days:"MWF", nsfw:false, imgurl:""},
  {name:"Homestuck", url:"http://www.mspaintadventures.com/", days:"MWF", nsfw:false, imgurl:""},
  {name:"Dumbing of Age", url:"http://www.dumbingofage.com/", days:"MTWRFSU", nsfw:false, imgurl:""},
  {name:"S<small>aturday</small> M<small>orning</small> B<small>reakfast</small> C<small>ereal</small>", url:"http://www.smbc-comics.com/", days:"MTWRFSU", nsfw:false, imgurl:""},
  {name:"Paradox Space", url:"http://paradoxspace.com/", days:"MTWRF", nsfw:false, imgurl:""},
  {name:"Sandra and Woo", url:"http://www.sandraandwoo.com/", days:"MR", nsfw:false, imgurl:""},
  {name:"Gaia", url:"http://www.sandraandwoo.com/gaia/", days:"TF", nsfw:false, imgurl:""},
  {name:"Selkie", url:"http://www.selkiecomic.com/", days:"MWF", nsfw:false, imgurl:""},
  {name:"Two Guys and Guy", url:"http://www.twogag.com/", days:"MWF", nsfw:false, imgurl:""},
  {name:"Manly G<small>uys</small> D<small>oing</small> Manly T<small>hings</small>", url:"http://thepunchlineismachismo.com/", days:"M", nsfw:false, imgurl:""},
  {name:"Cucumber Quest", url:"http://cucumber.gigidigi.com/recent.html", days:"MW", nsfw:false, imgurl:""},
  {name:"What-if?", url:"http://what-if.xkcd.com/", days:"T", nsfw:false, imgurl:""},
  {name:"Drive", url:"http://www.drivecomic.com/", days:"I", nsfw:false, imgurl:""},
  {name:"Angel Food", url:"http://angelfoodcomic.com/", days:"R", nsfw:false, imgurl:""},
  {name:"Subnormality", url:"http://www.viruscomix.com/subnormality.html", days:"I", nsfw:false, imgurl:""},
  {name:"Enjuhneer", url:"http://www.enjuhneer.com/", days:"I", nsfw:false, imgurl:""},
  {name:"Eerie Cuties", url:"http://www.eeriecuties.com/", days:"MW", nsfw:false, imgurl:""},
  {name:"Magick Chicks", url:"http://www.magickchicks.com/", days:"TF", nsfw:false, imgurl:""},
  {name:"Dangerously Chloe", url:"http://www.dangerouslychloe.com/", days:"MR", nsfw:true, imgurl:""},
  {name:"Blip <small>(Defunct?)</small>", url:"http://www.blipcomic.com/", days:"I", nsfw:true, imgurl:""},
  {name:"Evil Diva", url:"http://www.evildivacomics.com/", days:"I", nsfw:false, imgurl:""},
  {name:"Camp Weedonwantcha", url:"http://campcomic.com/", days:"TF", nsfw:false, imgurl:""},
  {name:"", url:"", days:"", nsfw:false, imgurl:""}
];

var WCBlankItem= {name:"", url:"", days:"", nsfw:false, imgurl:""};

if (!window.localStorage.getItem("WCList:WCArray")) { //if no WCList Locally Stored
  //WCArray = [WCBlankItem]; //For release
  WCArray = WCArrayDefault
  window.localStorage.setItem("WCList:WCArray", JSON.stringify(WCArrayDefault));
} else {
  WCArray = JSON.parse(window.localStorage.getItem("WCList:WCArray"));
}

function ArraySFW (WCArrayNN) {
  for (i=0;i<WCArrayNN.length;i++) { //remove NSFW from WCArrayNN
    if (WCArrayNN[i].nsfw==true) {
      WCArrayNN.splice(i,1);
      i--;
    }
  }
  return WCArrayNN
}

var SetArrayDefault = {
  gshowNSFW: "tagNSFW",
  gHNext: "HNextTrue",
  gshowTitle: ["hideTitle",""]
}

if (!window.localStorage.getItem("WCList:SetArray")) { //if no SetArray Locally Stored
  SetArray = SetArrayDefault;
  window.localStorage.setItem("WCList:SetArray", JSON.stringify(SetArrayDefault));
} else {
  SetArray = JSON.parse(window.localStorage.getItem("WCList:SetArray"));
}

Array.prototype.swap = function (x,y) { //swap two array values. Why isn't this standard?
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}