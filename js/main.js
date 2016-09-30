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

    $ ("#btn_ok").click (function () {
      /*      var obj   = {};
       obj.left  = getInput ('left');
       obj.right = getInput ('right');
       obj.vCent = getInput ('v_cent');
       obj.top   = getInput ('top');
       obj.bott  = getInput ('bott');
       obj.hCent = getInput ('h_cent');
       csInterface.evalScript ('addGrid(' + JSON.stringify (obj) + ')', function (res) {
       // alert (res);
       });*/
      csInterface.evalScript ('addGrid(' + JSON.stringify (getInputs ()) + ')', function (res) {
        // alert (res);
      })
    })

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
  function getInput (setID) {
    var arr     = [],
        leftVal = document.getElementById (setID);

    for (var i = 0; i < leftVal.getElementsByTagName ('input').length; i++) {
      var val = leftVal.getElementsByTagName ('input')[i].value;

      if (val && isNum (val)) {
        arr.push (val);
      } else {
        break;
      }
    }
    return arr;
  }

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
      val = left[i].value;
      if (!val) continue;
      o.left.push (val);
    }
    for (i = 0; i < top.length; i++) {
      val = top[i].value;
      if (!val) continue;
      o.top.push (val);
    }
    for (i = right.length - 1; i >= 0; i--) {
      val = right[i].value;
      if (!val) continue;
      o.right.push (val);
    }
    for (i = bott.length - 1; i >= 0; i--) {
      val = bott[i].value;
      if (!val) continue;
      o.bott.push (val);
    }
    {
      for (i = v_cent.length / 2 - 1; i >= 0; i--) {
        val = v_cent[i].value;
        if (!val) continue;
        o.v_cent[0].push (val);
      }
      for (i = v_cent.length / 2; i < v_cent.length; i++) {
        val = v_cent[i].value;
        if (!val) continue;
        o.v_cent[1].push (val);
      }
    }
    {
      for (i = h_cent.length / 2 - 1; i >= 0; i--) {
        val = h_cent[i].value;
        if (!val) continue;
        o.h_cent[0].push (val);
      }
      for (i = h_cent.length / 2; i < h_cent.length; i++) {
        val = h_cent[i].value;
        if (!val) continue;
        o.h_cent[1].push (val);
      }
    }
    return o;
  }

  function isNum (n) {
    return !isNaN (parseFloat (n)) && isFinite (n);
  }

} ());
