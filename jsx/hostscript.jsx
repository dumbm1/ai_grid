/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
var PT_TO_MM = 2.834645668;

function addGrid (obj) {
  // scrollWin (showObjDeep (obj));
  if (!documents.length) {
    alert ('Need:\n1.\tDocument\n2.\tSelected rectangle.');
    return;
  }
  if (!selection.length) {
    alert ('Need the selected rectangle.');
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
      x += +obj.left[i] * PT_TO_MM;
      _addLine ([[x, rect[1]], [x, rect[3]]]);
    }
  }
  if (obj.top.length) {
    y = rect[1];
    for (i = 0; i < obj.top.length; i++) {
      y -= obj.top[i] * PT_TO_MM;
      _addLine ([[rect[0], y], [rect[2], y]]);
    }
  }
  if (obj.right.length) {
    x = rect [2];
    for (i = 0; i < obj.right.length; i++) {
      x -= obj.right[i] * PT_TO_MM;
      _addLine ([[x, rect[1]], [x, rect[3]]]);
    }
  }
  if (obj.bott.length) {
    y = rect[3];
    for (i = 0; i < obj.bott.length; i++) {
      y += +obj.bott[i] * PT_TO_MM;
      _addLine ([[rect[0], y], [rect[2], y]]);
    }
  }
  if (obj.v_cent[0].length) {
    x = rect[0] + (rect[2] - rect[0]) / 2;
    for (i = 0; i < obj.v_cent[0].length; i++) {
      x -= obj.v_cent[0][i] * PT_TO_MM;
      _addLine ([[x, rect[1]], [x, rect[3]]]);
    }
  }
  if (obj.v_cent[1].length) {
    x = rect[0] + (rect[2] - rect[0]) / 2;
    for (i = 0; i < obj.v_cent[1].length; i++) {
      x += +obj.v_cent[1][i] * PT_TO_MM;
      _addLine ([[x, rect[1]], [x, rect[3]]]);
    }
  }
  if (obj.h_cent[0].length) {
    y = rect[1] + (rect[3] - rect[1]) / 2;
    for (i = 0; i < obj.h_cent[0].length; i++) {
      y += +obj.h_cent[0][i] * PT_TO_MM;
      _addLine ([[rect[0], y], [rect[2], y]]);
    }
  }
  if (obj.h_cent[1].length) {
    y = rect[1] + (rect[3] - rect[1]) / 2;
    for (i = 0; i < obj.h_cent[1].length; i++) {
      y -= obj.h_cent[1][i] * PT_TO_MM;
      _addLine ([[rect[0], y], [rect[2], y]]);
    }
  }

  function _addLine (pnts) {

    pth = lay.pathItems.add ();
    pth.setEntirePath (pnts);

    var pthCol       = new CMYKColor ();
    pthCol.black     = 88.88;
    pth.filled       = false;
    pth.stroked      = true;
    pth.strokeWidth  = 0.15 * PT_TO_MM;
    pth.strokeDashes = [0.8 * PT_TO_MM];
    pth.strokeJoin   = StrokeJoin.BEVELENDJOIN;
    pth.strokeColor  = pthCol;
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

