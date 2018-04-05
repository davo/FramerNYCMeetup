import Reveal from 'reveal';


      // // More info about config & dependencies:
      // // - https://github.com/hakimel/reveal.js#configuration
      // // - https://github.com/hakimel/reveal.js#dependencies
      // Reveal.initialize({
      //   history: true,
      //   center: true,
      //   controls: true,
      //   progress: false,
      //   width: '100%', //'100%',
      //   height: '100%', //'100%',
      //   margin: 0,
      //   transition: 'none', // none/fade/slide/convex/concave/zoom
      //   dependencies: [
      //     { src: 'components/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
      //     { src: 'components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
      //   ]
      // });

var libPath = '../node_modules/reveal.js/';

Reveal.initialize({
  width: '100%',
  height: '100%',
  margin: 0,
  minScale: 1,
  maxScale: 1,
  history: true,
  progress: false,
  dependencies: [
    // Cross-browser shim that fully implements classList
    {
      src: libPath + 'lib/js/classList.js',
      condition: function() {
        return !document.body.classList;
      }
    },

    // // Interpret Markdown in <section> elements
    // {
    //   src: libPath + 'plugin/markdown/marked.js',
    //   condition: function() {
    //     return !!document.querySelector( '[data-markdown]' );
    //   }
    // },

    // {
    //   src: libPath + 'plugin/markdown/markdown.js',
    //   condition: function() {
    //     return !!document.querySelector( '[data-markdown]' );
    //   }
    // },

    // Syntax highlight for <code> elements
    {
      src: libPath + 'plugin/highlight/highlight.js',
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad();
      }
    },

    // // Zoom in and out with Alt+click
    // { src: libPath + 'plugin/zoom-js/zoom.js', async: true },

    // // Speaker notes
    // { src: libPath + 'plugin/notes/notes.js', async: true }
  ]
});