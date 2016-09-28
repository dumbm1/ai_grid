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
      var obj   = {};
      obj.left  = getInput ('left');
      obj.right = getInput ('right');
      obj.vCent = getInput ('v_cent');
      obj.top   = getInput ('top');
      obj.bott  = getInput ('bott');
      obj.hCent = getInput ('h_cent');
      csInterface.evalScript ('addGrid(' + JSON.stringify (obj) + ')', function (res) {
        // alert (res);
      })
    })

    $ ("#img_github").click (function () {
      window.cep.util.openURLInDefaultBrowser ("https://github.com/dumbm1/ai_grid");
    });
    $ ("#btn_clear").click (reloadPanel);
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

  function isNum (n) {
    return !isNaN (parseFloat (n)) && isFinite (n);
  }

} ());
