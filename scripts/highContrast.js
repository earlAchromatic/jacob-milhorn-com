function getBackgroundRGB(elArr) {
  return Array.from(elArr).map((e) => {
    handleGradient(e);
    return colorValues(getComputedStyle(e).backgroundColor);
  });
}

function handleGradient(el) {
  let bg = getComputedStyle(el).background;
  if (bg.includes('linear-gradient')) {
    let rgb = bg.match(/rgb[a]/);
  }
  console.log(bg);
}

//courtesy of https://stackoverflow.com/questions/34980574/how-to-extract-color-values-from-rgb-string-in-javascript/34980846
// return array of [r,g,b,a] from any valid color. if failed returns undefined
function colorValues(color) {
  if (color === '') return;
  if (color.toLowerCase() === 'transparent') return [0, 0, 0, 0];
  if (color[0] === '#') {
    if (color.length < 7) {
      // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
      color =
        '#' +
        color[1] +
        color[1] +
        color[2] +
        color[2] +
        color[3] +
        color[3] +
        (color.length > 4 ? color[4] + color[4] : '');
    }
    return [
      parseInt(color.substr(1, 2), 16),
      parseInt(color.substr(3, 2), 16),
      parseInt(color.substr(5, 2), 16),
      color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1,
    ];
  }
  if (color.indexOf('rgb') === -1) {
    // convert named colors
    var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
    var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
    temp_elem.style.color = flag;
    if (temp_elem.style.color !== flag) return; // color set failed - some monstrous css rule is probably taking over the color of our object
    temp_elem.style.color = color;
    if (temp_elem.style.color === flag || temp_elem.style.color === '') return; // color parse failed
    color = getComputedStyle(temp_elem).color;
    document.body.removeChild(temp_elem);
  }
  if (color.indexOf('rgb') === 0) {
    if (color.indexOf('rgba') === -1) color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
    return color.match(/[\.\d]+/g).map(function (a) {
      return +a;
    });
  }
}

//courtesy of https://css-tricks.com/css-variables-calc-rgb-enforcing-high-contrast-colors/
function setForegroundColor(rgbArray) {
  var sum = Math.round(
    (parseInt(rgbArray[0]) * 299 +
      parseInt(rgbArray[1]) * 587 +
      parseInt(rgbArray[2]) * 114) /
      1000
  );
  return sum > 128 ? 'black' : 'white';
}

function updateContrastEls(els) {
  let backgroundArray = getBackgroundRGB(els);
  els.forEach((e, i) => {
    let changeEls = e.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, li, a, span, strong'
    );
    changeEls.forEach((h) => {
      h.style.color = setForegroundColor(backgroundArray[i]);
    });
  });
}

export default function triggerContrast(els) {
  setTimeout(() => updateContrastEls(els), 200);
}
