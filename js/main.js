/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
  'use strict';

  var csInterface = new CSInterface ();

  function loadJSX (fileName) {
    var extensionRoot = csInterface.getSystemPath (SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript ('$.evalFile("' + extensionRoot + fileName + '")');
  }

  function init () {

    themeManager.init ();
    loadJSX ("json2.js");

    $ ("#btn_ok").click (function () {/**/
      csInterface.evalScript ('addGrid(' + JSON.stringify (getInputs ()) + ')', function (res) {
      })
    })
    var inputElems = document.getElementsByTagName ('input');

    for (var i = 0; i < inputElems.length; i++) {
      var obj        = inputElems[i];
      obj.onkeypress = function (e) {
        // keypress keyCode=44 which=44 charCode=44 char=,
        // keypress keyCode=46 which=46 charCode=46 char=.
        if (e.keyCode == 44) {
          if (this.value.match (/\./)) return false;
          this.value += '.';
          return false;
        }
      }
    }



    $ ("#img_github").click (function () {
      window.cep.util.openURLInDefaultBrowser ("https://github.com/dumbm1/ai_grid");
    });
    $ ("#btn_clear").click (reloadPanel);
    $ ("#btn_close").click (function () {
      csInterface.closeExtension ();
    });

  }

  init ();

  function reloadPanel () {
    location.reload ();
  }

  /**
   * LIB
   * */
  /**
   * get the values of the input fields for one of the six sets (left, right etc.)
   *
   * @param {String) setID - container ID that contains the input fields,
   * @return {Array} inputValues - values of input fields (string-numbers)
   * */
  function getInputs () {
    var o      = {
          left: [], right: [], v_cent: [[], []], top: [], bott: [], h_cent: [[], []]
        },
        i, j, val;
    var left   = document.getElementById ('left').getElementsByTagName ('input'),
        right  = document.getElementById ('right').getElementsByTagName ('input'),
        v_cent = document.getElementById ('v_cent').getElementsByTagName ('input'),
        top    = document.getElementById ('top').getElementsByTagName ('input'),
        bott   = document.getElementById ('bott').getElementsByTagName ('input'),
        h_cent = document.getElementById ('h_cent').getElementsByTagName ('input');

    for (i = 0; i < left.length; i++) {
      pushVal (left[i].value, o.left);
    }
    for (i = 0; i < top.length; i++) {
      pushVal (top[i].value, o.top);
    }
    for (i = right.length - 1; i >= 0; i--) {
      pushVal (right[i].value, o.right);
    }
    for (i = bott.length - 1; i >= 0; i--) {
      pushVal (bott[i].value, o.bott);
    }
    {
      for (i = v_cent.length / 2 - 1; i >= 0; i--) {
        pushVal (v_cent[i].value, o.v_cent[0]);
      }
      for (i = v_cent.length / 2; i < v_cent.length; i++) {
        pushVal (v_cent[i].value, o.v_cent[1]);
      }
    }
    {
      for (i = h_cent.length / 2 - 1; i >= 0; i--) {
        pushVal (h_cent[i].value, o.h_cent[0]);
      }
      for (i = h_cent.length / 2; i < h_cent.length; i++) {
        pushVal (h_cent[i].value, o.h_cent[1]);
      }
    }
    return o;
  }

  function isNum (n) {
    return !isNaN (parseFloat (n)) && isFinite (n);
  }

  /**
   * immediate change val and arr
   * */
  function pushVal (val, arr) {
    if (!val) return;
    val = val.replace (/,/gmi, '.');
    if (!isNum (val)) return;
    arr.push (val);
  }

} ());
