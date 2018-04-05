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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2Rhdm8vRGVza3RvcC9Ta2V0Y2hGcmFtZXJXb3Jrc2hvcC9wcm90b3R5cGVzL21ldGhvZC0wMi5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9kYXZvL0Rlc2t0b3AvU2tldGNoRnJhbWVyV29ya3Nob3AvcHJvdG90eXBlcy9tZXRob2QtMDIuZnJhbWVyL21vZHVsZXMvaW1hZ2VmaWxsL2ltYWdlRmlsbC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCJjdXJyZW50UHJvamVjdCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5sZW5ndGgtMl1cblxuaWYgTGF5ZXIucHJvdG90eXBlLmltYWdlRmlsbCA9PSB1bmRlZmluZWRcblx0TGF5ZXIucHJvdG90eXBlLmltYWdlRmlsbCA9IChxKSAtPlxuXHRcdGlmICFxXG5cdFx0XHRxPVwiXCJcblx0XHRpZiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZpbGxJbWFnZXNcIilcblx0XHRcdGZpbGxJbWFnZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZmlsbEltYWdlc1wiKSlcblx0XHRcdHByb2plY3QgPSBfLmZpbmRJbmRleChmaWxsSW1hZ2VzLnByb2plY3RzLCB7bmFtZSA6IGN1cnJlbnRQcm9qZWN0fSlcblx0XHRcdGlmIHByb2plY3QgIT0gLTFcblx0XHRcdFx0aWYgQG5hbWUgIT0gXCJcIlxuXHRcdFx0XHRcdGltYWdlTmIgPSBfLmZpbmRJbmRleChmaWxsSW1hZ2VzLnByb2plY3RzW3Byb2plY3RdLmltYWdlTGlzdCwge25hbWUgOiBAbmFtZX0pXG5cdFx0XHRcdFx0aWYoaW1hZ2VOYiAhPSAtMSlcblx0XHRcdFx0XHRcdEBpbWFnZSA9IGZpbGxJbWFnZXMucHJvamVjdHNbcHJvamVjdF0uaW1hZ2VMaXN0W2ltYWdlTmJdLnVybFxuXHRcdFx0XHRcdFx0QGltYWdlU2F2ZWQgPSB0cnVlXG5cblx0XHRpZiAhQGltYWdlU2F2ZWRcblx0XHRcdGlmICFAbmFtZVxuXHRcdFx0XHR0aHJvdyBcIkEgbmFtZSBmb3IgdGhlIGxheWVyIHlvdSB3YW50IHRvIGZpbGwgaXMgcmVxdWlyZWRcIlxuXHRcdFx0XHRyZXR1cm4gMFxuXHRcdFx0b1JlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cdFx0XHRyZXMgPSBcIm51bGxcIlxuXHRcdFx0b1JlcS5vbmxvYWQgPSAtPlxuXHRcdFx0XHRidWZmZXIgPSBvUmVxLnJlc3BvbnNlXG5cdFx0XHRcdHJlcyA9IEpTT04ucGFyc2UoYnVmZmVyKVxuXHRcdFx0b1JlcS5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9yYW5kb20/cXVlcnk9I3txfSZjbGllbnRfaWQ9YWZmOGNjNzY4M2JiMDA1NDM5NmE3OTBkNWQwZTk0MmE5M2RlM2FlOTNhYzgzYjhkMTNmNmJmODlhOTZiM2JhOFwiLCBmYWxzZSlcblx0XHRcdG9SZXEuc2VuZCgpXG5cdFx0XHRpZiByZXMuZXJyb3JzXG5cdFx0XHRcdHRocm93IFwiU2VhcmNoIHRlcm0gZGlkbid0IGdpdmUgYW55IHJlc3VsdFwiXG5cdFx0XHRcdHJldHVybiAwXG5cdFx0XHRzaG93Q3JlZGl0KHJlcywgdGhpcywgcSlcblx0XHRcdEBpbWFnZSA9IHJlcy51cmxzLnJlZ3VsYXJcbmVsc2Vcblx0dGhyb3cgXCJNZXRob2QgaW1hZ2VGaWxsIGFscmVhZHkgZXhpc3RzXCJcblxuc2hvd0NyZWRpdCA9IChwaG90bywgbGF5ZXIsIHEpIC0+XG5cdGNyZWRpdCA9IG5ldyBMYXllclxuXHRcdG5hbWU6IFwiY3JlZGl0XCJcblx0XHR5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0aGVpZ2h0OiAzMFxuXHRcdGJvcmRlclJhZGl1czogOFxuXHRcdHdpZHRoOiBTY3JlZW4ud2lkdGggLSAyMFxuXHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdGNsaXA6IHRydWVcblx0XHRvcGFjaXR5OiAwXG5cdFx0YW5pbU9wdGlvbnM6XG5cdFx0XHR0aW1lOiAwLjNcblx0XHRcdGRlbGF5OiAwLjJcblxuXHRjcmVkaXQuc3RhdGVzLm9uID1cblx0XHRvcGFjaXR5OiAxXG5cdFx0YW5pbU9wdGlvbnM6XG5cdFx0XHR0aW1lOiAwLjNcblx0Y3JlZGl0LnN0YXRlQ3ljbGUoKVxuXG5cdGtlZXBJbWFnZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBcImtlZXBcIlxuXHRcdHBhcmVudDogY3JlZGl0XG5cdFx0dGV4dDogXCLinJTvuI5cIlxuXHRcdGZvbnRTaXplOiAyMFxuXHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdGNvbG9yOiBcIiNmZmZmZmZcIlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCIjNjlDNjQwXCJcblx0XHRsaW5lSGVpZ2h0OiAxLjU1XG5cdFx0d2lkdGg6IDQwXG5cdFx0aGVpZ2h0OiAzMFxuXHRcdHg6IEFsaWduLnJpZ2h0XG5cdFx0eTogMFxuXG5cdGtlZXBJbWFnZS5zdGF0ZXMuc2VsZWN0ZWQgPVxuXHRcdGJhY2tncm91bmRDb2xvcjogXCIjMkQ1NjFDXCJcblx0XHRhbmltT3B0aW9uczpcblx0XHRcdHRpbWU6IDAuMVxuXG5cdGtlZXBJbWFnZS5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdGtlZXBJbWFnZS5zdGF0ZUN5Y2xlKClcblx0XHRmaWxsSW1hZ2VzID0ge3Byb2plY3RzOiBbXX1cblx0XHRpZiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZpbGxJbWFnZXNcIilcblx0XHRcdGZpbGxJbWFnZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZmlsbEltYWdlc1wiKSlcblx0XHRwcm9qZWN0TmIgPSBfLmZpbmRJbmRleChmaWxsSW1hZ2VzLnByb2plY3RzLCB7bmFtZSA6IGN1cnJlbnRQcm9qZWN0fSlcblx0XHRpZiBwcm9qZWN0TmIgPCAwXG5cdFx0XHRwcm9qZWN0TmIgPSBmaWxsSW1hZ2VzLnByb2plY3RzLmxlbmd0aFxuXHRcdFx0bmV3UHJvamVjdCA9IHtuYW1lOiBjdXJyZW50UHJvamVjdCwgaW1hZ2VMaXN0OiBbXX1cblx0XHRcdGZpbGxJbWFnZXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxuXHRcdGZpbGxJbWFnZXMucHJvamVjdHNbcHJvamVjdE5iXS5pbWFnZUxpc3QucHVzaCh7bmFtZTogbGF5ZXIubmFtZSwgdXJsIDogcGhvdG8udXJscy5yZWd1bGFyfSlcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImZpbGxJbWFnZXNcIiwgSlNPTi5zdHJpbmdpZnkoZmlsbEltYWdlcykpXG5cdFx0Y3JlZGl0LnN0YXRlQ3ljbGUoKVxuXHRcdGNyZWRpdC5vbiBFdmVudHMuU3RhdGVTd2l0Y2hFbmQsIC0+XG5cdFx0XHRjcmVkaXQuZGVzdHJveSgpXG5cblx0Y2hhbmdlSW1hZ2UgPSBuZXcgVGV4dExheWVyXG5cdFx0bmFtZTogXCJjaGFuZ2VcIlxuXHRcdHBhcmVudDogY3JlZGl0XG5cdFx0dGV4dDogXCLinJhcIlxuXHRcdGZvbnRTaXplOiAyMFxuXHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdGNvbG9yOiBcIiNmZmZmZmZcIlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCIjRDUzNzNDXCJcblx0XHR3aWR0aDogNDBcblx0XHRoZWlnaHQ6IDMwXG5cdFx0bGluZUhlaWdodDogMS41NVxuXHRcdHg6IEFsaWduLnJpZ2h0KC00MClcblx0XHR5OiAwXG5cblx0Y2hhbmdlSW1hZ2Uuc3RhdGVzLnNlbGVjdGVkID1cblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzc0MUUyMVwiXG5cdFx0YW5pbU9wdGlvbnM6XG5cdFx0XHR0aW1lOiAwLjFcblxuXHRjaGFuZ2VJbWFnZS5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdGNoYW5nZUltYWdlLnN0YXRlQ3ljbGUoKVxuXHRcdGNyZWRpdC5zdGF0ZUN5Y2xlKClcblx0XHRjcmVkaXQub24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAtPlxuXHRcdFx0Y3JlZGl0LmRlc3Ryb3koKVxuXHRcdFx0bGF5ZXIuaW1hZ2VGaWxsKHEpXG5cblx0Y3JlZGl0VW5zcGxhc2ggPSBuZXcgVGV4dExheWVyXG5cdFx0bmFtZTogXCJVbnNwbGFzaFwiXG5cdFx0cGFyZW50OiBjcmVkaXRcblx0XHRmb250U2l6ZTogMTBcblx0XHRjb2xvcjogXCIjMDAwMDAwXCJcblx0XHR0ZXh0RGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIlxuXHRcdHRleHQ6IFwiSW1hZ2UgZnJvbSBVbnNwbGFzaFwiXG5cdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0eDogMTJcblx0Y3JlZGl0VW5zcGxhc2gub24gRXZlbnRzLlRhcCwgLT5cblx0XHR3aW5kb3cub3BlbihcImh0dHBzOi8vdW5zcGxhc2guY29tLz91dG1fc291cmNlPWZyYW1lckltYWdlRmlsbCZ1dG1fbWVkaXVtPXJlZmVycmFsJnV0bV9jYW1wYWlnbj1hcGktY3JlZGl0XCIsIFwiX2JsYW5rXCIpXG5cblx0Y3JlZGl0UGhvdG8gPSBuZXcgVGV4dExheWVyXG5cdFx0bmFtZTogXCJQaG90b2dyYXBoZXJcIlxuXHRcdHBhcmVudDogY3JlZGl0XG5cdFx0Zm9udFNpemU6IDEwXG5cdFx0Y29sb3I6IFwiIzAwMDAwMFwiXG5cdFx0dGV4dERlY29yYXRpb246IFwidW5kZXJsaW5lXCJcblx0XHR0ZXh0OiBcIlBob3RvIGJ5ICN7cGhvdG8udXNlci51c2VybmFtZX1cIlxuXHRcdHRydW5jYXRlOiB0cnVlXG5cdFx0d2lkdGg6IGNyZWRpdC53aWR0aCAtIDEyMiAtIDgwXG5cdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0eDogMTIyXG5cblx0Y3JlZGl0UGhvdG8ub24gRXZlbnRzLlRhcCwgLT5cblx0XHR3aW5kb3cub3BlbihcImh0dHBzOi8vdW5zcGxhc2guY29tL0Aje3Bob3RvLnVzZXIudXNlcm5hbWV9P3V0bV9zb3VyY2U9ZnJhbWVySW1hZ2VGaWxsJnV0bV9tZWRpdW09cmVmZXJyYWwmdXRtX2NhbXBhaWduPWFwaS1jcmVkaXRcIiwgXCJfYmxhbmtcIilcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FEQUEsSUFBQTs7QUFBQSxjQUFBLEdBQWlC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
