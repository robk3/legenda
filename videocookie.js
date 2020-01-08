let videoID = location.search.split('id=')[1];
const playerInstance = jwplayer();
let cookieDays = 7;
let haveSeek = false;
let seekData = 0;

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (cookieDays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.onload = function(){
  let cookieData = getCookie(videoID)

  if(cookieData != ""){
      swal({
        title: "Deseja continuar o video de onde você parou?",
        icon: "warning",
         buttons: ["Não", "Sim"],
         dangerMode: false,
       }).then((finished) => {
         if (finished) {
           haveSeek = true;
           seekData = cookieData;
           console.log(cookieData)
         }
       });    
   }

}


playerInstance.once('play', function(e) {
  if(haveSeek){
    jwplayer().seek(seekData)
    console.log(seekData)
  }
});

playerInstance.on('time', function(e) {
  setCookie(videoID,Math.floor(e.position))
});