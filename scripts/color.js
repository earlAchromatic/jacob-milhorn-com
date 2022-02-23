export default function getColorWheel() {
  return {
    currentColor: [],
    colorString: '--color-',
    colors: [
      {
        multiorange: [
          '#54478cff',
          '#2c699aff',
          '#048ba8ff',
          '#0db39eff',
          '#16db93ff',
          '#83e377ff',
          '#b9e769ff',
          '#efea5aff',
          '#f1c453ff',
          '#f29e4cff',
        ],
      },
      {
        greens: [
          '#007f5fff',
          '#2b9348ff',
          '#55a630ff',
          '#80b918ff',
          '#aacc00ff',
          '#bfd200ff',
          '#d4d700ff',
          '#dddf00ff',
          '#eeef20ff',
          '#ffff3fff',
        ],
      },
      {
        yellows: [
          '#ff7b00ff',
          '#ff8800ff',
          '#ff9500ff',
          '#ffa200ff',
          '#ffaa00ff',
          '#ffb700ff',
          '#ffc300ff',
          '#ffd000ff',
          '#ffdd00ff',
          '#ffea00ff',
        ],
      },
      {
        darks: [
          '#006466ff',
          '#065a60ff',
          '#0b525bff',
          '#144552ff',
          '#1b3a4bff',
          '#212f45ff',
          '#272640ff',
          '#312244ff',
          '#3e1f47ff',
          '#4d194dff',
        ],
      },
      {
        purples: [
          '#7400b8ff',
          '#6930c3ff',
          '#5e60ceff',
          '#5390d9ff',
          '#4ea8deff',
          '#48bfe3ff',
          '#56cfe1ff',
          '#64dfdfff',
          '#72efddff',
          '#80ffdbff',
        ],
      },
    ],
    makeStyleArray: function (colorArray, code) {
      return colorArray.map((e, i) => {
        return code + i + ': ' + e;
      });
    },
    addProperties: function (styleArray) {
      let root = document.documentElement;
      styleArray.forEach((e) => {
        root.style.setProperty(e.split(':')[0], e.split(':')[1]);
      });
    },
    invertStyleArray: function (colorArray, code) {
      let tmp = [...colorArray].reverse();
      return colorArray.map((e, i) => {
        return code + i + ': ' + tmp[i].split(':')[1];
      });
    },
  };
}
