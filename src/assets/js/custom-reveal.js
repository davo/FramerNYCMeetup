$(function() {

	Reveal.initialize({
		history: true,
		transition: 'fade',
		center: true,
		controls: true,
		progress: false,

	});

/*

var changeColor;


Reveal.addEventListener('soy', function(event) {
  changeColor = 'white';
}, false);

Reveal.addEventListener('manos', function(event) {
  changeColor = 'white';
}, false);

Reveal.addEventListener('google', function(event) {
  changeColor = 'green';
}, false);


Reveal.addEventListener('vamos', function(event) {
  changeColor = 'red';
}, false);


Reveal.addEventListener('slidechanged', function(event) {

	var tl = new TimelineMax();
	var content;


	for (var i = 0; i < event.currentSlide.children.length ; i++){
		var tag = event.currentSlide.children[i].localName;

		if (tag == "h1" || tag == "p"){
			var content = $(event.currentSlide.children[i]);

			contentSplit = new SplitText(content, {
				type: "words"
			});

			TweenLite.set(content, {
				perspective: 700
			});
			tl.staggerFrom(contentSplit.words, .75, {
				autoAlpha: 0,
				y: 40,
        rotationX: -180,
				ease: Power1.easeOutIn
			}, 0.35);
		}
		if (tag == "h2" || tag == "h3"){
			var content = $(event.currentSlide.children[i]);

			contentSplit = new SplitText(content, {
				type: "words"
			});

			TweenLite.set(content, {
				perspective: 700
			});
			tl.staggerFrom(contentSplit.words, .5, {
				autoAlpha: 0,
				y: 40,
				rotationX: -180,
				ease: Power1.easeOutIn
			}, 0.05);
		}

		if (tag == "ul"){
			for (var p = 0; p < event.currentSlide.children[i].children.length ; p++){

				var content = $(event.currentSlide.children[i].children[p]);

				tl.staggerFrom(content, 0.75, {
					autoAlpha: 0,
					x: (Math.random() * 200) + 500,
					rotationZ: 45,
					rotationX: 180/2,
					ease: Power1.easeInOut
				}, -1.05);

			}
		}
	}
}, false);
*/
});