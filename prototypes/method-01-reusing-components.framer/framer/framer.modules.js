require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"imagefill/imageFill":[function(require,module,exports){
var currentProject, showCredit;

currentProject = window.location.pathname.split("/")[window.location.pathname.split("/").length - 2];

if (Layer.prototype.imageFill === void 0) {
  Layer.prototype.imageFill = function(q) {
    var fillImages, imageNb, oReq, project, res;
    if (!q) {
      q = "";
    }
    if (localStorage.getItem("fillImages")) {
      fillImages = JSON.parse(localStorage.getItem("fillImages"));
      project = _.findIndex(fillImages.projects, {
        name: currentProject
      });
      if (project !== -1) {
        if (this.name !== "") {
          imageNb = _.findIndex(fillImages.projects[project].imageList, {
            name: this.name
          });
          if (imageNb !== -1) {
            this.image = fillImages.projects[project].imageList[imageNb].url;
            this.imageSaved = true;
          }
        }
      }
    }
    if (!this.imageSaved) {
      if (!this.name) {
        throw "A name for the layer you want to fill is required";
        return 0;
      }
      oReq = new XMLHttpRequest();
      res = "null";
      oReq.onload = function() {
        var buffer;
        buffer = oReq.response;
        return res = JSON.parse(buffer);
      };
      oReq.open("GET", "https://api.unsplash.com/photos/random?query=" + q + "&client_id=aff8cc7683bb0054396a790d5d0e942a93de3ae93ac83b8d13f6bf89a96b3ba8", false);
      oReq.send();
      if (res.errors) {
        throw "Search term didn't give any result";
        return 0;
      }
      showCredit(res, this, q);
      return this.image = res.urls.regular;
    }
  };
} else {
  throw "Method imageFill already exists";
}

showCredit = function(photo, layer, q) {
  var changeImage, credit, creditPhoto, creditUnsplash, keepImage;
  credit = new Layer({
    name: "credit",
    y: Align.bottom(-8),
    height: 30,
    borderRadius: 8,
    width: Screen.width - 20,
    x: Align.center,
    clip: true,
    opacity: 0,
    animOptions: {
      time: 0.3,
      delay: 0.2
    }
  });
  credit.states.on = {
    opacity: 1,
    animOptions: {
      time: 0.3
    }
  };
  credit.stateCycle();
  keepImage = new TextLayer({
    name: "keep",
    parent: credit,
    text: "✔︎",
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#69C640",
    lineHeight: 1.55,
    width: 40,
    height: 30,
    x: Align.right,
    y: 0
  });
  keepImage.states.selected = {
    backgroundColor: "#2D561C",
    animOptions: {
      time: 0.1
    }
  };
  keepImage.on(Events.Tap, function() {
    var fillImages, newProject, projectNb;
    keepImage.stateCycle();
    fillImages = {
      projects: []
    };
    if (localStorage.getItem("fillImages")) {
      fillImages = JSON.parse(localStorage.getItem("fillImages"));
    }
    projectNb = _.findIndex(fillImages.projects, {
      name: currentProject
    });
    if (projectNb < 0) {
      projectNb = fillImages.projects.length;
      newProject = {
        name: currentProject,
        imageList: []
      };
      fillImages.projects.push(newProject);
    }
    fillImages.projects[projectNb].imageList.push({
      name: layer.name,
      url: photo.urls.regular
    });
    localStorage.setItem("fillImages", JSON.stringify(fillImages));
    credit.stateCycle();
    return credit.on(Events.StateSwitchEnd, function() {
      return credit.destroy();
    });
  });
  changeImage = new TextLayer({
    name: "change",
    parent: credit,
    text: "✘",
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#D5373C",
    width: 40,
    height: 30,
    lineHeight: 1.55,
    x: Align.right(-40),
    y: 0
  });
  changeImage.states.selected = {
    backgroundColor: "#741E21",
    animOptions: {
      time: 0.1
    }
  };
  changeImage.on(Events.Tap, function() {
    changeImage.stateCycle();
    credit.stateCycle();
    return credit.on(Events.StateSwitchEnd, function() {
      credit.destroy();
      return layer.imageFill(q);
    });
  });
  creditUnsplash = new TextLayer({
    name: "Unsplash",
    parent: credit,
    fontSize: 10,
    color: "#000000",
    textDecoration: "underline",
    text: "Image from Unsplash",
    y: Align.center,
    x: 12
  });
  creditUnsplash.on(Events.Tap, function() {
    return window.open("https://unsplash.com/?utm_source=framerImageFill&utm_medium=referral&utm_campaign=api-credit", "_blank");
  });
  creditPhoto = new TextLayer({
    name: "Photographer",
    parent: credit,
    fontSize: 10,
    color: "#000000",
    textDecoration: "underline",
    text: "Photo by " + photo.user.username,
    truncate: true,
    width: credit.width - 122 - 80,
    y: Align.center,
    x: 122
  });
  return creditPhoto.on(Events.Tap, function() {
    return window.open("https://unsplash.com/@" + photo.user.username + "?utm_source=framerImageFill&utm_medium=referral&utm_campaign=api-credit", "_blank");
  });
};


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2Rhdm8vd3JrL2ZyYW1lci93b3Jrc2hvcFNrZXRjaEZyYW1lci9Ta2V0Y2hGcmFtZXJXb3Jrc2hvcC9wcm90b3R5cGVzL21ldGhvZC0wMS1yZXVzaW5nLWNvbXBvbmVudHMuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGF2by93cmsvZnJhbWVyL3dvcmtzaG9wU2tldGNoRnJhbWVyL1NrZXRjaEZyYW1lcldvcmtzaG9wL3Byb3RvdHlwZXMvbWV0aG9kLTAxLXJldXNpbmctY29tcG9uZW50cy5mcmFtZXIvbW9kdWxlcy9pbWFnZWZpbGwvaW1hZ2VGaWxsLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsImN1cnJlbnRQcm9qZWN0ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpLmxlbmd0aC0yXVxuXG5pZiBMYXllci5wcm90b3R5cGUuaW1hZ2VGaWxsID09IHVuZGVmaW5lZFxuXHRMYXllci5wcm90b3R5cGUuaW1hZ2VGaWxsID0gKHEpIC0+XG5cdFx0aWYgIXFcblx0XHRcdHE9XCJcIlxuXHRcdGlmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZmlsbEltYWdlc1wiKVxuXHRcdFx0ZmlsbEltYWdlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJmaWxsSW1hZ2VzXCIpKVxuXHRcdFx0cHJvamVjdCA9IF8uZmluZEluZGV4KGZpbGxJbWFnZXMucHJvamVjdHMsIHtuYW1lIDogY3VycmVudFByb2plY3R9KVxuXHRcdFx0aWYgcHJvamVjdCAhPSAtMVxuXHRcdFx0XHRpZiBAbmFtZSAhPSBcIlwiXG5cdFx0XHRcdFx0aW1hZ2VOYiA9IF8uZmluZEluZGV4KGZpbGxJbWFnZXMucHJvamVjdHNbcHJvamVjdF0uaW1hZ2VMaXN0LCB7bmFtZSA6IEBuYW1lfSlcblx0XHRcdFx0XHRpZihpbWFnZU5iICE9IC0xKVxuXHRcdFx0XHRcdFx0QGltYWdlID0gZmlsbEltYWdlcy5wcm9qZWN0c1twcm9qZWN0XS5pbWFnZUxpc3RbaW1hZ2VOYl0udXJsXG5cdFx0XHRcdFx0XHRAaW1hZ2VTYXZlZCA9IHRydWVcblxuXHRcdGlmICFAaW1hZ2VTYXZlZFxuXHRcdFx0aWYgIUBuYW1lXG5cdFx0XHRcdHRocm93IFwiQSBuYW1lIGZvciB0aGUgbGF5ZXIgeW91IHdhbnQgdG8gZmlsbCBpcyByZXF1aXJlZFwiXG5cdFx0XHRcdHJldHVybiAwXG5cdFx0XHRvUmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblx0XHRcdHJlcyA9IFwibnVsbFwiXG5cdFx0XHRvUmVxLm9ubG9hZCA9IC0+XG5cdFx0XHRcdGJ1ZmZlciA9IG9SZXEucmVzcG9uc2Vcblx0XHRcdFx0cmVzID0gSlNPTi5wYXJzZShidWZmZXIpXG5cdFx0XHRvUmVxLm9wZW4oXCJHRVRcIiwgXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3JhbmRvbT9xdWVyeT0je3F9JmNsaWVudF9pZD1hZmY4Y2M3NjgzYmIwMDU0Mzk2YTc5MGQ1ZDBlOTQyYTkzZGUzYWU5M2FjODNiOGQxM2Y2YmY4OWE5NmIzYmE4XCIsIGZhbHNlKVxuXHRcdFx0b1JlcS5zZW5kKClcblx0XHRcdGlmIHJlcy5lcnJvcnNcblx0XHRcdFx0dGhyb3cgXCJTZWFyY2ggdGVybSBkaWRuJ3QgZ2l2ZSBhbnkgcmVzdWx0XCJcblx0XHRcdFx0cmV0dXJuIDBcblx0XHRcdHNob3dDcmVkaXQocmVzLCB0aGlzLCBxKVxuXHRcdFx0QGltYWdlID0gcmVzLnVybHMucmVndWxhclxuZWxzZVxuXHR0aHJvdyBcIk1ldGhvZCBpbWFnZUZpbGwgYWxyZWFkeSBleGlzdHNcIlxuXG5zaG93Q3JlZGl0ID0gKHBob3RvLCBsYXllciwgcSkgLT5cblx0Y3JlZGl0ID0gbmV3IExheWVyXG5cdFx0bmFtZTogXCJjcmVkaXRcIlxuXHRcdHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRoZWlnaHQ6IDMwXG5cdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0d2lkdGg6IFNjcmVlbi53aWR0aCAtIDIwXG5cdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0Y2xpcDogdHJ1ZVxuXHRcdG9wYWNpdHk6IDBcblx0XHRhbmltT3B0aW9uczpcblx0XHRcdHRpbWU6IDAuM1xuXHRcdFx0ZGVsYXk6IDAuMlxuXG5cdGNyZWRpdC5zdGF0ZXMub24gPVxuXHRcdG9wYWNpdHk6IDFcblx0XHRhbmltT3B0aW9uczpcblx0XHRcdHRpbWU6IDAuM1xuXHRjcmVkaXQuc3RhdGVDeWNsZSgpXG5cblx0a2VlcEltYWdlID0gbmV3IFRleHRMYXllclxuXHRcdG5hbWU6IFwia2VlcFwiXG5cdFx0cGFyZW50OiBjcmVkaXRcblx0XHR0ZXh0OiBcIuKclO+4jlwiXG5cdFx0Zm9udFNpemU6IDIwXG5cdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0Y29sb3I6IFwiI2ZmZmZmZlwiXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIiM2OUM2NDBcIlxuXHRcdGxpbmVIZWlnaHQ6IDEuNTVcblx0XHR3aWR0aDogNDBcblx0XHRoZWlnaHQ6IDMwXG5cdFx0eDogQWxpZ24ucmlnaHRcblx0XHR5OiAwXG5cblx0a2VlcEltYWdlLnN0YXRlcy5zZWxlY3RlZCA9XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyRDU2MUNcIlxuXHRcdGFuaW1PcHRpb25zOlxuXHRcdFx0dGltZTogMC4xXG5cblx0a2VlcEltYWdlLm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0a2VlcEltYWdlLnN0YXRlQ3ljbGUoKVxuXHRcdGZpbGxJbWFnZXMgPSB7cHJvamVjdHM6IFtdfVxuXHRcdGlmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZmlsbEltYWdlc1wiKVxuXHRcdFx0ZmlsbEltYWdlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJmaWxsSW1hZ2VzXCIpKVxuXHRcdHByb2plY3ROYiA9IF8uZmluZEluZGV4KGZpbGxJbWFnZXMucHJvamVjdHMsIHtuYW1lIDogY3VycmVudFByb2plY3R9KVxuXHRcdGlmIHByb2plY3ROYiA8IDBcblx0XHRcdHByb2plY3ROYiA9IGZpbGxJbWFnZXMucHJvamVjdHMubGVuZ3RoXG5cdFx0XHRuZXdQcm9qZWN0ID0ge25hbWU6IGN1cnJlbnRQcm9qZWN0LCBpbWFnZUxpc3Q6IFtdfVxuXHRcdFx0ZmlsbEltYWdlcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG5cdFx0ZmlsbEltYWdlcy5wcm9qZWN0c1twcm9qZWN0TmJdLmltYWdlTGlzdC5wdXNoKHtuYW1lOiBsYXllci5uYW1lLCB1cmwgOiBwaG90by51cmxzLnJlZ3VsYXJ9KVxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZmlsbEltYWdlc1wiLCBKU09OLnN0cmluZ2lmeShmaWxsSW1hZ2VzKSlcblx0XHRjcmVkaXQuc3RhdGVDeWNsZSgpXG5cdFx0Y3JlZGl0Lm9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgLT5cblx0XHRcdGNyZWRpdC5kZXN0cm95KClcblxuXHRjaGFuZ2VJbWFnZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBcImNoYW5nZVwiXG5cdFx0cGFyZW50OiBjcmVkaXRcblx0XHR0ZXh0OiBcIuKcmFwiXG5cdFx0Zm9udFNpemU6IDIwXG5cdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0Y29sb3I6IFwiI2ZmZmZmZlwiXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIiNENTM3M0NcIlxuXHRcdHdpZHRoOiA0MFxuXHRcdGhlaWdodDogMzBcblx0XHRsaW5lSGVpZ2h0OiAxLjU1XG5cdFx0eDogQWxpZ24ucmlnaHQoLTQwKVxuXHRcdHk6IDBcblxuXHRjaGFuZ2VJbWFnZS5zdGF0ZXMuc2VsZWN0ZWQgPVxuXHRcdGJhY2tncm91bmRDb2xvcjogXCIjNzQxRTIxXCJcblx0XHRhbmltT3B0aW9uczpcblx0XHRcdHRpbWU6IDAuMVxuXG5cdGNoYW5nZUltYWdlLm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0Y2hhbmdlSW1hZ2Uuc3RhdGVDeWNsZSgpXG5cdFx0Y3JlZGl0LnN0YXRlQ3ljbGUoKVxuXHRcdGNyZWRpdC5vbiBFdmVudHMuU3RhdGVTd2l0Y2hFbmQsIC0+XG5cdFx0XHRjcmVkaXQuZGVzdHJveSgpXG5cdFx0XHRsYXllci5pbWFnZUZpbGwocSlcblxuXHRjcmVkaXRVbnNwbGFzaCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBcIlVuc3BsYXNoXCJcblx0XHRwYXJlbnQ6IGNyZWRpdFxuXHRcdGZvbnRTaXplOiAxMFxuXHRcdGNvbG9yOiBcIiMwMDAwMDBcIlxuXHRcdHRleHREZWNvcmF0aW9uOiBcInVuZGVybGluZVwiXG5cdFx0dGV4dDogXCJJbWFnZSBmcm9tIFVuc3BsYXNoXCJcblx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHR4OiAxMlxuXHRjcmVkaXRVbnNwbGFzaC5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdHdpbmRvdy5vcGVuKFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vP3V0bV9zb3VyY2U9ZnJhbWVySW1hZ2VGaWxsJnV0bV9tZWRpdW09cmVmZXJyYWwmdXRtX2NhbXBhaWduPWFwaS1jcmVkaXRcIiwgXCJfYmxhbmtcIilcblxuXHRjcmVkaXRQaG90byA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBcIlBob3RvZ3JhcGhlclwiXG5cdFx0cGFyZW50OiBjcmVkaXRcblx0XHRmb250U2l6ZTogMTBcblx0XHRjb2xvcjogXCIjMDAwMDAwXCJcblx0XHR0ZXh0RGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIlxuXHRcdHRleHQ6IFwiUGhvdG8gYnkgI3twaG90by51c2VyLnVzZXJuYW1lfVwiXG5cdFx0dHJ1bmNhdGU6IHRydWVcblx0XHR3aWR0aDogY3JlZGl0LndpZHRoIC0gMTIyIC0gODBcblx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHR4OiAxMjJcblxuXHRjcmVkaXRQaG90by5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdHdpbmRvdy5vcGVuKFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vQCN7cGhvdG8udXNlci51c2VybmFtZX0/dXRtX3NvdXJjZT1mcmFtZXJJbWFnZUZpbGwmdXRtX21lZGl1bT1yZWZlcnJhbCZ1dG1fY2FtcGFpZ249YXBpLWNyZWRpdFwiLCBcIl9ibGFua1wiKVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIu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
