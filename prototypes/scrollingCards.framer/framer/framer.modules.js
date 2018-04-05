require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * @license
 *
 * chroma.js - JavaScript library for color conversions
 * 
 * Copyright (c) 2011-2017, Gregor Aisch
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

(function() {
  var Color, DEG2RAD, LAB_CONSTANTS, PI, PITHIRD, RAD2DEG, TWOPI, _guess_formats, _guess_formats_sorted, _input, _interpolators, abs, atan2, bezier, blend, blend_f, brewer, burn, chroma, clip_rgb, cmyk2rgb, colors, cos, css2rgb, darken, dodge, each, floor, hcg2rgb, hex2rgb, hsi2rgb, hsl2css, hsl2rgb, hsv2rgb, interpolate, interpolate_hsx, interpolate_lab, interpolate_num, interpolate_rgb, lab2lch, lab2rgb, lab_xyz, lch2lab, lch2rgb, lighten, limit, log, luminance_x, m, max, multiply, normal, num2rgb, overlay, pow, rgb2cmyk, rgb2css, rgb2hcg, rgb2hex, rgb2hsi, rgb2hsl, rgb2hsv, rgb2lab, rgb2lch, rgb2luminance, rgb2num, rgb2temperature, rgb2xyz, rgb_xyz, rnd, root, round, screen, sin, sqrt, temperature2rgb, type, unpack, w3cx11, xyz_lab, xyz_rgb,
    slice = [].slice;

  type = (function() {

    /*
    for browser-safe type checking+
    ported from jQuery's $.type
     */
    var classToType, len, name, o, ref;
    classToType = {};
    ref = "Boolean Number String Function Array Date RegExp Undefined Null".split(" ");
    for (o = 0, len = ref.length; o < len; o++) {
      name = ref[o];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    return function(obj) {
      var strType;
      strType = Object.prototype.toString.call(obj);
      return classToType[strType] || "object";
    };
  })();

  limit = function(x, min, max) {
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1;
    }
    if (x < min) {
      x = min;
    }
    if (x > max) {
      x = max;
    }
    return x;
  };

  unpack = function(args) {
    if (args.length >= 3) {
      return [].slice.call(args);
    } else {
      return args[0];
    }
  };

  clip_rgb = function(rgb) {
    var i, o;
    rgb._clipped = false;
    rgb._unclipped = rgb.slice(0);
    for (i = o = 0; o < 3; i = ++o) {
      if (i < 3) {
        if (rgb[i] < 0 || rgb[i] > 255) {
          rgb._clipped = true;
        }
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 255) {
          rgb[i] = 255;
        }
      } else if (i === 3) {
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 1) {
          rgb[i] = 1;
        }
      }
    }
    if (!rgb._clipped) {
      delete rgb._unclipped;
    }
    return rgb;
  };

  PI = Math.PI, round = Math.round, cos = Math.cos, floor = Math.floor, pow = Math.pow, log = Math.log, sin = Math.sin, sqrt = Math.sqrt, atan2 = Math.atan2, max = Math.max, abs = Math.abs;

  TWOPI = PI * 2;

  PITHIRD = PI / 3;

  DEG2RAD = PI / 180;

  RAD2DEG = 180 / PI;

  chroma = function() {
    if (arguments[0] instanceof Color) {
      return arguments[0];
    }
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, arguments, function(){});
  };

  _interpolators = [];

  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = chroma;
  }

  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return chroma;
    });
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.chroma = chroma;
  }

  chroma.version = '1.3.4';

  _input = {};

  _guess_formats = [];

  _guess_formats_sorted = false;

  Color = (function() {
    function Color() {
      var arg, args, chk, len, len1, me, mode, o, w;
      me = this;
      args = [];
      for (o = 0, len = arguments.length; o < len; o++) {
        arg = arguments[o];
        if (arg != null) {
          args.push(arg);
        }
      }
      mode = args[args.length - 1];
      if (_input[mode] != null) {
        me._rgb = clip_rgb(_input[mode](unpack(args.slice(0, -1))));
      } else {
        if (!_guess_formats_sorted) {
          _guess_formats = _guess_formats.sort(function(a, b) {
            return b.p - a.p;
          });
          _guess_formats_sorted = true;
        }
        for (w = 0, len1 = _guess_formats.length; w < len1; w++) {
          chk = _guess_formats[w];
          mode = chk.test.apply(chk, args);
          if (mode) {
            break;
          }
        }
        if (mode) {
          me._rgb = clip_rgb(_input[mode].apply(_input, args));
        }
      }
      if (me._rgb == null) {
        console.warn('unknown format: ' + args);
      }
      if (me._rgb == null) {
        me._rgb = [0, 0, 0];
      }
      if (me._rgb.length === 3) {
        me._rgb.push(1);
      }
    }

    Color.prototype.toString = function() {
      return this.hex();
    };

    Color.prototype.clone = function() {
      return chroma(me._rgb);
    };

    return Color;

  })();

  chroma._input = _input;


  /**
  	ColorBrewer colors for chroma.js
  
  	Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The 
  	Pennsylvania State University.
  
  	Licensed under the Apache License, Version 2.0 (the "License"); 
  	you may not use this file except in compliance with the License.
  	You may obtain a copy of the License at	
  	http://www.apache.org/licenses/LICENSE-2.0
  
  	Unless required by applicable law or agreed to in writing, software distributed
  	under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
  	CONDITIONS OF ANY KIND, either express or implied. See the License for the
  	specific language governing permissions and limitations under the License.
  
      @preserve
   */

  chroma.brewer = brewer = {
    OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
    PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
    BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
    Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
    BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
    YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
    Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
    RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
    Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
    YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
    Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
    GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
    Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
    YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
    PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
    Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
    PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
    Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],
    Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
    RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
    RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
    PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
    PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
    RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
    BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
    RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
    PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],
    Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
    Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
    Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
    Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
    Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
    Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
    Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
    Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
  };

  (function() {
    var key, results;
    results = [];
    for (key in brewer) {
      results.push(brewer[key.toLowerCase()] = brewer[key]);
    }
    return results;
  })();


  /**
  	X11 color names
  
  	http://www.w3.org/TR/css3-color/#svg-color
   */

  w3cx11 = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflower: '#6495ed',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    laserlemon: '#ffff54',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrod: '#fafad2',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    maroon2: '#7f0000',
    maroon3: '#b03060',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    purple2: '#7f007f',
    purple3: '#a020f0',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
  };

  chroma.colors = colors = w3cx11;

  lab2rgb = function() {
    var a, args, b, g, l, r, x, y, z;
    args = unpack(arguments);
    l = args[0], a = args[1], b = args[2];
    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;
    y = LAB_CONSTANTS.Yn * lab_xyz(y);
    x = LAB_CONSTANTS.Xn * lab_xyz(x);
    z = LAB_CONSTANTS.Zn * lab_xyz(z);
    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
    b = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  xyz_rgb = function(r) {
    return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055);
  };

  lab_xyz = function(t) {
    if (t > LAB_CONSTANTS.t1) {
      return t * t * t;
    } else {
      return LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
    }
  };

  LAB_CONSTANTS = {
    Kn: 18,
    Xn: 0.950470,
    Yn: 1,
    Zn: 1.088830,
    t0: 0.137931034,
    t1: 0.206896552,
    t2: 0.12841855,
    t3: 0.008856452
  };

  rgb2lab = function() {
    var b, g, r, ref, ref1, x, y, z;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    ref1 = rgb2xyz(r, g, b), x = ref1[0], y = ref1[1], z = ref1[2];
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  };

  rgb_xyz = function(r) {
    if ((r /= 255) <= 0.04045) {
      return r / 12.92;
    } else {
      return pow((r + 0.055) / 1.055, 2.4);
    }
  };

  xyz_lab = function(t) {
    if (t > LAB_CONSTANTS.t3) {
      return pow(t, 1 / 3);
    } else {
      return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
    }
  };

  rgb2xyz = function() {
    var b, g, r, ref, x, y, z;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
    y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS.Yn);
    z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
    return [x, y, z];
  };

  chroma.lab = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['lab']), function(){});
  };

  _input.lab = lab2rgb;

  Color.prototype.lab = function() {
    return rgb2lab(this._rgb);
  };

  bezier = function(colors) {
    var I, I0, I1, c, lab0, lab1, lab2, lab3, ref, ref1, ref2;
    colors = (function() {
      var len, o, results;
      results = [];
      for (o = 0, len = colors.length; o < len; o++) {
        c = colors[o];
        results.push(chroma(c));
      }
      return results;
    })();
    if (colors.length === 2) {
      ref = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref[0], lab1 = ref[1];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push(lab0[i] + t * (lab1[i] - lab0[i]));
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 3) {
      ref1 = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref1[0], lab1 = ref1[1], lab2 = ref1[2];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push((1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]);
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 4) {
      ref2 = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref2[0], lab1 = ref2[1], lab2 = ref2[2], lab3 = ref2[3];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push((1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]);
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 5) {
      I0 = bezier(colors.slice(0, 3));
      I1 = bezier(colors.slice(2, 5));
      I = function(t) {
        if (t < 0.5) {
          return I0(t * 2);
        } else {
          return I1((t - 0.5) * 2);
        }
      };
    }
    return I;
  };

  chroma.bezier = function(colors) {
    var f;
    f = bezier(colors);
    f.scale = function() {
      return chroma.scale(f);
    };
    return f;
  };


  /*
      chroma.js
  
      Copyright (c) 2011-2013, Gregor Aisch
      All rights reserved.
  
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are met:
  
      * Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
  
      * Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation
        and/or other materials provided with the distribution.
  
      * The name Gregor Aisch may not be used to endorse or promote products
        derived from this software without specific prior written permission.
  
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
      AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
      IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
      DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
      INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
      DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
      OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
      EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  
      @source: https://github.com/gka/chroma.js
   */

  chroma.cubehelix = function(start, rotations, hue, gamma, lightness) {
    var dh, dl, f;
    if (start == null) {
      start = 300;
    }
    if (rotations == null) {
      rotations = -1.5;
    }
    if (hue == null) {
      hue = 1;
    }
    if (gamma == null) {
      gamma = 1;
    }
    if (lightness == null) {
      lightness = [0, 1];
    }
    dh = 0;
    if (type(lightness) === 'array') {
      dl = lightness[1] - lightness[0];
    } else {
      dl = 0;
      lightness = [lightness, lightness];
    }
    f = function(fract) {
      var a, amp, b, cos_a, g, h, l, r, sin_a;
      a = TWOPI * ((start + 120) / 360 + rotations * fract);
      l = pow(lightness[0] + dl * fract, gamma);
      h = dh !== 0 ? hue[0] + fract * dh : hue;
      amp = h * l * (1 - l) / 2;
      cos_a = cos(a);
      sin_a = sin(a);
      r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
      g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
      b = l + amp * (+1.97294 * cos_a);
      return chroma(clip_rgb([r * 255, g * 255, b * 255]));
    };
    f.start = function(s) {
      if (s == null) {
        return start;
      }
      start = s;
      return f;
    };
    f.rotations = function(r) {
      if (r == null) {
        return rotations;
      }
      rotations = r;
      return f;
    };
    f.gamma = function(g) {
      if (g == null) {
        return gamma;
      }
      gamma = g;
      return f;
    };
    f.hue = function(h) {
      if (h == null) {
        return hue;
      }
      hue = h;
      if (type(hue) === 'array') {
        dh = hue[1] - hue[0];
        if (dh === 0) {
          hue = hue[1];
        }
      } else {
        dh = 0;
      }
      return f;
    };
    f.lightness = function(h) {
      if (h == null) {
        return lightness;
      }
      if (type(h) === 'array') {
        lightness = h;
        dl = h[1] - h[0];
      } else {
        lightness = [h, h];
        dl = 0;
      }
      return f;
    };
    f.scale = function() {
      return chroma.scale(f);
    };
    f.hue(hue);
    return f;
  };

  chroma.random = function() {
    var code, digits, i, o;
    digits = '0123456789abcdef';
    code = '#';
    for (i = o = 0; o < 6; i = ++o) {
      code += digits.charAt(floor(Math.random() * 16));
    }
    return new Color(code);
  };

  chroma.average = function(colors, mode) {
    var A, alpha, c, cnt, dx, dy, first, i, l, len, o, xyz, xyz2;
    if (mode == null) {
      mode = 'rgb';
    }
    l = colors.length;
    colors = colors.map(function(c) {
      return chroma(c);
    });
    first = colors.splice(0, 1)[0];
    xyz = first.get(mode);
    cnt = [];
    dx = 0;
    dy = 0;
    for (i in xyz) {
      xyz[i] = xyz[i] || 0;
      cnt.push(!isNaN(xyz[i]) ? 1 : 0);
      if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
        A = xyz[i] / 180 * PI;
        dx += cos(A);
        dy += sin(A);
      }
    }
    alpha = first.alpha();
    for (o = 0, len = colors.length; o < len; o++) {
      c = colors[o];
      xyz2 = c.get(mode);
      alpha += c.alpha();
      for (i in xyz) {
        if (!isNaN(xyz2[i])) {
          xyz[i] += xyz2[i];
          cnt[i] += 1;
          if (mode.charAt(i) === 'h') {
            A = xyz[i] / 180 * PI;
            dx += cos(A);
            dy += sin(A);
          }
        }
      }
    }
    for (i in xyz) {
      xyz[i] = xyz[i] / cnt[i];
      if (mode.charAt(i) === 'h') {
        A = atan2(dy / cnt[i], dx / cnt[i]) / PI * 180;
        while (A < 0) {
          A += 360;
        }
        while (A >= 360) {
          A -= 360;
        }
        xyz[i] = A;
      }
    }
    return chroma(xyz, mode).alpha(alpha / l);
  };

  _input.rgb = function() {
    var k, ref, results, v;
    ref = unpack(arguments);
    results = [];
    for (k in ref) {
      v = ref[k];
      results.push(v);
    }
    return results;
  };

  chroma.rgb = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['rgb']), function(){});
  };

  Color.prototype.rgb = function(round) {
    if (round == null) {
      round = true;
    }
    if (round) {
      return this._rgb.map(Math.round).slice(0, 3);
    } else {
      return this._rgb.slice(0, 3);
    }
  };

  Color.prototype.rgba = function(round) {
    if (round == null) {
      round = true;
    }
    if (!round) {
      return this._rgb.slice(0);
    }
    return [Math.round(this._rgb[0]), Math.round(this._rgb[1]), Math.round(this._rgb[2]), this._rgb[3]];
  };

  _guess_formats.push({
    p: 3,
    test: function(n) {
      var a;
      a = unpack(arguments);
      if (type(a) === 'array' && a.length === 3) {
        return 'rgb';
      }
      if (a.length === 4 && type(a[3]) === "number" && a[3] >= 0 && a[3] <= 1) {
        return 'rgb';
      }
    }
  });

  hex2rgb = function(hex) {
    var a, b, g, r, rgb, u;
    if (hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      if (hex.length === 4 || hex.length === 7) {
        hex = hex.substr(1);
      }
      if (hex.length === 3) {
        hex = hex.split("");
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      u = parseInt(hex, 16);
      r = u >> 16;
      g = u >> 8 & 0xFF;
      b = u & 0xFF;
      return [r, g, b, 1];
    }
    if (hex.match(/^#?([A-Fa-f0-9]{8})$/)) {
      if (hex.length === 9) {
        hex = hex.substr(1);
      }
      u = parseInt(hex, 16);
      r = u >> 24 & 0xFF;
      g = u >> 16 & 0xFF;
      b = u >> 8 & 0xFF;
      a = round((u & 0xFF) / 0xFF * 100) / 100;
      return [r, g, b, a];
    }
    if ((_input.css != null) && (rgb = _input.css(hex))) {
      return rgb;
    }
    throw "unknown color: " + hex;
  };

  rgb2hex = function(channels, mode) {
    var a, b, g, hxa, r, str, u;
    if (mode == null) {
      mode = 'rgb';
    }
    r = channels[0], g = channels[1], b = channels[2], a = channels[3];
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    u = r << 16 | g << 8 | b;
    str = "000000" + u.toString(16);
    str = str.substr(str.length - 6);
    hxa = '0' + round(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    return "#" + (function() {
      switch (mode.toLowerCase()) {
        case 'rgba':
          return str + hxa;
        case 'argb':
          return hxa + str;
        default:
          return str;
      }
    })();
  };

  _input.hex = function(h) {
    return hex2rgb(h);
  };

  chroma.hex = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hex']), function(){});
  };

  Color.prototype.hex = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    return rgb2hex(this._rgb, mode);
  };

  _guess_formats.push({
    p: 4,
    test: function(n) {
      if (arguments.length === 1 && type(n) === "string") {
        return 'hex';
      }
    }
  });

  hsl2rgb = function() {
    var args, b, c, g, h, i, l, o, r, ref, s, t1, t2, t3;
    args = unpack(arguments);
    h = args[0], s = args[1], l = args[2];
    if (s === 0) {
      r = g = b = l * 255;
    } else {
      t3 = [0, 0, 0];
      c = [0, 0, 0];
      t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      t1 = 2 * l - t2;
      h /= 360;
      t3[0] = h + 1 / 3;
      t3[1] = h;
      t3[2] = h - 1 / 3;
      for (i = o = 0; o <= 2; i = ++o) {
        if (t3[i] < 0) {
          t3[i] += 1;
        }
        if (t3[i] > 1) {
          t3[i] -= 1;
        }
        if (6 * t3[i] < 1) {
          c[i] = t1 + (t2 - t1) * 6 * t3[i];
        } else if (2 * t3[i] < 1) {
          c[i] = t2;
        } else if (3 * t3[i] < 2) {
          c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
        } else {
          c[i] = t1;
        }
      }
      ref = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)], r = ref[0], g = ref[1], b = ref[2];
    }
    if (args.length > 3) {
      return [r, g, b, args[3]];
    } else {
      return [r, g, b];
    }
  };

  rgb2hsl = function(r, g, b) {
    var h, l, min, ref, s;
    if (r !== void 0 && r.length >= 3) {
      ref = r, r = ref[0], g = ref[1], b = ref[2];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    l = (max + min) / 2;
    if (max === min) {
      s = 0;
      h = Number.NaN;
    } else {
      s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    }
    if (r === max) {
      h = (g - b) / (max - min);
    } else if (g === max) {
      h = 2 + (b - r) / (max - min);
    } else if (b === max) {
      h = 4 + (r - g) / (max - min);
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
    return [h, s, l];
  };

  chroma.hsl = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsl']), function(){});
  };

  _input.hsl = hsl2rgb;

  Color.prototype.hsl = function() {
    return rgb2hsl(this._rgb);
  };

  hsv2rgb = function() {
    var args, b, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, s, t, v;
    args = unpack(arguments);
    h = args[0], s = args[1], v = args[2];
    v *= 255;
    if (s === 0) {
      r = g = b = v;
    } else {
      if (h === 360) {
        h = 0;
      }
      if (h > 360) {
        h -= 360;
      }
      if (h < 0) {
        h += 360;
      }
      h /= 60;
      i = floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
          break;
        case 1:
          ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
          break;
        case 2:
          ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
          break;
        case 3:
          ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
          break;
        case 4:
          ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
          break;
        case 5:
          ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
      }
    }
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  rgb2hsv = function() {
    var b, delta, g, h, min, r, ref, s, v;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    delta = max - min;
    v = max / 255.0;
    if (max === 0) {
      h = Number.NaN;
      s = 0;
    } else {
      s = delta / max;
      if (r === max) {
        h = (g - b) / delta;
      }
      if (g === max) {
        h = 2 + (b - r) / delta;
      }
      if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h *= 60;
      if (h < 0) {
        h += 360;
      }
    }
    return [h, s, v];
  };

  chroma.hsv = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsv']), function(){});
  };

  _input.hsv = hsv2rgb;

  Color.prototype.hsv = function() {
    return rgb2hsv(this._rgb);
  };

  num2rgb = function(num) {
    var b, g, r;
    if (type(num) === "number" && num >= 0 && num <= 0xFFFFFF) {
      r = num >> 16;
      g = (num >> 8) & 0xFF;
      b = num & 0xFF;
      return [r, g, b, 1];
    }
    console.warn("unknown num color: " + num);
    return [0, 0, 0, 1];
  };

  rgb2num = function() {
    var b, g, r, ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    return (r << 16) + (g << 8) + b;
  };

  chroma.num = function(num) {
    return new Color(num, 'num');
  };

  Color.prototype.num = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    return rgb2num(this._rgb, mode);
  };

  _input.num = num2rgb;

  _guess_formats.push({
    p: 1,
    test: function(n) {
      if (arguments.length === 1 && type(n) === "number" && n >= 0 && n <= 0xFFFFFF) {
        return 'num';
      }
    }
  });

  hcg2rgb = function() {
    var _c, _g, args, b, c, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, t, v;
    args = unpack(arguments);
    h = args[0], c = args[1], _g = args[2];
    c = c / 100;
    g = g / 100 * 255;
    _c = c * 255;
    if (c === 0) {
      r = g = b = _g;
    } else {
      if (h === 360) {
        h = 0;
      }
      if (h > 360) {
        h -= 360;
      }
      if (h < 0) {
        h += 360;
      }
      h /= 60;
      i = floor(h);
      f = h - i;
      p = _g * (1 - c);
      q = p + _c * (1 - f);
      t = p + _c * f;
      v = p + _c;
      switch (i) {
        case 0:
          ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
          break;
        case 1:
          ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
          break;
        case 2:
          ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
          break;
        case 3:
          ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
          break;
        case 4:
          ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
          break;
        case 5:
          ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
      }
    }
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  rgb2hcg = function() {
    var _g, b, c, delta, g, h, min, r, ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    delta = max - min;
    c = delta * 100 / 255;
    _g = min / (255 - delta) * 100;
    if (delta === 0) {
      h = Number.NaN;
    } else {
      if (r === max) {
        h = (g - b) / delta;
      }
      if (g === max) {
        h = 2 + (b - r) / delta;
      }
      if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h *= 60;
      if (h < 0) {
        h += 360;
      }
    }
    return [h, c, _g];
  };

  chroma.hcg = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hcg']), function(){});
  };

  _input.hcg = hcg2rgb;

  Color.prototype.hcg = function() {
    return rgb2hcg(this._rgb);
  };

  css2rgb = function(css) {
    var aa, ab, hsl, i, m, o, rgb, w;
    css = css.toLowerCase();
    if ((chroma.colors != null) && chroma.colors[css]) {
      return hex2rgb(chroma.colors[css]);
    }
    if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
      rgb = m.slice(1, 4);
      for (i = o = 0; o <= 2; i = ++o) {
        rgb[i] = +rgb[i];
      }
      rgb[3] = 1;
    } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
      rgb = m.slice(1, 5);
      for (i = w = 0; w <= 3; i = ++w) {
        rgb[i] = +rgb[i];
      }
    } else if (m = css.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
      rgb = m.slice(1, 4);
      for (i = aa = 0; aa <= 2; i = ++aa) {
        rgb[i] = round(rgb[i] * 2.55);
      }
      rgb[3] = 1;
    } else if (m = css.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
      rgb = m.slice(1, 5);
      for (i = ab = 0; ab <= 2; i = ++ab) {
        rgb[i] = round(rgb[i] * 2.55);
      }
      rgb[3] = +rgb[3];
    } else if (m = css.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
      hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      rgb = hsl2rgb(hsl);
      rgb[3] = 1;
    } else if (m = css.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
      hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      rgb = hsl2rgb(hsl);
      rgb[3] = +m[4];
    }
    return rgb;
  };

  rgb2css = function(rgba) {
    var mode;
    mode = rgba[3] < 1 ? 'rgba' : 'rgb';
    if (mode === 'rgb') {
      return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ')';
    } else if (mode === 'rgba') {
      return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ',' + rgba[3] + ')';
    } else {

    }
  };

  rnd = function(a) {
    return round(a * 100) / 100;
  };

  hsl2css = function(hsl, alpha) {
    var mode;
    mode = alpha < 1 ? 'hsla' : 'hsl';
    hsl[0] = rnd(hsl[0] || 0);
    hsl[1] = rnd(hsl[1] * 100) + '%';
    hsl[2] = rnd(hsl[2] * 100) + '%';
    if (mode === 'hsla') {
      hsl[3] = alpha;
    }
    return mode + '(' + hsl.join(',') + ')';
  };

  _input.css = function(h) {
    return css2rgb(h);
  };

  chroma.css = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['css']), function(){});
  };

  Color.prototype.css = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    if (mode.slice(0, 3) === 'rgb') {
      return rgb2css(this._rgb);
    } else if (mode.slice(0, 3) === 'hsl') {
      return hsl2css(this.hsl(), this.alpha());
    }
  };

  _input.named = function(name) {
    return hex2rgb(w3cx11[name]);
  };

  _guess_formats.push({
    p: 5,
    test: function(n) {
      if (arguments.length === 1 && (w3cx11[n] != null)) {
        return 'named';
      }
    }
  });

  Color.prototype.name = function(n) {
    var h, k;
    if (arguments.length) {
      if (w3cx11[n]) {
        this._rgb = hex2rgb(w3cx11[n]);
      }
      this._rgb[3] = 1;
      this;
    }
    h = this.hex();
    for (k in w3cx11) {
      if (h === w3cx11[k]) {
        return k;
      }
    }
    return h;
  };

  lch2lab = function() {

    /*
    Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
    These formulas were invented by David Dalrymple to obtain maximum contrast without going
    out of gamut if the parameters are in the range 0-1.
    
    A saturation multiplier was added by Gregor Aisch
     */
    var c, h, l, ref;
    ref = unpack(arguments), l = ref[0], c = ref[1], h = ref[2];
    h = h * DEG2RAD;
    return [l, cos(h) * c, sin(h) * c];
  };

  lch2rgb = function() {
    var L, a, args, b, c, g, h, l, r, ref, ref1;
    args = unpack(arguments);
    l = args[0], c = args[1], h = args[2];
    ref = lch2lab(l, c, h), L = ref[0], a = ref[1], b = ref[2];
    ref1 = lab2rgb(L, a, b), r = ref1[0], g = ref1[1], b = ref1[2];
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  lab2lch = function() {
    var a, b, c, h, l, ref;
    ref = unpack(arguments), l = ref[0], a = ref[1], b = ref[2];
    c = sqrt(a * a + b * b);
    h = (atan2(b, a) * RAD2DEG + 360) % 360;
    if (round(c * 10000) === 0) {
      h = Number.NaN;
    }
    return [l, c, h];
  };

  rgb2lch = function() {
    var a, b, g, l, r, ref, ref1;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    ref1 = rgb2lab(r, g, b), l = ref1[0], a = ref1[1], b = ref1[2];
    return lab2lch(l, a, b);
  };

  chroma.lch = function() {
    var args;
    args = unpack(arguments);
    return new Color(args, 'lch');
  };

  chroma.hcl = function() {
    var args;
    args = unpack(arguments);
    return new Color(args, 'hcl');
  };

  _input.lch = lch2rgb;

  _input.hcl = function() {
    var c, h, l, ref;
    ref = unpack(arguments), h = ref[0], c = ref[1], l = ref[2];
    return lch2rgb([l, c, h]);
  };

  Color.prototype.lch = function() {
    return rgb2lch(this._rgb);
  };

  Color.prototype.hcl = function() {
    return rgb2lch(this._rgb).reverse();
  };

  rgb2cmyk = function(mode) {
    var b, c, f, g, k, m, r, ref, y;
    if (mode == null) {
      mode = 'rgb';
    }
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = r / 255;
    g = g / 255;
    b = b / 255;
    k = 1 - Math.max(r, Math.max(g, b));
    f = k < 1 ? 1 / (1 - k) : 0;
    c = (1 - r - k) * f;
    m = (1 - g - k) * f;
    y = (1 - b - k) * f;
    return [c, m, y, k];
  };

  cmyk2rgb = function() {
    var alpha, args, b, c, g, k, m, r, y;
    args = unpack(arguments);
    c = args[0], m = args[1], y = args[2], k = args[3];
    alpha = args.length > 4 ? args[4] : 1;
    if (k === 1) {
      return [0, 0, 0, alpha];
    }
    r = c >= 1 ? 0 : 255 * (1 - c) * (1 - k);
    g = m >= 1 ? 0 : 255 * (1 - m) * (1 - k);
    b = y >= 1 ? 0 : 255 * (1 - y) * (1 - k);
    return [r, g, b, alpha];
  };

  _input.cmyk = function() {
    return cmyk2rgb(unpack(arguments));
  };

  chroma.cmyk = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['cmyk']), function(){});
  };

  Color.prototype.cmyk = function() {
    return rgb2cmyk(this._rgb);
  };

  _input.gl = function() {
    var i, k, o, rgb, v;
    rgb = (function() {
      var ref, results;
      ref = unpack(arguments);
      results = [];
      for (k in ref) {
        v = ref[k];
        results.push(v);
      }
      return results;
    }).apply(this, arguments);
    for (i = o = 0; o <= 2; i = ++o) {
      rgb[i] *= 255;
    }
    return rgb;
  };

  chroma.gl = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['gl']), function(){});
  };

  Color.prototype.gl = function() {
    var rgb;
    rgb = this._rgb;
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
  };

  rgb2luminance = function(r, g, b) {
    var ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = luminance_x(r);
    g = luminance_x(g);
    b = luminance_x(b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  luminance_x = function(x) {
    x /= 255;
    if (x <= 0.03928) {
      return x / 12.92;
    } else {
      return pow((x + 0.055) / 1.055, 2.4);
    }
  };

  _interpolators = [];

  interpolate = function(col1, col2, f, m) {
    var interpol, len, o, res;
    if (f == null) {
      f = 0.5;
    }
    if (m == null) {
      m = 'rgb';
    }

    /*
    interpolates between colors
    f = 0 --> me
    f = 1 --> col
     */
    if (type(col1) !== 'object') {
      col1 = chroma(col1);
    }
    if (type(col2) !== 'object') {
      col2 = chroma(col2);
    }
    for (o = 0, len = _interpolators.length; o < len; o++) {
      interpol = _interpolators[o];
      if (m === interpol[0]) {
        res = interpol[1](col1, col2, f, m);
        break;
      }
    }
    if (res == null) {
      throw "color mode " + m + " is not supported";
    }
    return res.alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
  };

  chroma.interpolate = interpolate;

  Color.prototype.interpolate = function(col2, f, m) {
    return interpolate(this, col2, f, m);
  };

  chroma.mix = interpolate;

  Color.prototype.mix = Color.prototype.interpolate;

  interpolate_rgb = function(col1, col2, f, m) {
    var xyz0, xyz1;
    xyz0 = col1._rgb;
    xyz1 = col2._rgb;
    return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
  };

  _interpolators.push(['rgb', interpolate_rgb]);

  Color.prototype.luminance = function(lum, mode) {
    var cur_lum, eps, max_iter, test;
    if (mode == null) {
      mode = 'rgb';
    }
    if (!arguments.length) {
      return rgb2luminance(this._rgb);
    }
    if (lum === 0) {
      this._rgb = [0, 0, 0, this._rgb[3]];
    } else if (lum === 1) {
      this._rgb = [255, 255, 255, this._rgb[3]];
    } else {
      eps = 1e-7;
      max_iter = 20;
      test = function(l, h) {
        var lm, m;
        m = l.interpolate(h, 0.5, mode);
        lm = m.luminance();
        if (Math.abs(lum - lm) < eps || !max_iter--) {
          return m;
        }
        if (lm > lum) {
          return test(l, m);
        }
        return test(m, h);
      };
      cur_lum = rgb2luminance(this._rgb);
      this._rgb = (cur_lum > lum ? test(chroma('black'), this) : test(this, chroma('white'))).rgba();
    }
    return this;
  };

  temperature2rgb = function(kelvin) {
    var b, g, r, temp;
    temp = kelvin / 100;
    if (temp < 66) {
      r = 255;
      g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
      b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
    } else {
      r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
      g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
      b = 255;
    }
    return [r, g, b];
  };

  rgb2temperature = function() {
    var b, eps, g, maxTemp, minTemp, r, ref, rgb, temp;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    minTemp = 1000;
    maxTemp = 40000;
    eps = 0.4;
    while (maxTemp - minTemp > eps) {
      temp = (maxTemp + minTemp) * 0.5;
      rgb = temperature2rgb(temp);
      if ((rgb[2] / rgb[0]) >= (b / r)) {
        maxTemp = temp;
      } else {
        minTemp = temp;
      }
    }
    return round(temp);
  };

  chroma.temperature = chroma.kelvin = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['temperature']), function(){});
  };

  _input.temperature = _input.kelvin = _input.K = temperature2rgb;

  Color.prototype.temperature = function() {
    return rgb2temperature(this._rgb);
  };

  Color.prototype.kelvin = Color.prototype.temperature;

  chroma.contrast = function(a, b) {
    var l1, l2, ref, ref1;
    if ((ref = type(a)) === 'string' || ref === 'number') {
      a = new Color(a);
    }
    if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
      b = new Color(b);
    }
    l1 = a.luminance();
    l2 = b.luminance();
    if (l1 > l2) {
      return (l1 + 0.05) / (l2 + 0.05);
    } else {
      return (l2 + 0.05) / (l1 + 0.05);
    }
  };

  chroma.distance = function(a, b, mode) {
    var d, i, l1, l2, ref, ref1, sum_sq;
    if (mode == null) {
      mode = 'lab';
    }
    if ((ref = type(a)) === 'string' || ref === 'number') {
      a = new Color(a);
    }
    if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
      b = new Color(b);
    }
    l1 = a.get(mode);
    l2 = b.get(mode);
    sum_sq = 0;
    for (i in l1) {
      d = (l1[i] || 0) - (l2[i] || 0);
      sum_sq += d * d;
    }
    return Math.sqrt(sum_sq);
  };

  chroma.deltaE = function(a, b, L, C) {
    var L1, L2, a1, a2, b1, b2, c1, c2, c4, dH2, delA, delB, delC, delL, f, h1, ref, ref1, ref2, ref3, sc, sh, sl, t, v1, v2, v3;
    if (L == null) {
      L = 1;
    }
    if (C == null) {
      C = 1;
    }
    if ((ref = type(a)) === 'string' || ref === 'number') {
      a = new Color(a);
    }
    if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
      b = new Color(b);
    }
    ref2 = a.lab(), L1 = ref2[0], a1 = ref2[1], b1 = ref2[2];
    ref3 = b.lab(), L2 = ref3[0], a2 = ref3[1], b2 = ref3[2];
    c1 = sqrt(a1 * a1 + b1 * b1);
    c2 = sqrt(a2 * a2 + b2 * b2);
    sl = L1 < 16.0 ? 0.511 : (0.040975 * L1) / (1.0 + 0.01765 * L1);
    sc = (0.0638 * c1) / (1.0 + 0.0131 * c1) + 0.638;
    h1 = c1 < 0.000001 ? 0.0 : (atan2(b1, a1) * 180.0) / PI;
    while (h1 < 0) {
      h1 += 360;
    }
    while (h1 >= 360) {
      h1 -= 360;
    }
    t = (h1 >= 164.0) && (h1 <= 345.0) ? 0.56 + abs(0.2 * cos((PI * (h1 + 168.0)) / 180.0)) : 0.36 + abs(0.4 * cos((PI * (h1 + 35.0)) / 180.0));
    c4 = c1 * c1 * c1 * c1;
    f = sqrt(c4 / (c4 + 1900.0));
    sh = sc * (f * t + 1.0 - f);
    delL = L1 - L2;
    delC = c1 - c2;
    delA = a1 - a2;
    delB = b1 - b2;
    dH2 = delA * delA + delB * delB - delC * delC;
    v1 = delL / (L * sl);
    v2 = delC / (C * sc);
    v3 = sh;
    return sqrt(v1 * v1 + v2 * v2 + (dH2 / (v3 * v3)));
  };

  Color.prototype.get = function(modechan) {
    var channel, i, me, mode, ref, src;
    me = this;
    ref = modechan.split('.'), mode = ref[0], channel = ref[1];
    src = me[mode]();
    if (channel) {
      i = mode.indexOf(channel);
      if (i > -1) {
        return src[i];
      } else {
        return console.warn('unknown channel ' + channel + ' in mode ' + mode);
      }
    } else {
      return src;
    }
  };

  Color.prototype.set = function(modechan, value) {
    var channel, i, me, mode, ref, src;
    me = this;
    ref = modechan.split('.'), mode = ref[0], channel = ref[1];
    if (channel) {
      src = me[mode]();
      i = mode.indexOf(channel);
      if (i > -1) {
        if (type(value) === 'string') {
          switch (value.charAt(0)) {
            case '+':
              src[i] += +value;
              break;
            case '-':
              src[i] += +value;
              break;
            case '*':
              src[i] *= +(value.substr(1));
              break;
            case '/':
              src[i] /= +(value.substr(1));
              break;
            default:
              src[i] = +value;
          }
        } else {
          src[i] = value;
        }
      } else {
        console.warn('unknown channel ' + channel + ' in mode ' + mode);
      }
    } else {
      src = value;
    }
    return chroma(src, mode).alpha(me.alpha());
  };

  Color.prototype.clipped = function() {
    return this._rgb._clipped || false;
  };

  Color.prototype.alpha = function(a) {
    if (arguments.length) {
      return chroma.rgb([this._rgb[0], this._rgb[1], this._rgb[2], a]);
    }
    return this._rgb[3];
  };

  Color.prototype.darken = function(amount) {
    var lab, me;
    if (amount == null) {
      amount = 1;
    }
    me = this;
    lab = me.lab();
    lab[0] -= LAB_CONSTANTS.Kn * amount;
    return chroma.lab(lab).alpha(me.alpha());
  };

  Color.prototype.brighten = function(amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.darken(-amount);
  };

  Color.prototype.darker = Color.prototype.darken;

  Color.prototype.brighter = Color.prototype.brighten;

  Color.prototype.saturate = function(amount) {
    var lch, me;
    if (amount == null) {
      amount = 1;
    }
    me = this;
    lch = me.lch();
    lch[1] += amount * LAB_CONSTANTS.Kn;
    if (lch[1] < 0) {
      lch[1] = 0;
    }
    return chroma.lch(lch).alpha(me.alpha());
  };

  Color.prototype.desaturate = function(amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.saturate(-amount);
  };

  Color.prototype.premultiply = function() {
    var a, rgb;
    rgb = this.rgb();
    a = this.alpha();
    return chroma(rgb[0] * a, rgb[1] * a, rgb[2] * a, a);
  };

  blend = function(bottom, top, mode) {
    if (!blend[mode]) {
      throw 'unknown blend mode ' + mode;
    }
    return blend[mode](bottom, top);
  };

  blend_f = function(f) {
    return function(bottom, top) {
      var c0, c1;
      c0 = chroma(top).rgb();
      c1 = chroma(bottom).rgb();
      return chroma(f(c0, c1), 'rgb');
    };
  };

  each = function(f) {
    return function(c0, c1) {
      var i, o, out;
      out = [];
      for (i = o = 0; o <= 3; i = ++o) {
        out[i] = f(c0[i], c1[i]);
      }
      return out;
    };
  };

  normal = function(a, b) {
    return a;
  };

  multiply = function(a, b) {
    return a * b / 255;
  };

  darken = function(a, b) {
    if (a > b) {
      return b;
    } else {
      return a;
    }
  };

  lighten = function(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };

  screen = function(a, b) {
    return 255 * (1 - (1 - a / 255) * (1 - b / 255));
  };

  overlay = function(a, b) {
    if (b < 128) {
      return 2 * a * b / 255;
    } else {
      return 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    }
  };

  burn = function(a, b) {
    return 255 * (1 - (1 - b / 255) / (a / 255));
  };

  dodge = function(a, b) {
    if (a === 255) {
      return 255;
    }
    a = 255 * (b / 255) / (1 - a / 255);
    if (a > 255) {
      return 255;
    } else {
      return a;
    }
  };

  blend.normal = blend_f(each(normal));

  blend.multiply = blend_f(each(multiply));

  blend.screen = blend_f(each(screen));

  blend.overlay = blend_f(each(overlay));

  blend.darken = blend_f(each(darken));

  blend.lighten = blend_f(each(lighten));

  blend.dodge = blend_f(each(dodge));

  blend.burn = blend_f(each(burn));

  chroma.blend = blend;

  chroma.analyze = function(data) {
    var len, o, r, val;
    r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    for (o = 0, len = data.length; o < len; o++) {
      val = data[o];
      if ((val != null) && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min) {
          r.min = val;
        }
        if (val > r.max) {
          r.max = val;
        }
        r.count += 1;
      }
    }
    r.domain = [r.min, r.max];
    r.limits = function(mode, num) {
      return chroma.limits(r, mode, num);
    };
    return r;
  };

  chroma.scale = function(colors, positions) {
    var _classes, _colorCache, _colors, _correctLightness, _domain, _fixed, _max, _min, _mode, _nacol, _out, _padding, _pos, _spread, _useCache, classifyValue, f, getClass, getColor, resetCache, setColors, tmap;
    _mode = 'rgb';
    _nacol = chroma('#ccc');
    _spread = 0;
    _fixed = false;
    _domain = [0, 1];
    _pos = [];
    _padding = [0, 0];
    _classes = false;
    _colors = [];
    _out = false;
    _min = 0;
    _max = 1;
    _correctLightness = false;
    _colorCache = {};
    _useCache = true;
    setColors = function(colors) {
      var c, col, o, ref, ref1, w;
      if (colors == null) {
        colors = ['#fff', '#000'];
      }
      if ((colors != null) && type(colors) === 'string' && (chroma.brewer != null)) {
        colors = chroma.brewer[colors] || chroma.brewer[colors.toLowerCase()] || colors;
      }
      if (type(colors) === 'array') {
        colors = colors.slice(0);
        for (c = o = 0, ref = colors.length - 1; 0 <= ref ? o <= ref : o >= ref; c = 0 <= ref ? ++o : --o) {
          col = colors[c];
          if (type(col) === "string") {
            colors[c] = chroma(col);
          }
        }
        _pos.length = 0;
        for (c = w = 0, ref1 = colors.length - 1; 0 <= ref1 ? w <= ref1 : w >= ref1; c = 0 <= ref1 ? ++w : --w) {
          _pos.push(c / (colors.length - 1));
        }
      }
      resetCache();
      return _colors = colors;
    };
    getClass = function(value) {
      var i, n;
      if (_classes != null) {
        n = _classes.length - 1;
        i = 0;
        while (i < n && value >= _classes[i]) {
          i++;
        }
        return i - 1;
      }
      return 0;
    };
    tmap = function(t) {
      return t;
    };
    classifyValue = function(value) {
      var i, maxc, minc, n, val;
      val = value;
      if (_classes.length > 2) {
        n = _classes.length - 1;
        i = getClass(value);
        minc = _classes[0] + (_classes[1] - _classes[0]) * (0 + _spread * 0.5);
        maxc = _classes[n - 1] + (_classes[n] - _classes[n - 1]) * (1 - _spread * 0.5);
        val = _min + ((_classes[i] + (_classes[i + 1] - _classes[i]) * 0.5 - minc) / (maxc - minc)) * (_max - _min);
      }
      return val;
    };
    getColor = function(val, bypassMap) {
      var c, col, i, k, o, p, ref, t;
      if (bypassMap == null) {
        bypassMap = false;
      }
      if (isNaN(val)) {
        return _nacol;
      }
      if (!bypassMap) {
        if (_classes && _classes.length > 2) {
          c = getClass(val);
          t = c / (_classes.length - 2);
          t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));
        } else if (_max !== _min) {
          t = (val - _min) / (_max - _min);
          t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));
          t = Math.min(1, Math.max(0, t));
        } else {
          t = 1;
        }
      } else {
        t = val;
      }
      if (!bypassMap) {
        t = tmap(t);
      }
      k = Math.floor(t * 10000);
      if (_useCache && _colorCache[k]) {
        col = _colorCache[k];
      } else {
        if (type(_colors) === 'array') {
          for (i = o = 0, ref = _pos.length - 1; 0 <= ref ? o <= ref : o >= ref; i = 0 <= ref ? ++o : --o) {
            p = _pos[i];
            if (t <= p) {
              col = _colors[i];
              break;
            }
            if (t >= p && i === _pos.length - 1) {
              col = _colors[i];
              break;
            }
            if (t > p && t < _pos[i + 1]) {
              t = (t - p) / (_pos[i + 1] - p);
              col = chroma.interpolate(_colors[i], _colors[i + 1], t, _mode);
              break;
            }
          }
        } else if (type(_colors) === 'function') {
          col = _colors(t);
        }
        if (_useCache) {
          _colorCache[k] = col;
        }
      }
      return col;
    };
    resetCache = function() {
      return _colorCache = {};
    };
    setColors(colors);
    f = function(v) {
      var c;
      c = chroma(getColor(v));
      if (_out && c[_out]) {
        return c[_out]();
      } else {
        return c;
      }
    };
    f.classes = function(classes) {
      var d;
      if (classes != null) {
        if (type(classes) === 'array') {
          _classes = classes;
          _domain = [classes[0], classes[classes.length - 1]];
        } else {
          d = chroma.analyze(_domain);
          if (classes === 0) {
            _classes = [d.min, d.max];
          } else {
            _classes = chroma.limits(d, 'e', classes);
          }
        }
        return f;
      }
      return _classes;
    };
    f.domain = function(domain) {
      var c, d, k, len, o, ref, w;
      if (!arguments.length) {
        return _domain;
      }
      _min = domain[0];
      _max = domain[domain.length - 1];
      _pos = [];
      k = _colors.length;
      if (domain.length === k && _min !== _max) {
        for (o = 0, len = domain.length; o < len; o++) {
          d = domain[o];
          _pos.push((d - _min) / (_max - _min));
        }
      } else {
        for (c = w = 0, ref = k - 1; 0 <= ref ? w <= ref : w >= ref; c = 0 <= ref ? ++w : --w) {
          _pos.push(c / (k - 1));
        }
      }
      _domain = [_min, _max];
      return f;
    };
    f.mode = function(_m) {
      if (!arguments.length) {
        return _mode;
      }
      _mode = _m;
      resetCache();
      return f;
    };
    f.range = function(colors, _pos) {
      setColors(colors, _pos);
      return f;
    };
    f.out = function(_o) {
      _out = _o;
      return f;
    };
    f.spread = function(val) {
      if (!arguments.length) {
        return _spread;
      }
      _spread = val;
      return f;
    };
    f.correctLightness = function(v) {
      if (v == null) {
        v = true;
      }
      _correctLightness = v;
      resetCache();
      if (_correctLightness) {
        tmap = function(t) {
          var L0, L1, L_actual, L_diff, L_ideal, max_iter, pol, t0, t1;
          L0 = getColor(0, true).lab()[0];
          L1 = getColor(1, true).lab()[0];
          pol = L0 > L1;
          L_actual = getColor(t, true).lab()[0];
          L_ideal = L0 + (L1 - L0) * t;
          L_diff = L_actual - L_ideal;
          t0 = 0;
          t1 = 1;
          max_iter = 20;
          while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
            (function() {
              if (pol) {
                L_diff *= -1;
              }
              if (L_diff < 0) {
                t0 = t;
                t += (t1 - t) * 0.5;
              } else {
                t1 = t;
                t += (t0 - t) * 0.5;
              }
              L_actual = getColor(t, true).lab()[0];
              return L_diff = L_actual - L_ideal;
            })();
          }
          return t;
        };
      } else {
        tmap = function(t) {
          return t;
        };
      }
      return f;
    };
    f.padding = function(p) {
      if (p != null) {
        if (type(p) === 'number') {
          p = [p, p];
        }
        _padding = p;
        return f;
      } else {
        return _padding;
      }
    };
    f.colors = function(numColors, out) {
      var dd, dm, i, o, ref, result, results, samples, w;
      if (arguments.length < 2) {
        out = 'hex';
      }
      result = [];
      if (arguments.length === 0) {
        result = _colors.slice(0);
      } else if (numColors === 1) {
        result = [f(0.5)];
      } else if (numColors > 1) {
        dm = _domain[0];
        dd = _domain[1] - dm;
        result = (function() {
          results = [];
          for (var o = 0; 0 <= numColors ? o < numColors : o > numColors; 0 <= numColors ? o++ : o--){ results.push(o); }
          return results;
        }).apply(this).map(function(i) {
          return f(dm + i / (numColors - 1) * dd);
        });
      } else {
        colors = [];
        samples = [];
        if (_classes && _classes.length > 2) {
          for (i = w = 1, ref = _classes.length; 1 <= ref ? w < ref : w > ref; i = 1 <= ref ? ++w : --w) {
            samples.push((_classes[i - 1] + _classes[i]) * 0.5);
          }
        } else {
          samples = _domain;
        }
        result = samples.map(function(v) {
          return f(v);
        });
      }
      if (chroma[out]) {
        result = result.map(function(c) {
          return c[out]();
        });
      }
      return result;
    };
    f.cache = function(c) {
      if (c != null) {
        return _useCache = c;
      } else {
        return _useCache;
      }
    };
    return f;
  };

  if (chroma.scales == null) {
    chroma.scales = {};
  }

  chroma.scales.cool = function() {
    return chroma.scale([chroma.hsl(180, 1, .9), chroma.hsl(250, .7, .4)]);
  };

  chroma.scales.hot = function() {
    return chroma.scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb');
  };

  chroma.analyze = function(data, key, filter) {
    var add, k, len, o, r, val, visit;
    r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    if (filter == null) {
      filter = function() {
        return true;
      };
    }
    add = function(val) {
      if ((val != null) && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min) {
          r.min = val;
        }
        if (val > r.max) {
          r.max = val;
        }
        r.count += 1;
      }
    };
    visit = function(val, k) {
      if (filter(val, k)) {
        if ((key != null) && type(key) === 'function') {
          return add(key(val));
        } else if ((key != null) && type(key) === 'string' || type(key) === 'number') {
          return add(val[key]);
        } else {
          return add(val);
        }
      }
    };
    if (type(data) === 'array') {
      for (o = 0, len = data.length; o < len; o++) {
        val = data[o];
        visit(val);
      }
    } else {
      for (k in data) {
        val = data[k];
        visit(val, k);
      }
    }
    r.domain = [r.min, r.max];
    r.limits = function(mode, num) {
      return chroma.limits(r, mode, num);
    };
    return r;
  };

  chroma.limits = function(data, mode, num) {
    var aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, assignments, best, centroids, cluster, clusterSizes, dist, i, j, kClusters, limits, max_log, min, min_log, mindist, n, nb_iters, newCentroids, o, p, pb, pr, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, repeat, sum, tmpKMeansBreaks, v, value, values, w;
    if (mode == null) {
      mode = 'equal';
    }
    if (num == null) {
      num = 7;
    }
    if (type(data) === 'array') {
      data = chroma.analyze(data);
    }
    min = data.min;
    max = data.max;
    sum = data.sum;
    values = data.values.sort(function(a, b) {
      return a - b;
    });
    if (num === 1) {
      return [min, max];
    }
    limits = [];
    if (mode.substr(0, 1) === 'c') {
      limits.push(min);
      limits.push(max);
    }
    if (mode.substr(0, 1) === 'e') {
      limits.push(min);
      for (i = o = 1, ref = num - 1; 1 <= ref ? o <= ref : o >= ref; i = 1 <= ref ? ++o : --o) {
        limits.push(min + (i / num) * (max - min));
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'l') {
      if (min <= 0) {
        throw 'Logarithmic scales are only possible for values > 0';
      }
      min_log = Math.LOG10E * log(min);
      max_log = Math.LOG10E * log(max);
      limits.push(min);
      for (i = w = 1, ref1 = num - 1; 1 <= ref1 ? w <= ref1 : w >= ref1; i = 1 <= ref1 ? ++w : --w) {
        limits.push(pow(10, min_log + (i / num) * (max_log - min_log)));
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'q') {
      limits.push(min);
      for (i = aa = 1, ref2 = num - 1; 1 <= ref2 ? aa <= ref2 : aa >= ref2; i = 1 <= ref2 ? ++aa : --aa) {
        p = (values.length - 1) * i / num;
        pb = floor(p);
        if (pb === p) {
          limits.push(values[pb]);
        } else {
          pr = p - pb;
          limits.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
        }
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'k') {

      /*
      implementation based on
      http://code.google.com/p/figue/source/browse/trunk/figue.js#336
      simplified for 1-d input values
       */
      n = values.length;
      assignments = new Array(n);
      clusterSizes = new Array(num);
      repeat = true;
      nb_iters = 0;
      centroids = null;
      centroids = [];
      centroids.push(min);
      for (i = ab = 1, ref3 = num - 1; 1 <= ref3 ? ab <= ref3 : ab >= ref3; i = 1 <= ref3 ? ++ab : --ab) {
        centroids.push(min + (i / num) * (max - min));
      }
      centroids.push(max);
      while (repeat) {
        for (j = ac = 0, ref4 = num - 1; 0 <= ref4 ? ac <= ref4 : ac >= ref4; j = 0 <= ref4 ? ++ac : --ac) {
          clusterSizes[j] = 0;
        }
        for (i = ad = 0, ref5 = n - 1; 0 <= ref5 ? ad <= ref5 : ad >= ref5; i = 0 <= ref5 ? ++ad : --ad) {
          value = values[i];
          mindist = Number.MAX_VALUE;
          for (j = ae = 0, ref6 = num - 1; 0 <= ref6 ? ae <= ref6 : ae >= ref6; j = 0 <= ref6 ? ++ae : --ae) {
            dist = abs(centroids[j] - value);
            if (dist < mindist) {
              mindist = dist;
              best = j;
            }
          }
          clusterSizes[best]++;
          assignments[i] = best;
        }
        newCentroids = new Array(num);
        for (j = af = 0, ref7 = num - 1; 0 <= ref7 ? af <= ref7 : af >= ref7; j = 0 <= ref7 ? ++af : --af) {
          newCentroids[j] = null;
        }
        for (i = ag = 0, ref8 = n - 1; 0 <= ref8 ? ag <= ref8 : ag >= ref8; i = 0 <= ref8 ? ++ag : --ag) {
          cluster = assignments[i];
          if (newCentroids[cluster] === null) {
            newCentroids[cluster] = values[i];
          } else {
            newCentroids[cluster] += values[i];
          }
        }
        for (j = ah = 0, ref9 = num - 1; 0 <= ref9 ? ah <= ref9 : ah >= ref9; j = 0 <= ref9 ? ++ah : --ah) {
          newCentroids[j] *= 1 / clusterSizes[j];
        }
        repeat = false;
        for (j = ai = 0, ref10 = num - 1; 0 <= ref10 ? ai <= ref10 : ai >= ref10; j = 0 <= ref10 ? ++ai : --ai) {
          if (newCentroids[j] !== centroids[i]) {
            repeat = true;
            break;
          }
        }
        centroids = newCentroids;
        nb_iters++;
        if (nb_iters > 200) {
          repeat = false;
        }
      }
      kClusters = {};
      for (j = aj = 0, ref11 = num - 1; 0 <= ref11 ? aj <= ref11 : aj >= ref11; j = 0 <= ref11 ? ++aj : --aj) {
        kClusters[j] = [];
      }
      for (i = ak = 0, ref12 = n - 1; 0 <= ref12 ? ak <= ref12 : ak >= ref12; i = 0 <= ref12 ? ++ak : --ak) {
        cluster = assignments[i];
        kClusters[cluster].push(values[i]);
      }
      tmpKMeansBreaks = [];
      for (j = al = 0, ref13 = num - 1; 0 <= ref13 ? al <= ref13 : al >= ref13; j = 0 <= ref13 ? ++al : --al) {
        tmpKMeansBreaks.push(kClusters[j][0]);
        tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
      }
      tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
        return a - b;
      });
      limits.push(tmpKMeansBreaks[0]);
      for (i = am = 1, ref14 = tmpKMeansBreaks.length - 1; am <= ref14; i = am += 2) {
        v = tmpKMeansBreaks[i];
        if (!isNaN(v) && limits.indexOf(v) === -1) {
          limits.push(v);
        }
      }
    }
    return limits;
  };

  hsi2rgb = function(h, s, i) {

    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
     */
    var args, b, g, r;
    args = unpack(arguments);
    h = args[0], s = args[1], i = args[2];
    if (isNaN(h)) {
      h = 0;
    }
    h /= 360;
    if (h < 1 / 3) {
      b = (1 - s) / 3;
      r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      g = 1 - (b + r);
    } else if (h < 2 / 3) {
      h -= 1 / 3;
      r = (1 - s) / 3;
      g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      b = 1 - (r + g);
    } else {
      h -= 2 / 3;
      g = (1 - s) / 3;
      b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      r = 1 - (g + b);
    }
    r = limit(i * r * 3);
    g = limit(i * g * 3);
    b = limit(i * b * 3);
    return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
  };

  rgb2hsi = function() {

    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
     */
    var b, g, h, i, min, r, ref, s;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    TWOPI = Math.PI * 2;
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    i = (r + g + b) / 3;
    s = 1 - min / i;
    if (s === 0) {
      h = 0;
    } else {
      h = ((r - g) + (r - b)) / 2;
      h /= Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
      h = Math.acos(h);
      if (b > g) {
        h = TWOPI - h;
      }
      h /= TWOPI;
    }
    return [h * 360, s, i];
  };

  chroma.hsi = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsi']), function(){});
  };

  _input.hsi = hsi2rgb;

  Color.prototype.hsi = function() {
    return rgb2hsi(this._rgb);
  };

  interpolate_hsx = function(col1, col2, f, m) {
    var dh, hue, hue0, hue1, lbv, lbv0, lbv1, res, sat, sat0, sat1, xyz0, xyz1;
    if (m === 'hsl') {
      xyz0 = col1.hsl();
      xyz1 = col2.hsl();
    } else if (m === 'hsv') {
      xyz0 = col1.hsv();
      xyz1 = col2.hsv();
    } else if (m === 'hcg') {
      xyz0 = col1.hcg();
      xyz1 = col2.hcg();
    } else if (m === 'hsi') {
      xyz0 = col1.hsi();
      xyz1 = col2.hsi();
    } else if (m === 'lch' || m === 'hcl') {
      m = 'hcl';
      xyz0 = col1.hcl();
      xyz1 = col2.hcl();
    }
    if (m.substr(0, 1) === 'h') {
      hue0 = xyz0[0], sat0 = xyz0[1], lbv0 = xyz0[2];
      hue1 = xyz1[0], sat1 = xyz1[1], lbv1 = xyz1[2];
    }
    if (!isNaN(hue0) && !isNaN(hue1)) {
      if (hue1 > hue0 && hue1 - hue0 > 180) {
        dh = hue1 - (hue0 + 360);
      } else if (hue1 < hue0 && hue0 - hue1 > 180) {
        dh = hue1 + 360 - hue0;
      } else {
        dh = hue1 - hue0;
      }
      hue = hue0 + f * dh;
    } else if (!isNaN(hue0)) {
      hue = hue0;
      if ((lbv1 === 1 || lbv1 === 0) && m !== 'hsv') {
        sat = sat0;
      }
    } else if (!isNaN(hue1)) {
      hue = hue1;
      if ((lbv0 === 1 || lbv0 === 0) && m !== 'hsv') {
        sat = sat1;
      }
    } else {
      hue = Number.NaN;
    }
    if (sat == null) {
      sat = sat0 + f * (sat1 - sat0);
    }
    lbv = lbv0 + f * (lbv1 - lbv0);
    return res = chroma[m](hue, sat, lbv);
  };

  _interpolators = _interpolators.concat((function() {
    var len, o, ref, results;
    ref = ['hsv', 'hsl', 'hsi', 'hcl', 'lch', 'hcg'];
    results = [];
    for (o = 0, len = ref.length; o < len; o++) {
      m = ref[o];
      results.push([m, interpolate_hsx]);
    }
    return results;
  })());

  interpolate_num = function(col1, col2, f, m) {
    var n1, n2;
    n1 = col1.num();
    n2 = col2.num();
    return chroma.num(n1 + (n2 - n1) * f, 'num');
  };

  _interpolators.push(['num', interpolate_num]);

  interpolate_lab = function(col1, col2, f, m) {
    var res, xyz0, xyz1;
    xyz0 = col1.lab();
    xyz1 = col2.lab();
    return res = new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
  };

  _interpolators.push(['lab', interpolate_lab]);

}).call(this);

},{}],2:[function(require,module,exports){
/**
 * smartcrop.js
 * A javascript library implementing content aware image cropping
 *
 * Copyright (C) 2016 Jonas Wagner
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function() {
'use strict';

var smartcrop = {};
// Promise implementation to use
smartcrop.Promise = typeof Promise !== 'undefined' ? Promise : function() {
  throw new Error('No native promises and smartcrop.Promise not set.');
};

smartcrop.DEFAULTS = {
  width: 0,
  height: 0,
  aspect: 0,
  cropWidth: 0,
  cropHeight: 0,
  detailWeight: 0.2,
  skinColor: [0.78, 0.57, 0.44],
  skinBias: 0.01,
  skinBrightnessMin: 0.2,
  skinBrightnessMax: 1.0,
  skinThreshold: 0.8,
  skinWeight: 1.8,
  saturationBrightnessMin: 0.05,
  saturationBrightnessMax: 0.9,
  saturationThreshold: 0.4,
  saturationBias: 0.2,
  saturationWeight: 0.3,
  // Step * minscale rounded down to the next power of two should be good
  scoreDownSample: 8,
  step: 8,
  scaleStep: 0.1,
  minScale: 1.0,
  maxScale: 1.0,
  edgeRadius: 0.4,
  edgeWeight: -20.0,
  outsideImportance: -0.5,
  boostWeight: 100.0,
  ruleOfThirds: true,
  prescale: true,
  imageOperations: null,
  canvasFactory: defaultCanvasFactory,
  // Factory: defaultFactories,
  debug: false,
};



smartcrop.crop = function(inputImage, options_, callback) {
  var options = extend({}, smartcrop.DEFAULTS, options_);

  if (options.aspect) {
    options.width = options.aspect;
    options.height = 1;
  }

  if (options.imageOperations === null) {
    options.imageOperations = canvasImageOperations(options.canvasFactory);
  }

  var iop = options.imageOperations;

  var scale = 1;
  var prescale = 1;

  return iop.open(inputImage, options.input).then(function(image) {

    if (options.width && options.height) {
      scale = min(image.width / options.width, image.height / options.height);
      options.cropWidth = ~~(options.width * scale);
      options.cropHeight = ~~(options.height * scale);
      // Img = 100x100, width = 95x95, scale = 100/95, 1/scale > min
      // don't set minscale smaller than 1/scale
      // -> don't pick crops that need upscaling
      options.minScale = min(options.maxScale, max(1 / scale, options.minScale));

      if (options.prescale !== false) {
        prescale = 1 / scale / options.minScale;
        if (prescale < 1) {
          image = iop.resample(image, image.width * prescale, image.height * prescale);
          options.cropWidth = ~~(options.cropWidth * prescale);
          options.cropHeight = ~~(options.cropHeight * prescale);
          if (options.boost) {
            options.boost = options.boost.map(function(boost) {
              return {
                x: ~~(boost.x * prescale),
                y: ~~(boost.y * prescale),
                width: ~~(boost.width * prescale),
                height: ~~(boost.height * prescale),
                weight: boost.weight
              };
            });
          }
        }
        else {
          prescale = 1;
        }
      }
    }
    return image;
  })
  .then(function(image) {
    return iop.getData(image).then(function(data) {
      var result = analyse(options, data);

      var crops = result.crops || [result.topCrop];
      for (var i = 0, iLen = crops.length; i < iLen; i++) {
        var crop = crops[i];
        crop.x = ~~(crop.x / prescale);
        crop.y = ~~(crop.y / prescale);
        crop.width = ~~(crop.width / prescale);
        crop.height = ~~(crop.height / prescale);
      }
      if (callback) callback(result);
      return result;
    });
  });
};


// Check if all the dependencies are there
// todo:
smartcrop.isAvailable = function(options) {
  if (!smartcrop.Promise) return false;

  var canvasFactory = options ? options.canvasFactory : defaultCanvasFactory;

  if (canvasFactory === defaultCanvasFactory) {
    var c = document.createElement('canvas');
    if (!c.getContext('2d')) {
      return false;
    }
  }

  return true;
};

function edgeDetect(i, o) {
  var id = i.data;
  var od = o.data;
  var w = i.width;
  var h = i.height;

  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var p = (y * w + x) * 4;
      var lightness;

      if (x === 0 || x >= w - 1 || y === 0 || y >= h - 1) {
        lightness = sample(id, p);
      }
      else {
        lightness = sample(id, p) * 4 -
            sample(id, p - w * 4) -
            sample(id, p - 4) -
            sample(id, p + 4) -
            sample(id, p + w * 4);
      }

      od[p + 1] = lightness;
    }
  }
}

function skinDetect(options, i, o) {
  var id = i.data;
  var od = o.data;
  var w = i.width;
  var h = i.height;

  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var p = (y * w + x) * 4;
      var lightness = cie(id[p], id[p + 1], id[p + 2]) / 255;
      var skin = skinColor(options, id[p], id[p + 1], id[p + 2]);
      var isSkinColor = skin > options.skinThreshold;
      var isSkinBrightness = lightness >= options.skinBrightnessMin && lightness <= options.skinBrightnessMax;
      if (isSkinColor && isSkinBrightness) {
        od[p] = (skin - options.skinThreshold) * (255 / (1 - options.skinThreshold));
      }
      else {
        od[p] = 0;
      }
    }
  }
}

function saturationDetect(options, i, o) {
  var id = i.data;
  var od = o.data;
  var w = i.width;
  var h = i.height;
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var p = (y * w + x) * 4;

      var lightness = cie(id[p], id[p + 1], id[p + 2]) / 255;
      var sat = saturation(id[p], id[p + 1], id[p + 2]);

      var acceptableSaturation = sat > options.saturationThreshold;
      var acceptableLightness = lightness >= options.saturationBrightnessMin &&
          lightness <= options.saturationBrightnessMax;
      if (acceptableLightness && acceptableLightness) {
        od[p + 2] = (sat - options.saturationThreshold) * (255 / (1 - options.saturationThreshold));
      }
      else {
        od[p + 2] = 0;
      }
    }
  }
}

function applyBoosts(options, output) {
  if (!options.boost) return;
  var od = output.data;
  for (var i = 0; i < output.width; i += 4) {
    od[i + 3] = 0;
  }
  for (i = 0; i < options.boost.length; i++) {
    applyBoost(options.boost[i], options, output);
  }
}

function applyBoost(boost, options, output) {
  var od = output.data;
  var w = output.width;
  var x0 = ~~boost.x;
  var x1 = ~~(boost.x + boost.width);
  var y0 = ~~boost.y;
  var y1 = ~~(boost.y + boost.height);
  var weight = boost.weight * 255;
  for (var y = y0; y < y1; y++) {
    for (var x = x0; x < x1; x++) {
      var i = (y * w + x) * 4;
      od[i + 3] += weight;
    }
  }
}

function generateCrops(options, width, height) {
  var results = [];
  var minDimension = min(width, height);
  var cropWidth = options.cropWidth || minDimension;
  var cropHeight = options.cropHeight || minDimension;
  for (var scale = options.maxScale; scale >= options.minScale; scale -= options.scaleStep) {
    for (var y = 0; y + cropHeight * scale <= height; y += options.step) {
      for (var x = 0; x + cropWidth * scale <= width; x += options.step) {
        results.push({
          x: x,
          y: y,
          width: cropWidth * scale,
          height: cropHeight * scale,
        });
      }
    }
  }
  return results;
}

function score(options, output, crop) {
  var result = {
    detail: 0,
    saturation: 0,
    skin: 0,
    boost: 0,
    total: 0,
  };

  var od = output.data;
  var downSample = options.scoreDownSample;
  var invDownSample = 1 / downSample;
  var outputHeightDownSample = output.height * downSample;
  var outputWidthDownSample = output.width * downSample;
  var outputWidth = output.width;

  for (var y = 0; y < outputHeightDownSample; y += downSample) {
    for (var x = 0; x < outputWidthDownSample; x += downSample) {
      var p = (~~(y * invDownSample) * outputWidth + ~~(x * invDownSample)) * 4;
      var i = importance(options, crop, x, y);
      var detail = od[p + 1] / 255;

      result.skin += od[p] / 255 * (detail + options.skinBias) * i;
      result.detail += detail * i;
      result.saturation += od[p + 2] / 255 * (detail + options.saturationBias) * i;
      result.boost += od[p + 3] / 255 * i;
    }
  }

  result.total = (result.detail * options.detailWeight +
                  result.skin * options.skinWeight +
                  result.saturation * options.saturationWeight +
                  result.boost * options.boostWeight) / (crop.width * crop.height);
  return result;
}

function importance(options, crop, x, y) {
  if (crop.x > x || x >= crop.x + crop.width || crop.y > y || y >= crop.y + crop.height) {
    return options.outsideImportance;
  }
  x = (x - crop.x) / crop.width;
  y = (y - crop.y) / crop.height;
  var px = abs(0.5 - x) * 2;
  var py = abs(0.5 - y) * 2;
  // Distance from edge
  var dx = Math.max(px - 1.0 + options.edgeRadius, 0);
  var dy = Math.max(py - 1.0 + options.edgeRadius, 0);
  var d = (dx * dx + dy * dy) * options.edgeWeight;
  var s = 1.41 - sqrt(px * px + py * py);
  if (options.ruleOfThirds) {
    s += (Math.max(0, s + d + 0.5) * 1.2) * (thirds(px) + thirds(py));
  }
  return s + d;
}
smartcrop.importance = importance;

function skinColor(options, r, g, b) {
  var mag = sqrt(r * r + g * g + b * b);
  var rd = (r / mag - options.skinColor[0]);
  var gd = (g / mag - options.skinColor[1]);
  var bd = (b / mag - options.skinColor[2]);
  var d = sqrt(rd * rd + gd * gd + bd * bd);
  return 1 - d;
}

function analyse(options, input) {
  var result = {};
  var output = new ImgData(input.width, input.height);

  edgeDetect(input, output);
  skinDetect(options, input, output);
  saturationDetect(options, input, output);
  applyBoosts(options, output);

  var scoreOutput = downSample(output, options.scoreDownSample);

  var topScore = -Infinity;
  var topCrop = null;
  var crops = generateCrops(options, input.width, input.height);

  for (var i = 0, iLen = crops.length; i < iLen; i++) {
    var crop = crops[i];
    crop.score = score(options, scoreOutput, crop);
    if (crop.score.total > topScore) {
      topCrop = crop;
      topScore = crop.score.total;
    }

  }

  result.topCrop = topCrop;

  if (options.debug && topCrop) {
    result.crops = crops;
    result.debugOutput = output;
    result.debugOptions = options;
    // Create a copy which will not be adjusted by the post scaling of smartcrop.crop
    result.debugTopCrop = extend({}, result.topCrop);
  }
  return result;
}

function ImgData(width, height, data) {
  this.width = width;
  this.height = height;
  if (data) {
    this.data = new Uint8ClampedArray(data);
  }
  else {
    this.data = new Uint8ClampedArray(width * height * 4);
  }
}
smartcrop.ImgData = ImgData;

function downSample(input, factor) {
  var idata = input.data;
  var iwidth = input.width;
  var width = Math.floor(input.width / factor);
  var height = Math.floor(input.height / factor);
  var output = new ImgData(width, height);
  var data = output.data;
  var ifactor2 = 1 / (factor * factor);
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var i = (y * width + x) * 4;

      var r = 0;
      var g = 0;
      var b = 0;
      var a = 0;

      var mr = 0;
      var mg = 0;
      var mb = 0;

      for (var v = 0; v < factor; v++) {
        for (var u = 0; u < factor; u++) {
          var j = ((y * factor + v) * iwidth + (x * factor + u)) * 4;
          r += idata[j];
          g += idata[j + 1];
          b += idata[j + 2];
          a += idata[j + 3];
          mr = Math.max(mr, idata[j]);
          mg = Math.max(mg, idata[j + 1]);
          mb = Math.max(mb, idata[j + 2]);
        }
      }
      // this is some funky magic to preserve detail a bit more for
      // skin (r) and detail (g). Saturation (b) does not get this boost.
      data[i] = r * ifactor2 * 0.5 + mr * 0.5;
      data[i + 1] = g * ifactor2 * 0.7 + mg * 0.3;
      data[i + 2] = b * ifactor2;
      data[i + 3] = a * ifactor2;
    }
  }
  return output;
}
smartcrop._downSample = downSample;

function defaultCanvasFactory(w, h) {
  var c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function canvasImageOperations(canvasFactory) {
  return {
    // Takes imageInput as argument
    // returns an object which has at least
    // {width: n, height: n}
    open: function(image) {
      // Work around images scaled in css by drawing them onto a canvas
      var w = image.naturalWidth || image.width;
      var h = image.naturalHeight || image.height;
      var c = canvasFactory(w, h);
      var ctx = c.getContext('2d');
      if (image.naturalWidth && (image.naturalWidth != image.width || image.naturalHeight != image.height)) {
        c.width = image.naturalWidth;
        c.height = image.naturalHeight;
      }
      else {
        c.width = image.width;
        c.height = image.height;
      }
      ctx.drawImage(image, 0, 0);
      return smartcrop.Promise.resolve(c);
    },
    // Takes an image (as returned by open), and changes it's size by resampling
    resample: function(image, width, height) {
      return Promise.resolve(image).then(function(image) {
        var c = canvasFactory(~~width, ~~height);
        var ctx = c.getContext('2d');

        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, c.width, c.height);
        return smartcrop.Promise.resolve(c);
      });
    },
    getData: function(image) {
      return Promise.resolve(image).then(function(c) {
        var ctx = c.getContext('2d');
        var id = ctx.getImageData(0, 0, c.width, c.height);
        return new ImgData(c.width, c.height, id.data);
      });
    },
  };
}
smartcrop._canvasImageOperations = canvasImageOperations;

// Aliases and helpers
var min = Math.min;
var max = Math.max;
var abs = Math.abs;
var ceil = Math.ceil;
var sqrt = Math.sqrt;

function extend(o) {
  for (var i = 1, iLen = arguments.length; i < iLen; i++) {
    var arg = arguments[i];
    if (arg) {
      for (var name in arg) {
        o[name] = arg[name];
      }
    }
  }
  return o;
}

// Gets value in the range of [0, 1] where 0 is the center of the pictures
// returns weight of rule of thirds [0, 1]
function thirds(x) {
  x = ((x - (1 / 3) + 1.0) % 2.0 * 0.5 - 0.5) * 16;
  return Math.max(1.0 - x * x, 0.0);
}

function cie(r, g, b) {
  return 0.5126 * b + 0.7152 * g + 0.0722 * r;
}
function sample(id, p) {
  return cie(id[p], id[p + 1], id[p + 2]);
}
function saturation(r, g, b) {
  var maximum = max(r / 255, g / 255, b / 255);
  var minumum = min(r / 255, g / 255, b / 255);

  if (maximum === minumum) {
    return 0;
  }

  var l = (maximum + minumum) / 2;
  var d = maximum - minumum;

  return l > 0.5 ? d / (2 - maximum - minumum) : d / (maximum + minumum);
}

// Amd
if (typeof define !== 'undefined' && define.amd) define(function() {return smartcrop;});
// Common js
if (typeof exports !== 'undefined') exports.smartcrop = smartcrop;
// Browser
else if (typeof navigator !== 'undefined') window.SmartCrop = window.smartcrop = smartcrop;
// Nodejs
if (typeof module !== 'undefined') {
  module.exports = smartcrop;
}
})();

},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"npm":[function(require,module,exports){
exports.chroma = require('chroma-js');

exports.crop = require('smartcrop');


},{"chroma-js":1,"smartcrop":2}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2Rhdm8vRGVza3RvcC9GcmFtZXJOWUNNZWV0dXAvcHJvdG90eXBlcy9zY3JvbGxpbmdDYXJkcy5mcmFtZXIvbW9kdWxlcy9ucG0uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGF2by9EZXNrdG9wL0ZyYW1lck5ZQ01lZXR1cC9wcm90b3R5cGVzL3Njcm9sbGluZ0NhcmRzLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2Rhdm8vRGVza3RvcC9GcmFtZXJOWUNNZWV0dXAvcHJvdG90eXBlcy9zY3JvbGxpbmdDYXJkcy5mcmFtZXIvbm9kZV9tb2R1bGVzL3NtYXJ0Y3JvcC9zbWFydGNyb3AuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9kYXZvL0Rlc2t0b3AvRnJhbWVyTllDTWVldHVwL3Byb3RvdHlwZXMvc2Nyb2xsaW5nQ2FyZHMuZnJhbWVyL25vZGVfbW9kdWxlcy9jaHJvbWEtanMvY2hyb21hLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLmNocm9tYSA9IHJlcXVpcmUgJ2Nocm9tYS1qcydcbmV4cG9ydHMuY3JvcCA9IHJlcXVpcmUgJ3NtYXJ0Y3JvcCciLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiLyoqXG4gKiBzbWFydGNyb3AuanNcbiAqIEEgamF2YXNjcmlwdCBsaWJyYXJ5IGltcGxlbWVudGluZyBjb250ZW50IGF3YXJlIGltYWdlIGNyb3BwaW5nXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEpvbmFzIFdhZ25lclxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuICogYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4gKiBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbiAqIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbiAqIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xuICogcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG4gKiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAqIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4gKiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcbiAqIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4gKiBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG4gKiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbiAqIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIHNtYXJ0Y3JvcCA9IHt9O1xuLy8gUHJvbWlzZSBpbXBsZW1lbnRhdGlvbiB0byB1c2VcbnNtYXJ0Y3JvcC5Qcm9taXNlID0gdHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnID8gUHJvbWlzZSA6IGZ1bmN0aW9uKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ05vIG5hdGl2ZSBwcm9taXNlcyBhbmQgc21hcnRjcm9wLlByb21pc2Ugbm90IHNldC4nKTtcbn07XG5cbnNtYXJ0Y3JvcC5ERUZBVUxUUyA9IHtcbiAgd2lkdGg6IDAsXG4gIGhlaWdodDogMCxcbiAgYXNwZWN0OiAwLFxuICBjcm9wV2lkdGg6IDAsXG4gIGNyb3BIZWlnaHQ6IDAsXG4gIGRldGFpbFdlaWdodDogMC4yLFxuICBza2luQ29sb3I6IFswLjc4LCAwLjU3LCAwLjQ0XSxcbiAgc2tpbkJpYXM6IDAuMDEsXG4gIHNraW5CcmlnaHRuZXNzTWluOiAwLjIsXG4gIHNraW5CcmlnaHRuZXNzTWF4OiAxLjAsXG4gIHNraW5UaHJlc2hvbGQ6IDAuOCxcbiAgc2tpbldlaWdodDogMS44LFxuICBzYXR1cmF0aW9uQnJpZ2h0bmVzc01pbjogMC4wNSxcbiAgc2F0dXJhdGlvbkJyaWdodG5lc3NNYXg6IDAuOSxcbiAgc2F0dXJhdGlvblRocmVzaG9sZDogMC40LFxuICBzYXR1cmF0aW9uQmlhczogMC4yLFxuICBzYXR1cmF0aW9uV2VpZ2h0OiAwLjMsXG4gIC8vIFN0ZXAgKiBtaW5zY2FsZSByb3VuZGVkIGRvd24gdG8gdGhlIG5leHQgcG93ZXIgb2YgdHdvIHNob3VsZCBiZSBnb29kXG4gIHNjb3JlRG93blNhbXBsZTogOCxcbiAgc3RlcDogOCxcbiAgc2NhbGVTdGVwOiAwLjEsXG4gIG1pblNjYWxlOiAxLjAsXG4gIG1heFNjYWxlOiAxLjAsXG4gIGVkZ2VSYWRpdXM6IDAuNCxcbiAgZWRnZVdlaWdodDogLTIwLjAsXG4gIG91dHNpZGVJbXBvcnRhbmNlOiAtMC41LFxuICBib29zdFdlaWdodDogMTAwLjAsXG4gIHJ1bGVPZlRoaXJkczogdHJ1ZSxcbiAgcHJlc2NhbGU6IHRydWUsXG4gIGltYWdlT3BlcmF0aW9uczogbnVsbCxcbiAgY2FudmFzRmFjdG9yeTogZGVmYXVsdENhbnZhc0ZhY3RvcnksXG4gIC8vIEZhY3Rvcnk6IGRlZmF1bHRGYWN0b3JpZXMsXG4gIGRlYnVnOiBmYWxzZSxcbn07XG5cblxuXG5zbWFydGNyb3AuY3JvcCA9IGZ1bmN0aW9uKGlucHV0SW1hZ2UsIG9wdGlvbnNfLCBjYWxsYmFjaykge1xuICB2YXIgb3B0aW9ucyA9IGV4dGVuZCh7fSwgc21hcnRjcm9wLkRFRkFVTFRTLCBvcHRpb25zXyk7XG5cbiAgaWYgKG9wdGlvbnMuYXNwZWN0KSB7XG4gICAgb3B0aW9ucy53aWR0aCA9IG9wdGlvbnMuYXNwZWN0O1xuICAgIG9wdGlvbnMuaGVpZ2h0ID0gMTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmltYWdlT3BlcmF0aW9ucyA9PT0gbnVsbCkge1xuICAgIG9wdGlvbnMuaW1hZ2VPcGVyYXRpb25zID0gY2FudmFzSW1hZ2VPcGVyYXRpb25zKG9wdGlvbnMuY2FudmFzRmFjdG9yeSk7XG4gIH1cblxuICB2YXIgaW9wID0gb3B0aW9ucy5pbWFnZU9wZXJhdGlvbnM7XG5cbiAgdmFyIHNjYWxlID0gMTtcbiAgdmFyIHByZXNjYWxlID0gMTtcblxuICByZXR1cm4gaW9wLm9wZW4oaW5wdXRJbWFnZSwgb3B0aW9ucy5pbnB1dCkudGhlbihmdW5jdGlvbihpbWFnZSkge1xuXG4gICAgaWYgKG9wdGlvbnMud2lkdGggJiYgb3B0aW9ucy5oZWlnaHQpIHtcbiAgICAgIHNjYWxlID0gbWluKGltYWdlLndpZHRoIC8gb3B0aW9ucy53aWR0aCwgaW1hZ2UuaGVpZ2h0IC8gb3B0aW9ucy5oZWlnaHQpO1xuICAgICAgb3B0aW9ucy5jcm9wV2lkdGggPSB+fihvcHRpb25zLndpZHRoICogc2NhbGUpO1xuICAgICAgb3B0aW9ucy5jcm9wSGVpZ2h0ID0gfn4ob3B0aW9ucy5oZWlnaHQgKiBzY2FsZSk7XG4gICAgICAvLyBJbWcgPSAxMDB4MTAwLCB3aWR0aCA9IDk1eDk1LCBzY2FsZSA9IDEwMC85NSwgMS9zY2FsZSA+IG1pblxuICAgICAgLy8gZG9uJ3Qgc2V0IG1pbnNjYWxlIHNtYWxsZXIgdGhhbiAxL3NjYWxlXG4gICAgICAvLyAtPiBkb24ndCBwaWNrIGNyb3BzIHRoYXQgbmVlZCB1cHNjYWxpbmdcbiAgICAgIG9wdGlvbnMubWluU2NhbGUgPSBtaW4ob3B0aW9ucy5tYXhTY2FsZSwgbWF4KDEgLyBzY2FsZSwgb3B0aW9ucy5taW5TY2FsZSkpO1xuXG4gICAgICBpZiAob3B0aW9ucy5wcmVzY2FsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgcHJlc2NhbGUgPSAxIC8gc2NhbGUgLyBvcHRpb25zLm1pblNjYWxlO1xuICAgICAgICBpZiAocHJlc2NhbGUgPCAxKSB7XG4gICAgICAgICAgaW1hZ2UgPSBpb3AucmVzYW1wbGUoaW1hZ2UsIGltYWdlLndpZHRoICogcHJlc2NhbGUsIGltYWdlLmhlaWdodCAqIHByZXNjYWxlKTtcbiAgICAgICAgICBvcHRpb25zLmNyb3BXaWR0aCA9IH5+KG9wdGlvbnMuY3JvcFdpZHRoICogcHJlc2NhbGUpO1xuICAgICAgICAgIG9wdGlvbnMuY3JvcEhlaWdodCA9IH5+KG9wdGlvbnMuY3JvcEhlaWdodCAqIHByZXNjYWxlKTtcbiAgICAgICAgICBpZiAob3B0aW9ucy5ib29zdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5ib29zdCA9IG9wdGlvbnMuYm9vc3QubWFwKGZ1bmN0aW9uKGJvb3N0KSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogfn4oYm9vc3QueCAqIHByZXNjYWxlKSxcbiAgICAgICAgICAgICAgICB5OiB+fihib29zdC55ICogcHJlc2NhbGUpLFxuICAgICAgICAgICAgICAgIHdpZHRoOiB+fihib29zdC53aWR0aCAqIHByZXNjYWxlKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IH5+KGJvb3N0LmhlaWdodCAqIHByZXNjYWxlKSxcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IGJvb3N0LndlaWdodFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHByZXNjYWxlID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW1hZ2U7XG4gIH0pXG4gIC50aGVuKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgcmV0dXJuIGlvcC5nZXREYXRhKGltYWdlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciByZXN1bHQgPSBhbmFseXNlKG9wdGlvbnMsIGRhdGEpO1xuXG4gICAgICB2YXIgY3JvcHMgPSByZXN1bHQuY3JvcHMgfHwgW3Jlc3VsdC50b3BDcm9wXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpTGVuID0gY3JvcHMubGVuZ3RoOyBpIDwgaUxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBjcm9wID0gY3JvcHNbaV07XG4gICAgICAgIGNyb3AueCA9IH5+KGNyb3AueCAvIHByZXNjYWxlKTtcbiAgICAgICAgY3JvcC55ID0gfn4oY3JvcC55IC8gcHJlc2NhbGUpO1xuICAgICAgICBjcm9wLndpZHRoID0gfn4oY3JvcC53aWR0aCAvIHByZXNjYWxlKTtcbiAgICAgICAgY3JvcC5oZWlnaHQgPSB+fihjcm9wLmhlaWdodCAvIHByZXNjYWxlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuXG4vLyBDaGVjayBpZiBhbGwgdGhlIGRlcGVuZGVuY2llcyBhcmUgdGhlcmVcbi8vIHRvZG86XG5zbWFydGNyb3AuaXNBdmFpbGFibGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGlmICghc21hcnRjcm9wLlByb21pc2UpIHJldHVybiBmYWxzZTtcblxuICB2YXIgY2FudmFzRmFjdG9yeSA9IG9wdGlvbnMgPyBvcHRpb25zLmNhbnZhc0ZhY3RvcnkgOiBkZWZhdWx0Q2FudmFzRmFjdG9yeTtcblxuICBpZiAoY2FudmFzRmFjdG9yeSA9PT0gZGVmYXVsdENhbnZhc0ZhY3RvcnkpIHtcbiAgICB2YXIgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGlmICghYy5nZXRDb250ZXh0KCcyZCcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBlZGdlRGV0ZWN0KGksIG8pIHtcbiAgdmFyIGlkID0gaS5kYXRhO1xuICB2YXIgb2QgPSBvLmRhdGE7XG4gIHZhciB3ID0gaS53aWR0aDtcbiAgdmFyIGggPSBpLmhlaWdodDtcblxuICBmb3IgKHZhciB5ID0gMDsgeSA8IGg7IHkrKykge1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdzsgeCsrKSB7XG4gICAgICB2YXIgcCA9ICh5ICogdyArIHgpICogNDtcbiAgICAgIHZhciBsaWdodG5lc3M7XG5cbiAgICAgIGlmICh4ID09PSAwIHx8IHggPj0gdyAtIDEgfHwgeSA9PT0gMCB8fCB5ID49IGggLSAxKSB7XG4gICAgICAgIGxpZ2h0bmVzcyA9IHNhbXBsZShpZCwgcCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGlnaHRuZXNzID0gc2FtcGxlKGlkLCBwKSAqIDQgLVxuICAgICAgICAgICAgc2FtcGxlKGlkLCBwIC0gdyAqIDQpIC1cbiAgICAgICAgICAgIHNhbXBsZShpZCwgcCAtIDQpIC1cbiAgICAgICAgICAgIHNhbXBsZShpZCwgcCArIDQpIC1cbiAgICAgICAgICAgIHNhbXBsZShpZCwgcCArIHcgKiA0KTtcbiAgICAgIH1cblxuICAgICAgb2RbcCArIDFdID0gbGlnaHRuZXNzO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBza2luRGV0ZWN0KG9wdGlvbnMsIGksIG8pIHtcbiAgdmFyIGlkID0gaS5kYXRhO1xuICB2YXIgb2QgPSBvLmRhdGE7XG4gIHZhciB3ID0gaS53aWR0aDtcbiAgdmFyIGggPSBpLmhlaWdodDtcblxuICBmb3IgKHZhciB5ID0gMDsgeSA8IGg7IHkrKykge1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdzsgeCsrKSB7XG4gICAgICB2YXIgcCA9ICh5ICogdyArIHgpICogNDtcbiAgICAgIHZhciBsaWdodG5lc3MgPSBjaWUoaWRbcF0sIGlkW3AgKyAxXSwgaWRbcCArIDJdKSAvIDI1NTtcbiAgICAgIHZhciBza2luID0gc2tpbkNvbG9yKG9wdGlvbnMsIGlkW3BdLCBpZFtwICsgMV0sIGlkW3AgKyAyXSk7XG4gICAgICB2YXIgaXNTa2luQ29sb3IgPSBza2luID4gb3B0aW9ucy5za2luVGhyZXNob2xkO1xuICAgICAgdmFyIGlzU2tpbkJyaWdodG5lc3MgPSBsaWdodG5lc3MgPj0gb3B0aW9ucy5za2luQnJpZ2h0bmVzc01pbiAmJiBsaWdodG5lc3MgPD0gb3B0aW9ucy5za2luQnJpZ2h0bmVzc01heDtcbiAgICAgIGlmIChpc1NraW5Db2xvciAmJiBpc1NraW5CcmlnaHRuZXNzKSB7XG4gICAgICAgIG9kW3BdID0gKHNraW4gLSBvcHRpb25zLnNraW5UaHJlc2hvbGQpICogKDI1NSAvICgxIC0gb3B0aW9ucy5za2luVGhyZXNob2xkKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb2RbcF0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzYXR1cmF0aW9uRGV0ZWN0KG9wdGlvbnMsIGksIG8pIHtcbiAgdmFyIGlkID0gaS5kYXRhO1xuICB2YXIgb2QgPSBvLmRhdGE7XG4gIHZhciB3ID0gaS53aWR0aDtcbiAgdmFyIGggPSBpLmhlaWdodDtcbiAgZm9yICh2YXIgeSA9IDA7IHkgPCBoOyB5KyspIHtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHc7IHgrKykge1xuICAgICAgdmFyIHAgPSAoeSAqIHcgKyB4KSAqIDQ7XG5cbiAgICAgIHZhciBsaWdodG5lc3MgPSBjaWUoaWRbcF0sIGlkW3AgKyAxXSwgaWRbcCArIDJdKSAvIDI1NTtcbiAgICAgIHZhciBzYXQgPSBzYXR1cmF0aW9uKGlkW3BdLCBpZFtwICsgMV0sIGlkW3AgKyAyXSk7XG5cbiAgICAgIHZhciBhY2NlcHRhYmxlU2F0dXJhdGlvbiA9IHNhdCA+IG9wdGlvbnMuc2F0dXJhdGlvblRocmVzaG9sZDtcbiAgICAgIHZhciBhY2NlcHRhYmxlTGlnaHRuZXNzID0gbGlnaHRuZXNzID49IG9wdGlvbnMuc2F0dXJhdGlvbkJyaWdodG5lc3NNaW4gJiZcbiAgICAgICAgICBsaWdodG5lc3MgPD0gb3B0aW9ucy5zYXR1cmF0aW9uQnJpZ2h0bmVzc01heDtcbiAgICAgIGlmIChhY2NlcHRhYmxlTGlnaHRuZXNzICYmIGFjY2VwdGFibGVMaWdodG5lc3MpIHtcbiAgICAgICAgb2RbcCArIDJdID0gKHNhdCAtIG9wdGlvbnMuc2F0dXJhdGlvblRocmVzaG9sZCkgKiAoMjU1IC8gKDEgLSBvcHRpb25zLnNhdHVyYXRpb25UaHJlc2hvbGQpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBvZFtwICsgMl0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUJvb3N0cyhvcHRpb25zLCBvdXRwdXQpIHtcbiAgaWYgKCFvcHRpb25zLmJvb3N0KSByZXR1cm47XG4gIHZhciBvZCA9IG91dHB1dC5kYXRhO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG91dHB1dC53aWR0aDsgaSArPSA0KSB7XG4gICAgb2RbaSArIDNdID0gMDtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5ib29zdC5sZW5ndGg7IGkrKykge1xuICAgIGFwcGx5Qm9vc3Qob3B0aW9ucy5ib29zdFtpXSwgb3B0aW9ucywgb3V0cHV0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUJvb3N0KGJvb3N0LCBvcHRpb25zLCBvdXRwdXQpIHtcbiAgdmFyIG9kID0gb3V0cHV0LmRhdGE7XG4gIHZhciB3ID0gb3V0cHV0LndpZHRoO1xuICB2YXIgeDAgPSB+fmJvb3N0Lng7XG4gIHZhciB4MSA9IH5+KGJvb3N0LnggKyBib29zdC53aWR0aCk7XG4gIHZhciB5MCA9IH5+Ym9vc3QueTtcbiAgdmFyIHkxID0gfn4oYm9vc3QueSArIGJvb3N0LmhlaWdodCk7XG4gIHZhciB3ZWlnaHQgPSBib29zdC53ZWlnaHQgKiAyNTU7XG4gIGZvciAodmFyIHkgPSB5MDsgeSA8IHkxOyB5KyspIHtcbiAgICBmb3IgKHZhciB4ID0geDA7IHggPCB4MTsgeCsrKSB7XG4gICAgICB2YXIgaSA9ICh5ICogdyArIHgpICogNDtcbiAgICAgIG9kW2kgKyAzXSArPSB3ZWlnaHQ7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ3JvcHMob3B0aW9ucywgd2lkdGgsIGhlaWdodCkge1xuICB2YXIgcmVzdWx0cyA9IFtdO1xuICB2YXIgbWluRGltZW5zaW9uID0gbWluKHdpZHRoLCBoZWlnaHQpO1xuICB2YXIgY3JvcFdpZHRoID0gb3B0aW9ucy5jcm9wV2lkdGggfHwgbWluRGltZW5zaW9uO1xuICB2YXIgY3JvcEhlaWdodCA9IG9wdGlvbnMuY3JvcEhlaWdodCB8fCBtaW5EaW1lbnNpb247XG4gIGZvciAodmFyIHNjYWxlID0gb3B0aW9ucy5tYXhTY2FsZTsgc2NhbGUgPj0gb3B0aW9ucy5taW5TY2FsZTsgc2NhbGUgLT0gb3B0aW9ucy5zY2FsZVN0ZXApIHtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSArIGNyb3BIZWlnaHQgKiBzY2FsZSA8PSBoZWlnaHQ7IHkgKz0gb3B0aW9ucy5zdGVwKSB7XG4gICAgICBmb3IgKHZhciB4ID0gMDsgeCArIGNyb3BXaWR0aCAqIHNjYWxlIDw9IHdpZHRoOyB4ICs9IG9wdGlvbnMuc3RlcCkge1xuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgeTogeSxcbiAgICAgICAgICB3aWR0aDogY3JvcFdpZHRoICogc2NhbGUsXG4gICAgICAgICAgaGVpZ2h0OiBjcm9wSGVpZ2h0ICogc2NhbGUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gc2NvcmUob3B0aW9ucywgb3V0cHV0LCBjcm9wKSB7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgZGV0YWlsOiAwLFxuICAgIHNhdHVyYXRpb246IDAsXG4gICAgc2tpbjogMCxcbiAgICBib29zdDogMCxcbiAgICB0b3RhbDogMCxcbiAgfTtcblxuICB2YXIgb2QgPSBvdXRwdXQuZGF0YTtcbiAgdmFyIGRvd25TYW1wbGUgPSBvcHRpb25zLnNjb3JlRG93blNhbXBsZTtcbiAgdmFyIGludkRvd25TYW1wbGUgPSAxIC8gZG93blNhbXBsZTtcbiAgdmFyIG91dHB1dEhlaWdodERvd25TYW1wbGUgPSBvdXRwdXQuaGVpZ2h0ICogZG93blNhbXBsZTtcbiAgdmFyIG91dHB1dFdpZHRoRG93blNhbXBsZSA9IG91dHB1dC53aWR0aCAqIGRvd25TYW1wbGU7XG4gIHZhciBvdXRwdXRXaWR0aCA9IG91dHB1dC53aWR0aDtcblxuICBmb3IgKHZhciB5ID0gMDsgeSA8IG91dHB1dEhlaWdodERvd25TYW1wbGU7IHkgKz0gZG93blNhbXBsZSkge1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgb3V0cHV0V2lkdGhEb3duU2FtcGxlOyB4ICs9IGRvd25TYW1wbGUpIHtcbiAgICAgIHZhciBwID0gKH5+KHkgKiBpbnZEb3duU2FtcGxlKSAqIG91dHB1dFdpZHRoICsgfn4oeCAqIGludkRvd25TYW1wbGUpKSAqIDQ7XG4gICAgICB2YXIgaSA9IGltcG9ydGFuY2Uob3B0aW9ucywgY3JvcCwgeCwgeSk7XG4gICAgICB2YXIgZGV0YWlsID0gb2RbcCArIDFdIC8gMjU1O1xuXG4gICAgICByZXN1bHQuc2tpbiArPSBvZFtwXSAvIDI1NSAqIChkZXRhaWwgKyBvcHRpb25zLnNraW5CaWFzKSAqIGk7XG4gICAgICByZXN1bHQuZGV0YWlsICs9IGRldGFpbCAqIGk7XG4gICAgICByZXN1bHQuc2F0dXJhdGlvbiArPSBvZFtwICsgMl0gLyAyNTUgKiAoZGV0YWlsICsgb3B0aW9ucy5zYXR1cmF0aW9uQmlhcykgKiBpO1xuICAgICAgcmVzdWx0LmJvb3N0ICs9IG9kW3AgKyAzXSAvIDI1NSAqIGk7XG4gICAgfVxuICB9XG5cbiAgcmVzdWx0LnRvdGFsID0gKHJlc3VsdC5kZXRhaWwgKiBvcHRpb25zLmRldGFpbFdlaWdodCArXG4gICAgICAgICAgICAgICAgICByZXN1bHQuc2tpbiAqIG9wdGlvbnMuc2tpbldlaWdodCArXG4gICAgICAgICAgICAgICAgICByZXN1bHQuc2F0dXJhdGlvbiAqIG9wdGlvbnMuc2F0dXJhdGlvbldlaWdodCArXG4gICAgICAgICAgICAgICAgICByZXN1bHQuYm9vc3QgKiBvcHRpb25zLmJvb3N0V2VpZ2h0KSAvIChjcm9wLndpZHRoICogY3JvcC5oZWlnaHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpbXBvcnRhbmNlKG9wdGlvbnMsIGNyb3AsIHgsIHkpIHtcbiAgaWYgKGNyb3AueCA+IHggfHwgeCA+PSBjcm9wLnggKyBjcm9wLndpZHRoIHx8IGNyb3AueSA+IHkgfHwgeSA+PSBjcm9wLnkgKyBjcm9wLmhlaWdodCkge1xuICAgIHJldHVybiBvcHRpb25zLm91dHNpZGVJbXBvcnRhbmNlO1xuICB9XG4gIHggPSAoeCAtIGNyb3AueCkgLyBjcm9wLndpZHRoO1xuICB5ID0gKHkgLSBjcm9wLnkpIC8gY3JvcC5oZWlnaHQ7XG4gIHZhciBweCA9IGFicygwLjUgLSB4KSAqIDI7XG4gIHZhciBweSA9IGFicygwLjUgLSB5KSAqIDI7XG4gIC8vIERpc3RhbmNlIGZyb20gZWRnZVxuICB2YXIgZHggPSBNYXRoLm1heChweCAtIDEuMCArIG9wdGlvbnMuZWRnZVJhZGl1cywgMCk7XG4gIHZhciBkeSA9IE1hdGgubWF4KHB5IC0gMS4wICsgb3B0aW9ucy5lZGdlUmFkaXVzLCAwKTtcbiAgdmFyIGQgPSAoZHggKiBkeCArIGR5ICogZHkpICogb3B0aW9ucy5lZGdlV2VpZ2h0O1xuICB2YXIgcyA9IDEuNDEgLSBzcXJ0KHB4ICogcHggKyBweSAqIHB5KTtcbiAgaWYgKG9wdGlvbnMucnVsZU9mVGhpcmRzKSB7XG4gICAgcyArPSAoTWF0aC5tYXgoMCwgcyArIGQgKyAwLjUpICogMS4yKSAqICh0aGlyZHMocHgpICsgdGhpcmRzKHB5KSk7XG4gIH1cbiAgcmV0dXJuIHMgKyBkO1xufVxuc21hcnRjcm9wLmltcG9ydGFuY2UgPSBpbXBvcnRhbmNlO1xuXG5mdW5jdGlvbiBza2luQ29sb3Iob3B0aW9ucywgciwgZywgYikge1xuICB2YXIgbWFnID0gc3FydChyICogciArIGcgKiBnICsgYiAqIGIpO1xuICB2YXIgcmQgPSAociAvIG1hZyAtIG9wdGlvbnMuc2tpbkNvbG9yWzBdKTtcbiAgdmFyIGdkID0gKGcgLyBtYWcgLSBvcHRpb25zLnNraW5Db2xvclsxXSk7XG4gIHZhciBiZCA9IChiIC8gbWFnIC0gb3B0aW9ucy5za2luQ29sb3JbMl0pO1xuICB2YXIgZCA9IHNxcnQocmQgKiByZCArIGdkICogZ2QgKyBiZCAqIGJkKTtcbiAgcmV0dXJuIDEgLSBkO1xufVxuXG5mdW5jdGlvbiBhbmFseXNlKG9wdGlvbnMsIGlucHV0KSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIG91dHB1dCA9IG5ldyBJbWdEYXRhKGlucHV0LndpZHRoLCBpbnB1dC5oZWlnaHQpO1xuXG4gIGVkZ2VEZXRlY3QoaW5wdXQsIG91dHB1dCk7XG4gIHNraW5EZXRlY3Qob3B0aW9ucywgaW5wdXQsIG91dHB1dCk7XG4gIHNhdHVyYXRpb25EZXRlY3Qob3B0aW9ucywgaW5wdXQsIG91dHB1dCk7XG4gIGFwcGx5Qm9vc3RzKG9wdGlvbnMsIG91dHB1dCk7XG5cbiAgdmFyIHNjb3JlT3V0cHV0ID0gZG93blNhbXBsZShvdXRwdXQsIG9wdGlvbnMuc2NvcmVEb3duU2FtcGxlKTtcblxuICB2YXIgdG9wU2NvcmUgPSAtSW5maW5pdHk7XG4gIHZhciB0b3BDcm9wID0gbnVsbDtcbiAgdmFyIGNyb3BzID0gZ2VuZXJhdGVDcm9wcyhvcHRpb25zLCBpbnB1dC53aWR0aCwgaW5wdXQuaGVpZ2h0KTtcblxuICBmb3IgKHZhciBpID0gMCwgaUxlbiA9IGNyb3BzLmxlbmd0aDsgaSA8IGlMZW47IGkrKykge1xuICAgIHZhciBjcm9wID0gY3JvcHNbaV07XG4gICAgY3JvcC5zY29yZSA9IHNjb3JlKG9wdGlvbnMsIHNjb3JlT3V0cHV0LCBjcm9wKTtcbiAgICBpZiAoY3JvcC5zY29yZS50b3RhbCA+IHRvcFNjb3JlKSB7XG4gICAgICB0b3BDcm9wID0gY3JvcDtcbiAgICAgIHRvcFNjb3JlID0gY3JvcC5zY29yZS50b3RhbDtcbiAgICB9XG5cbiAgfVxuXG4gIHJlc3VsdC50b3BDcm9wID0gdG9wQ3JvcDtcblxuICBpZiAob3B0aW9ucy5kZWJ1ZyAmJiB0b3BDcm9wKSB7XG4gICAgcmVzdWx0LmNyb3BzID0gY3JvcHM7XG4gICAgcmVzdWx0LmRlYnVnT3V0cHV0ID0gb3V0cHV0O1xuICAgIHJlc3VsdC5kZWJ1Z09wdGlvbnMgPSBvcHRpb25zO1xuICAgIC8vIENyZWF0ZSBhIGNvcHkgd2hpY2ggd2lsbCBub3QgYmUgYWRqdXN0ZWQgYnkgdGhlIHBvc3Qgc2NhbGluZyBvZiBzbWFydGNyb3AuY3JvcFxuICAgIHJlc3VsdC5kZWJ1Z1RvcENyb3AgPSBleHRlbmQoe30sIHJlc3VsdC50b3BDcm9wKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBJbWdEYXRhKHdpZHRoLCBoZWlnaHQsIGRhdGEpIHtcbiAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgaWYgKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoZGF0YSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHdpZHRoICogaGVpZ2h0ICogNCk7XG4gIH1cbn1cbnNtYXJ0Y3JvcC5JbWdEYXRhID0gSW1nRGF0YTtcblxuZnVuY3Rpb24gZG93blNhbXBsZShpbnB1dCwgZmFjdG9yKSB7XG4gIHZhciBpZGF0YSA9IGlucHV0LmRhdGE7XG4gIHZhciBpd2lkdGggPSBpbnB1dC53aWR0aDtcbiAgdmFyIHdpZHRoID0gTWF0aC5mbG9vcihpbnB1dC53aWR0aCAvIGZhY3Rvcik7XG4gIHZhciBoZWlnaHQgPSBNYXRoLmZsb29yKGlucHV0LmhlaWdodCAvIGZhY3Rvcik7XG4gIHZhciBvdXRwdXQgPSBuZXcgSW1nRGF0YSh3aWR0aCwgaGVpZ2h0KTtcbiAgdmFyIGRhdGEgPSBvdXRwdXQuZGF0YTtcbiAgdmFyIGlmYWN0b3IyID0gMSAvIChmYWN0b3IgKiBmYWN0b3IpO1xuICBmb3IgKHZhciB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICB2YXIgaSA9ICh5ICogd2lkdGggKyB4KSAqIDQ7XG5cbiAgICAgIHZhciByID0gMDtcbiAgICAgIHZhciBnID0gMDtcbiAgICAgIHZhciBiID0gMDtcbiAgICAgIHZhciBhID0gMDtcblxuICAgICAgdmFyIG1yID0gMDtcbiAgICAgIHZhciBtZyA9IDA7XG4gICAgICB2YXIgbWIgPSAwO1xuXG4gICAgICBmb3IgKHZhciB2ID0gMDsgdiA8IGZhY3RvcjsgdisrKSB7XG4gICAgICAgIGZvciAodmFyIHUgPSAwOyB1IDwgZmFjdG9yOyB1KyspIHtcbiAgICAgICAgICB2YXIgaiA9ICgoeSAqIGZhY3RvciArIHYpICogaXdpZHRoICsgKHggKiBmYWN0b3IgKyB1KSkgKiA0O1xuICAgICAgICAgIHIgKz0gaWRhdGFbal07XG4gICAgICAgICAgZyArPSBpZGF0YVtqICsgMV07XG4gICAgICAgICAgYiArPSBpZGF0YVtqICsgMl07XG4gICAgICAgICAgYSArPSBpZGF0YVtqICsgM107XG4gICAgICAgICAgbXIgPSBNYXRoLm1heChtciwgaWRhdGFbal0pO1xuICAgICAgICAgIG1nID0gTWF0aC5tYXgobWcsIGlkYXRhW2ogKyAxXSk7XG4gICAgICAgICAgbWIgPSBNYXRoLm1heChtYiwgaWRhdGFbaiArIDJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gdGhpcyBpcyBzb21lIGZ1bmt5IG1hZ2ljIHRvIHByZXNlcnZlIGRldGFpbCBhIGJpdCBtb3JlIGZvclxuICAgICAgLy8gc2tpbiAocikgYW5kIGRldGFpbCAoZykuIFNhdHVyYXRpb24gKGIpIGRvZXMgbm90IGdldCB0aGlzIGJvb3N0LlxuICAgICAgZGF0YVtpXSA9IHIgKiBpZmFjdG9yMiAqIDAuNSArIG1yICogMC41O1xuICAgICAgZGF0YVtpICsgMV0gPSBnICogaWZhY3RvcjIgKiAwLjcgKyBtZyAqIDAuMztcbiAgICAgIGRhdGFbaSArIDJdID0gYiAqIGlmYWN0b3IyO1xuICAgICAgZGF0YVtpICsgM10gPSBhICogaWZhY3RvcjI7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5zbWFydGNyb3AuX2Rvd25TYW1wbGUgPSBkb3duU2FtcGxlO1xuXG5mdW5jdGlvbiBkZWZhdWx0Q2FudmFzRmFjdG9yeSh3LCBoKSB7XG4gIHZhciBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGMud2lkdGggPSB3O1xuICBjLmhlaWdodCA9IGg7XG4gIHJldHVybiBjO1xufVxuXG5mdW5jdGlvbiBjYW52YXNJbWFnZU9wZXJhdGlvbnMoY2FudmFzRmFjdG9yeSkge1xuICByZXR1cm4ge1xuICAgIC8vIFRha2VzIGltYWdlSW5wdXQgYXMgYXJndW1lbnRcbiAgICAvLyByZXR1cm5zIGFuIG9iamVjdCB3aGljaCBoYXMgYXQgbGVhc3RcbiAgICAvLyB7d2lkdGg6IG4sIGhlaWdodDogbn1cbiAgICBvcGVuOiBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgLy8gV29yayBhcm91bmQgaW1hZ2VzIHNjYWxlZCBpbiBjc3MgYnkgZHJhd2luZyB0aGVtIG9udG8gYSBjYW52YXNcbiAgICAgIHZhciB3ID0gaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoO1xuICAgICAgdmFyIGggPSBpbWFnZS5uYXR1cmFsSGVpZ2h0IHx8IGltYWdlLmhlaWdodDtcbiAgICAgIHZhciBjID0gY2FudmFzRmFjdG9yeSh3LCBoKTtcbiAgICAgIHZhciBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBpZiAoaW1hZ2UubmF0dXJhbFdpZHRoICYmIChpbWFnZS5uYXR1cmFsV2lkdGggIT0gaW1hZ2Uud2lkdGggfHwgaW1hZ2UubmF0dXJhbEhlaWdodCAhPSBpbWFnZS5oZWlnaHQpKSB7XG4gICAgICAgIGMud2lkdGggPSBpbWFnZS5uYXR1cmFsV2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgfVxuICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICByZXR1cm4gc21hcnRjcm9wLlByb21pc2UucmVzb2x2ZShjKTtcbiAgICB9LFxuICAgIC8vIFRha2VzIGFuIGltYWdlIChhcyByZXR1cm5lZCBieSBvcGVuKSwgYW5kIGNoYW5nZXMgaXQncyBzaXplIGJ5IHJlc2FtcGxpbmdcbiAgICByZXNhbXBsZTogZnVuY3Rpb24oaW1hZ2UsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW1hZ2UpLnRoZW4oZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgdmFyIGMgPSBjYW52YXNGYWN0b3J5KH5+d2lkdGgsIH5+aGVpZ2h0KTtcbiAgICAgICAgdmFyIGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCAwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgICAgIHJldHVybiBzbWFydGNyb3AuUHJvbWlzZS5yZXNvbHZlKGMpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXREYXRhOiBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbWFnZSkudGhlbihmdW5jdGlvbihjKSB7XG4gICAgICAgIHZhciBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHZhciBpZCA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gbmV3IEltZ0RhdGEoYy53aWR0aCwgYy5oZWlnaHQsIGlkLmRhdGEpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn1cbnNtYXJ0Y3JvcC5fY2FudmFzSW1hZ2VPcGVyYXRpb25zID0gY2FudmFzSW1hZ2VPcGVyYXRpb25zO1xuXG4vLyBBbGlhc2VzIGFuZCBoZWxwZXJzXG52YXIgbWluID0gTWF0aC5taW47XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgYWJzID0gTWF0aC5hYnM7XG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBzcXJ0ID0gTWF0aC5zcXJ0O1xuXG5mdW5jdGlvbiBleHRlbmQobykge1xuICBmb3IgKHZhciBpID0gMSwgaUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpTGVuOyBpKyspIHtcbiAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuICAgIGlmIChhcmcpIHtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gYXJnKSB7XG4gICAgICAgIG9bbmFtZV0gPSBhcmdbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvO1xufVxuXG4vLyBHZXRzIHZhbHVlIGluIHRoZSByYW5nZSBvZiBbMCwgMV0gd2hlcmUgMCBpcyB0aGUgY2VudGVyIG9mIHRoZSBwaWN0dXJlc1xuLy8gcmV0dXJucyB3ZWlnaHQgb2YgcnVsZSBvZiB0aGlyZHMgWzAsIDFdXG5mdW5jdGlvbiB0aGlyZHMoeCkge1xuICB4ID0gKCh4IC0gKDEgLyAzKSArIDEuMCkgJSAyLjAgKiAwLjUgLSAwLjUpICogMTY7XG4gIHJldHVybiBNYXRoLm1heCgxLjAgLSB4ICogeCwgMC4wKTtcbn1cblxuZnVuY3Rpb24gY2llKHIsIGcsIGIpIHtcbiAgcmV0dXJuIDAuNTEyNiAqIGIgKyAwLjcxNTIgKiBnICsgMC4wNzIyICogcjtcbn1cbmZ1bmN0aW9uIHNhbXBsZShpZCwgcCkge1xuICByZXR1cm4gY2llKGlkW3BdLCBpZFtwICsgMV0sIGlkW3AgKyAyXSk7XG59XG5mdW5jdGlvbiBzYXR1cmF0aW9uKHIsIGcsIGIpIHtcbiAgdmFyIG1heGltdW0gPSBtYXgociAvIDI1NSwgZyAvIDI1NSwgYiAvIDI1NSk7XG4gIHZhciBtaW51bXVtID0gbWluKHIgLyAyNTUsIGcgLyAyNTUsIGIgLyAyNTUpO1xuXG4gIGlmIChtYXhpbXVtID09PSBtaW51bXVtKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgbCA9IChtYXhpbXVtICsgbWludW11bSkgLyAyO1xuICB2YXIgZCA9IG1heGltdW0gLSBtaW51bXVtO1xuXG4gIHJldHVybiBsID4gMC41ID8gZCAvICgyIC0gbWF4aW11bSAtIG1pbnVtdW0pIDogZCAvIChtYXhpbXVtICsgbWludW11bSk7XG59XG5cbi8vIEFtZFxuaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIGRlZmluZShmdW5jdGlvbigpIHtyZXR1cm4gc21hcnRjcm9wO30pO1xuLy8gQ29tbW9uIGpzXG5pZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSBleHBvcnRzLnNtYXJ0Y3JvcCA9IHNtYXJ0Y3JvcDtcbi8vIEJyb3dzZXJcbmVsc2UgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB3aW5kb3cuU21hcnRDcm9wID0gd2luZG93LnNtYXJ0Y3JvcCA9IHNtYXJ0Y3JvcDtcbi8vIE5vZGVqc1xuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gc21hcnRjcm9wO1xufVxufSkoKTtcbiIsIlxuLyoqXG4gKiBAbGljZW5zZVxuICpcbiAqIGNocm9tYS5qcyAtIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgY29sb3IgY29udmVyc2lvbnNcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTcsIEdyZWdvciBBaXNjaFxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqIFxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIFxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiBcbiAqIDMuIFRoZSBuYW1lIEdyZWdvciBBaXNjaCBtYXkgbm90IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzXG4gKiAgICBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqIFxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgR1JFR09SIEFJU0NIIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORyxcbiAqIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsXG4gKiBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZXG4gKiBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xuICogTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLFxuICogRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgQ29sb3IsIERFRzJSQUQsIExBQl9DT05TVEFOVFMsIFBJLCBQSVRISVJELCBSQUQyREVHLCBUV09QSSwgX2d1ZXNzX2Zvcm1hdHMsIF9ndWVzc19mb3JtYXRzX3NvcnRlZCwgX2lucHV0LCBfaW50ZXJwb2xhdG9ycywgYWJzLCBhdGFuMiwgYmV6aWVyLCBibGVuZCwgYmxlbmRfZiwgYnJld2VyLCBidXJuLCBjaHJvbWEsIGNsaXBfcmdiLCBjbXlrMnJnYiwgY29sb3JzLCBjb3MsIGNzczJyZ2IsIGRhcmtlbiwgZG9kZ2UsIGVhY2gsIGZsb29yLCBoY2cycmdiLCBoZXgycmdiLCBoc2kycmdiLCBoc2wyY3NzLCBoc2wycmdiLCBoc3YycmdiLCBpbnRlcnBvbGF0ZSwgaW50ZXJwb2xhdGVfaHN4LCBpbnRlcnBvbGF0ZV9sYWIsIGludGVycG9sYXRlX251bSwgaW50ZXJwb2xhdGVfcmdiLCBsYWIybGNoLCBsYWIycmdiLCBsYWJfeHl6LCBsY2gybGFiLCBsY2gycmdiLCBsaWdodGVuLCBsaW1pdCwgbG9nLCBsdW1pbmFuY2VfeCwgbSwgbWF4LCBtdWx0aXBseSwgbm9ybWFsLCBudW0ycmdiLCBvdmVybGF5LCBwb3csIHJnYjJjbXlrLCByZ2IyY3NzLCByZ2IyaGNnLCByZ2IyaGV4LCByZ2IyaHNpLCByZ2IyaHNsLCByZ2IyaHN2LCByZ2IybGFiLCByZ2IybGNoLCByZ2IybHVtaW5hbmNlLCByZ2IybnVtLCByZ2IydGVtcGVyYXR1cmUsIHJnYjJ4eXosIHJnYl94eXosIHJuZCwgcm9vdCwgcm91bmQsIHNjcmVlbiwgc2luLCBzcXJ0LCB0ZW1wZXJhdHVyZTJyZ2IsIHR5cGUsIHVucGFjaywgdzNjeDExLCB4eXpfbGFiLCB4eXpfcmdiLFxuICAgIHNsaWNlID0gW10uc2xpY2U7XG5cbiAgdHlwZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qXG4gICAgZm9yIGJyb3dzZXItc2FmZSB0eXBlIGNoZWNraW5nK1xuICAgIHBvcnRlZCBmcm9tIGpRdWVyeSdzICQudHlwZVxuICAgICAqL1xuICAgIHZhciBjbGFzc1RvVHlwZSwgbGVuLCBuYW1lLCBvLCByZWY7XG4gICAgY2xhc3NUb1R5cGUgPSB7fTtcbiAgICByZWYgPSBcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBVbmRlZmluZWQgTnVsbFwiLnNwbGl0KFwiIFwiKTtcbiAgICBmb3IgKG8gPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBvIDwgbGVuOyBvKyspIHtcbiAgICAgIG5hbWUgPSByZWZbb107XG4gICAgICBjbGFzc1RvVHlwZVtcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCJdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgc3RyVHlwZTtcbiAgICAgIHN0clR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgIHJldHVybiBjbGFzc1RvVHlwZVtzdHJUeXBlXSB8fCBcIm9iamVjdFwiO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgbGltaXQgPSBmdW5jdGlvbih4LCBtaW4sIG1heCkge1xuICAgIGlmIChtaW4gPT0gbnVsbCkge1xuICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSAxO1xuICAgIH1cbiAgICBpZiAoeCA8IG1pbikge1xuICAgICAgeCA9IG1pbjtcbiAgICB9XG4gICAgaWYgKHggPiBtYXgpIHtcbiAgICAgIHggPSBtYXg7XG4gICAgfVxuICAgIHJldHVybiB4O1xuICB9O1xuXG4gIHVucGFjayA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgIH1cbiAgfTtcblxuICBjbGlwX3JnYiA9IGZ1bmN0aW9uKHJnYikge1xuICAgIHZhciBpLCBvO1xuICAgIHJnYi5fY2xpcHBlZCA9IGZhbHNlO1xuICAgIHJnYi5fdW5jbGlwcGVkID0gcmdiLnNsaWNlKDApO1xuICAgIGZvciAoaSA9IG8gPSAwOyBvIDwgMzsgaSA9ICsrbykge1xuICAgICAgaWYgKGkgPCAzKSB7XG4gICAgICAgIGlmIChyZ2JbaV0gPCAwIHx8IHJnYltpXSA+IDI1NSkge1xuICAgICAgICAgIHJnYi5fY2xpcHBlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJnYltpXSA8IDApIHtcbiAgICAgICAgICByZ2JbaV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZ2JbaV0gPiAyNTUpIHtcbiAgICAgICAgICByZ2JbaV0gPSAyNTU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMykge1xuICAgICAgICBpZiAocmdiW2ldIDwgMCkge1xuICAgICAgICAgIHJnYltpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJnYltpXSA+IDEpIHtcbiAgICAgICAgICByZ2JbaV0gPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcmdiLl9jbGlwcGVkKSB7XG4gICAgICBkZWxldGUgcmdiLl91bmNsaXBwZWQ7XG4gICAgfVxuICAgIHJldHVybiByZ2I7XG4gIH07XG5cbiAgUEkgPSBNYXRoLlBJLCByb3VuZCA9IE1hdGgucm91bmQsIGNvcyA9IE1hdGguY29zLCBmbG9vciA9IE1hdGguZmxvb3IsIHBvdyA9IE1hdGgucG93LCBsb2cgPSBNYXRoLmxvZywgc2luID0gTWF0aC5zaW4sIHNxcnQgPSBNYXRoLnNxcnQsIGF0YW4yID0gTWF0aC5hdGFuMiwgbWF4ID0gTWF0aC5tYXgsIGFicyA9IE1hdGguYWJzO1xuXG4gIFRXT1BJID0gUEkgKiAyO1xuXG4gIFBJVEhJUkQgPSBQSSAvIDM7XG5cbiAgREVHMlJBRCA9IFBJIC8gMTgwO1xuXG4gIFJBRDJERUcgPSAxODAgLyBQSTtcblxuICBjaHJvbWEgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgQ29sb3IpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgfVxuICAgIHJldHVybiAoZnVuY3Rpb24oZnVuYywgYXJncywgY3Rvcikge1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBmdW5jLnByb3RvdHlwZTtcbiAgICAgIHZhciBjaGlsZCA9IG5ldyBjdG9yLCByZXN1bHQgPSBmdW5jLmFwcGx5KGNoaWxkLCBhcmdzKTtcbiAgICAgIHJldHVybiBPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0ID8gcmVzdWx0IDogY2hpbGQ7XG4gICAgfSkoQ29sb3IsIGFyZ3VtZW50cywgZnVuY3Rpb24oKXt9KTtcbiAgfTtcblxuICBfaW50ZXJwb2xhdG9ycyA9IFtdO1xuXG4gIGlmICgodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgIT09IG51bGwpICYmIChtb2R1bGUuZXhwb3J0cyAhPSBudWxsKSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gY2hyb21hO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY2hyb21hO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJvb3QgPSB0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBleHBvcnRzICE9PSBudWxsID8gZXhwb3J0cyA6IHRoaXM7XG4gICAgcm9vdC5jaHJvbWEgPSBjaHJvbWE7XG4gIH1cblxuICBjaHJvbWEudmVyc2lvbiA9ICcxLjMuNCc7XG5cbiAgX2lucHV0ID0ge307XG5cbiAgX2d1ZXNzX2Zvcm1hdHMgPSBbXTtcblxuICBfZ3Vlc3NfZm9ybWF0c19zb3J0ZWQgPSBmYWxzZTtcblxuICBDb2xvciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBDb2xvcigpIHtcbiAgICAgIHZhciBhcmcsIGFyZ3MsIGNoaywgbGVuLCBsZW4xLCBtZSwgbW9kZSwgbywgdztcbiAgICAgIG1lID0gdGhpcztcbiAgICAgIGFyZ3MgPSBbXTtcbiAgICAgIGZvciAobyA9IDAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7IG8gPCBsZW47IG8rKykge1xuICAgICAgICBhcmcgPSBhcmd1bWVudHNbb107XG4gICAgICAgIGlmIChhcmcgIT0gbnVsbCkge1xuICAgICAgICAgIGFyZ3MucHVzaChhcmcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBtb2RlID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKF9pbnB1dFttb2RlXSAhPSBudWxsKSB7XG4gICAgICAgIG1lLl9yZ2IgPSBjbGlwX3JnYihfaW5wdXRbbW9kZV0odW5wYWNrKGFyZ3Muc2xpY2UoMCwgLTEpKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFfZ3Vlc3NfZm9ybWF0c19zb3J0ZWQpIHtcbiAgICAgICAgICBfZ3Vlc3NfZm9ybWF0cyA9IF9ndWVzc19mb3JtYXRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIucCAtIGEucDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBfZ3Vlc3NfZm9ybWF0c19zb3J0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodyA9IDAsIGxlbjEgPSBfZ3Vlc3NfZm9ybWF0cy5sZW5ndGg7IHcgPCBsZW4xOyB3KyspIHtcbiAgICAgICAgICBjaGsgPSBfZ3Vlc3NfZm9ybWF0c1t3XTtcbiAgICAgICAgICBtb2RlID0gY2hrLnRlc3QuYXBwbHkoY2hrLCBhcmdzKTtcbiAgICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgbWUuX3JnYiA9IGNsaXBfcmdiKF9pbnB1dFttb2RlXS5hcHBseShfaW5wdXQsIGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lLl9yZ2IgPT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ3Vua25vd24gZm9ybWF0OiAnICsgYXJncyk7XG4gICAgICB9XG4gICAgICBpZiAobWUuX3JnYiA9PSBudWxsKSB7XG4gICAgICAgIG1lLl9yZ2IgPSBbMCwgMCwgMF07XG4gICAgICB9XG4gICAgICBpZiAobWUuX3JnYi5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgbWUuX3JnYi5wdXNoKDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIENvbG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGV4KCk7XG4gICAgfTtcblxuICAgIENvbG9yLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNocm9tYShtZS5fcmdiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbG9yO1xuXG4gIH0pKCk7XG5cbiAgY2hyb21hLl9pbnB1dCA9IF9pbnB1dDtcblxuXG4gIC8qKlxuICBcdENvbG9yQnJld2VyIGNvbG9ycyBmb3IgY2hyb21hLmpzXG4gIFxuICBcdENvcHlyaWdodCAoYykgMjAwMiBDeW50aGlhIEJyZXdlciwgTWFyayBIYXJyb3dlciwgYW5kIFRoZSBcbiAgXHRQZW5uc3lsdmFuaWEgU3RhdGUgVW5pdmVyc2l0eS5cbiAgXG4gIFx0TGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgXG4gIFx0eW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICBcdFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFx0XG4gIFx0aHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gIFxuICBcdFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWRcbiAgXHR1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUlxuICBcdENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gIFx0c3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAgXG4gICAgICBAcHJlc2VydmVcbiAgICovXG5cbiAgY2hyb21hLmJyZXdlciA9IGJyZXdlciA9IHtcbiAgICBPclJkOiBbJyNmZmY3ZWMnLCAnI2ZlZThjOCcsICcjZmRkNDllJywgJyNmZGJiODQnLCAnI2ZjOGQ1OScsICcjZWY2NTQ4JywgJyNkNzMwMWYnLCAnI2IzMDAwMCcsICcjN2YwMDAwJ10sXG4gICAgUHVCdTogWycjZmZmN2ZiJywgJyNlY2U3ZjInLCAnI2QwZDFlNicsICcjYTZiZGRiJywgJyM3NGE5Y2YnLCAnIzM2OTBjMCcsICcjMDU3MGIwJywgJyMwNDVhOGQnLCAnIzAyMzg1OCddLFxuICAgIEJ1UHU6IFsnI2Y3ZmNmZCcsICcjZTBlY2Y0JywgJyNiZmQzZTYnLCAnIzllYmNkYScsICcjOGM5NmM2JywgJyM4YzZiYjEnLCAnIzg4NDE5ZCcsICcjODEwZjdjJywgJyM0ZDAwNGInXSxcbiAgICBPcmFuZ2VzOiBbJyNmZmY1ZWInLCAnI2ZlZTZjZScsICcjZmRkMGEyJywgJyNmZGFlNmInLCAnI2ZkOGQzYycsICcjZjE2OTEzJywgJyNkOTQ4MDEnLCAnI2E2MzYwMycsICcjN2YyNzA0J10sXG4gICAgQnVHbjogWycjZjdmY2ZkJywgJyNlNWY1ZjknLCAnI2NjZWNlNicsICcjOTlkOGM5JywgJyM2NmMyYTQnLCAnIzQxYWU3NicsICcjMjM4YjQ1JywgJyMwMDZkMmMnLCAnIzAwNDQxYiddLFxuICAgIFlsT3JCcjogWycjZmZmZmU1JywgJyNmZmY3YmMnLCAnI2ZlZTM5MScsICcjZmVjNDRmJywgJyNmZTk5MjknLCAnI2VjNzAxNCcsICcjY2M0YzAyJywgJyM5OTM0MDQnLCAnIzY2MjUwNiddLFxuICAgIFlsR246IFsnI2ZmZmZlNScsICcjZjdmY2I5JywgJyNkOWYwYTMnLCAnI2FkZGQ4ZScsICcjNzhjNjc5JywgJyM0MWFiNWQnLCAnIzIzODQ0MycsICcjMDA2ODM3JywgJyMwMDQ1MjknXSxcbiAgICBSZWRzOiBbJyNmZmY1ZjAnLCAnI2ZlZTBkMicsICcjZmNiYmExJywgJyNmYzkyNzInLCAnI2ZiNmE0YScsICcjZWYzYjJjJywgJyNjYjE4MWQnLCAnI2E1MGYxNScsICcjNjcwMDBkJ10sXG4gICAgUmRQdTogWycjZmZmN2YzJywgJyNmZGUwZGQnLCAnI2ZjYzVjMCcsICcjZmE5ZmI1JywgJyNmNzY4YTEnLCAnI2RkMzQ5NycsICcjYWUwMTdlJywgJyM3YTAxNzcnLCAnIzQ5MDA2YSddLFxuICAgIEdyZWVuczogWycjZjdmY2Y1JywgJyNlNWY1ZTAnLCAnI2M3ZTljMCcsICcjYTFkOTliJywgJyM3NGM0NzYnLCAnIzQxYWI1ZCcsICcjMjM4YjQ1JywgJyMwMDZkMmMnLCAnIzAwNDQxYiddLFxuICAgIFlsR25CdTogWycjZmZmZmQ5JywgJyNlZGY4YjEnLCAnI2M3ZTliNCcsICcjN2ZjZGJiJywgJyM0MWI2YzQnLCAnIzFkOTFjMCcsICcjMjI1ZWE4JywgJyMyNTM0OTQnLCAnIzA4MWQ1OCddLFxuICAgIFB1cnBsZXM6IFsnI2ZjZmJmZCcsICcjZWZlZGY1JywgJyNkYWRhZWInLCAnI2JjYmRkYycsICcjOWU5YWM4JywgJyM4MDdkYmEnLCAnIzZhNTFhMycsICcjNTQyNzhmJywgJyMzZjAwN2QnXSxcbiAgICBHbkJ1OiBbJyNmN2ZjZjAnLCAnI2UwZjNkYicsICcjY2NlYmM1JywgJyNhOGRkYjUnLCAnIzdiY2NjNCcsICcjNGViM2QzJywgJyMyYjhjYmUnLCAnIzA4NjhhYycsICcjMDg0MDgxJ10sXG4gICAgR3JleXM6IFsnI2ZmZmZmZicsICcjZjBmMGYwJywgJyNkOWQ5ZDknLCAnI2JkYmRiZCcsICcjOTY5Njk2JywgJyM3MzczNzMnLCAnIzUyNTI1MicsICcjMjUyNTI1JywgJyMwMDAwMDAnXSxcbiAgICBZbE9yUmQ6IFsnI2ZmZmZjYycsICcjZmZlZGEwJywgJyNmZWQ5NzYnLCAnI2ZlYjI0YycsICcjZmQ4ZDNjJywgJyNmYzRlMmEnLCAnI2UzMWExYycsICcjYmQwMDI2JywgJyM4MDAwMjYnXSxcbiAgICBQdVJkOiBbJyNmN2Y0ZjknLCAnI2U3ZTFlZicsICcjZDRiOWRhJywgJyNjOTk0YzcnLCAnI2RmNjViMCcsICcjZTcyOThhJywgJyNjZTEyNTYnLCAnIzk4MDA0MycsICcjNjcwMDFmJ10sXG4gICAgQmx1ZXM6IFsnI2Y3ZmJmZicsICcjZGVlYmY3JywgJyNjNmRiZWYnLCAnIzllY2FlMScsICcjNmJhZWQ2JywgJyM0MjkyYzYnLCAnIzIxNzFiNScsICcjMDg1MTljJywgJyMwODMwNmInXSxcbiAgICBQdUJ1R246IFsnI2ZmZjdmYicsICcjZWNlMmYwJywgJyNkMGQxZTYnLCAnI2E2YmRkYicsICcjNjdhOWNmJywgJyMzNjkwYzAnLCAnIzAyODE4YScsICcjMDE2YzU5JywgJyMwMTQ2MzYnXSxcbiAgICBWaXJpZGlzOiBbJyM0NDAxNTQnLCAnIzQ4Mjc3NycsICcjM2Y0YThhJywgJyMzMTY3OGUnLCAnIzI2ODM4ZicsICcjMWY5ZDhhJywgJyM2Y2NlNWEnLCAnI2I2ZGUyYicsICcjZmVlODI1J10sXG4gICAgU3BlY3RyYWw6IFsnIzllMDE0MicsICcjZDUzZTRmJywgJyNmNDZkNDMnLCAnI2ZkYWU2MScsICcjZmVlMDhiJywgJyNmZmZmYmYnLCAnI2U2ZjU5OCcsICcjYWJkZGE0JywgJyM2NmMyYTUnLCAnIzMyODhiZCcsICcjNWU0ZmEyJ10sXG4gICAgUmRZbEduOiBbJyNhNTAwMjYnLCAnI2Q3MzAyNycsICcjZjQ2ZDQzJywgJyNmZGFlNjEnLCAnI2ZlZTA4YicsICcjZmZmZmJmJywgJyNkOWVmOGInLCAnI2E2ZDk2YScsICcjNjZiZDYzJywgJyMxYTk4NTAnLCAnIzAwNjgzNyddLFxuICAgIFJkQnU6IFsnIzY3MDAxZicsICcjYjIxODJiJywgJyNkNjYwNGQnLCAnI2Y0YTU4MicsICcjZmRkYmM3JywgJyNmN2Y3ZjcnLCAnI2QxZTVmMCcsICcjOTJjNWRlJywgJyM0MzkzYzMnLCAnIzIxNjZhYycsICcjMDUzMDYxJ10sXG4gICAgUGlZRzogWycjOGUwMTUyJywgJyNjNTFiN2QnLCAnI2RlNzdhZScsICcjZjFiNmRhJywgJyNmZGUwZWYnLCAnI2Y3ZjdmNycsICcjZTZmNWQwJywgJyNiOGUxODYnLCAnIzdmYmM0MScsICcjNGQ5MjIxJywgJyMyNzY0MTknXSxcbiAgICBQUkduOiBbJyM0MDAwNGInLCAnIzc2MmE4MycsICcjOTk3MGFiJywgJyNjMmE1Y2YnLCAnI2U3ZDRlOCcsICcjZjdmN2Y3JywgJyNkOWYwZDMnLCAnI2E2ZGJhMCcsICcjNWFhZTYxJywgJyMxYjc4MzcnLCAnIzAwNDQxYiddLFxuICAgIFJkWWxCdTogWycjYTUwMDI2JywgJyNkNzMwMjcnLCAnI2Y0NmQ0MycsICcjZmRhZTYxJywgJyNmZWUwOTAnLCAnI2ZmZmZiZicsICcjZTBmM2Y4JywgJyNhYmQ5ZTknLCAnIzc0YWRkMScsICcjNDU3NWI0JywgJyMzMTM2OTUnXSxcbiAgICBCckJHOiBbJyM1NDMwMDUnLCAnIzhjNTEwYScsICcjYmY4MTJkJywgJyNkZmMyN2QnLCAnI2Y2ZThjMycsICcjZjVmNWY1JywgJyNjN2VhZTUnLCAnIzgwY2RjMScsICcjMzU5NzhmJywgJyMwMTY2NWUnLCAnIzAwM2MzMCddLFxuICAgIFJkR3k6IFsnIzY3MDAxZicsICcjYjIxODJiJywgJyNkNjYwNGQnLCAnI2Y0YTU4MicsICcjZmRkYmM3JywgJyNmZmZmZmYnLCAnI2UwZTBlMCcsICcjYmFiYWJhJywgJyM4Nzg3ODcnLCAnIzRkNGQ0ZCcsICcjMWExYTFhJ10sXG4gICAgUHVPcjogWycjN2YzYjA4JywgJyNiMzU4MDYnLCAnI2UwODIxNCcsICcjZmRiODYzJywgJyNmZWUwYjYnLCAnI2Y3ZjdmNycsICcjZDhkYWViJywgJyNiMmFiZDInLCAnIzgwNzNhYycsICcjNTQyNzg4JywgJyMyZDAwNGInXSxcbiAgICBTZXQyOiBbJyM2NmMyYTUnLCAnI2ZjOGQ2MicsICcjOGRhMGNiJywgJyNlNzhhYzMnLCAnI2E2ZDg1NCcsICcjZmZkOTJmJywgJyNlNWM0OTQnLCAnI2IzYjNiMyddLFxuICAgIEFjY2VudDogWycjN2ZjOTdmJywgJyNiZWFlZDQnLCAnI2ZkYzA4NicsICcjZmZmZjk5JywgJyMzODZjYjAnLCAnI2YwMDI3ZicsICcjYmY1YjE3JywgJyM2NjY2NjYnXSxcbiAgICBTZXQxOiBbJyNlNDFhMWMnLCAnIzM3N2ViOCcsICcjNGRhZjRhJywgJyM5ODRlYTMnLCAnI2ZmN2YwMCcsICcjZmZmZjMzJywgJyNhNjU2MjgnLCAnI2Y3ODFiZicsICcjOTk5OTk5J10sXG4gICAgU2V0MzogWycjOGRkM2M3JywgJyNmZmZmYjMnLCAnI2JlYmFkYScsICcjZmI4MDcyJywgJyM4MGIxZDMnLCAnI2ZkYjQ2MicsICcjYjNkZTY5JywgJyNmY2NkZTUnLCAnI2Q5ZDlkOScsICcjYmM4MGJkJywgJyNjY2ViYzUnLCAnI2ZmZWQ2ZiddLFxuICAgIERhcmsyOiBbJyMxYjllNzcnLCAnI2Q5NWYwMicsICcjNzU3MGIzJywgJyNlNzI5OGEnLCAnIzY2YTYxZScsICcjZTZhYjAyJywgJyNhNjc2MWQnLCAnIzY2NjY2NiddLFxuICAgIFBhaXJlZDogWycjYTZjZWUzJywgJyMxZjc4YjQnLCAnI2IyZGY4YScsICcjMzNhMDJjJywgJyNmYjlhOTknLCAnI2UzMWExYycsICcjZmRiZjZmJywgJyNmZjdmMDAnLCAnI2NhYjJkNicsICcjNmEzZDlhJywgJyNmZmZmOTknLCAnI2IxNTkyOCddLFxuICAgIFBhc3RlbDI6IFsnI2IzZTJjZCcsICcjZmRjZGFjJywgJyNjYmQ1ZTgnLCAnI2Y0Y2FlNCcsICcjZTZmNWM5JywgJyNmZmYyYWUnLCAnI2YxZTJjYycsICcjY2NjY2NjJ10sXG4gICAgUGFzdGVsMTogWycjZmJiNGFlJywgJyNiM2NkZTMnLCAnI2NjZWJjNScsICcjZGVjYmU0JywgJyNmZWQ5YTYnLCAnI2ZmZmZjYycsICcjZTVkOGJkJywgJyNmZGRhZWMnLCAnI2YyZjJmMiddXG4gIH07XG5cbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXksIHJlc3VsdHM7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoa2V5IGluIGJyZXdlcikge1xuICAgICAgcmVzdWx0cy5wdXNoKGJyZXdlcltrZXkudG9Mb3dlckNhc2UoKV0gPSBicmV3ZXJba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9KSgpO1xuXG5cbiAgLyoqXG4gIFx0WDExIGNvbG9yIG5hbWVzXG4gIFxuICBcdGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtY29sb3IvI3N2Zy1jb2xvclxuICAgKi9cblxuICB3M2N4MTEgPSB7XG4gICAgYWxpY2VibHVlOiAnI2YwZjhmZicsXG4gICAgYW50aXF1ZXdoaXRlOiAnI2ZhZWJkNycsXG4gICAgYXF1YTogJyMwMGZmZmYnLFxuICAgIGFxdWFtYXJpbmU6ICcjN2ZmZmQ0JyxcbiAgICBhenVyZTogJyNmMGZmZmYnLFxuICAgIGJlaWdlOiAnI2Y1ZjVkYycsXG4gICAgYmlzcXVlOiAnI2ZmZTRjNCcsXG4gICAgYmxhY2s6ICcjMDAwMDAwJyxcbiAgICBibGFuY2hlZGFsbW9uZDogJyNmZmViY2QnLFxuICAgIGJsdWU6ICcjMDAwMGZmJyxcbiAgICBibHVldmlvbGV0OiAnIzhhMmJlMicsXG4gICAgYnJvd246ICcjYTUyYTJhJyxcbiAgICBidXJseXdvb2Q6ICcjZGViODg3JyxcbiAgICBjYWRldGJsdWU6ICcjNWY5ZWEwJyxcbiAgICBjaGFydHJldXNlOiAnIzdmZmYwMCcsXG4gICAgY2hvY29sYXRlOiAnI2QyNjkxZScsXG4gICAgY29yYWw6ICcjZmY3ZjUwJyxcbiAgICBjb3JuZmxvd2VyOiAnIzY0OTVlZCcsXG4gICAgY29ybmZsb3dlcmJsdWU6ICcjNjQ5NWVkJyxcbiAgICBjb3Juc2lsazogJyNmZmY4ZGMnLFxuICAgIGNyaW1zb246ICcjZGMxNDNjJyxcbiAgICBjeWFuOiAnIzAwZmZmZicsXG4gICAgZGFya2JsdWU6ICcjMDAwMDhiJyxcbiAgICBkYXJrY3lhbjogJyMwMDhiOGInLFxuICAgIGRhcmtnb2xkZW5yb2Q6ICcjYjg4NjBiJyxcbiAgICBkYXJrZ3JheTogJyNhOWE5YTknLFxuICAgIGRhcmtncmVlbjogJyMwMDY0MDAnLFxuICAgIGRhcmtncmV5OiAnI2E5YTlhOScsXG4gICAgZGFya2toYWtpOiAnI2JkYjc2YicsXG4gICAgZGFya21hZ2VudGE6ICcjOGIwMDhiJyxcbiAgICBkYXJrb2xpdmVncmVlbjogJyM1NTZiMmYnLFxuICAgIGRhcmtvcmFuZ2U6ICcjZmY4YzAwJyxcbiAgICBkYXJrb3JjaGlkOiAnIzk5MzJjYycsXG4gICAgZGFya3JlZDogJyM4YjAwMDAnLFxuICAgIGRhcmtzYWxtb246ICcjZTk5NjdhJyxcbiAgICBkYXJrc2VhZ3JlZW46ICcjOGZiYzhmJyxcbiAgICBkYXJrc2xhdGVibHVlOiAnIzQ4M2Q4YicsXG4gICAgZGFya3NsYXRlZ3JheTogJyMyZjRmNGYnLFxuICAgIGRhcmtzbGF0ZWdyZXk6ICcjMmY0ZjRmJyxcbiAgICBkYXJrdHVycXVvaXNlOiAnIzAwY2VkMScsXG4gICAgZGFya3Zpb2xldDogJyM5NDAwZDMnLFxuICAgIGRlZXBwaW5rOiAnI2ZmMTQ5MycsXG4gICAgZGVlcHNreWJsdWU6ICcjMDBiZmZmJyxcbiAgICBkaW1ncmF5OiAnIzY5Njk2OScsXG4gICAgZGltZ3JleTogJyM2OTY5NjknLFxuICAgIGRvZGdlcmJsdWU6ICcjMWU5MGZmJyxcbiAgICBmaXJlYnJpY2s6ICcjYjIyMjIyJyxcbiAgICBmbG9yYWx3aGl0ZTogJyNmZmZhZjAnLFxuICAgIGZvcmVzdGdyZWVuOiAnIzIyOGIyMicsXG4gICAgZnVjaHNpYTogJyNmZjAwZmYnLFxuICAgIGdhaW5zYm9ybzogJyNkY2RjZGMnLFxuICAgIGdob3N0d2hpdGU6ICcjZjhmOGZmJyxcbiAgICBnb2xkOiAnI2ZmZDcwMCcsXG4gICAgZ29sZGVucm9kOiAnI2RhYTUyMCcsXG4gICAgZ3JheTogJyM4MDgwODAnLFxuICAgIGdyZWVuOiAnIzAwODAwMCcsXG4gICAgZ3JlZW55ZWxsb3c6ICcjYWRmZjJmJyxcbiAgICBncmV5OiAnIzgwODA4MCcsXG4gICAgaG9uZXlkZXc6ICcjZjBmZmYwJyxcbiAgICBob3RwaW5rOiAnI2ZmNjliNCcsXG4gICAgaW5kaWFucmVkOiAnI2NkNWM1YycsXG4gICAgaW5kaWdvOiAnIzRiMDA4MicsXG4gICAgaXZvcnk6ICcjZmZmZmYwJyxcbiAgICBraGFraTogJyNmMGU2OGMnLFxuICAgIGxhc2VybGVtb246ICcjZmZmZjU0JyxcbiAgICBsYXZlbmRlcjogJyNlNmU2ZmEnLFxuICAgIGxhdmVuZGVyYmx1c2g6ICcjZmZmMGY1JyxcbiAgICBsYXduZ3JlZW46ICcjN2NmYzAwJyxcbiAgICBsZW1vbmNoaWZmb246ICcjZmZmYWNkJyxcbiAgICBsaWdodGJsdWU6ICcjYWRkOGU2JyxcbiAgICBsaWdodGNvcmFsOiAnI2YwODA4MCcsXG4gICAgbGlnaHRjeWFuOiAnI2UwZmZmZicsXG4gICAgbGlnaHRnb2xkZW5yb2Q6ICcjZmFmYWQyJyxcbiAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogJyNmYWZhZDInLFxuICAgIGxpZ2h0Z3JheTogJyNkM2QzZDMnLFxuICAgIGxpZ2h0Z3JlZW46ICcjOTBlZTkwJyxcbiAgICBsaWdodGdyZXk6ICcjZDNkM2QzJyxcbiAgICBsaWdodHBpbms6ICcjZmZiNmMxJyxcbiAgICBsaWdodHNhbG1vbjogJyNmZmEwN2EnLFxuICAgIGxpZ2h0c2VhZ3JlZW46ICcjMjBiMmFhJyxcbiAgICBsaWdodHNreWJsdWU6ICcjODdjZWZhJyxcbiAgICBsaWdodHNsYXRlZ3JheTogJyM3Nzg4OTknLFxuICAgIGxpZ2h0c2xhdGVncmV5OiAnIzc3ODg5OScsXG4gICAgbGlnaHRzdGVlbGJsdWU6ICcjYjBjNGRlJyxcbiAgICBsaWdodHllbGxvdzogJyNmZmZmZTAnLFxuICAgIGxpbWU6ICcjMDBmZjAwJyxcbiAgICBsaW1lZ3JlZW46ICcjMzJjZDMyJyxcbiAgICBsaW5lbjogJyNmYWYwZTYnLFxuICAgIG1hZ2VudGE6ICcjZmYwMGZmJyxcbiAgICBtYXJvb246ICcjODAwMDAwJyxcbiAgICBtYXJvb24yOiAnIzdmMDAwMCcsXG4gICAgbWFyb29uMzogJyNiMDMwNjAnLFxuICAgIG1lZGl1bWFxdWFtYXJpbmU6ICcjNjZjZGFhJyxcbiAgICBtZWRpdW1ibHVlOiAnIzAwMDBjZCcsXG4gICAgbWVkaXVtb3JjaGlkOiAnI2JhNTVkMycsXG4gICAgbWVkaXVtcHVycGxlOiAnIzkzNzBkYicsXG4gICAgbWVkaXVtc2VhZ3JlZW46ICcjM2NiMzcxJyxcbiAgICBtZWRpdW1zbGF0ZWJsdWU6ICcjN2I2OGVlJyxcbiAgICBtZWRpdW1zcHJpbmdncmVlbjogJyMwMGZhOWEnLFxuICAgIG1lZGl1bXR1cnF1b2lzZTogJyM0OGQxY2MnLFxuICAgIG1lZGl1bXZpb2xldHJlZDogJyNjNzE1ODUnLFxuICAgIG1pZG5pZ2h0Ymx1ZTogJyMxOTE5NzAnLFxuICAgIG1pbnRjcmVhbTogJyNmNWZmZmEnLFxuICAgIG1pc3R5cm9zZTogJyNmZmU0ZTEnLFxuICAgIG1vY2Nhc2luOiAnI2ZmZTRiNScsXG4gICAgbmF2YWpvd2hpdGU6ICcjZmZkZWFkJyxcbiAgICBuYXZ5OiAnIzAwMDA4MCcsXG4gICAgb2xkbGFjZTogJyNmZGY1ZTYnLFxuICAgIG9saXZlOiAnIzgwODAwMCcsXG4gICAgb2xpdmVkcmFiOiAnIzZiOGUyMycsXG4gICAgb3JhbmdlOiAnI2ZmYTUwMCcsXG4gICAgb3JhbmdlcmVkOiAnI2ZmNDUwMCcsXG4gICAgb3JjaGlkOiAnI2RhNzBkNicsXG4gICAgcGFsZWdvbGRlbnJvZDogJyNlZWU4YWEnLFxuICAgIHBhbGVncmVlbjogJyM5OGZiOTgnLFxuICAgIHBhbGV0dXJxdW9pc2U6ICcjYWZlZWVlJyxcbiAgICBwYWxldmlvbGV0cmVkOiAnI2RiNzA5MycsXG4gICAgcGFwYXlhd2hpcDogJyNmZmVmZDUnLFxuICAgIHBlYWNocHVmZjogJyNmZmRhYjknLFxuICAgIHBlcnU6ICcjY2Q4NTNmJyxcbiAgICBwaW5rOiAnI2ZmYzBjYicsXG4gICAgcGx1bTogJyNkZGEwZGQnLFxuICAgIHBvd2RlcmJsdWU6ICcjYjBlMGU2JyxcbiAgICBwdXJwbGU6ICcjODAwMDgwJyxcbiAgICBwdXJwbGUyOiAnIzdmMDA3ZicsXG4gICAgcHVycGxlMzogJyNhMDIwZjAnLFxuICAgIHJlYmVjY2FwdXJwbGU6ICcjNjYzMzk5JyxcbiAgICByZWQ6ICcjZmYwMDAwJyxcbiAgICByb3N5YnJvd246ICcjYmM4ZjhmJyxcbiAgICByb3lhbGJsdWU6ICcjNDE2OWUxJyxcbiAgICBzYWRkbGVicm93bjogJyM4YjQ1MTMnLFxuICAgIHNhbG1vbjogJyNmYTgwNzInLFxuICAgIHNhbmR5YnJvd246ICcjZjRhNDYwJyxcbiAgICBzZWFncmVlbjogJyMyZThiNTcnLFxuICAgIHNlYXNoZWxsOiAnI2ZmZjVlZScsXG4gICAgc2llbm5hOiAnI2EwNTIyZCcsXG4gICAgc2lsdmVyOiAnI2MwYzBjMCcsXG4gICAgc2t5Ymx1ZTogJyM4N2NlZWInLFxuICAgIHNsYXRlYmx1ZTogJyM2YTVhY2QnLFxuICAgIHNsYXRlZ3JheTogJyM3MDgwOTAnLFxuICAgIHNsYXRlZ3JleTogJyM3MDgwOTAnLFxuICAgIHNub3c6ICcjZmZmYWZhJyxcbiAgICBzcHJpbmdncmVlbjogJyMwMGZmN2YnLFxuICAgIHN0ZWVsYmx1ZTogJyM0NjgyYjQnLFxuICAgIHRhbjogJyNkMmI0OGMnLFxuICAgIHRlYWw6ICcjMDA4MDgwJyxcbiAgICB0aGlzdGxlOiAnI2Q4YmZkOCcsXG4gICAgdG9tYXRvOiAnI2ZmNjM0NycsXG4gICAgdHVycXVvaXNlOiAnIzQwZTBkMCcsXG4gICAgdmlvbGV0OiAnI2VlODJlZScsXG4gICAgd2hlYXQ6ICcjZjVkZWIzJyxcbiAgICB3aGl0ZTogJyNmZmZmZmYnLFxuICAgIHdoaXRlc21va2U6ICcjZjVmNWY1JyxcbiAgICB5ZWxsb3c6ICcjZmZmZjAwJyxcbiAgICB5ZWxsb3dncmVlbjogJyM5YWNkMzInXG4gIH07XG5cbiAgY2hyb21hLmNvbG9ycyA9IGNvbG9ycyA9IHczY3gxMTtcblxuICBsYWIycmdiID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGEsIGFyZ3MsIGIsIGcsIGwsIHIsIHgsIHksIHo7XG4gICAgYXJncyA9IHVucGFjayhhcmd1bWVudHMpO1xuICAgIGwgPSBhcmdzWzBdLCBhID0gYXJnc1sxXSwgYiA9IGFyZ3NbMl07XG4gICAgeSA9IChsICsgMTYpIC8gMTE2O1xuICAgIHggPSBpc05hTihhKSA/IHkgOiB5ICsgYSAvIDUwMDtcbiAgICB6ID0gaXNOYU4oYikgPyB5IDogeSAtIGIgLyAyMDA7XG4gICAgeSA9IExBQl9DT05TVEFOVFMuWW4gKiBsYWJfeHl6KHkpO1xuICAgIHggPSBMQUJfQ09OU1RBTlRTLlhuICogbGFiX3h5eih4KTtcbiAgICB6ID0gTEFCX0NPTlNUQU5UUy5abiAqIGxhYl94eXooeik7XG4gICAgciA9IHh5el9yZ2IoMy4yNDA0NTQyICogeCAtIDEuNTM3MTM4NSAqIHkgLSAwLjQ5ODUzMTQgKiB6KTtcbiAgICBnID0geHl6X3JnYigtMC45NjkyNjYwICogeCArIDEuODc2MDEwOCAqIHkgKyAwLjA0MTU1NjAgKiB6KTtcbiAgICBiID0geHl6X3JnYigwLjA1NTY0MzQgKiB4IC0gMC4yMDQwMjU5ICogeSArIDEuMDU3MjI1MiAqIHopO1xuICAgIHJldHVybiBbciwgZywgYiwgYXJncy5sZW5ndGggPiAzID8gYXJnc1szXSA6IDFdO1xuICB9O1xuXG4gIHh5el9yZ2IgPSBmdW5jdGlvbihyKSB7XG4gICAgcmV0dXJuIDI1NSAqIChyIDw9IDAuMDAzMDQgPyAxMi45MiAqIHIgOiAxLjA1NSAqIHBvdyhyLCAxIC8gMi40KSAtIDAuMDU1KTtcbiAgfTtcblxuICBsYWJfeHl6ID0gZnVuY3Rpb24odCkge1xuICAgIGlmICh0ID4gTEFCX0NPTlNUQU5UUy50MSkge1xuICAgICAgcmV0dXJuIHQgKiB0ICogdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIExBQl9DT05TVEFOVFMudDIgKiAodCAtIExBQl9DT05TVEFOVFMudDApO1xuICAgIH1cbiAgfTtcblxuICBMQUJfQ09OU1RBTlRTID0ge1xuICAgIEtuOiAxOCxcbiAgICBYbjogMC45NTA0NzAsXG4gICAgWW46IDEsXG4gICAgWm46IDEuMDg4ODMwLFxuICAgIHQwOiAwLjEzNzkzMTAzNCxcbiAgICB0MTogMC4yMDY4OTY1NTIsXG4gICAgdDI6IDAuMTI4NDE4NTUsXG4gICAgdDM6IDAuMDA4ODU2NDUyXG4gIH07XG5cbiAgcmdiMmxhYiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiLCBnLCByLCByZWYsIHJlZjEsIHgsIHksIHo7XG4gICAgcmVmID0gdW5wYWNrKGFyZ3VtZW50cyksIHIgPSByZWZbMF0sIGcgPSByZWZbMV0sIGIgPSByZWZbMl07XG4gICAgcmVmMSA9IHJnYjJ4eXoociwgZywgYiksIHggPSByZWYxWzBdLCB5ID0gcmVmMVsxXSwgeiA9IHJlZjFbMl07XG4gICAgcmV0dXJuIFsxMTYgKiB5IC0gMTYsIDUwMCAqICh4IC0geSksIDIwMCAqICh5IC0geildO1xuICB9O1xuXG4gIHJnYl94eXogPSBmdW5jdGlvbihyKSB7XG4gICAgaWYgKChyIC89IDI1NSkgPD0gMC4wNDA0NSkge1xuICAgICAgcmV0dXJuIHIgLyAxMi45MjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBvdygociArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgIH1cbiAgfTtcblxuICB4eXpfbGFiID0gZnVuY3Rpb24odCkge1xuICAgIGlmICh0ID4gTEFCX0NPTlNUQU5UUy50Mykge1xuICAgICAgcmV0dXJuIHBvdyh0LCAxIC8gMyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0IC8gTEFCX0NPTlNUQU5UUy50MiArIExBQl9DT05TVEFOVFMudDA7XG4gICAgfVxuICB9O1xuXG4gIHJnYjJ4eXogPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYiwgZywgciwgcmVmLCB4LCB5LCB6O1xuICAgIHJlZiA9IHVucGFjayhhcmd1bWVudHMpLCByID0gcmVmWzBdLCBnID0gcmVmWzFdLCBiID0gcmVmWzJdO1xuICAgIHIgPSByZ2JfeHl6KHIpO1xuICAgIGcgPSByZ2JfeHl6KGcpO1xuICAgIGIgPSByZ2JfeHl6KGIpO1xuICAgIHggPSB4eXpfbGFiKCgwLjQxMjQ1NjQgKiByICsgMC4zNTc1NzYxICogZyArIDAuMTgwNDM3NSAqIGIpIC8gTEFCX0NPTlNUQU5UUy5Ybik7XG4gICAgeSA9IHh5el9sYWIoKDAuMjEyNjcyOSAqIHIgKyAwLjcxNTE1MjIgKiBnICsgMC4wNzIxNzUwICogYikgLyBMQUJfQ09OU1RBTlRTLlluKTtcbiAgICB6ID0geHl6X2xhYigoMC4wMTkzMzM5ICogciArIDAuMTE5MTkyMCAqIGcgKyAwLjk1MDMwNDEgKiBiKSAvIExBQl9DT05TVEFOVFMuWm4pO1xuICAgIHJldHVybiBbeCwgeSwgel07XG4gIH07XG5cbiAgY2hyb21hLmxhYiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oZnVuYywgYXJncywgY3Rvcikge1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBmdW5jLnByb3RvdHlwZTtcbiAgICAgIHZhciBjaGlsZCA9IG5ldyBjdG9yLCByZXN1bHQgPSBmdW5jLmFwcGx5KGNoaWxkLCBhcmdzKTtcbiAgICAgIHJldHVybiBPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0ID8gcmVzdWx0IDogY2hpbGQ7XG4gICAgfSkoQ29sb3IsIHNsaWNlLmNhbGwoYXJndW1lbnRzKS5jb25jYXQoWydsYWInXSksIGZ1bmN0aW9uKCl7fSk7XG4gIH07XG5cbiAgX2lucHV0LmxhYiA9IGxhYjJyZ2I7XG5cbiAgQ29sb3IucHJvdG90eXBlLmxhYiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiByZ2IybGFiKHRoaXMuX3JnYik7XG4gIH07XG5cbiAgYmV6aWVyID0gZnVuY3Rpb24oY29sb3JzKSB7XG4gICAgdmFyIEksIEkwLCBJMSwgYywgbGFiMCwgbGFiMSwgbGFiMiwgbGFiMywgcmVmLCByZWYxLCByZWYyO1xuICAgIGNvbG9ycyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW4sIG8sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKG8gPSAwLCBsZW4gPSBjb2xvcnMubGVuZ3RoOyBvIDwgbGVuOyBvKyspIHtcbiAgICAgICAgYyA9IGNvbG9yc1tvXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNocm9tYShjKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIGlmIChjb2xvcnMubGVuZ3RoID09PSAyKSB7XG4gICAgICByZWYgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsZW4sIG8sIHJlc3VsdHM7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChvID0gMCwgbGVuID0gY29sb3JzLmxlbmd0aDsgbyA8IGxlbjsgbysrKSB7XG4gICAgICAgICAgYyA9IGNvbG9yc1tvXTtcbiAgICAgICAgICByZXN1bHRzLnB1c2goYy5sYWIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KSgpLCBsYWIwID0gcmVmWzBdLCBsYWIxID0gcmVmWzFdO1xuICAgICAgSSA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgdmFyIGksIGxhYjtcbiAgICAgICAgbGFiID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBvLCByZXN1bHRzO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKGkgPSBvID0gMDsgbyA8PSAyOyBpID0gKytvKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gobGFiMFtpXSArIHQgKiAobGFiMVtpXSAtIGxhYjBbaV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiBjaHJvbWEubGFiLmFwcGx5KGNocm9tYSwgbGFiKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChjb2xvcnMubGVuZ3RoID09PSAzKSB7XG4gICAgICByZWYxID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGVuLCBvLCByZXN1bHRzO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAobyA9IDAsIGxlbiA9IGNvbG9ycy5sZW5ndGg7IG8gPCBsZW47IG8rKykge1xuICAgICAgICAgIGMgPSBjb2xvcnNbb107XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKGMubGFiKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSkoKSwgbGFiMCA9IHJlZjFbMF0sIGxhYjEgPSByZWYxWzFdLCBsYWIyID0gcmVmMVsyXTtcbiAgICAgIEkgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgIHZhciBpLCBsYWI7XG4gICAgICAgIGxhYiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbywgcmVzdWx0cztcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yIChpID0gbyA9IDA7IG8gPD0gMjsgaSA9ICsrbykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCgxIC0gdCkgKiAoMSAtIHQpICogbGFiMFtpXSArIDIgKiAoMSAtIHQpICogdCAqIGxhYjFbaV0gKyB0ICogdCAqIGxhYjJbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIGNocm9tYS5sYWIuYXBwbHkoY2hyb21hLCBsYWIpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGNvbG9ycy5sZW5ndGggPT09IDQpIHtcbiAgICAgIHJlZjIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsZW4sIG8sIHJlc3VsdHM7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChvID0gMCwgbGVuID0gY29sb3JzLmxlbmd0aDsgbyA8IGxlbjsgbysrKSB7XG4gICAgICAgICAgYyA9IGNvbG9yc1tvXTtcbiAgICAgICAgICByZXN1bHRzLnB1c2goYy5sYWIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KSgpLCBsYWIwID0gcmVmMlswXSwgbGFiMSA9IHJlZjJbMV0sIGxhYjIgPSByZWYyWzJdLCBsYWIzID0gcmVmMlszXTtcbiAgICAgIEkgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgIHZhciBpLCBsYWI7XG4gICAgICAgIGxhYiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbywgcmVzdWx0cztcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yIChpID0gbyA9IDA7IG8gPD0gMjsgaSA9ICsrbykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCgxIC0gdCkgKiAoMSAtIHQpICogKDEgLSB0KSAqIGxhYjBbaV0gKyAzICogKDEgLSB0KSAqICgxIC0gdCkgKiB0ICogbGFiMVtpXSArIDMgKiAoMSAtIHQpICogdCAqIHQgKiBsYWIyW2ldICsgdCAqIHQgKiB0ICogbGFiM1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4gY2hyb21hLmxhYi5hcHBseShjaHJvbWEsIGxhYik7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoY29sb3JzLmxlbmd0aCA9PT0gNSkge1xuICAgICAgSTAgPSBiZXppZXIoY29sb3JzLnNsaWNlKDAsIDMpKTtcbiAgICAgIEkxID0gYmV6aWVyKGNvbG9ycy5zbGljZSgyLCA1KSk7XG4gICAgICBJID0gZnVuY3Rpb24odCkge1xuICAgICAgICBpZiAodCA8IDAuNSkge1xuICAgICAgICAgIHJldHVybiBJMCh0ICogMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIEkxKCh0IC0gMC41KSAqIDIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gSTtcbiAgfTtcblxuICBjaHJvbWEuYmV6aWVyID0gZnVuY3Rpb24oY29sb3JzKSB7XG4gICAgdmFyIGY7XG4gICAgZiA9IGJlemllcihjb2xvcnMpO1xuICAgIGYuc2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaHJvbWEuc2NhbGUoZik7XG4gICAgfTtcbiAgICByZXR1cm4gZjtcbiAgfTtcblxuXG4gIC8qXG4gICAgICBjaHJvbWEuanNcbiAgXG4gICAgICBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMywgR3JlZ29yIEFpc2NoXG4gICAgICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICBcbiAgICAgIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICAgICAgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gIFxuICAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICAgICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gIFxuICAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAgICAgICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gIFxuICAgICAgKiBUaGUgbmFtZSBHcmVnb3IgQWlzY2ggbWF5IG5vdCBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICAgICAgICBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAgXG4gICAgICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIlxuICAgICAgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICAgICAgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFXG4gICAgICBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBHUkVHT1IgQUlTQ0ggT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAgICAgIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLFxuICAgICAgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSxcbiAgICAgIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUllcbiAgICAgIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HXG4gICAgICBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsXG4gICAgICBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICBcbiAgICAgIEBzb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9na2EvY2hyb21hLmpzXG4gICAqL1xuXG4gIGNocm9tYS5jdWJlaGVsaXggPSBmdW5jdGlvbihzdGFydCwgcm90YXRpb25zLCBodWUsIGdhbW1hLCBsaWdodG5lc3MpIHtcbiAgICB2YXIgZGgsIGRsLCBmO1xuICAgIGlmIChzdGFydCA9PSBudWxsKSB7XG4gICAgICBzdGFydCA9IDMwMDtcbiAgICB9XG4gICAgaWYgKHJvdGF0aW9ucyA9PSBudWxsKSB7XG4gICAgICByb3RhdGlvbnMgPSAtMS41O1xuICAgIH1cbiAgICBpZiAoaHVlID09IG51bGwpIHtcbiAgICAgIGh1ZSA9IDE7XG4gICAgfVxuICAgIGlmIChnYW1tYSA9PSBudWxsKSB7XG4gICAgICBnYW1tYSA9IDE7XG4gICAgfVxuICAgIGlmIChsaWdodG5lc3MgPT0gbnVsbCkge1xuICAgICAgbGlnaHRuZXNzID0gWzAsIDFdO1xuICAgIH1cbiAgICBkaCA9IDA7XG4gICAgaWYgKHR5cGUobGlnaHRuZXNzKSA9PT0gJ2FycmF5Jykge1xuICAgICAgZGwgPSBsaWdodG5lc3NbMV0gLSBsaWdodG5lc3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRsID0gMDtcbiAgICAgIGxpZ2h0bmVzcyA9IFtsaWdodG5lc3MsIGxpZ2h0bmVzc107XG4gICAgfVxuICAgIGYgPSBmdW5jdGlvbihmcmFjdCkge1xuICAgICAgdmFyIGEsIGFtcCwgYiwgY29zX2EsIGcsIGgsIGwsIHIsIHNpbl9hO1xuICAgICAgYSA9IFRXT1BJICogKChzdGFydCArIDEyMCkgLyAzNjAgKyByb3RhdGlvbnMgKiBmcmFjdCk7XG4gICAgICBsID0gcG93KGxpZ2h0bmVzc1swXSArIGRsICogZnJhY3QsIGdhbW1hKTtcbiAgICAgIGggPSBkaCAhPT0gMCA/IGh1ZVswXSArIGZyYWN0ICogZGggOiBodWU7XG4gICAgICBhbXAgPSBoICogbCAqICgxIC0gbCkgLyAyO1xuICAgICAgY29zX2EgPSBjb3MoYSk7XG4gICAgICBzaW5fYSA9IHNpbihhKTtcbiAgICAgIHIgPSBsICsgYW1wICogKC0wLjE0ODYxICogY29zX2EgKyAxLjc4Mjc3ICogc2luX2EpO1xuICAgICAgZyA9IGwgKyBhbXAgKiAoLTAuMjkyMjcgKiBjb3NfYSAtIDAuOTA2NDkgKiBzaW5fYSk7XG4gICAgICBiID0gbCArIGFtcCAqICgrMS45NzI5NCAqIGNvc19hKTtcbiAgICAgIHJldHVybiBjaHJvbWEoY2xpcF9yZ2IoW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdKSk7XG4gICAgfTtcbiAgICBmLnN0YXJ0ID0gZnVuY3Rpb24ocykge1xuICAgICAgaWYgKHMgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gc3RhcnQ7XG4gICAgICB9XG4gICAgICBzdGFydCA9IHM7XG4gICAgICByZXR1cm4gZjtcbiAgICB9O1xuICAgIGYucm90YXRpb25zID0gZnVuY3Rpb24ocikge1xuICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcm90YXRpb25zO1xuICAgICAgfVxuICAgICAgcm90YXRpb25zID0gcjtcbiAgICAgIHJldHVybiBmO1xuICAgIH07XG4gICAgZi5nYW1tYSA9IGZ1bmN0aW9uKGcpIHtcbiAgICAgIGlmIChnID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGdhbW1hO1xuICAgICAgfVxuICAgICAgZ2FtbWEgPSBnO1xuICAgICAgcmV0dXJuIGY7XG4gICAgfTtcbiAgICBmLmh1ZSA9IGZ1bmN0aW9uKGgpIHtcbiAgICAgIGlmIChoID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGh1ZTtcbiAgICAgIH1cbiAgICAgIGh1ZSA9IGg7XG4gICAgICBpZiAodHlwZShodWUpID09PSAnYXJyYXknKSB7XG4gICAgICAgIGRoID0gaHVlWzFdIC0gaHVlWzBdO1xuICAgICAgICBpZiAoZGggPT09IDApIHtcbiAgICAgICAgICBodWUgPSBodWVbMV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRoID0gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmO1xuICAgIH07XG4gICAgZi5saWdodG5lc3MgPSBmdW5jdGlvbihoKSB7XG4gICAgICBpZiAoaCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBsaWdodG5lc3M7XG4gICAgICB9XG4gICAgICBpZiAodHlwZShoKSA9PT0gJ2FycmF5Jykge1xuICAgICAgICBsaWdodG5lc3MgPSBoO1xuICAgICAgICBkbCA9IGhbMV0gLSBoWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlnaHRuZXNzID0gW2gsIGhdO1xuICAgICAgICBkbCA9IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gZjtcbiAgICB9O1xuICAgIGYuc2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaHJvbWEuc2NhbGUoZik7XG4gICAgfTtcbiAgICBmLmh1ZShodWUpO1xuICAgIHJldHVybiBmO1xuICB9O1xuXG4gIGNocm9tYS5yYW5kb20gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29kZSwgZGlnaXRzLCBpLCBvO1xuICAgIGRpZ2l0cyA9ICcwMTIzNDU2Nzg5YWJjZGVmJztcbiAgICBjb2RlID0gJyMnO1xuICAgIGZvciAoaSA9IG8gPSAwOyBvIDwgNjsgaSA9ICsrbykge1xuICAgICAgY29kZSArPSBkaWdpdHMuY2hhckF0KGZsb29yKE1hdGgucmFuZG9tKCkgKiAxNikpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENvbG9yKGNvZGUpO1xuICB9O1xuXG4gIGNocm9tYS5hdmVyYWdlID0gZnVuY3Rpb24oY29sb3JzLCBtb2RlKSB7XG4gICAgdmFyIEEsIGFscGhhLCBjLCBjbnQsIGR4LCBkeSwgZmlyc3QsIGksIGwsIGxlbiwgbywgeHl6LCB4eXoyO1xuICAgIGlmIChtb2RlID09IG51bGwpIHtcbiAgICAgIG1vZGUgPSAncmdiJztcbiAgICB9XG4gICAgbCA9IGNvbG9ycy5sZW5ndGg7XG4gICAgY29sb3JzID0gY29sb3JzLm1hcChmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gY2hyb21hKGMpO1xuICAgIH0pO1xuICAgIGZpcnN0ID0gY29sb3JzLnNwbGljZSgwLCAxKVswXTtcbiAgICB4eXogPSBmaXJzdC5nZXQobW9kZSk7XG4gICAgY250ID0gW107XG4gICAgZHggPSAwO1xuICAgIGR5ID0gMDtcbiAgICBmb3IgKGkgaW4geHl6KSB7XG4gICAgICB4eXpbaV0gPSB4eXpbaV0gfHwgMDtcbiAgICAgIGNudC5wdXNoKCFpc05hTih4eXpbaV0pID8gMSA6IDApO1xuICAgICAgaWYgKG1vZGUuY2hhckF0KGkpID09PSAnaCcgJiYgIWlzTmFOKHh5eltpXSkpIHtcbiAgICAgICAgQSA9IHh5eltpXSAvIDE4MCAqIFBJO1xuICAgICAgICBkeCArPSBjb3MoQSk7XG4gICAgICAgIGR5ICs9IHNpbihBKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYWxwaGEgPSBmaXJzdC5hbHBoYSgpO1xuICAgIGZvciAobyA9IDAsIGxlbiA9IGNvbG9ycy5sZW5ndGg7IG8gPCBsZW47IG8rKykge1xuICAgICAgYyA9IGNvbG9yc1tvXTtcbiAgICAgIHh5ejIgPSBjLmdldChtb2RlKTtcbiAgICAgIGFscGhhICs9IGMuYWxwaGEoKTtcbiAgICAgIGZvciAoaSBpbiB4eXopIHtcbiAgICAgICAgaWYgKCFpc05hTih4eXoyW2ldKSkge1xuICAgICAgICAgIHh5eltpXSArPSB4eXoyW2ldO1xuICAgICAgICAgIGNudFtpXSArPSAxO1xuICAgICAgICAgIGlmIChtb2RlLmNoYXJBdChpKSA9PT0gJ2gnKSB7XG4gICAgICAgICAgICBBID0geHl6W2ldIC8gMTgwICogUEk7XG4gICAgICAgICAgICBkeCArPSBjb3MoQSk7XG4gICAgICAgICAgICBkeSArPSBzaW4oQSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoaSBpbiB4eXopIHtcbiAgICAgIHh5eltpXSA9IHh5eltpXSAvIGNudFtpXTtcbiAgICAgIGlmIChtb2RlLmNoYXJBdChpKSA9PT0gJ2gnKSB7XG4gICAgICAgIEEgPSBhdGFuMihkeSAvIGNudFtpXSwgZHggLyBjbnRbaV0pIC8gUEkgKiAxODA7XG4gICAgICAgIHdoaWxlIChBIDwgMCkge1xuICAgICAgICAgIEEgKz0gMzYwO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChBID49IDM2MCkge1xuICAgICAgICAgIEEgLT0gMzYwO1xuICAgICAgICB9XG4gICAgICAgIHh5eltpXSA9IEE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaHJvbWEoeHl6LCBtb2RlKS5hbHBoYShhbHBoYSAvIGwpO1xuICB9O1xuXG4gIF9pbnB1dC5yZ2IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaywgcmVmLCByZXN1bHRzLCB2O1xuICAgIHJlZiA9IHVucGFjayhhcmd1bWVudHMpO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGsgaW4gcmVmKSB7XG4gICAgICB2ID0gcmVmW2tdO1xuICAgICAgcmVzdWx0cy5wdXNoKHYpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICBjaHJvbWEucmdiID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbihmdW5jLCBhcmdzLCBjdG9yKSB7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9IGZ1bmMucHJvdG90eXBlO1xuICAgICAgdmFyIGNoaWxkID0gbmV3IGN0b3IsIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY2hpbGQsIGFyZ3MpO1xuICAgICAgcmV0dXJuIE9iamVjdChyZXN1bHQpID09PSByZXN1bHQgPyByZXN1bHQgOiBjaGlsZDtcbiAgICB9KShDb2xvciwgc2xpY2UuY2FsbChhcmd1bWVudHMpLmNvbmNhdChbJ3JnYiddKSwgZnVuY3Rpb24oKXt9KTtcbiAgfTtcblxuICBDb2xvci5wcm90b3R5cGUucmdiID0gZnVuY3Rpb24ocm91bmQpIHtcbiAgICBpZiAocm91bmQgPT0gbnVsbCkge1xuICAgICAgcm91bmQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAocm91bmQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZ2IubWFwKE1hdGgucm91bmQpLnNsaWNlKDAsIDMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmdiLnNsaWNlKDAsIDMpO1xuICAgIH1cbiAgfTtcblxuICBDb2xvci5wcm90b3R5cGUucmdiYSA9IGZ1bmN0aW9uKHJvdW5kKSB7XG4gICAgaWYgKHJvdW5kID09IG51bGwpIHtcbiAgICAgIHJvdW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFyb3VuZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JnYi5zbGljZSgwKTtcbiAgICB9XG4gICAgcmV0dXJuIFtNYXRoLnJvdW5kKHRoaXMuX3JnYlswXSksIE1hdGgucm91bmQodGhpcy5fcmdiWzFdKSwgTWF0aC5yb3VuZCh0aGlzLl9yZ2JbMl0pLCB0aGlzLl9yZ2JbM11dO1xuICB9O1xuXG4gIF9ndWVzc19mb3JtYXRzLnB1c2goe1xuICAgIHA6IDMsXG4gICAgdGVzdDogZnVuY3Rpb24obikge1xuICAgICAgdmFyIGE7XG4gICAgICBhID0gdW5wYWNrKGFyZ3VtZW50cyk7XG4gICAgICBpZiAodHlwZShhKSA9PT0gJ2FycmF5JyAmJiBhLmxlbmd0aCA9PT0gMykge1xuICAgICAgICByZXR1cm4gJ3JnYic7XG4gICAgICB9XG4gICAgICBpZiAoYS5sZW5ndGggPT09IDQgJiYgdHlwZShhWzNdKSA9PT0gXCJudW1iZXJcIiAmJiBhWzNdID49IDAgJiYgYVszXSA8PSAxKSB7XG4gICAgICAgIHJldHVybiAncmdiJztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGhleDJyZ2IgPSBmdW5jdGlvbihoZXgpIHtcbiAgICB2YXIgYSwgYiwgZywgciwgcmdiLCB1O1xuICAgIGlmIChoZXgubWF0Y2goL14jPyhbQS1GYS1mMC05XXs2fXxbQS1GYS1mMC05XXszfSkkLykpIHtcbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSA0IHx8IGhleC5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgaGV4ID0gaGV4LnN1YnN0cigxKTtcbiAgICAgIH1cbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGhleCA9IGhleC5zcGxpdChcIlwiKTtcbiAgICAgICAgaGV4ID0gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgfVxuICAgICAgdSA9IHBhcnNlSW50KGhleCwgMTYpO1xuICAgICAgciA9IHUgPj4gMTY7XG4gICAgICBnID0gdSA+PiA4ICYgMHhGRjtcbiAgICAgIGIgPSB1ICYgMHhGRjtcbiAgICAgIHJldHVybiBbciwgZywgYiwgMV07XG4gICAgfVxuICAgIGlmIChoZXgubWF0Y2goL14jPyhbQS1GYS1mMC05XXs4fSkkLykpIHtcbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSA5KSB7XG4gICAgICAgIGhleCA9IGhleC5zdWJzdHIoMSk7XG4gICAgICB9XG4gICAgICB1ID0gcGFyc2VJbnQoaGV4LCAxNik7XG4gICAgICByID0gdSA+PiAyNCAmIDB4RkY7XG4gICAgICBnID0gdSA+PiAxNiAmIDB4RkY7XG4gICAgICBiID0gdSA+PiA4ICYgMHhGRjtcbiAgICAgIGEgPSByb3VuZCgodSAmIDB4RkYpIC8gMHhGRiAqIDEwMCkgLyAxMDA7XG4gICAgICByZXR1cm4gW3IsIGcsIGIsIGFdO1xuICAgIH1cbiAgICBpZiAoKF9pbnB1dC5jc3MgIT0gbnVsbCkgJiYgKHJnYiA9IF9pbnB1dC5jc3MoaGV4KSkpIHtcbiAgICAgIHJldHVybiByZ2I7XG4gICAgfVxuICAgIHRocm93IFwidW5rbm93biBjb2xvcjogXCIgKyBoZXg7XG4gIH07XG5cbiAgcmdiMmhleCA9IGZ1bmN0aW9uKGNoYW5uZWxzLCBtb2RlKSB7XG4gICAgdmFyIGEsIGIsIGcsIGh4YSwgciwgc3RyLCB1O1xuICAgIGlmIChtb2RlID09IG51bGwpIHtcbiAgICAgIG1vZGUgPSAncmdiJztcbiAgICB9XG4gICAgciA9IGNoYW5uZWxzWzBdLCBnID0gY2hhbm5lbHNbMV0sIGIgPSBjaGFubmVsc1syXSwgYSA9IGNoYW5uZWxzWzNdO1xuICAgIHIgPSBNYXRoLnJvdW5kKHIpO1xuICAgIGcgPSBNYXRoLnJvdW5kKGcpO1xuICAgIGIgPSBNYXRoLnJvdW5kKGIpO1xuICAgIHUgPSByIDw8IDE2IHwgZyA8PCA4IHwgYjtcbiAgICBzdHIgPSBcIjAwMDAwMFwiICsgdS50b1N0cmluZygxNik7XG4gICAgc3RyID0gc3RyLnN1YnN0cihzdHIubGVuZ3RoIC0gNik7XG4gICAgaHhhID0gJzAnICsgcm91bmQoYSAqIDI1NSkudG9TdHJpbmcoMTYpO1xuICAgIGh4YSA9IGh4YS5zdWJzdHIoaHhhLmxlbmd0aCAtIDIpO1xuICAgIHJldHVybiBcIiNcIiArIChmdW5jdGlvbigpIHtcbiAgICAgIHN3aXRjaCAobW9kZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIGNhc2UgJ3JnYmEnOlxuICAgICAgICAgIHJldHVybiBzdHIgKyBoeGE7XG4gICAgICAgIGNhc2UgJ2FyZ2InOlxuICAgICAgICAgIHJldHVybiBoeGEgKyBzdHI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cbiAgICB9KSgpO1xuICB9O1xuXG4gIF9pbnB1dC5oZXggPSBmdW5jdGlvbihoKSB7XG4gICAgcmV0dXJuIGhleDJyZ2IoaCk7XG4gIH07XG5cbiAgY2hyb21hLmhleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oZnVuYywgYXJncywgY3Rvcikge1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBmdW5jLnByb3RvdHlwZTtcbiAgICAgIHZhciBjaGlsZCA9IG5ldyBjdG9yLCByZXN1bHQgPSBmdW5jLmFwcGx5KGNoaWxkLCBhcmdzKTtcbiAgICAgIHJldHVybiBPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0ID8gcmVzdWx0IDogY2hpbGQ7XG4gICAgfSkoQ29sb3IsIHNsaWNlLmNhbGwoYXJndW1lbnRzKS5jb25jYXQoWydoZXgnXSksIGZ1bmN0aW9uKCl7fSk7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLmhleCA9IGZ1bmN0aW9uKG1vZGUpIHtcbiAgICBpZiAobW9kZSA9PSBudWxsKSB7XG4gICAgICBtb2RlID0gJ3JnYic7XG4gICAgfVxuICAgIHJldHVybiByZ2IyaGV4KHRoaXMuX3JnYiwgbW9kZSk7XG4gIH07XG5cbiAgX2d1ZXNzX2Zvcm1hdHMucHVzaCh7XG4gICAgcDogNCxcbiAgICB0ZXN0OiBmdW5jdGlvbihuKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlKG4pID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiAnaGV4JztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGhzbDJyZ2IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgYiwgYywgZywgaCwgaSwgbCwgbywgciwgcmVmLCBzLCB0MSwgdDIsIHQzO1xuICAgIGFyZ3MgPSB1bnBhY2soYXJndW1lbnRzKTtcbiAgICBoID0gYXJnc1swXSwgcyA9IGFyZ3NbMV0sIGwgPSBhcmdzWzJdO1xuICAgIGlmIChzID09PSAwKSB7XG4gICAgICByID0gZyA9IGIgPSBsICogMjU1O1xuICAgIH0gZWxzZSB7XG4gICAgICB0MyA9IFswLCAwLCAwXTtcbiAgICAgIGMgPSBbMCwgMCwgMF07XG4gICAgICB0MiA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgICB0MSA9IDIgKiBsIC0gdDI7XG4gICAgICBoIC89IDM2MDtcbiAgICAgIHQzWzBdID0gaCArIDEgLyAzO1xuICAgICAgdDNbMV0gPSBoO1xuICAgICAgdDNbMl0gPSBoIC0gMSAvIDM7XG4gICAgICBmb3IgKGkgPSBvID0gMDsgbyA8PSAyOyBpID0gKytvKSB7XG4gICAgICAgIGlmICh0M1tpXSA8IDApIHtcbiAgICAgICAgICB0M1tpXSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0M1tpXSA+IDEpIHtcbiAgICAgICAgICB0M1tpXSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICg2ICogdDNbaV0gPCAxKSB7XG4gICAgICAgICAgY1tpXSA9IHQxICsgKHQyIC0gdDEpICogNiAqIHQzW2ldO1xuICAgICAgICB9IGVsc2UgaWYgKDIgKiB0M1tpXSA8IDEpIHtcbiAgICAgICAgICBjW2ldID0gdDI7XG4gICAgICAgIH0gZWxzZSBpZiAoMyAqIHQzW2ldIDwgMikge1xuICAgICAgICAgIGNbaV0gPSB0MSArICh0MiAtIHQxKSAqICgoMiAvIDMpIC0gdDNbaV0pICogNjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjW2ldID0gdDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlZiA9IFtyb3VuZChjWzBdICogMjU1KSwgcm91bmQoY1sxXSAqIDI1NSksIHJvdW5kKGNbMl0gKiAyNTUpXSwgciA9IHJlZlswXSwgZyA9IHJlZlsxXSwgYiA9IHJlZlsyXTtcbiAgICB9XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMykge1xuICAgICAgcmV0dXJuIFtyLCBnLCBiLCBhcmdzWzNdXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtyLCBnLCBiXTtcbiAgICB9XG4gIH07XG5cbiAgcmdiMmhzbCA9IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICB2YXIgaCwgbCwgbWluLCByZWYsIHM7XG4gICAgaWYgKHIgIT09IHZvaWQgMCAmJiByLmxlbmd0aCA+PSAzKSB7XG4gICAgICByZWYgPSByLCByID0gcmVmWzBdLCBnID0gcmVmWzFdLCBiID0gcmVmWzJdO1xuICAgIH1cbiAgICByIC89IDI1NTtcbiAgICBnIC89IDI1NTtcbiAgICBiIC89IDI1NTtcbiAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgcyA9IDA7XG4gICAgICBoID0gTnVtYmVyLk5hTjtcbiAgICB9IGVsc2Uge1xuICAgICAgcyA9IGwgPCAwLjUgPyAobWF4IC0gbWluKSAvIChtYXggKyBtaW4pIDogKG1heCAtIG1pbikgLyAoMiAtIG1heCAtIG1pbik7XG4gICAgfVxuICAgIGlmIChyID09PSBtYXgpIHtcbiAgICAgIGggPSAoZyAtIGIpIC8gKG1heCAtIG1pbik7XG4gICAgfSBlbHNlIGlmIChnID09PSBtYXgpIHtcbiAgICAgIGggPSAyICsgKGIgLSByKSAvIChtYXggLSBtaW4pO1xuICAgIH0gZWxzZSBpZiAoYiA9PT0gbWF4KSB7XG4gICAgICBoID0gNCArIChyIC0gZykgLyAobWF4IC0gbWluKTtcbiAgICB9XG4gICAgaCAqPSA2MDtcbiAgICBpZiAoaCA8IDApIHtcbiAgICAgIGggKz0gMzYwO1xuICAgIH1cbiAgICByZXR1cm4gW2gsIHMsIGxdO1xuICB9O1xuXG4gIGNocm9tYS5oc2wgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKGZ1bmMsIGFyZ3MsIGN0b3IpIHtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICB2YXIgY2hpbGQgPSBuZXcgY3RvciwgcmVzdWx0ID0gZnVuYy5hcHBseShjaGlsZCwgYXJncyk7XG4gICAgICByZXR1cm4gT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCA/IHJlc3VsdCA6IGNoaWxkO1xuICAgIH0pKENvbG9yLCBzbGljZS5jYWxsKGFyZ3VtZW50cykuY29uY2F0KFsnaHNsJ10pLCBmdW5jdGlvbigpe30pO1xuICB9O1xuXG4gIF9pbnB1dC5oc2wgPSBoc2wycmdiO1xuXG4gIENvbG9yLnByb3RvdHlwZS5oc2wgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcmdiMmhzbCh0aGlzLl9yZ2IpO1xuICB9O1xuXG4gIGhzdjJyZ2IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgYiwgZiwgZywgaCwgaSwgcCwgcSwgciwgcmVmLCByZWYxLCByZWYyLCByZWYzLCByZWY0LCByZWY1LCBzLCB0LCB2O1xuICAgIGFyZ3MgPSB1bnBhY2soYXJndW1lbnRzKTtcbiAgICBoID0gYXJnc1swXSwgcyA9IGFyZ3NbMV0sIHYgPSBhcmdzWzJdO1xuICAgIHYgKj0gMjU1O1xuICAgIGlmIChzID09PSAwKSB7XG4gICAgICByID0gZyA9IGIgPSB2O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaCA9PT0gMzYwKSB7XG4gICAgICAgIGggPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGggPiAzNjApIHtcbiAgICAgICAgaCAtPSAzNjA7XG4gICAgICB9XG4gICAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCArPSAzNjA7XG4gICAgICB9XG4gICAgICBoIC89IDYwO1xuICAgICAgaSA9IGZsb29yKGgpO1xuICAgICAgZiA9IGggLSBpO1xuICAgICAgcCA9IHYgKiAoMSAtIHMpO1xuICAgICAgcSA9IHYgKiAoMSAtIHMgKiBmKTtcbiAgICAgIHQgPSB2ICogKDEgLSBzICogKDEgLSBmKSk7XG4gICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHJlZiA9IFt2LCB0LCBwXSwgciA9IHJlZlswXSwgZyA9IHJlZlsxXSwgYiA9IHJlZlsyXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHJlZjEgPSBbcSwgdiwgcF0sIHIgPSByZWYxWzBdLCBnID0gcmVmMVsxXSwgYiA9IHJlZjFbMl07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICByZWYyID0gW3AsIHYsIHRdLCByID0gcmVmMlswXSwgZyA9IHJlZjJbMV0sIGIgPSByZWYyWzJdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgcmVmMyA9IFtwLCBxLCB2XSwgciA9IHJlZjNbMF0sIGcgPSByZWYzWzFdLCBiID0gcmVmM1syXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHJlZjQgPSBbdCwgcCwgdl0sIHIgPSByZWY0WzBdLCBnID0gcmVmNFsxXSwgYiA9IHJlZjRbMl07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICByZWY1ID0gW3YsIHAsIHFdLCByID0gcmVmNVswXSwgZyA9IHJlZjVbMV0sIGIgPSByZWY1WzJdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW3IsIGcsIGIsIGFyZ3MubGVuZ3RoID4gMyA/IGFyZ3NbM10gOiAxXTtcbiAgfTtcblxuICByZ2IyaHN2ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGIsIGRlbHRhLCBnLCBoLCBtaW4sIHIsIHJlZiwgcywgdjtcbiAgICByZWYgPSB1bnBhY2soYXJndW1lbnRzKSwgciA9IHJlZlswXSwgZyA9IHJlZlsxXSwgYiA9IHJlZlsyXTtcbiAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICBkZWx0YSA9IG1heCAtIG1pbjtcbiAgICB2ID0gbWF4IC8gMjU1LjA7XG4gICAgaWYgKG1heCA9PT0gMCkge1xuICAgICAgaCA9IE51bWJlci5OYU47XG4gICAgICBzID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcyA9IGRlbHRhIC8gbWF4O1xuICAgICAgaWYgKHIgPT09IG1heCkge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgICAgfVxuICAgICAgaWYgKGcgPT09IG1heCkge1xuICAgICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGlmIChiID09PSBtYXgpIHtcbiAgICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICB9XG4gICAgICBoICo9IDYwO1xuICAgICAgaWYgKGggPCAwKSB7XG4gICAgICAgIGggKz0gMzYwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2gsIHMsIHZdO1xuICB9O1xuXG4gIGNocm9tYS5oc3YgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKGZ1bmMsIGFyZ3MsIGN0b3IpIHtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICB2YXIgY2hpbGQgPSBuZXcgY3RvciwgcmVzdWx0ID0gZnVuYy5hcHBseShjaGlsZCwgYXJncyk7XG4gICAgICByZXR1cm4gT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCA/IHJlc3VsdCA6IGNoaWxkO1xuICAgIH0pKENvbG9yLCBzbGljZS5jYWxsKGFyZ3VtZW50cykuY29uY2F0KFsnaHN2J10pLCBmdW5jdGlvbigpe30pO1xuICB9O1xuXG4gIF9pbnB1dC5oc3YgPSBoc3YycmdiO1xuXG4gIENvbG9yLnByb3RvdHlwZS5oc3YgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcmdiMmhzdih0aGlzLl9yZ2IpO1xuICB9O1xuXG4gIG51bTJyZ2IgPSBmdW5jdGlvbihudW0pIHtcbiAgICB2YXIgYiwgZywgcjtcbiAgICBpZiAodHlwZShudW0pID09PSBcIm51bWJlclwiICYmIG51bSA+PSAwICYmIG51bSA8PSAweEZGRkZGRikge1xuICAgICAgciA9IG51bSA+PiAxNjtcbiAgICAgIGcgPSAobnVtID4+IDgpICYgMHhGRjtcbiAgICAgIGIgPSBudW0gJiAweEZGO1xuICAgICAgcmV0dXJuIFtyLCBnLCBiLCAxXTtcbiAgICB9XG4gICAgY29uc29sZS53YXJuKFwidW5rbm93biBudW0gY29sb3I6IFwiICsgbnVtKTtcbiAgICByZXR1cm4gWzAsIDAsIDAsIDFdO1xuICB9O1xuXG4gIHJnYjJudW0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYiwgZywgciwgcmVmO1xuICAgIHJlZiA9IHVucGFjayhhcmd1bWVudHMpLCByID0gcmVmWzBdLCBnID0gcmVmWzFdLCBiID0gcmVmWzJdO1xuICAgIHJldHVybiAociA8PCAxNikgKyAoZyA8PCA4KSArIGI7XG4gIH07XG5cbiAgY2hyb21hLm51bSA9IGZ1bmN0aW9uKG51bSkge1xuICAgIHJldHVybiBuZXcgQ29sb3IobnVtLCAnbnVtJyk7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLm51bSA9IGZ1bmN0aW9uKG1vZGUpIHtcbiAgICBpZiAobW9kZSA9PSBudWxsKSB7XG4gICAgICBtb2RlID0gJ3JnYic7XG4gICAgfVxuICAgIHJldHVybiByZ2IybnVtKHRoaXMuX3JnYiwgbW9kZSk7XG4gIH07XG5cbiAgX2lucHV0Lm51bSA9IG51bTJyZ2I7XG5cbiAgX2d1ZXNzX2Zvcm1hdHMucHVzaCh7XG4gICAgcDogMSxcbiAgICB0ZXN0OiBmdW5jdGlvbihuKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlKG4pID09PSBcIm51bWJlclwiICYmIG4gPj0gMCAmJiBuIDw9IDB4RkZGRkZGKSB7XG4gICAgICAgIHJldHVybiAnbnVtJztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGhjZzJyZ2IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgX2MsIF9nLCBhcmdzLCBiLCBjLCBmLCBnLCBoLCBpLCBwLCBxLCByLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlZjQsIHJlZjUsIHQsIHY7XG4gICAgYXJncyA9IHVucGFjayhhcmd1bWVudHMpO1xuICAgIGggPSBhcmdzWzBdLCBjID0gYXJnc1sxXSwgX2cgPSBhcmdzWzJdO1xuICAgIGMgPSBjIC8gMTAwO1xuICAgIGcgPSBnIC8gMTAwICogMjU1O1xuICAgIF9jID0gYyAqIDI1NTtcbiAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgciA9IGcgPSBiID0gX2c7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoID09PSAzNjApIHtcbiAgICAgICAgaCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoaCA+IDM2MCkge1xuICAgICAgICBoIC09IDM2MDtcbiAgICAgIH1cbiAgICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoICs9IDM2MDtcbiAgICAgIH1cbiAgICAgIGggLz0gNjA7XG4gICAgICBpID0gZmxvb3IoaCk7XG4gICAgICBmID0gaCAtIGk7XG4gICAgICBwID0gX2cgKiAoMSAtIGMpO1xuICAgICAgcSA9IHAgKyBfYyAqICgxIC0gZik7XG4gICAgICB0ID0gcCArIF9jICogZjtcbiAgICAgIHYgPSBwICsgX2M7XG4gICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHJlZiA9IFt2LCB0LCBwXSwgciA9IHJlZlswXSwgZyA9IHJlZlsxXSwgYiA9IHJlZlsyXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHJlZjEgPSBbcSwgdiwgcF0sIHIgPSByZWYxWzBdLCBnID0gcmVmMVsxXSwgYiA9IHJlZjFbMl07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICByZWYyID0gW3AsIHYsIHRdLCByID0gcmVmMlswXSwgZyA9IHJlZjJbMV0sIGIgPSByZWYyWzJdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgcmVmMyA9IFtwLCBxLCB2XSwgciA9IHJlZjNbMF0sIGcgPSByZWYzWzFdLCBiID0gcmVmM1syXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHJlZjQgPSBbdCwgcCwgdl0sIHIgPSByZWY0WzBdLCBnID0gcmVmNFsxXSwgYiA9IHJlZjRbMl07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICByZWY1ID0gW3YsIHAsIHFdLCByID0gcmVmNVswXSwgZyA9IHJlZjVbMV0sIGIgPSByZWY1WzJdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW3IsIGcsIGIsIGFyZ3MubGVuZ3RoID4gMyA/IGFyZ3NbM10gOiAxXTtcbiAgfTtcblxuICByZ2IyaGNnID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9nLCBiLCBjLCBkZWx0YSwgZywgaCwgbWluLCByLCByZWY7XG4gICAgcmVmID0gdW5wYWNrKGFyZ3VtZW50cyksIHIgPSByZWZbMF0sIGcgPSByZWZbMV0sIGIgPSByZWZbMl07XG4gICAgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgZGVsdGEgPSBtYXggLSBtaW47XG4gICAgYyA9IGRlbHRhICogMTAwIC8gMjU1O1xuICAgIF9nID0gbWluIC8gKDI1NSAtIGRlbHRhKSAqIDEwMDtcbiAgICBpZiAoZGVsdGEgPT09IDApIHtcbiAgICAgIGggPSBOdW1iZXIuTmFOO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAociA9PT0gbWF4KSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgICB9XG4gICAgICBpZiAoZyA9PT0gbWF4KSB7XG4gICAgICAgIGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgICAgfVxuICAgICAgaWYgKGIgPT09IG1heCkge1xuICAgICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGggKj0gNjA7XG4gICAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCArPSAzNjA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbaCwgYywgX2ddO1xuICB9O1xuXG4gIGNocm9tYS5oY2cgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKGZ1bmMsIGFyZ3MsIGN0b3IpIHtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICB2YXIgY2hpbGQgPSBuZXcgY3RvciwgcmVzdWx0ID0gZnVuYy5hcHBseShjaGlsZCwgYXJncyk7XG4gICAgICByZXR1cm4gT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCA/IHJlc3VsdCA6IGNoaWxkO1xuICAgIH0pKENvbG9yLCBzbGljZS5jYWxsKGFyZ3VtZW50cykuY29uY2F0KFsnaGNnJ10pLCBmdW5jdGlvbigpe30pO1xuICB9O1xuXG4gIF9pbnB1dC5oY2cgPSBoY2cycmdiO1xuXG4gIENvbG9yLnByb3RvdHlwZS5oY2cgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcmdiMmhjZyh0aGlzLl9yZ2IpO1xuICB9O1xuXG4gIGNzczJyZ2IgPSBmdW5jdGlvbihjc3MpIHtcbiAgICB2YXIgYWEsIGFiLCBoc2wsIGksIG0sIG8sIHJnYiwgdztcbiAgICBjc3MgPSBjc3MudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoKGNocm9tYS5jb2xvcnMgIT0gbnVsbCkgJiYgY2hyb21hLmNvbG9yc1tjc3NdKSB7XG4gICAgICByZXR1cm4gaGV4MnJnYihjaHJvbWEuY29sb3JzW2Nzc10pO1xuICAgIH1cbiAgICBpZiAobSA9IGNzcy5tYXRjaCgvcmdiXFwoXFxzKihcXC0/XFxkKyksXFxzKihcXC0/XFxkKylcXHMqLFxccyooXFwtP1xcZCspXFxzKlxcKS8pKSB7XG4gICAgICByZ2IgPSBtLnNsaWNlKDEsIDQpO1xuICAgICAgZm9yIChpID0gbyA9IDA7IG8gPD0gMjsgaSA9ICsrbykge1xuICAgICAgICByZ2JbaV0gPSArcmdiW2ldO1xuICAgICAgfVxuICAgICAgcmdiWzNdID0gMTtcbiAgICB9IGVsc2UgaWYgKG0gPSBjc3MubWF0Y2goL3JnYmFcXChcXHMqKFxcLT9cXGQrKSxcXHMqKFxcLT9cXGQrKVxccyosXFxzKihcXC0/XFxkKylcXHMqLFxccyooWzAxXXxbMDFdP1xcLlxcZCspXFwpLykpIHtcbiAgICAgIHJnYiA9IG0uc2xpY2UoMSwgNSk7XG4gICAgICBmb3IgKGkgPSB3ID0gMDsgdyA8PSAzOyBpID0gKyt3KSB7XG4gICAgICAgIHJnYltpXSA9ICtyZ2JbaV07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtID0gY3NzLm1hdGNoKC9yZ2JcXChcXHMqKFxcLT9cXGQrKD86XFwuXFxkKyk/KSUsXFxzKihcXC0/XFxkKyg/OlxcLlxcZCspPyklXFxzKixcXHMqKFxcLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqXFwpLykpIHtcbiAgICAgIHJnYiA9IG0uc2xpY2UoMSwgNCk7XG4gICAgICBmb3IgKGkgPSBhYSA9IDA7IGFhIDw9IDI7IGkgPSArK2FhKSB7XG4gICAgICAgIHJnYltpXSA9IHJvdW5kKHJnYltpXSAqIDIuNTUpO1xuICAgICAgfVxuICAgICAgcmdiWzNdID0gMTtcbiAgICB9IGVsc2UgaWYgKG0gPSBjc3MubWF0Y2goL3JnYmFcXChcXHMqKFxcLT9cXGQrKD86XFwuXFxkKyk/KSUsXFxzKihcXC0/XFxkKyg/OlxcLlxcZCspPyklXFxzKixcXHMqKFxcLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWzAxXXxbMDFdP1xcLlxcZCspXFwpLykpIHtcbiAgICAgIHJnYiA9IG0uc2xpY2UoMSwgNSk7XG4gICAgICBmb3IgKGkgPSBhYiA9IDA7IGFiIDw9IDI7IGkgPSArK2FiKSB7XG4gICAgICAgIHJnYltpXSA9IHJvdW5kKHJnYltpXSAqIDIuNTUpO1xuICAgICAgfVxuICAgICAgcmdiWzNdID0gK3JnYlszXTtcbiAgICB9IGVsc2UgaWYgKG0gPSBjc3MubWF0Y2goL2hzbFxcKFxccyooXFwtP1xcZCsoPzpcXC5cXGQrKT8pLFxccyooXFwtP1xcZCsoPzpcXC5cXGQrKT8pJVxccyosXFxzKihcXC0/XFxkKyg/OlxcLlxcZCspPyklXFxzKlxcKS8pKSB7XG4gICAgICBoc2wgPSBtLnNsaWNlKDEsIDQpO1xuICAgICAgaHNsWzFdICo9IDAuMDE7XG4gICAgICBoc2xbMl0gKj0gMC4wMTtcbiAgICAgIHJnYiA9IGhzbDJyZ2IoaHNsKTtcbiAgICAgIHJnYlszXSA9IDE7XG4gICAgfSBlbHNlIGlmIChtID0gY3NzLm1hdGNoKC9oc2xhXFwoXFxzKihcXC0/XFxkKyg/OlxcLlxcZCspPyksXFxzKihcXC0/XFxkKyg/OlxcLlxcZCspPyklXFxzKixcXHMqKFxcLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWzAxXXxbMDFdP1xcLlxcZCspXFwpLykpIHtcbiAgICAgIGhzbCA9IG0uc2xpY2UoMSwgNCk7XG4gICAgICBoc2xbMV0gKj0gMC4wMTtcbiAgICAgIGhzbFsyXSAqPSAwLjAxO1xuICAgICAgcmdiID0gaHNsMnJnYihoc2wpO1xuICAgICAgcmdiWzNdID0gK21bNF07XG4gICAgfVxuICAgIHJldHVybiByZ2I7XG4gIH07XG5cbiAgcmdiMmNzcyA9IGZ1bmN0aW9uKHJnYmEpIHtcbiAgICB2YXIgbW9kZTtcbiAgICBtb2RlID0gcmdiYVszXSA8IDEgPyAncmdiYScgOiAncmdiJztcbiAgICBpZiAobW9kZSA9PT0gJ3JnYicpIHtcbiAgICAgIHJldHVybiBtb2RlICsgJygnICsgcmdiYS5zbGljZSgwLCAzKS5tYXAocm91bmQpLmpvaW4oJywnKSArICcpJztcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdyZ2JhJykge1xuICAgICAgcmV0dXJuIG1vZGUgKyAnKCcgKyByZ2JhLnNsaWNlKDAsIDMpLm1hcChyb3VuZCkuam9pbignLCcpICsgJywnICsgcmdiYVszXSArICcpJztcbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuICB9O1xuXG4gIHJuZCA9IGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gcm91bmQoYSAqIDEwMCkgLyAxMDA7XG4gIH07XG5cbiAgaHNsMmNzcyA9IGZ1bmN0aW9uKGhzbCwgYWxwaGEpIHtcbiAgICB2YXIgbW9kZTtcbiAgICBtb2RlID0gYWxwaGEgPCAxID8gJ2hzbGEnIDogJ2hzbCc7XG4gICAgaHNsWzBdID0gcm5kKGhzbFswXSB8fCAwKTtcbiAgICBoc2xbMV0gPSBybmQoaHNsWzFdICogMTAwKSArICclJztcbiAgICBoc2xbMl0gPSBybmQoaHNsWzJdICogMTAwKSArICclJztcbiAgICBpZiAobW9kZSA9PT0gJ2hzbGEnKSB7XG4gICAgICBoc2xbM10gPSBhbHBoYTtcbiAgICB9XG4gICAgcmV0dXJuIG1vZGUgKyAnKCcgKyBoc2wuam9pbignLCcpICsgJyknO1xuICB9O1xuXG4gIF9pbnB1dC5jc3MgPSBmdW5jdGlvbihoKSB7XG4gICAgcmV0dXJuIGNzczJyZ2IoaCk7XG4gIH07XG5cbiAgY2hyb21hLmNzcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oZnVuYywgYXJncywgY3Rvcikge1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBmdW5jLnByb3RvdHlwZTtcbiAgICAgIHZhciBjaGlsZCA9IG5ldyBjdG9yLCByZXN1bHQgPSBmdW5jLmFwcGx5KGNoaWxkLCBhcmdzKTtcbiAgICAgIHJldHVybiBPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0ID8gcmVzdWx0IDogY2hpbGQ7XG4gICAgfSkoQ29sb3IsIHNsaWNlLmNhbGwoYXJndW1lbnRzKS5jb25jYXQoWydjc3MnXSksIGZ1bmN0aW9uKCl7fSk7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uKG1vZGUpIHtcbiAgICBpZiAobW9kZSA9PSBudWxsKSB7XG4gICAgICBtb2RlID0gJ3JnYic7XG4gICAgfVxuICAgIGlmIChtb2RlLnNsaWNlKDAsIDMpID09PSAncmdiJykge1xuICAgICAgcmV0dXJuIHJnYjJjc3ModGhpcy5fcmdiKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuc2xpY2UoMCwgMykgPT09ICdoc2wnKSB7XG4gICAgICByZXR1cm4gaHNsMmNzcyh0aGlzLmhzbCgpLCB0aGlzLmFscGhhKCkpO1xuICAgIH1cbiAgfTtcblxuICBfaW5wdXQubmFtZWQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIGhleDJyZ2IodzNjeDExW25hbWVdKTtcbiAgfTtcblxuICBfZ3Vlc3NfZm9ybWF0cy5wdXNoKHtcbiAgICBwOiA1LFxuICAgIHRlc3Q6IGZ1bmN0aW9uKG4pIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmICh3M2N4MTFbbl0gIT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuICduYW1lZCc7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBDb2xvci5wcm90b3R5cGUubmFtZSA9IGZ1bmN0aW9uKG4pIHtcbiAgICB2YXIgaCwgaztcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgaWYgKHczY3gxMVtuXSkge1xuICAgICAgICB0aGlzLl9yZ2IgPSBoZXgycmdiKHczY3gxMVtuXSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9yZ2JbM10gPSAxO1xuICAgICAgdGhpcztcbiAgICB9XG4gICAgaCA9IHRoaXMuaGV4KCk7XG4gICAgZm9yIChrIGluIHczY3gxMSkge1xuICAgICAgaWYgKGggPT09IHczY3gxMVtrXSkge1xuICAgICAgICByZXR1cm4gaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGg7XG4gIH07XG5cbiAgbGNoMmxhYiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLypcbiAgICBDb252ZXJ0IGZyb20gYSBxdWFsaXRhdGl2ZSBwYXJhbWV0ZXIgaCBhbmQgYSBxdWFudGl0YXRpdmUgcGFyYW1ldGVyIGwgdG8gYSAyNC1iaXQgcGl4ZWwuXG4gICAgVGhlc2UgZm9ybXVsYXMgd2VyZSBpbnZlbnRlZCBieSBEYXZpZCBEYWxyeW1wbGUgdG8gb2J0YWluIG1heGltdW0gY29udHJhc3Qgd2l0aG91dCBnb2luZ1xuICAgIG91dCBvZiBnYW11dCBpZiB0aGUgcGFyYW1ldGVycyBhcmUgaW4gdGhlIHJhbmdlIDAtMS5cbiAgICBcbiAgICBBIHNhdHVyYXRpb24gbXVsdGlwbGllciB3YXMgYWRkZWQgYnkgR3JlZ29yIEFpc2NoXG4gICAgICovXG4gICAgdmFyIGMsIGgsIGwsIHJlZjtcbiAgICByZWYgPSB1bnBhY2soYXJndW1lbnRzKSwgbCA9IHJlZlswXSwgYyA9IHJlZlsxXSwgaCA9IHJlZlsyXTtcbiAgICBoID0gaCAqIERFRzJSQUQ7XG4gICAgcmV0dXJuIFtsLCBjb3MoaCkgKiBjLCBzaW4oaCkgKiBjXTtcbiAgfTtcblxuICBsY2gycmdiID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIEwsIGEsIGFyZ3MsIGIsIGMsIGcsIGgsIGwsIHIsIHJlZiwgcmVmMTtcbiAgICBhcmdzID0gdW5wYWNrKGFyZ3VtZW50cyk7XG4gICAgbCA9IGFyZ3NbMF0sIGMgPSBhcmdzWzFdLCBoID0gYXJnc1syXTtcbiAgICByZWYgPSBsY2gybGFiKGwsIGMsIGgpLCBMID0gcmVmWzBdLCBhID0gcmVmWzFdLCBiID0gcmVmWzJdO1xuICAgIHJlZjEgPSBsYWIycmdiKEwsIGEsIGIpLCByID0gcmVmMVswXSwgZyA9IHJlZjFbMV0sIGIgPSByZWYxWzJdO1xuICAgIHJldHVybiBbciwgZywgYiwgYXJncy5sZW5ndGggPiAzID8gYXJnc1szXSA6IDFdO1xuICB9O1xuXG4gIGxhYjJsY2ggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYSwgYiwgYywgaCwgbCwgcmVmO1xuICAgIHJlZiA9IHVucGFjayhhcmd1bWVudHMpLCBsID0gcmVmWzBdLCBhID0gcmVmWzFdLCBiID0gcmVmWzJdO1xuICAgIGMgPSBzcXJ0KGEgKiBhICsgYiAqIGIpO1xuICAgIGggPSAoYXRhbjIoYiwgYSkgKiBSQUQyREVHICsgMzYwKSAlIDM2MDtcbiAgICBpZiAocm91bmQoYyAqIDEwMDAwKSA9PT0gMCkge1xuICAgICAgaCA9IE51bWJlci5OYU47XG4gICAgfVxuICAgIHJldHVybiBbbCwgYywgaF07XG4gIH07XG5cbiAgcmdiMmxjaCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhLCBiLCBnLCBsLCByLCByZWYsIHJlZjE7XG4gICAgcmVmID0gdW5wYWNrKGFyZ3VtZW50cyksIHIgPSByZWZbMF0sIGcgPSByZWZbMV0sIGIgPSByZWZbMl07XG4gICAgcmVmMSA9IHJnYjJsYWIociwgZywgYiksIGwgPSByZWYxWzBdLCBhID0gcmVmMVsxXSwgYiA9IHJlZjFbMl07XG4gICAgcmV0dXJuIGxhYjJsY2gobCwgYSwgYik7XG4gIH07XG5cbiAgY2hyb21hLmxjaCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzO1xuICAgIGFyZ3MgPSB1bnBhY2soYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV3IENvbG9yKGFyZ3MsICdsY2gnKTtcbiAgfTtcblxuICBjaHJvbWEuaGNsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3M7XG4gICAgYXJncyA9IHVucGFjayhhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgQ29sb3IoYXJncywgJ2hjbCcpO1xuICB9O1xuXG4gIF9pbnB1dC5sY2ggPSBsY2gycmdiO1xuXG4gIF9pbnB1dC5oY2wgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYywgaCwgbCwgcmVmO1xuICAgIHJlZiA9IHVucGFjayhhcmd1bWVudHMpLCBoID0gcmVmWzBdLCBjID0gcmVmWzFdLCBsID0gcmVmWzJdO1xuICAgIHJldHVybiBsY2gycmdiKFtsLCBjLCBoXSk7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLmxjaCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiByZ2IybGNoKHRoaXMuX3JnYik7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLmhjbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiByZ2IybGNoKHRoaXMuX3JnYikucmV2ZXJzZSgpO1xuICB9O1xuXG4gIHJnYjJjbXlrID0gZnVuY3Rpb24obW9kZSkge1xuICAgIHZhciBiLCBjLCBmLCBnLCBrLCBtLCByLCByZWYsIHk7XG4gICAgaWYgKG1vZGUgPT0gbnVsbCkge1xuICAgICAgbW9kZSA9ICdyZ2InO1xuICAgIH1cbiAgICByZWYgPSB1bnBhY2soYXJndW1lbnRzKSwgciA9IHJlZlswXSwgZyA9IHJlZlsxXSwgYiA9IHJlZlsyXTtcbiAgICByID0gciAvIDI1NTtcbiAgICBnID0gZyAvIDI1NTtcbiAgICBiID0gYiAvIDI1NTtcbiAgICBrID0gMSAtIE1hdGgubWF4KHIsIE1hdGgubWF4KGcsIGIpKTtcbiAgICBmID0gayA8IDEgPyAxIC8gKDEgLSBrKSA6IDA7XG4gICAgYyA9ICgxIC0gciAtIGspICogZjtcbiAgICBtID0gKDEgLSBnIC0gaykgKiBmO1xuICAgIHkgPSAoMSAtIGIgLSBrKSAqIGY7XG4gICAgcmV0dXJuIFtjLCBtLCB5LCBrXTtcbiAgfTtcblxuICBjbXlrMnJnYiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhbHBoYSwgYXJncywgYiwgYywgZywgaywgbSwgciwgeTtcbiAgICBhcmdzID0gdW5wYWNrKGFyZ3VtZW50cyk7XG4gICAgYyA9IGFyZ3NbMF0sIG0gPSBhcmdzWzFdLCB5ID0gYXJnc1syXSwgayA9IGFyZ3NbM107XG4gICAgYWxwaGEgPSBhcmdzLmxlbmd0aCA+IDQgPyBhcmdzWzRdIDogMTtcbiAgICBpZiAoayA9PT0gMSkge1xuICAgICAgcmV0dXJuIFswLCAwLCAwLCBhbHBoYV07XG4gICAgfVxuICAgIHIgPSBjID49IDEgPyAwIDogMjU1ICogKDEgLSBjKSAqICgxIC0gayk7XG4gICAgZyA9IG0gPj0gMSA/IDAgOiAyNTUgKiAoMSAtIG0pICogKDEgLSBrKTtcbiAgICBiID0geSA+PSAxID8gMCA6IDI1NSAqICgxIC0geSkgKiAoMSAtIGspO1xuICAgIHJldHVybiBbciwgZywgYiwgYWxwaGFdO1xuICB9O1xuXG4gIF9pbnB1dC5jbXlrID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNteWsycmdiKHVucGFjayhhcmd1bWVudHMpKTtcbiAgfTtcblxuICBjaHJvbWEuY215ayA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oZnVuYywgYXJncywgY3Rvcikge1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBmdW5jLnByb3RvdHlwZTtcbiAgICAgIHZhciBjaGlsZCA9IG5ldyBjdG9yLCByZXN1bHQgPSBmdW5jLmFwcGx5KGNoaWxkLCBhcmdzKTtcbiAgICAgIHJldHVybiBPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0ID8gcmVzdWx0IDogY2hpbGQ7XG4gICAgfSkoQ29sb3IsIHNsaWNlLmNhbGwoYXJndW1lbnRzKS5jb25jYXQoWydjbXlrJ10pLCBmdW5jdGlvbigpe30pO1xuICB9O1xuXG4gIENvbG9yLnByb3RvdHlwZS5jbXlrID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHJnYjJjbXlrKHRoaXMuX3JnYik7XG4gIH07XG5cbiAgX2lucHV0LmdsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIGssIG8sIHJnYiwgdjtcbiAgICByZ2IgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVmLCByZXN1bHRzO1xuICAgICAgcmVmID0gdW5wYWNrKGFyZ3VtZW50cyk7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGsgaW4gcmVmKSB7XG4gICAgICAgIHYgPSByZWZba107XG4gICAgICAgIHJlc3VsdHMucHVzaCh2KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZm9yIChpID0gbyA9IDA7IG8gPD0gMjsgaSA9ICsrbykge1xuICAgICAgcmdiW2ldICo9IDI1NTtcbiAgICB9XG4gICAgcmV0dXJuIHJnYjtcbiAgfTtcblxuICBjaHJvbWEuZ2wgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKGZ1bmMsIGFyZ3MsIGN0b3IpIHtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICB2YXIgY2hpbGQgPSBuZXcgY3RvciwgcmVzdWx0ID0gZnVuYy5hcHBseShjaGlsZCwgYXJncyk7XG4gICAgICByZXR1cm4gT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCA/IHJlc3VsdCA6IGNoaWxkO1xuICAgIH0pKENvbG9yLCBzbGljZS5jYWxsKGFyZ3VtZW50cykuY29uY2F0KFsnZ2wnXSksIGZ1bmN0aW9uKCl7fSk7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLmdsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJnYjtcbiAgICByZ2IgPSB0aGlzLl9yZ2I7XG4gICAgcmV0dXJuIFtyZ2JbMF0gLyAyNTUsIHJnYlsxXSAvIDI1NSwgcmdiWzJdIC8gMjU1LCByZ2JbM11dO1xuICB9O1xuXG4gIHJnYjJsdW1pbmFuY2UgPSBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgdmFyIHJlZjtcbiAgICByZWYgPSB1bnBhY2soYXJndW1lbnRzKSwgciA9IHJlZlswXSwgZyA9IHJlZlsxXSwgYiA9IHJlZlsyXTtcbiAgICByID0gbHVtaW5hbmNlX3gocik7XG4gICAgZyA9IGx1bWluYW5jZV94KGcpO1xuICAgIGIgPSBsdW1pbmFuY2VfeChiKTtcbiAgICByZXR1cm4gMC4yMTI2ICogciArIDAuNzE1MiAqIGcgKyAwLjA3MjIgKiBiO1xuICB9O1xuXG4gIGx1bWluYW5jZV94ID0gZnVuY3Rpb24oeCkge1xuICAgIHggLz0gMjU1O1xuICAgIGlmICh4IDw9IDAuMDM5MjgpIHtcbiAgICAgIHJldHVybiB4IC8gMTIuOTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwb3coKHggKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgICB9XG4gIH07XG5cbiAgX2ludGVycG9sYXRvcnMgPSBbXTtcblxuICBpbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uKGNvbDEsIGNvbDIsIGYsIG0pIHtcbiAgICB2YXIgaW50ZXJwb2wsIGxlbiwgbywgcmVzO1xuICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgIGYgPSAwLjU7XG4gICAgfVxuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIG0gPSAncmdiJztcbiAgICB9XG5cbiAgICAvKlxuICAgIGludGVycG9sYXRlcyBiZXR3ZWVuIGNvbG9yc1xuICAgIGYgPSAwIC0tPiBtZVxuICAgIGYgPSAxIC0tPiBjb2xcbiAgICAgKi9cbiAgICBpZiAodHlwZShjb2wxKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbDEgPSBjaHJvbWEoY29sMSk7XG4gICAgfVxuICAgIGlmICh0eXBlKGNvbDIpICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29sMiA9IGNocm9tYShjb2wyKTtcbiAgICB9XG4gICAgZm9yIChvID0gMCwgbGVuID0gX2ludGVycG9sYXRvcnMubGVuZ3RoOyBvIDwgbGVuOyBvKyspIHtcbiAgICAgIGludGVycG9sID0gX2ludGVycG9sYXRvcnNbb107XG4gICAgICBpZiAobSA9PT0gaW50ZXJwb2xbMF0pIHtcbiAgICAgICAgcmVzID0gaW50ZXJwb2xbMV0oY29sMSwgY29sMiwgZiwgbSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVzID09IG51bGwpIHtcbiAgICAgIHRocm93IFwiY29sb3IgbW9kZSBcIiArIG0gKyBcIiBpcyBub3Qgc3VwcG9ydGVkXCI7XG4gICAgfVxuICAgIHJldHVybiByZXMuYWxwaGEoY29sMS5hbHBoYSgpICsgZiAqIChjb2wyLmFscGhhKCkgLSBjb2wxLmFscGhhKCkpKTtcbiAgfTtcblxuICBjaHJvbWEuaW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZTtcblxuICBDb2xvci5wcm90b3R5cGUuaW50ZXJwb2xhdGUgPSBmdW5jdGlvbihjb2wyLCBmLCBtKSB7XG4gICAgcmV0dXJuIGludGVycG9sYXRlKHRoaXMsIGNvbDIsIGYsIG0pO1xuICB9O1xuXG4gIGNocm9tYS5taXggPSBpbnRlcnBvbGF0ZTtcblxuICBDb2xvci5wcm90b3R5cGUubWl4ID0gQ29sb3IucHJvdG90eXBlLmludGVycG9sYXRlO1xuXG4gIGludGVycG9sYXRlX3JnYiA9IGZ1bmN0aW9uKGNvbDEsIGNvbDIsIGYsIG0pIHtcbiAgICB2YXIgeHl6MCwgeHl6MTtcbiAgICB4eXowID0gY29sMS5fcmdiO1xuICAgIHh5ejEgPSBjb2wyLl9yZ2I7XG4gICAgcmV0dXJuIG5ldyBDb2xvcih4eXowWzBdICsgZiAqICh4eXoxWzBdIC0geHl6MFswXSksIHh5ejBbMV0gKyBmICogKHh5ejFbMV0gLSB4eXowWzFdKSwgeHl6MFsyXSArIGYgKiAoeHl6MVsyXSAtIHh5ejBbMl0pLCBtKTtcbiAgfTtcblxuICBfaW50ZXJwb2xhdG9ycy5wdXNoKFsncmdiJywgaW50ZXJwb2xhdGVfcmdiXSk7XG5cbiAgQ29sb3IucHJvdG90eXBlLmx1bWluYW5jZSA9IGZ1bmN0aW9uKGx1bSwgbW9kZSkge1xuICAgIHZhciBjdXJfbHVtLCBlcHMsIG1heF9pdGVyLCB0ZXN0O1xuICAgIGlmIChtb2RlID09IG51bGwpIHtcbiAgICAgIG1vZGUgPSAncmdiJztcbiAgICB9XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gcmdiMmx1bWluYW5jZSh0aGlzLl9yZ2IpO1xuICAgIH1cbiAgICBpZiAobHVtID09PSAwKSB7XG4gICAgICB0aGlzLl9yZ2IgPSBbMCwgMCwgMCwgdGhpcy5fcmdiWzNdXTtcbiAgICB9IGVsc2UgaWYgKGx1bSA9PT0gMSkge1xuICAgICAgdGhpcy5fcmdiID0gWzI1NSwgMjU1LCAyNTUsIHRoaXMuX3JnYlszXV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGVwcyA9IDFlLTc7XG4gICAgICBtYXhfaXRlciA9IDIwO1xuICAgICAgdGVzdCA9IGZ1bmN0aW9uKGwsIGgpIHtcbiAgICAgICAgdmFyIGxtLCBtO1xuICAgICAgICBtID0gbC5pbnRlcnBvbGF0ZShoLCAwLjUsIG1vZGUpO1xuICAgICAgICBsbSA9IG0ubHVtaW5hbmNlKCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhsdW0gLSBsbSkgPCBlcHMgfHwgIW1heF9pdGVyLS0pIHtcbiAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG0gPiBsdW0pIHtcbiAgICAgICAgICByZXR1cm4gdGVzdChsLCBtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGVzdChtLCBoKTtcbiAgICAgIH07XG4gICAgICBjdXJfbHVtID0gcmdiMmx1bWluYW5jZSh0aGlzLl9yZ2IpO1xuICAgICAgdGhpcy5fcmdiID0gKGN1cl9sdW0gPiBsdW0gPyB0ZXN0KGNocm9tYSgnYmxhY2snKSwgdGhpcykgOiB0ZXN0KHRoaXMsIGNocm9tYSgnd2hpdGUnKSkpLnJnYmEoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdGVtcGVyYXR1cmUycmdiID0gZnVuY3Rpb24oa2VsdmluKSB7XG4gICAgdmFyIGIsIGcsIHIsIHRlbXA7XG4gICAgdGVtcCA9IGtlbHZpbiAvIDEwMDtcbiAgICBpZiAodGVtcCA8IDY2KSB7XG4gICAgICByID0gMjU1O1xuICAgICAgZyA9IC0xNTUuMjU0ODU1NjI3MDkxNzkgLSAwLjQ0NTk2OTUwNDY5NTc5MTMzICogKGcgPSB0ZW1wIC0gMikgKyAxMDQuNDkyMTYxOTkzOTM4ODggKiBsb2coZyk7XG4gICAgICBiID0gdGVtcCA8IDIwID8gMCA6IC0yNTQuNzY5MzUxODQxMjA5MDIgKyAwLjgyNzQwOTYwNjQwMDczOTUgKiAoYiA9IHRlbXAgLSAxMCkgKyAxMTUuNjc5OTQ0MDEwNjYxNDcgKiBsb2coYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHIgPSAzNTEuOTc2OTA1NjY4MDU2OTMgKyAwLjExNDIwNjQ1Mzc4NDE2NSAqIChyID0gdGVtcCAtIDU1KSAtIDQwLjI1MzY2MzA5MzMyMTI3ICogbG9nKHIpO1xuICAgICAgZyA9IDMyNS40NDk0MTI1NzExOTc0ICsgMC4wNzk0MzQ1NjUzNjY2MjM0MiAqIChnID0gdGVtcCAtIDUwKSAtIDI4LjA4NTI5NjM1MDc5NTcgKiBsb2coZyk7XG4gICAgICBiID0gMjU1O1xuICAgIH1cbiAgICByZXR1cm4gW3IsIGcsIGJdO1xuICB9O1xuXG4gIHJnYjJ0ZW1wZXJhdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiLCBlcHMsIGcsIG1heFRlbXAsIG1pblRlbXAsIHIsIHJlZiwgcmdiLCB0ZW1wO1xuICAgIHJlZiA9IHVucGFjayhhcmd1bWVudHMpLCByID0gcmVmWzBdLCBnID0gcmVmWzFdLCBiID0gcmVmWzJdO1xuICAgIG1pblRlbXAgPSAxMDAwO1xuICAgIG1heFRlbXAgPSA0MDAwMDtcbiAgICBlcHMgPSAwLjQ7XG4gICAgd2hpbGUgKG1heFRlbXAgLSBtaW5UZW1wID4gZXBzKSB7XG4gICAgICB0ZW1wID0gKG1heFRlbXAgKyBtaW5UZW1wKSAqIDAuNTtcbiAgICAgIHJnYiA9IHRlbXBlcmF0dXJlMnJnYih0ZW1wKTtcbiAgICAgIGlmICgocmdiWzJdIC8gcmdiWzBdKSA+PSAoYiAvIHIpKSB7XG4gICAgICAgIG1heFRlbXAgPSB0ZW1wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWluVGVtcCA9IHRlbXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByb3VuZCh0ZW1wKTtcbiAgfTtcblxuICBjaHJvbWEudGVtcGVyYXR1cmUgPSBjaHJvbWEua2VsdmluID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbihmdW5jLCBhcmdzLCBjdG9yKSB7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9IGZ1bmMucHJvdG90eXBlO1xuICAgICAgdmFyIGNoaWxkID0gbmV3IGN0b3IsIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY2hpbGQsIGFyZ3MpO1xuICAgICAgcmV0dXJuIE9iamVjdChyZXN1bHQpID09PSByZXN1bHQgPyByZXN1bHQgOiBjaGlsZDtcbiAgICB9KShDb2xvciwgc2xpY2UuY2FsbChhcmd1bWVudHMpLmNvbmNhdChbJ3RlbXBlcmF0dXJlJ10pLCBmdW5jdGlvbigpe30pO1xuICB9O1xuXG4gIF9pbnB1dC50ZW1wZXJhdHVyZSA9IF9pbnB1dC5rZWx2aW4gPSBfaW5wdXQuSyA9IHRlbXBlcmF0dXJlMnJnYjtcblxuICBDb2xvci5wcm90b3R5cGUudGVtcGVyYXR1cmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcmdiMnRlbXBlcmF0dXJlKHRoaXMuX3JnYik7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLmtlbHZpbiA9IENvbG9yLnByb3RvdHlwZS50ZW1wZXJhdHVyZTtcblxuICBjaHJvbWEuY29udHJhc3QgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIGwxLCBsMiwgcmVmLCByZWYxO1xuICAgIGlmICgocmVmID0gdHlwZShhKSkgPT09ICdzdHJpbmcnIHx8IHJlZiA9PT0gJ251bWJlcicpIHtcbiAgICAgIGEgPSBuZXcgQ29sb3IoYSk7XG4gICAgfVxuICAgIGlmICgocmVmMSA9IHR5cGUoYikpID09PSAnc3RyaW5nJyB8fCByZWYxID09PSAnbnVtYmVyJykge1xuICAgICAgYiA9IG5ldyBDb2xvcihiKTtcbiAgICB9XG4gICAgbDEgPSBhLmx1bWluYW5jZSgpO1xuICAgIGwyID0gYi5sdW1pbmFuY2UoKTtcbiAgICBpZiAobDEgPiBsMikge1xuICAgICAgcmV0dXJuIChsMSArIDAuMDUpIC8gKGwyICsgMC4wNSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAobDIgKyAwLjA1KSAvIChsMSArIDAuMDUpO1xuICAgIH1cbiAgfTtcblxuICBjaHJvbWEuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiLCBtb2RlKSB7XG4gICAgdmFyIGQsIGksIGwxLCBsMiwgcmVmLCByZWYxLCBzdW1fc3E7XG4gICAgaWYgKG1vZGUgPT0gbnVsbCkge1xuICAgICAgbW9kZSA9ICdsYWInO1xuICAgIH1cbiAgICBpZiAoKHJlZiA9IHR5cGUoYSkpID09PSAnc3RyaW5nJyB8fCByZWYgPT09ICdudW1iZXInKSB7XG4gICAgICBhID0gbmV3IENvbG9yKGEpO1xuICAgIH1cbiAgICBpZiAoKHJlZjEgPSB0eXBlKGIpKSA9PT0gJ3N0cmluZycgfHwgcmVmMSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGIgPSBuZXcgQ29sb3IoYik7XG4gICAgfVxuICAgIGwxID0gYS5nZXQobW9kZSk7XG4gICAgbDIgPSBiLmdldChtb2RlKTtcbiAgICBzdW1fc3EgPSAwO1xuICAgIGZvciAoaSBpbiBsMSkge1xuICAgICAgZCA9IChsMVtpXSB8fCAwKSAtIChsMltpXSB8fCAwKTtcbiAgICAgIHN1bV9zcSArPSBkICogZDtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguc3FydChzdW1fc3EpO1xuICB9O1xuXG4gIGNocm9tYS5kZWx0YUUgPSBmdW5jdGlvbihhLCBiLCBMLCBDKSB7XG4gICAgdmFyIEwxLCBMMiwgYTEsIGEyLCBiMSwgYjIsIGMxLCBjMiwgYzQsIGRIMiwgZGVsQSwgZGVsQiwgZGVsQywgZGVsTCwgZiwgaDEsIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgc2MsIHNoLCBzbCwgdCwgdjEsIHYyLCB2MztcbiAgICBpZiAoTCA9PSBudWxsKSB7XG4gICAgICBMID0gMTtcbiAgICB9XG4gICAgaWYgKEMgPT0gbnVsbCkge1xuICAgICAgQyA9IDE7XG4gICAgfVxuICAgIGlmICgocmVmID0gdHlwZShhKSkgPT09ICdzdHJpbmcnIHx8IHJlZiA9PT0gJ251bWJlcicpIHtcbiAgICAgIGEgPSBuZXcgQ29sb3IoYSk7XG4gICAgfVxuICAgIGlmICgocmVmMSA9IHR5cGUoYikpID09PSAnc3RyaW5nJyB8fCByZWYxID09PSAnbnVtYmVyJykge1xuICAgICAgYiA9IG5ldyBDb2xvcihiKTtcbiAgICB9XG4gICAgcmVmMiA9IGEubGFiKCksIEwxID0gcmVmMlswXSwgYTEgPSByZWYyWzFdLCBiMSA9IHJlZjJbMl07XG4gICAgcmVmMyA9IGIubGFiKCksIEwyID0gcmVmM1swXSwgYTIgPSByZWYzWzFdLCBiMiA9IHJlZjNbMl07XG4gICAgYzEgPSBzcXJ0KGExICogYTEgKyBiMSAqIGIxKTtcbiAgICBjMiA9IHNxcnQoYTIgKiBhMiArIGIyICogYjIpO1xuICAgIHNsID0gTDEgPCAxNi4wID8gMC41MTEgOiAoMC4wNDA5NzUgKiBMMSkgLyAoMS4wICsgMC4wMTc2NSAqIEwxKTtcbiAgICBzYyA9ICgwLjA2MzggKiBjMSkgLyAoMS4wICsgMC4wMTMxICogYzEpICsgMC42Mzg7XG4gICAgaDEgPSBjMSA8IDAuMDAwMDAxID8gMC4wIDogKGF0YW4yKGIxLCBhMSkgKiAxODAuMCkgLyBQSTtcbiAgICB3aGlsZSAoaDEgPCAwKSB7XG4gICAgICBoMSArPSAzNjA7XG4gICAgfVxuICAgIHdoaWxlIChoMSA+PSAzNjApIHtcbiAgICAgIGgxIC09IDM2MDtcbiAgICB9XG4gICAgdCA9IChoMSA+PSAxNjQuMCkgJiYgKGgxIDw9IDM0NS4wKSA/IDAuNTYgKyBhYnMoMC4yICogY29zKChQSSAqIChoMSArIDE2OC4wKSkgLyAxODAuMCkpIDogMC4zNiArIGFicygwLjQgKiBjb3MoKFBJICogKGgxICsgMzUuMCkpIC8gMTgwLjApKTtcbiAgICBjNCA9IGMxICogYzEgKiBjMSAqIGMxO1xuICAgIGYgPSBzcXJ0KGM0IC8gKGM0ICsgMTkwMC4wKSk7XG4gICAgc2ggPSBzYyAqIChmICogdCArIDEuMCAtIGYpO1xuICAgIGRlbEwgPSBMMSAtIEwyO1xuICAgIGRlbEMgPSBjMSAtIGMyO1xuICAgIGRlbEEgPSBhMSAtIGEyO1xuICAgIGRlbEIgPSBiMSAtIGIyO1xuICAgIGRIMiA9IGRlbEEgKiBkZWxBICsgZGVsQiAqIGRlbEIgLSBkZWxDICogZGVsQztcbiAgICB2MSA9IGRlbEwgLyAoTCAqIHNsKTtcbiAgICB2MiA9IGRlbEMgLyAoQyAqIHNjKTtcbiAgICB2MyA9IHNoO1xuICAgIHJldHVybiBzcXJ0KHYxICogdjEgKyB2MiAqIHYyICsgKGRIMiAvICh2MyAqIHYzKSkpO1xuICB9O1xuXG4gIENvbG9yLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihtb2RlY2hhbikge1xuICAgIHZhciBjaGFubmVsLCBpLCBtZSwgbW9kZSwgcmVmLCBzcmM7XG4gICAgbWUgPSB0aGlzO1xuICAgIHJlZiA9IG1vZGVjaGFuLnNwbGl0KCcuJyksIG1vZGUgPSByZWZbMF0sIGNoYW5uZWwgPSByZWZbMV07XG4gICAgc3JjID0gbWVbbW9kZV0oKTtcbiAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgaSA9IG1vZGUuaW5kZXhPZihjaGFubmVsKTtcbiAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHNyY1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ3Vua25vd24gY2hhbm5lbCAnICsgY2hhbm5lbCArICcgaW4gbW9kZSAnICsgbW9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzcmM7XG4gICAgfVxuICB9O1xuXG4gIENvbG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihtb2RlY2hhbiwgdmFsdWUpIHtcbiAgICB2YXIgY2hhbm5lbCwgaSwgbWUsIG1vZGUsIHJlZiwgc3JjO1xuICAgIG1lID0gdGhpcztcbiAgICByZWYgPSBtb2RlY2hhbi5zcGxpdCgnLicpLCBtb2RlID0gcmVmWzBdLCBjaGFubmVsID0gcmVmWzFdO1xuICAgIGlmIChjaGFubmVsKSB7XG4gICAgICBzcmMgPSBtZVttb2RlXSgpO1xuICAgICAgaSA9IG1vZGUuaW5kZXhPZihjaGFubmVsKTtcbiAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgaWYgKHR5cGUodmFsdWUpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHN3aXRjaCAodmFsdWUuY2hhckF0KDApKSB7XG4gICAgICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICAgICAgc3JjW2ldICs9ICt2YWx1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgc3JjW2ldICs9ICt2YWx1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcqJzpcbiAgICAgICAgICAgICAgc3JjW2ldICo9ICsodmFsdWUuc3Vic3RyKDEpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgc3JjW2ldIC89ICsodmFsdWUuc3Vic3RyKDEpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBzcmNbaV0gPSArdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNyY1tpXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ3Vua25vd24gY2hhbm5lbCAnICsgY2hhbm5lbCArICcgaW4gbW9kZSAnICsgbW9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNyYyA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gY2hyb21hKHNyYywgbW9kZSkuYWxwaGEobWUuYWxwaGEoKSk7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLmNsaXBwZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmdiLl9jbGlwcGVkIHx8IGZhbHNlO1xuICB9O1xuXG4gIENvbG9yLnByb3RvdHlwZS5hbHBoYSA9IGZ1bmN0aW9uKGEpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGNocm9tYS5yZ2IoW3RoaXMuX3JnYlswXSwgdGhpcy5fcmdiWzFdLCB0aGlzLl9yZ2JbMl0sIGFdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JnYlszXTtcbiAgfTtcblxuICBDb2xvci5wcm90b3R5cGUuZGFya2VuID0gZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgdmFyIGxhYiwgbWU7XG4gICAgaWYgKGFtb3VudCA9PSBudWxsKSB7XG4gICAgICBhbW91bnQgPSAxO1xuICAgIH1cbiAgICBtZSA9IHRoaXM7XG4gICAgbGFiID0gbWUubGFiKCk7XG4gICAgbGFiWzBdIC09IExBQl9DT05TVEFOVFMuS24gKiBhbW91bnQ7XG4gICAgcmV0dXJuIGNocm9tYS5sYWIobGFiKS5hbHBoYShtZS5hbHBoYSgpKTtcbiAgfTtcblxuICBDb2xvci5wcm90b3R5cGUuYnJpZ2h0ZW4gPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgICBpZiAoYW1vdW50ID09IG51bGwpIHtcbiAgICAgIGFtb3VudCA9IDE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRhcmtlbigtYW1vdW50KTtcbiAgfTtcblxuICBDb2xvci5wcm90b3R5cGUuZGFya2VyID0gQ29sb3IucHJvdG90eXBlLmRhcmtlbjtcblxuICBDb2xvci5wcm90b3R5cGUuYnJpZ2h0ZXIgPSBDb2xvci5wcm90b3R5cGUuYnJpZ2h0ZW47XG5cbiAgQ29sb3IucHJvdG90eXBlLnNhdHVyYXRlID0gZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgdmFyIGxjaCwgbWU7XG4gICAgaWYgKGFtb3VudCA9PSBudWxsKSB7XG4gICAgICBhbW91bnQgPSAxO1xuICAgIH1cbiAgICBtZSA9IHRoaXM7XG4gICAgbGNoID0gbWUubGNoKCk7XG4gICAgbGNoWzFdICs9IGFtb3VudCAqIExBQl9DT05TVEFOVFMuS247XG4gICAgaWYgKGxjaFsxXSA8IDApIHtcbiAgICAgIGxjaFsxXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiBjaHJvbWEubGNoKGxjaCkuYWxwaGEobWUuYWxwaGEoKSk7XG4gIH07XG5cbiAgQ29sb3IucHJvdG90eXBlLmRlc2F0dXJhdGUgPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgICBpZiAoYW1vdW50ID09IG51bGwpIHtcbiAgICAgIGFtb3VudCA9IDE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNhdHVyYXRlKC1hbW91bnQpO1xuICB9O1xuXG4gIENvbG9yLnByb3RvdHlwZS5wcmVtdWx0aXBseSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhLCByZ2I7XG4gICAgcmdiID0gdGhpcy5yZ2IoKTtcbiAgICBhID0gdGhpcy5hbHBoYSgpO1xuICAgIHJldHVybiBjaHJvbWEocmdiWzBdICogYSwgcmdiWzFdICogYSwgcmdiWzJdICogYSwgYSk7XG4gIH07XG5cbiAgYmxlbmQgPSBmdW5jdGlvbihib3R0b20sIHRvcCwgbW9kZSkge1xuICAgIGlmICghYmxlbmRbbW9kZV0pIHtcbiAgICAgIHRocm93ICd1bmtub3duIGJsZW5kIG1vZGUgJyArIG1vZGU7XG4gICAgfVxuICAgIHJldHVybiBibGVuZFttb2RlXShib3R0b20sIHRvcCk7XG4gIH07XG5cbiAgYmxlbmRfZiA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYm90dG9tLCB0b3ApIHtcbiAgICAgIHZhciBjMCwgYzE7XG4gICAgICBjMCA9IGNocm9tYSh0b3ApLnJnYigpO1xuICAgICAgYzEgPSBjaHJvbWEoYm90dG9tKS5yZ2IoKTtcbiAgICAgIHJldHVybiBjaHJvbWEoZihjMCwgYzEpLCAncmdiJyk7XG4gICAgfTtcbiAgfTtcblxuICBlYWNoID0gZnVuY3Rpb24oZikge1xuICAgIHJldHVybiBmdW5jdGlvbihjMCwgYzEpIHtcbiAgICAgIHZhciBpLCBvLCBvdXQ7XG4gICAgICBvdXQgPSBbXTtcbiAgICAgIGZvciAoaSA9IG8gPSAwOyBvIDw9IDM7IGkgPSArK28pIHtcbiAgICAgICAgb3V0W2ldID0gZihjMFtpXSwgYzFbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuICB9O1xuXG4gIG5vcm1hbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYTtcbiAgfTtcblxuICBtdWx0aXBseSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYSAqIGIgLyAyNTU7XG4gIH07XG5cbiAgZGFya2VuID0gZnVuY3Rpb24oYSwgYikge1xuICAgIGlmIChhID4gYikge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgfTtcblxuICBsaWdodGVuID0gZnVuY3Rpb24oYSwgYikge1xuICAgIGlmIChhID4gYikge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgfTtcblxuICBzY3JlZW4gPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIDI1NSAqICgxIC0gKDEgLSBhIC8gMjU1KSAqICgxIC0gYiAvIDI1NSkpO1xuICB9O1xuXG4gIG92ZXJsYXkgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgaWYgKGIgPCAxMjgpIHtcbiAgICAgIHJldHVybiAyICogYSAqIGIgLyAyNTU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAyNTUgKiAoMSAtIDIgKiAoMSAtIGEgLyAyNTUpICogKDEgLSBiIC8gMjU1KSk7XG4gICAgfVxuICB9O1xuXG4gIGJ1cm4gPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIDI1NSAqICgxIC0gKDEgLSBiIC8gMjU1KSAvIChhIC8gMjU1KSk7XG4gIH07XG5cbiAgZG9kZ2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgaWYgKGEgPT09IDI1NSkge1xuICAgICAgcmV0dXJuIDI1NTtcbiAgICB9XG4gICAgYSA9IDI1NSAqIChiIC8gMjU1KSAvICgxIC0gYSAvIDI1NSk7XG4gICAgaWYgKGEgPiAyNTUpIHtcbiAgICAgIHJldHVybiAyNTU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgfTtcblxuICBibGVuZC5ub3JtYWwgPSBibGVuZF9mKGVhY2gobm9ybWFsKSk7XG5cbiAgYmxlbmQubXVsdGlwbHkgPSBibGVuZF9mKGVhY2gobXVsdGlwbHkpKTtcblxuICBibGVuZC5zY3JlZW4gPSBibGVuZF9mKGVhY2goc2NyZWVuKSk7XG5cbiAgYmxlbmQub3ZlcmxheSA9IGJsZW5kX2YoZWFjaChvdmVybGF5KSk7XG5cbiAgYmxlbmQuZGFya2VuID0gYmxlbmRfZihlYWNoKGRhcmtlbikpO1xuXG4gIGJsZW5kLmxpZ2h0ZW4gPSBibGVuZF9mKGVhY2gobGlnaHRlbikpO1xuXG4gIGJsZW5kLmRvZGdlID0gYmxlbmRfZihlYWNoKGRvZGdlKSk7XG5cbiAgYmxlbmQuYnVybiA9IGJsZW5kX2YoZWFjaChidXJuKSk7XG5cbiAgY2hyb21hLmJsZW5kID0gYmxlbmQ7XG5cbiAgY2hyb21hLmFuYWx5emUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIGxlbiwgbywgciwgdmFsO1xuICAgIHIgPSB7XG4gICAgICBtaW46IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICBtYXg6IE51bWJlci5NQVhfVkFMVUUgKiAtMSxcbiAgICAgIHN1bTogMCxcbiAgICAgIHZhbHVlczogW10sXG4gICAgICBjb3VudDogMFxuICAgIH07XG4gICAgZm9yIChvID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IG8gPCBsZW47IG8rKykge1xuICAgICAgdmFsID0gZGF0YVtvXTtcbiAgICAgIGlmICgodmFsICE9IG51bGwpICYmICFpc05hTih2YWwpKSB7XG4gICAgICAgIHIudmFsdWVzLnB1c2godmFsKTtcbiAgICAgICAgci5zdW0gKz0gdmFsO1xuICAgICAgICBpZiAodmFsIDwgci5taW4pIHtcbiAgICAgICAgICByLm1pbiA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsID4gci5tYXgpIHtcbiAgICAgICAgICByLm1heCA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByLmNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIHIuZG9tYWluID0gW3IubWluLCByLm1heF07XG4gICAgci5saW1pdHMgPSBmdW5jdGlvbihtb2RlLCBudW0pIHtcbiAgICAgIHJldHVybiBjaHJvbWEubGltaXRzKHIsIG1vZGUsIG51bSk7XG4gICAgfTtcbiAgICByZXR1cm4gcjtcbiAgfTtcblxuICBjaHJvbWEuc2NhbGUgPSBmdW5jdGlvbihjb2xvcnMsIHBvc2l0aW9ucykge1xuICAgIHZhciBfY2xhc3NlcywgX2NvbG9yQ2FjaGUsIF9jb2xvcnMsIF9jb3JyZWN0TGlnaHRuZXNzLCBfZG9tYWluLCBfZml4ZWQsIF9tYXgsIF9taW4sIF9tb2RlLCBfbmFjb2wsIF9vdXQsIF9wYWRkaW5nLCBfcG9zLCBfc3ByZWFkLCBfdXNlQ2FjaGUsIGNsYXNzaWZ5VmFsdWUsIGYsIGdldENsYXNzLCBnZXRDb2xvciwgcmVzZXRDYWNoZSwgc2V0Q29sb3JzLCB0bWFwO1xuICAgIF9tb2RlID0gJ3JnYic7XG4gICAgX25hY29sID0gY2hyb21hKCcjY2NjJyk7XG4gICAgX3NwcmVhZCA9IDA7XG4gICAgX2ZpeGVkID0gZmFsc2U7XG4gICAgX2RvbWFpbiA9IFswLCAxXTtcbiAgICBfcG9zID0gW107XG4gICAgX3BhZGRpbmcgPSBbMCwgMF07XG4gICAgX2NsYXNzZXMgPSBmYWxzZTtcbiAgICBfY29sb3JzID0gW107XG4gICAgX291dCA9IGZhbHNlO1xuICAgIF9taW4gPSAwO1xuICAgIF9tYXggPSAxO1xuICAgIF9jb3JyZWN0TGlnaHRuZXNzID0gZmFsc2U7XG4gICAgX2NvbG9yQ2FjaGUgPSB7fTtcbiAgICBfdXNlQ2FjaGUgPSB0cnVlO1xuICAgIHNldENvbG9ycyA9IGZ1bmN0aW9uKGNvbG9ycykge1xuICAgICAgdmFyIGMsIGNvbCwgbywgcmVmLCByZWYxLCB3O1xuICAgICAgaWYgKGNvbG9ycyA9PSBudWxsKSB7XG4gICAgICAgIGNvbG9ycyA9IFsnI2ZmZicsICcjMDAwJ107XG4gICAgICB9XG4gICAgICBpZiAoKGNvbG9ycyAhPSBudWxsKSAmJiB0eXBlKGNvbG9ycykgPT09ICdzdHJpbmcnICYmIChjaHJvbWEuYnJld2VyICE9IG51bGwpKSB7XG4gICAgICAgIGNvbG9ycyA9IGNocm9tYS5icmV3ZXJbY29sb3JzXSB8fCBjaHJvbWEuYnJld2VyW2NvbG9ycy50b0xvd2VyQ2FzZSgpXSB8fCBjb2xvcnM7XG4gICAgICB9XG4gICAgICBpZiAodHlwZShjb2xvcnMpID09PSAnYXJyYXknKSB7XG4gICAgICAgIGNvbG9ycyA9IGNvbG9ycy5zbGljZSgwKTtcbiAgICAgICAgZm9yIChjID0gbyA9IDAsIHJlZiA9IGNvbG9ycy5sZW5ndGggLSAxOyAwIDw9IHJlZiA/IG8gPD0gcmVmIDogbyA+PSByZWY7IGMgPSAwIDw9IHJlZiA/ICsrbyA6IC0tbykge1xuICAgICAgICAgIGNvbCA9IGNvbG9yc1tjXTtcbiAgICAgICAgICBpZiAodHlwZShjb2wpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb2xvcnNbY10gPSBjaHJvbWEoY29sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3Bvcy5sZW5ndGggPSAwO1xuICAgICAgICBmb3IgKGMgPSB3ID0gMCwgcmVmMSA9IGNvbG9ycy5sZW5ndGggLSAxOyAwIDw9IHJlZjEgPyB3IDw9IHJlZjEgOiB3ID49IHJlZjE7IGMgPSAwIDw9IHJlZjEgPyArK3cgOiAtLXcpIHtcbiAgICAgICAgICBfcG9zLnB1c2goYyAvIChjb2xvcnMubGVuZ3RoIC0gMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXNldENhY2hlKCk7XG4gICAgICByZXR1cm4gX2NvbG9ycyA9IGNvbG9ycztcbiAgICB9O1xuICAgIGdldENsYXNzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBpLCBuO1xuICAgICAgaWYgKF9jbGFzc2VzICE9IG51bGwpIHtcbiAgICAgICAgbiA9IF9jbGFzc2VzLmxlbmd0aCAtIDE7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IG4gJiYgdmFsdWUgPj0gX2NsYXNzZXNbaV0pIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkgLSAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB0bWFwID0gZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICBjbGFzc2lmeVZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBpLCBtYXhjLCBtaW5jLCBuLCB2YWw7XG4gICAgICB2YWwgPSB2YWx1ZTtcbiAgICAgIGlmIChfY2xhc3Nlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgIG4gPSBfY2xhc3Nlcy5sZW5ndGggLSAxO1xuICAgICAgICBpID0gZ2V0Q2xhc3ModmFsdWUpO1xuICAgICAgICBtaW5jID0gX2NsYXNzZXNbMF0gKyAoX2NsYXNzZXNbMV0gLSBfY2xhc3Nlc1swXSkgKiAoMCArIF9zcHJlYWQgKiAwLjUpO1xuICAgICAgICBtYXhjID0gX2NsYXNzZXNbbiAtIDFdICsgKF9jbGFzc2VzW25dIC0gX2NsYXNzZXNbbiAtIDFdKSAqICgxIC0gX3NwcmVhZCAqIDAuNSk7XG4gICAgICAgIHZhbCA9IF9taW4gKyAoKF9jbGFzc2VzW2ldICsgKF9jbGFzc2VzW2kgKyAxXSAtIF9jbGFzc2VzW2ldKSAqIDAuNSAtIG1pbmMpIC8gKG1heGMgLSBtaW5jKSkgKiAoX21heCAtIF9taW4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9O1xuICAgIGdldENvbG9yID0gZnVuY3Rpb24odmFsLCBieXBhc3NNYXApIHtcbiAgICAgIHZhciBjLCBjb2wsIGksIGssIG8sIHAsIHJlZiwgdDtcbiAgICAgIGlmIChieXBhc3NNYXAgPT0gbnVsbCkge1xuICAgICAgICBieXBhc3NNYXAgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc05hTih2YWwpKSB7XG4gICAgICAgIHJldHVybiBfbmFjb2w7XG4gICAgICB9XG4gICAgICBpZiAoIWJ5cGFzc01hcCkge1xuICAgICAgICBpZiAoX2NsYXNzZXMgJiYgX2NsYXNzZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgIGMgPSBnZXRDbGFzcyh2YWwpO1xuICAgICAgICAgIHQgPSBjIC8gKF9jbGFzc2VzLmxlbmd0aCAtIDIpO1xuICAgICAgICAgIHQgPSBfcGFkZGluZ1swXSArICh0ICogKDEgLSBfcGFkZGluZ1swXSAtIF9wYWRkaW5nWzFdKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoX21heCAhPT0gX21pbikge1xuICAgICAgICAgIHQgPSAodmFsIC0gX21pbikgLyAoX21heCAtIF9taW4pO1xuICAgICAgICAgIHQgPSBfcGFkZGluZ1swXSArICh0ICogKDEgLSBfcGFkZGluZ1swXSAtIF9wYWRkaW5nWzFdKSk7XG4gICAgICAgICAgdCA9IE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ID0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdCA9IHZhbDtcbiAgICAgIH1cbiAgICAgIGlmICghYnlwYXNzTWFwKSB7XG4gICAgICAgIHQgPSB0bWFwKHQpO1xuICAgICAgfVxuICAgICAgayA9IE1hdGguZmxvb3IodCAqIDEwMDAwKTtcbiAgICAgIGlmIChfdXNlQ2FjaGUgJiYgX2NvbG9yQ2FjaGVba10pIHtcbiAgICAgICAgY29sID0gX2NvbG9yQ2FjaGVba107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZShfY29sb3JzKSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIGZvciAoaSA9IG8gPSAwLCByZWYgPSBfcG9zLmxlbmd0aCAtIDE7IDAgPD0gcmVmID8gbyA8PSByZWYgOiBvID49IHJlZjsgaSA9IDAgPD0gcmVmID8gKytvIDogLS1vKSB7XG4gICAgICAgICAgICBwID0gX3Bvc1tpXTtcbiAgICAgICAgICAgIGlmICh0IDw9IHApIHtcbiAgICAgICAgICAgICAgY29sID0gX2NvbG9yc1tpXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodCA+PSBwICYmIGkgPT09IF9wb3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICBjb2wgPSBfY29sb3JzW2ldO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ID4gcCAmJiB0IDwgX3Bvc1tpICsgMV0pIHtcbiAgICAgICAgICAgICAgdCA9ICh0IC0gcCkgLyAoX3Bvc1tpICsgMV0gLSBwKTtcbiAgICAgICAgICAgICAgY29sID0gY2hyb21hLmludGVycG9sYXRlKF9jb2xvcnNbaV0sIF9jb2xvcnNbaSArIDFdLCB0LCBfbW9kZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlKF9jb2xvcnMpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY29sID0gX2NvbG9ycyh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX3VzZUNhY2hlKSB7XG4gICAgICAgICAgX2NvbG9yQ2FjaGVba10gPSBjb2w7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2w7XG4gICAgfTtcbiAgICByZXNldENhY2hlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gX2NvbG9yQ2FjaGUgPSB7fTtcbiAgICB9O1xuICAgIHNldENvbG9ycyhjb2xvcnMpO1xuICAgIGYgPSBmdW5jdGlvbih2KSB7XG4gICAgICB2YXIgYztcbiAgICAgIGMgPSBjaHJvbWEoZ2V0Q29sb3IodikpO1xuICAgICAgaWYgKF9vdXQgJiYgY1tfb3V0XSkge1xuICAgICAgICByZXR1cm4gY1tfb3V0XSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgICB9XG4gICAgfTtcbiAgICBmLmNsYXNzZXMgPSBmdW5jdGlvbihjbGFzc2VzKSB7XG4gICAgICB2YXIgZDtcbiAgICAgIGlmIChjbGFzc2VzICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGUoY2xhc3NlcykgPT09ICdhcnJheScpIHtcbiAgICAgICAgICBfY2xhc3NlcyA9IGNsYXNzZXM7XG4gICAgICAgICAgX2RvbWFpbiA9IFtjbGFzc2VzWzBdLCBjbGFzc2VzW2NsYXNzZXMubGVuZ3RoIC0gMV1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGQgPSBjaHJvbWEuYW5hbHl6ZShfZG9tYWluKTtcbiAgICAgICAgICBpZiAoY2xhc3NlcyA9PT0gMCkge1xuICAgICAgICAgICAgX2NsYXNzZXMgPSBbZC5taW4sIGQubWF4XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2NsYXNzZXMgPSBjaHJvbWEubGltaXRzKGQsICdlJywgY2xhc3Nlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9jbGFzc2VzO1xuICAgIH07XG4gICAgZi5kb21haW4gPSBmdW5jdGlvbihkb21haW4pIHtcbiAgICAgIHZhciBjLCBkLCBrLCBsZW4sIG8sIHJlZiwgdztcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gX2RvbWFpbjtcbiAgICAgIH1cbiAgICAgIF9taW4gPSBkb21haW5bMF07XG4gICAgICBfbWF4ID0gZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXTtcbiAgICAgIF9wb3MgPSBbXTtcbiAgICAgIGsgPSBfY29sb3JzLmxlbmd0aDtcbiAgICAgIGlmIChkb21haW4ubGVuZ3RoID09PSBrICYmIF9taW4gIT09IF9tYXgpIHtcbiAgICAgICAgZm9yIChvID0gMCwgbGVuID0gZG9tYWluLmxlbmd0aDsgbyA8IGxlbjsgbysrKSB7XG4gICAgICAgICAgZCA9IGRvbWFpbltvXTtcbiAgICAgICAgICBfcG9zLnB1c2goKGQgLSBfbWluKSAvIChfbWF4IC0gX21pbikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGMgPSB3ID0gMCwgcmVmID0gayAtIDE7IDAgPD0gcmVmID8gdyA8PSByZWYgOiB3ID49IHJlZjsgYyA9IDAgPD0gcmVmID8gKyt3IDogLS13KSB7XG4gICAgICAgICAgX3Bvcy5wdXNoKGMgLyAoayAtIDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgX2RvbWFpbiA9IFtfbWluLCBfbWF4XTtcbiAgICAgIHJldHVybiBmO1xuICAgIH07XG4gICAgZi5tb2RlID0gZnVuY3Rpb24oX20pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gX21vZGU7XG4gICAgICB9XG4gICAgICBfbW9kZSA9IF9tO1xuICAgICAgcmVzZXRDYWNoZSgpO1xuICAgICAgcmV0dXJuIGY7XG4gICAgfTtcbiAgICBmLnJhbmdlID0gZnVuY3Rpb24oY29sb3JzLCBfcG9zKSB7XG4gICAgICBzZXRDb2xvcnMoY29sb3JzLCBfcG9zKTtcbiAgICAgIHJldHVybiBmO1xuICAgIH07XG4gICAgZi5vdXQgPSBmdW5jdGlvbihfbykge1xuICAgICAgX291dCA9IF9vO1xuICAgICAgcmV0dXJuIGY7XG4gICAgfTtcbiAgICBmLnNwcmVhZCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBfc3ByZWFkO1xuICAgICAgfVxuICAgICAgX3NwcmVhZCA9IHZhbDtcbiAgICAgIHJldHVybiBmO1xuICAgIH07XG4gICAgZi5jb3JyZWN0TGlnaHRuZXNzID0gZnVuY3Rpb24odikge1xuICAgICAgaWYgKHYgPT0gbnVsbCkge1xuICAgICAgICB2ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIF9jb3JyZWN0TGlnaHRuZXNzID0gdjtcbiAgICAgIHJlc2V0Q2FjaGUoKTtcbiAgICAgIGlmIChfY29ycmVjdExpZ2h0bmVzcykge1xuICAgICAgICB0bWFwID0gZnVuY3Rpb24odCkge1xuICAgICAgICAgIHZhciBMMCwgTDEsIExfYWN0dWFsLCBMX2RpZmYsIExfaWRlYWwsIG1heF9pdGVyLCBwb2wsIHQwLCB0MTtcbiAgICAgICAgICBMMCA9IGdldENvbG9yKDAsIHRydWUpLmxhYigpWzBdO1xuICAgICAgICAgIEwxID0gZ2V0Q29sb3IoMSwgdHJ1ZSkubGFiKClbMF07XG4gICAgICAgICAgcG9sID0gTDAgPiBMMTtcbiAgICAgICAgICBMX2FjdHVhbCA9IGdldENvbG9yKHQsIHRydWUpLmxhYigpWzBdO1xuICAgICAgICAgIExfaWRlYWwgPSBMMCArIChMMSAtIEwwKSAqIHQ7XG4gICAgICAgICAgTF9kaWZmID0gTF9hY3R1YWwgLSBMX2lkZWFsO1xuICAgICAgICAgIHQwID0gMDtcbiAgICAgICAgICB0MSA9IDE7XG4gICAgICAgICAgbWF4X2l0ZXIgPSAyMDtcbiAgICAgICAgICB3aGlsZSAoTWF0aC5hYnMoTF9kaWZmKSA+IDFlLTIgJiYgbWF4X2l0ZXItLSA+IDApIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHBvbCkge1xuICAgICAgICAgICAgICAgIExfZGlmZiAqPSAtMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoTF9kaWZmIDwgMCkge1xuICAgICAgICAgICAgICAgIHQwID0gdDtcbiAgICAgICAgICAgICAgICB0ICs9ICh0MSAtIHQpICogMC41O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHQxID0gdDtcbiAgICAgICAgICAgICAgICB0ICs9ICh0MCAtIHQpICogMC41O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIExfYWN0dWFsID0gZ2V0Q29sb3IodCwgdHJ1ZSkubGFiKClbMF07XG4gICAgICAgICAgICAgIHJldHVybiBMX2RpZmYgPSBMX2FjdHVhbCAtIExfaWRlYWw7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRtYXAgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gZjtcbiAgICB9O1xuICAgIGYucGFkZGluZyA9IGZ1bmN0aW9uKHApIHtcbiAgICAgIGlmIChwICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGUocCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgcCA9IFtwLCBwXTtcbiAgICAgICAgfVxuICAgICAgICBfcGFkZGluZyA9IHA7XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9wYWRkaW5nO1xuICAgICAgfVxuICAgIH07XG4gICAgZi5jb2xvcnMgPSBmdW5jdGlvbihudW1Db2xvcnMsIG91dCkge1xuICAgICAgdmFyIGRkLCBkbSwgaSwgbywgcmVmLCByZXN1bHQsIHJlc3VsdHMsIHNhbXBsZXMsIHc7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgb3V0ID0gJ2hleCc7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc3VsdCA9IF9jb2xvcnMuc2xpY2UoMCk7XG4gICAgICB9IGVsc2UgaWYgKG51bUNvbG9ycyA9PT0gMSkge1xuICAgICAgICByZXN1bHQgPSBbZigwLjUpXTtcbiAgICAgIH0gZWxzZSBpZiAobnVtQ29sb3JzID4gMSkge1xuICAgICAgICBkbSA9IF9kb21haW5bMF07XG4gICAgICAgIGRkID0gX2RvbWFpblsxXSAtIGRtO1xuICAgICAgICByZXN1bHQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIG8gPSAwOyAwIDw9IG51bUNvbG9ycyA/IG8gPCBudW1Db2xvcnMgOiBvID4gbnVtQ29sb3JzOyAwIDw9IG51bUNvbG9ycyA/IG8rKyA6IG8tLSl7IHJlc3VsdHMucHVzaChvKTsgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KS5hcHBseSh0aGlzKS5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgICAgIHJldHVybiBmKGRtICsgaSAvIChudW1Db2xvcnMgLSAxKSAqIGRkKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2xvcnMgPSBbXTtcbiAgICAgICAgc2FtcGxlcyA9IFtdO1xuICAgICAgICBpZiAoX2NsYXNzZXMgJiYgX2NsYXNzZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgIGZvciAoaSA9IHcgPSAxLCByZWYgPSBfY2xhc3Nlcy5sZW5ndGg7IDEgPD0gcmVmID8gdyA8IHJlZiA6IHcgPiByZWY7IGkgPSAxIDw9IHJlZiA/ICsrdyA6IC0tdykge1xuICAgICAgICAgICAgc2FtcGxlcy5wdXNoKChfY2xhc3Nlc1tpIC0gMV0gKyBfY2xhc3Nlc1tpXSkgKiAwLjUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzYW1wbGVzID0gX2RvbWFpbjtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBzYW1wbGVzLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGYodik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGNocm9tYVtvdXRdKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5tYXAoZnVuY3Rpb24oYykge1xuICAgICAgICAgIHJldHVybiBjW291dF0oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgZi5jYWNoZSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIGlmIChjICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIF91c2VDYWNoZSA9IGM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gX3VzZUNhY2hlO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGY7XG4gIH07XG5cbiAgaWYgKGNocm9tYS5zY2FsZXMgPT0gbnVsbCkge1xuICAgIGNocm9tYS5zY2FsZXMgPSB7fTtcbiAgfVxuXG4gIGNocm9tYS5zY2FsZXMuY29vbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjaHJvbWEuc2NhbGUoW2Nocm9tYS5oc2woMTgwLCAxLCAuOSksIGNocm9tYS5oc2woMjUwLCAuNywgLjQpXSk7XG4gIH07XG5cbiAgY2hyb21hLnNjYWxlcy5ob3QgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2hyb21hLnNjYWxlKFsnIzAwMCcsICcjZjAwJywgJyNmZjAnLCAnI2ZmZiddLCBbMCwgLjI1LCAuNzUsIDFdKS5tb2RlKCdyZ2InKTtcbiAgfTtcblxuICBjaHJvbWEuYW5hbHl6ZSA9IGZ1bmN0aW9uKGRhdGEsIGtleSwgZmlsdGVyKSB7XG4gICAgdmFyIGFkZCwgaywgbGVuLCBvLCByLCB2YWwsIHZpc2l0O1xuICAgIHIgPSB7XG4gICAgICBtaW46IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICBtYXg6IE51bWJlci5NQVhfVkFMVUUgKiAtMSxcbiAgICAgIHN1bTogMCxcbiAgICAgIHZhbHVlczogW10sXG4gICAgICBjb3VudDogMFxuICAgIH07XG4gICAgaWYgKGZpbHRlciA9PSBudWxsKSB7XG4gICAgICBmaWx0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgICBhZGQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICgodmFsICE9IG51bGwpICYmICFpc05hTih2YWwpKSB7XG4gICAgICAgIHIudmFsdWVzLnB1c2godmFsKTtcbiAgICAgICAgci5zdW0gKz0gdmFsO1xuICAgICAgICBpZiAodmFsIDwgci5taW4pIHtcbiAgICAgICAgICByLm1pbiA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsID4gci5tYXgpIHtcbiAgICAgICAgICByLm1heCA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByLmNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfTtcbiAgICB2aXNpdCA9IGZ1bmN0aW9uKHZhbCwgaykge1xuICAgICAgaWYgKGZpbHRlcih2YWwsIGspKSB7XG4gICAgICAgIGlmICgoa2V5ICE9IG51bGwpICYmIHR5cGUoa2V5KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBhZGQoa2V5KHZhbCkpO1xuICAgICAgICB9IGVsc2UgaWYgKChrZXkgIT0gbnVsbCkgJiYgdHlwZShrZXkpID09PSAnc3RyaW5nJyB8fCB0eXBlKGtleSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgcmV0dXJuIGFkZCh2YWxba2V5XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGFkZCh2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAodHlwZShkYXRhKSA9PT0gJ2FycmF5Jykge1xuICAgICAgZm9yIChvID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IG8gPCBsZW47IG8rKykge1xuICAgICAgICB2YWwgPSBkYXRhW29dO1xuICAgICAgICB2aXNpdCh2YWwpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGsgaW4gZGF0YSkge1xuICAgICAgICB2YWwgPSBkYXRhW2tdO1xuICAgICAgICB2aXNpdCh2YWwsIGspO1xuICAgICAgfVxuICAgIH1cbiAgICByLmRvbWFpbiA9IFtyLm1pbiwgci5tYXhdO1xuICAgIHIubGltaXRzID0gZnVuY3Rpb24obW9kZSwgbnVtKSB7XG4gICAgICByZXR1cm4gY2hyb21hLmxpbWl0cyhyLCBtb2RlLCBudW0pO1xuICAgIH07XG4gICAgcmV0dXJuIHI7XG4gIH07XG5cbiAgY2hyb21hLmxpbWl0cyA9IGZ1bmN0aW9uKGRhdGEsIG1vZGUsIG51bSkge1xuICAgIHZhciBhYSwgYWIsIGFjLCBhZCwgYWUsIGFmLCBhZywgYWgsIGFpLCBhaiwgYWssIGFsLCBhbSwgYXNzaWdubWVudHMsIGJlc3QsIGNlbnRyb2lkcywgY2x1c3RlciwgY2x1c3RlclNpemVzLCBkaXN0LCBpLCBqLCBrQ2x1c3RlcnMsIGxpbWl0cywgbWF4X2xvZywgbWluLCBtaW5fbG9nLCBtaW5kaXN0LCBuLCBuYl9pdGVycywgbmV3Q2VudHJvaWRzLCBvLCBwLCBwYiwgcHIsIHJlZiwgcmVmMSwgcmVmMTAsIHJlZjExLCByZWYxMiwgcmVmMTMsIHJlZjE0LCByZWYyLCByZWYzLCByZWY0LCByZWY1LCByZWY2LCByZWY3LCByZWY4LCByZWY5LCByZXBlYXQsIHN1bSwgdG1wS01lYW5zQnJlYWtzLCB2LCB2YWx1ZSwgdmFsdWVzLCB3O1xuICAgIGlmIChtb2RlID09IG51bGwpIHtcbiAgICAgIG1vZGUgPSAnZXF1YWwnO1xuICAgIH1cbiAgICBpZiAobnVtID09IG51bGwpIHtcbiAgICAgIG51bSA9IDc7XG4gICAgfVxuICAgIGlmICh0eXBlKGRhdGEpID09PSAnYXJyYXknKSB7XG4gICAgICBkYXRhID0gY2hyb21hLmFuYWx5emUoZGF0YSk7XG4gICAgfVxuICAgIG1pbiA9IGRhdGEubWluO1xuICAgIG1heCA9IGRhdGEubWF4O1xuICAgIHN1bSA9IGRhdGEuc3VtO1xuICAgIHZhbHVlcyA9IGRhdGEudmFsdWVzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIH0pO1xuICAgIGlmIChudW0gPT09IDEpIHtcbiAgICAgIHJldHVybiBbbWluLCBtYXhdO1xuICAgIH1cbiAgICBsaW1pdHMgPSBbXTtcbiAgICBpZiAobW9kZS5zdWJzdHIoMCwgMSkgPT09ICdjJykge1xuICAgICAgbGltaXRzLnB1c2gobWluKTtcbiAgICAgIGxpbWl0cy5wdXNoKG1heCk7XG4gICAgfVxuICAgIGlmIChtb2RlLnN1YnN0cigwLCAxKSA9PT0gJ2UnKSB7XG4gICAgICBsaW1pdHMucHVzaChtaW4pO1xuICAgICAgZm9yIChpID0gbyA9IDEsIHJlZiA9IG51bSAtIDE7IDEgPD0gcmVmID8gbyA8PSByZWYgOiBvID49IHJlZjsgaSA9IDEgPD0gcmVmID8gKytvIDogLS1vKSB7XG4gICAgICAgIGxpbWl0cy5wdXNoKG1pbiArIChpIC8gbnVtKSAqIChtYXggLSBtaW4pKTtcbiAgICAgIH1cbiAgICAgIGxpbWl0cy5wdXNoKG1heCk7XG4gICAgfSBlbHNlIGlmIChtb2RlLnN1YnN0cigwLCAxKSA9PT0gJ2wnKSB7XG4gICAgICBpZiAobWluIDw9IDApIHtcbiAgICAgICAgdGhyb3cgJ0xvZ2FyaXRobWljIHNjYWxlcyBhcmUgb25seSBwb3NzaWJsZSBmb3IgdmFsdWVzID4gMCc7XG4gICAgICB9XG4gICAgICBtaW5fbG9nID0gTWF0aC5MT0cxMEUgKiBsb2cobWluKTtcbiAgICAgIG1heF9sb2cgPSBNYXRoLkxPRzEwRSAqIGxvZyhtYXgpO1xuICAgICAgbGltaXRzLnB1c2gobWluKTtcbiAgICAgIGZvciAoaSA9IHcgPSAxLCByZWYxID0gbnVtIC0gMTsgMSA8PSByZWYxID8gdyA8PSByZWYxIDogdyA+PSByZWYxOyBpID0gMSA8PSByZWYxID8gKyt3IDogLS13KSB7XG4gICAgICAgIGxpbWl0cy5wdXNoKHBvdygxMCwgbWluX2xvZyArIChpIC8gbnVtKSAqIChtYXhfbG9nIC0gbWluX2xvZykpKTtcbiAgICAgIH1cbiAgICAgIGxpbWl0cy5wdXNoKG1heCk7XG4gICAgfSBlbHNlIGlmIChtb2RlLnN1YnN0cigwLCAxKSA9PT0gJ3EnKSB7XG4gICAgICBsaW1pdHMucHVzaChtaW4pO1xuICAgICAgZm9yIChpID0gYWEgPSAxLCByZWYyID0gbnVtIC0gMTsgMSA8PSByZWYyID8gYWEgPD0gcmVmMiA6IGFhID49IHJlZjI7IGkgPSAxIDw9IHJlZjIgPyArK2FhIDogLS1hYSkge1xuICAgICAgICBwID0gKHZhbHVlcy5sZW5ndGggLSAxKSAqIGkgLyBudW07XG4gICAgICAgIHBiID0gZmxvb3IocCk7XG4gICAgICAgIGlmIChwYiA9PT0gcCkge1xuICAgICAgICAgIGxpbWl0cy5wdXNoKHZhbHVlc1twYl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByID0gcCAtIHBiO1xuICAgICAgICAgIGxpbWl0cy5wdXNoKHZhbHVlc1twYl0gKiAoMSAtIHByKSArIHZhbHVlc1twYiArIDFdICogcHIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaW1pdHMucHVzaChtYXgpO1xuICAgIH0gZWxzZSBpZiAobW9kZS5zdWJzdHIoMCwgMSkgPT09ICdrJykge1xuXG4gICAgICAvKlxuICAgICAgaW1wbGVtZW50YXRpb24gYmFzZWQgb25cbiAgICAgIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9maWd1ZS9zb3VyY2UvYnJvd3NlL3RydW5rL2ZpZ3VlLmpzIzMzNlxuICAgICAgc2ltcGxpZmllZCBmb3IgMS1kIGlucHV0IHZhbHVlc1xuICAgICAgICovXG4gICAgICBuID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgIGFzc2lnbm1lbnRzID0gbmV3IEFycmF5KG4pO1xuICAgICAgY2x1c3RlclNpemVzID0gbmV3IEFycmF5KG51bSk7XG4gICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgbmJfaXRlcnMgPSAwO1xuICAgICAgY2VudHJvaWRzID0gbnVsbDtcbiAgICAgIGNlbnRyb2lkcyA9IFtdO1xuICAgICAgY2VudHJvaWRzLnB1c2gobWluKTtcbiAgICAgIGZvciAoaSA9IGFiID0gMSwgcmVmMyA9IG51bSAtIDE7IDEgPD0gcmVmMyA/IGFiIDw9IHJlZjMgOiBhYiA+PSByZWYzOyBpID0gMSA8PSByZWYzID8gKythYiA6IC0tYWIpIHtcbiAgICAgICAgY2VudHJvaWRzLnB1c2gobWluICsgKGkgLyBudW0pICogKG1heCAtIG1pbikpO1xuICAgICAgfVxuICAgICAgY2VudHJvaWRzLnB1c2gobWF4KTtcbiAgICAgIHdoaWxlIChyZXBlYXQpIHtcbiAgICAgICAgZm9yIChqID0gYWMgPSAwLCByZWY0ID0gbnVtIC0gMTsgMCA8PSByZWY0ID8gYWMgPD0gcmVmNCA6IGFjID49IHJlZjQ7IGogPSAwIDw9IHJlZjQgPyArK2FjIDogLS1hYykge1xuICAgICAgICAgIGNsdXN0ZXJTaXplc1tqXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gYWQgPSAwLCByZWY1ID0gbiAtIDE7IDAgPD0gcmVmNSA/IGFkIDw9IHJlZjUgOiBhZCA+PSByZWY1OyBpID0gMCA8PSByZWY1ID8gKythZCA6IC0tYWQpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgICBtaW5kaXN0ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICBmb3IgKGogPSBhZSA9IDAsIHJlZjYgPSBudW0gLSAxOyAwIDw9IHJlZjYgPyBhZSA8PSByZWY2IDogYWUgPj0gcmVmNjsgaiA9IDAgPD0gcmVmNiA/ICsrYWUgOiAtLWFlKSB7XG4gICAgICAgICAgICBkaXN0ID0gYWJzKGNlbnRyb2lkc1tqXSAtIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChkaXN0IDwgbWluZGlzdCkge1xuICAgICAgICAgICAgICBtaW5kaXN0ID0gZGlzdDtcbiAgICAgICAgICAgICAgYmVzdCA9IGo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNsdXN0ZXJTaXplc1tiZXN0XSsrO1xuICAgICAgICAgIGFzc2lnbm1lbnRzW2ldID0gYmVzdDtcbiAgICAgICAgfVxuICAgICAgICBuZXdDZW50cm9pZHMgPSBuZXcgQXJyYXkobnVtKTtcbiAgICAgICAgZm9yIChqID0gYWYgPSAwLCByZWY3ID0gbnVtIC0gMTsgMCA8PSByZWY3ID8gYWYgPD0gcmVmNyA6IGFmID49IHJlZjc7IGogPSAwIDw9IHJlZjcgPyArK2FmIDogLS1hZikge1xuICAgICAgICAgIG5ld0NlbnRyb2lkc1tqXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gYWcgPSAwLCByZWY4ID0gbiAtIDE7IDAgPD0gcmVmOCA/IGFnIDw9IHJlZjggOiBhZyA+PSByZWY4OyBpID0gMCA8PSByZWY4ID8gKythZyA6IC0tYWcpIHtcbiAgICAgICAgICBjbHVzdGVyID0gYXNzaWdubWVudHNbaV07XG4gICAgICAgICAgaWYgKG5ld0NlbnRyb2lkc1tjbHVzdGVyXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3Q2VudHJvaWRzW2NsdXN0ZXJdID0gdmFsdWVzW2ldO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdDZW50cm9pZHNbY2x1c3Rlcl0gKz0gdmFsdWVzW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGogPSBhaCA9IDAsIHJlZjkgPSBudW0gLSAxOyAwIDw9IHJlZjkgPyBhaCA8PSByZWY5IDogYWggPj0gcmVmOTsgaiA9IDAgPD0gcmVmOSA/ICsrYWggOiAtLWFoKSB7XG4gICAgICAgICAgbmV3Q2VudHJvaWRzW2pdICo9IDEgLyBjbHVzdGVyU2l6ZXNbal07XG4gICAgICAgIH1cbiAgICAgICAgcmVwZWF0ID0gZmFsc2U7XG4gICAgICAgIGZvciAoaiA9IGFpID0gMCwgcmVmMTAgPSBudW0gLSAxOyAwIDw9IHJlZjEwID8gYWkgPD0gcmVmMTAgOiBhaSA+PSByZWYxMDsgaiA9IDAgPD0gcmVmMTAgPyArK2FpIDogLS1haSkge1xuICAgICAgICAgIGlmIChuZXdDZW50cm9pZHNbal0gIT09IGNlbnRyb2lkc1tpXSkge1xuICAgICAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjZW50cm9pZHMgPSBuZXdDZW50cm9pZHM7XG4gICAgICAgIG5iX2l0ZXJzKys7XG4gICAgICAgIGlmIChuYl9pdGVycyA+IDIwMCkge1xuICAgICAgICAgIHJlcGVhdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBrQ2x1c3RlcnMgPSB7fTtcbiAgICAgIGZvciAoaiA9IGFqID0gMCwgcmVmMTEgPSBudW0gLSAxOyAwIDw9IHJlZjExID8gYWogPD0gcmVmMTEgOiBhaiA+PSByZWYxMTsgaiA9IDAgPD0gcmVmMTEgPyArK2FqIDogLS1haikge1xuICAgICAgICBrQ2x1c3RlcnNbal0gPSBbXTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IGFrID0gMCwgcmVmMTIgPSBuIC0gMTsgMCA8PSByZWYxMiA/IGFrIDw9IHJlZjEyIDogYWsgPj0gcmVmMTI7IGkgPSAwIDw9IHJlZjEyID8gKythayA6IC0tYWspIHtcbiAgICAgICAgY2x1c3RlciA9IGFzc2lnbm1lbnRzW2ldO1xuICAgICAgICBrQ2x1c3RlcnNbY2x1c3Rlcl0ucHVzaCh2YWx1ZXNbaV0pO1xuICAgICAgfVxuICAgICAgdG1wS01lYW5zQnJlYWtzID0gW107XG4gICAgICBmb3IgKGogPSBhbCA9IDAsIHJlZjEzID0gbnVtIC0gMTsgMCA8PSByZWYxMyA/IGFsIDw9IHJlZjEzIDogYWwgPj0gcmVmMTM7IGogPSAwIDw9IHJlZjEzID8gKythbCA6IC0tYWwpIHtcbiAgICAgICAgdG1wS01lYW5zQnJlYWtzLnB1c2goa0NsdXN0ZXJzW2pdWzBdKTtcbiAgICAgICAgdG1wS01lYW5zQnJlYWtzLnB1c2goa0NsdXN0ZXJzW2pdW2tDbHVzdGVyc1tqXS5sZW5ndGggLSAxXSk7XG4gICAgICB9XG4gICAgICB0bXBLTWVhbnNCcmVha3MgPSB0bXBLTWVhbnNCcmVha3Muc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgIH0pO1xuICAgICAgbGltaXRzLnB1c2godG1wS01lYW5zQnJlYWtzWzBdKTtcbiAgICAgIGZvciAoaSA9IGFtID0gMSwgcmVmMTQgPSB0bXBLTWVhbnNCcmVha3MubGVuZ3RoIC0gMTsgYW0gPD0gcmVmMTQ7IGkgPSBhbSArPSAyKSB7XG4gICAgICAgIHYgPSB0bXBLTWVhbnNCcmVha3NbaV07XG4gICAgICAgIGlmICghaXNOYU4odikgJiYgbGltaXRzLmluZGV4T2YodikgPT09IC0xKSB7XG4gICAgICAgICAgbGltaXRzLnB1c2godik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpbWl0cztcbiAgfTtcblxuICBoc2kycmdiID0gZnVuY3Rpb24oaCwgcywgaSkge1xuXG4gICAgLypcbiAgICBib3Jyb3dlZCBmcm9tIGhlcmU6XG4gICAgaHR0cDovL2h1bW1lci5zdGFuZm9yZC5lZHUvbXVzZWluZm8vZG9jL2V4YW1wbGVzL2h1bWRydW0va2V5c2NhcGUyL2hzaTJyZ2IuY3BwXG4gICAgICovXG4gICAgdmFyIGFyZ3MsIGIsIGcsIHI7XG4gICAgYXJncyA9IHVucGFjayhhcmd1bWVudHMpO1xuICAgIGggPSBhcmdzWzBdLCBzID0gYXJnc1sxXSwgaSA9IGFyZ3NbMl07XG4gICAgaWYgKGlzTmFOKGgpKSB7XG4gICAgICBoID0gMDtcbiAgICB9XG4gICAgaCAvPSAzNjA7XG4gICAgaWYgKGggPCAxIC8gMykge1xuICAgICAgYiA9ICgxIC0gcykgLyAzO1xuICAgICAgciA9ICgxICsgcyAqIGNvcyhUV09QSSAqIGgpIC8gY29zKFBJVEhJUkQgLSBUV09QSSAqIGgpKSAvIDM7XG4gICAgICBnID0gMSAtIChiICsgcik7XG4gICAgfSBlbHNlIGlmIChoIDwgMiAvIDMpIHtcbiAgICAgIGggLT0gMSAvIDM7XG4gICAgICByID0gKDEgLSBzKSAvIDM7XG4gICAgICBnID0gKDEgKyBzICogY29zKFRXT1BJICogaCkgLyBjb3MoUElUSElSRCAtIFRXT1BJICogaCkpIC8gMztcbiAgICAgIGIgPSAxIC0gKHIgKyBnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaCAtPSAyIC8gMztcbiAgICAgIGcgPSAoMSAtIHMpIC8gMztcbiAgICAgIGIgPSAoMSArIHMgKiBjb3MoVFdPUEkgKiBoKSAvIGNvcyhQSVRISVJEIC0gVFdPUEkgKiBoKSkgLyAzO1xuICAgICAgciA9IDEgLSAoZyArIGIpO1xuICAgIH1cbiAgICByID0gbGltaXQoaSAqIHIgKiAzKTtcbiAgICBnID0gbGltaXQoaSAqIGcgKiAzKTtcbiAgICBiID0gbGltaXQoaSAqIGIgKiAzKTtcbiAgICByZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTUsIGFyZ3MubGVuZ3RoID4gMyA/IGFyZ3NbM10gOiAxXTtcbiAgfTtcblxuICByZ2IyaHNpID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvKlxuICAgIGJvcnJvd2VkIGZyb20gaGVyZTpcbiAgICBodHRwOi8vaHVtbWVyLnN0YW5mb3JkLmVkdS9tdXNlaW5mby9kb2MvZXhhbXBsZXMvaHVtZHJ1bS9rZXlzY2FwZTIvcmdiMmhzaS5jcHBcbiAgICAgKi9cbiAgICB2YXIgYiwgZywgaCwgaSwgbWluLCByLCByZWYsIHM7XG4gICAgcmVmID0gdW5wYWNrKGFyZ3VtZW50cyksIHIgPSByZWZbMF0sIGcgPSByZWZbMV0sIGIgPSByZWZbMl07XG4gICAgVFdPUEkgPSBNYXRoLlBJICogMjtcbiAgICByIC89IDI1NTtcbiAgICBnIC89IDI1NTtcbiAgICBiIC89IDI1NTtcbiAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBpID0gKHIgKyBnICsgYikgLyAzO1xuICAgIHMgPSAxIC0gbWluIC8gaTtcbiAgICBpZiAocyA9PT0gMCkge1xuICAgICAgaCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGggPSAoKHIgLSBnKSArIChyIC0gYikpIC8gMjtcbiAgICAgIGggLz0gTWF0aC5zcXJ0KChyIC0gZykgKiAociAtIGcpICsgKHIgLSBiKSAqIChnIC0gYikpO1xuICAgICAgaCA9IE1hdGguYWNvcyhoKTtcbiAgICAgIGlmIChiID4gZykge1xuICAgICAgICBoID0gVFdPUEkgLSBoO1xuICAgICAgfVxuICAgICAgaCAvPSBUV09QSTtcbiAgICB9XG4gICAgcmV0dXJuIFtoICogMzYwLCBzLCBpXTtcbiAgfTtcblxuICBjaHJvbWEuaHNpID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbihmdW5jLCBhcmdzLCBjdG9yKSB7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9IGZ1bmMucHJvdG90eXBlO1xuICAgICAgdmFyIGNoaWxkID0gbmV3IGN0b3IsIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY2hpbGQsIGFyZ3MpO1xuICAgICAgcmV0dXJuIE9iamVjdChyZXN1bHQpID09PSByZXN1bHQgPyByZXN1bHQgOiBjaGlsZDtcbiAgICB9KShDb2xvciwgc2xpY2UuY2FsbChhcmd1bWVudHMpLmNvbmNhdChbJ2hzaSddKSwgZnVuY3Rpb24oKXt9KTtcbiAgfTtcblxuICBfaW5wdXQuaHNpID0gaHNpMnJnYjtcblxuICBDb2xvci5wcm90b3R5cGUuaHNpID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHJnYjJoc2kodGhpcy5fcmdiKTtcbiAgfTtcblxuICBpbnRlcnBvbGF0ZV9oc3ggPSBmdW5jdGlvbihjb2wxLCBjb2wyLCBmLCBtKSB7XG4gICAgdmFyIGRoLCBodWUsIGh1ZTAsIGh1ZTEsIGxidiwgbGJ2MCwgbGJ2MSwgcmVzLCBzYXQsIHNhdDAsIHNhdDEsIHh5ejAsIHh5ejE7XG4gICAgaWYgKG0gPT09ICdoc2wnKSB7XG4gICAgICB4eXowID0gY29sMS5oc2woKTtcbiAgICAgIHh5ejEgPSBjb2wyLmhzbCgpO1xuICAgIH0gZWxzZSBpZiAobSA9PT0gJ2hzdicpIHtcbiAgICAgIHh5ejAgPSBjb2wxLmhzdigpO1xuICAgICAgeHl6MSA9IGNvbDIuaHN2KCk7XG4gICAgfSBlbHNlIGlmIChtID09PSAnaGNnJykge1xuICAgICAgeHl6MCA9IGNvbDEuaGNnKCk7XG4gICAgICB4eXoxID0gY29sMi5oY2coKTtcbiAgICB9IGVsc2UgaWYgKG0gPT09ICdoc2knKSB7XG4gICAgICB4eXowID0gY29sMS5oc2koKTtcbiAgICAgIHh5ejEgPSBjb2wyLmhzaSgpO1xuICAgIH0gZWxzZSBpZiAobSA9PT0gJ2xjaCcgfHwgbSA9PT0gJ2hjbCcpIHtcbiAgICAgIG0gPSAnaGNsJztcbiAgICAgIHh5ejAgPSBjb2wxLmhjbCgpO1xuICAgICAgeHl6MSA9IGNvbDIuaGNsKCk7XG4gICAgfVxuICAgIGlmIChtLnN1YnN0cigwLCAxKSA9PT0gJ2gnKSB7XG4gICAgICBodWUwID0geHl6MFswXSwgc2F0MCA9IHh5ejBbMV0sIGxidjAgPSB4eXowWzJdO1xuICAgICAgaHVlMSA9IHh5ejFbMF0sIHNhdDEgPSB4eXoxWzFdLCBsYnYxID0geHl6MVsyXTtcbiAgICB9XG4gICAgaWYgKCFpc05hTihodWUwKSAmJiAhaXNOYU4oaHVlMSkpIHtcbiAgICAgIGlmIChodWUxID4gaHVlMCAmJiBodWUxIC0gaHVlMCA+IDE4MCkge1xuICAgICAgICBkaCA9IGh1ZTEgLSAoaHVlMCArIDM2MCk7XG4gICAgICB9IGVsc2UgaWYgKGh1ZTEgPCBodWUwICYmIGh1ZTAgLSBodWUxID4gMTgwKSB7XG4gICAgICAgIGRoID0gaHVlMSArIDM2MCAtIGh1ZTA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaCA9IGh1ZTEgLSBodWUwO1xuICAgICAgfVxuICAgICAgaHVlID0gaHVlMCArIGYgKiBkaDtcbiAgICB9IGVsc2UgaWYgKCFpc05hTihodWUwKSkge1xuICAgICAgaHVlID0gaHVlMDtcbiAgICAgIGlmICgobGJ2MSA9PT0gMSB8fCBsYnYxID09PSAwKSAmJiBtICE9PSAnaHN2Jykge1xuICAgICAgICBzYXQgPSBzYXQwO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGh1ZTEpKSB7XG4gICAgICBodWUgPSBodWUxO1xuICAgICAgaWYgKChsYnYwID09PSAxIHx8IGxidjAgPT09IDApICYmIG0gIT09ICdoc3YnKSB7XG4gICAgICAgIHNhdCA9IHNhdDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGh1ZSA9IE51bWJlci5OYU47XG4gICAgfVxuICAgIGlmIChzYXQgPT0gbnVsbCkge1xuICAgICAgc2F0ID0gc2F0MCArIGYgKiAoc2F0MSAtIHNhdDApO1xuICAgIH1cbiAgICBsYnYgPSBsYnYwICsgZiAqIChsYnYxIC0gbGJ2MCk7XG4gICAgcmV0dXJuIHJlcyA9IGNocm9tYVttXShodWUsIHNhdCwgbGJ2KTtcbiAgfTtcblxuICBfaW50ZXJwb2xhdG9ycyA9IF9pbnRlcnBvbGF0b3JzLmNvbmNhdCgoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbiwgbywgcmVmLCByZXN1bHRzO1xuICAgIHJlZiA9IFsnaHN2JywgJ2hzbCcsICdoc2knLCAnaGNsJywgJ2xjaCcsICdoY2cnXTtcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChvID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgbyA8IGxlbjsgbysrKSB7XG4gICAgICBtID0gcmVmW29dO1xuICAgICAgcmVzdWx0cy5wdXNoKFttLCBpbnRlcnBvbGF0ZV9oc3hdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0pKCkpO1xuXG4gIGludGVycG9sYXRlX251bSA9IGZ1bmN0aW9uKGNvbDEsIGNvbDIsIGYsIG0pIHtcbiAgICB2YXIgbjEsIG4yO1xuICAgIG4xID0gY29sMS5udW0oKTtcbiAgICBuMiA9IGNvbDIubnVtKCk7XG4gICAgcmV0dXJuIGNocm9tYS5udW0objEgKyAobjIgLSBuMSkgKiBmLCAnbnVtJyk7XG4gIH07XG5cbiAgX2ludGVycG9sYXRvcnMucHVzaChbJ251bScsIGludGVycG9sYXRlX251bV0pO1xuXG4gIGludGVycG9sYXRlX2xhYiA9IGZ1bmN0aW9uKGNvbDEsIGNvbDIsIGYsIG0pIHtcbiAgICB2YXIgcmVzLCB4eXowLCB4eXoxO1xuICAgIHh5ejAgPSBjb2wxLmxhYigpO1xuICAgIHh5ejEgPSBjb2wyLmxhYigpO1xuICAgIHJldHVybiByZXMgPSBuZXcgQ29sb3IoeHl6MFswXSArIGYgKiAoeHl6MVswXSAtIHh5ejBbMF0pLCB4eXowWzFdICsgZiAqICh4eXoxWzFdIC0geHl6MFsxXSksIHh5ejBbMl0gKyBmICogKHh5ejFbMl0gLSB4eXowWzJdKSwgbSk7XG4gIH07XG5cbiAgX2ludGVycG9sYXRvcnMucHVzaChbJ2xhYicsIGludGVycG9sYXRlX2xhYl0pO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFJQUE7QURBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBRG5wRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QURsaUJBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7Ozs7QURUbEIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsT0FBQSxDQUFRLFdBQVI7O0FBQ2pCLE9BQU8sQ0FBQyxJQUFSLEdBQWUsT0FBQSxDQUFRLFdBQVIifQ==
