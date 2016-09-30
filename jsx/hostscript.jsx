/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function addGrid (obj) {
  // scrollWin (showObjDeep (obj));
  if (!documents.length) {
    alert ('Needs document and selected rectangle');
    return;
  }
  if (!selection.length) {
    alert ('Select rectangle and try again');
    return;
  }

  var rect = selection[0].geometricBounds, // left, top, right, bottom
      i,
      lay  = selection[0].layer,
      pth,
      x, y;

  if (obj.left.length) {
    x = rect [0];
    for (i = 0; i < obj.left.length; i++) {
      x += +obj.left[i];
      _addLine ([[x, rect[1]], [x, rect[3]]]);
    }
  }
  if (obj.top.length) {
    y = rect[1];
    for (i = 0; i < obj.top.length; i++) {
      y -= obj.top[i];
      _addLine ([[rect[0], y], [rect[2], y]]);
    }
  }
  if (obj.right.length) {
    x = rect [2];
    for (i = 0; i < obj.right.length; i++) {
      x -= obj.right[i];
      _addLine ([[x, rect[1]], [x, rect[3]]]);
    }
  }
  if (obj.bott.length) {
    y = rect[3];
    for (i = 0; i < obj.bott.length; i++) {
      y += +obj.bott[i];
      _addLine ([[rect[0], y], [rect[2], y]]);
    }
  }
  if (obj.v_cent[0].length) {
    // alert (obj.v_cent[0]);
  }
  if (obj.v_cent[1].length) {
    // alert (obj.v_cent[1]);
  }
  if (obj.h_cent[0].length) {
    // alert (obj.h_cent[0]);
  }
  if (obj.h_cent[1].length) {
    // alert (obj.h_cent[1]);
  }

  function _addLine (pnts) {
    pth = lay.pathItems.add ();
    pth.setEntirePath (pnts);
  }

  return 8;
}
/**
 * TEST SECTION
 * */
function scrollWin (input) {
  if (input instanceof Array)     input = input.join ("\r");

  var w    = new Window ("dialog", 'Scrollable alert'),
      list = w.add ("edittext", undefined, input, {multiline: true, scrolling: true});

  list.maximumSize.height = w.maximumSize.height - 100;
  list.minimumSize.width  = 600;

  w.add ("button", undefined, "Close", {name: "ok"});
  w.show ();
}
function showObjDeep (obj) {
  var str    = '{\n';
  var indent = 1;

  showObj (obj);

  function showObj (obj) {

    for (var key in obj) {
      if (typeof obj[key] == 'object' /*&& !obj[key].splice*/) {
        str += addIndent (indent) + key + ':\n';
        ++indent;
        showObj (obj[key]);
      } else {
        str += addIndent (indent) + key + ': ' + obj[key] + ' [' + typeof obj[key] + '],\n';
      }
    }
    indent--;
  }

  return str + '}';
  function addIndent (i) {
    return new Array (i).join ('_');
  }
}

