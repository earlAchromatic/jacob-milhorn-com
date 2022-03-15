const COLOR_STRING = '--color-';

export function addProperties(colors, invert) {
  let root = document.documentElement;
  let colorArray = [];
  if (!invert) {
    colorArray = makeStyleArray(colors.scheme);
  } else {
    colorArray = makeStyleArray([...colors.scheme].reverse());
  }
  colorArray.forEach((e) => {
    root.style.setProperty(e.split(':')[0], e.split(':')[1]);
  });
  setFontColors(invert, colors);
}

export const makeStyleArray = (colorArray) => {
  return colorArray.map((e, i) => {
    return COLOR_STRING + i + ': ' + e;
  });
};

export const setFontColor = (colors) => {
  document.documentElement.style.setProperty('--font-color', colors.textColor);
};

export const setFontColors = (bool, color) => {
  if (bool) {
    document.documentElement.style.setProperty(
      '--font-color',
      color.invertColor
    );
  } else {
    document.documentElement.style.setProperty('--font-color', color.textColor);
  }
};
export const colors = [
  {
    name: 'ghost',
    inverted: false,
    disableInvert: true,
    scheme: [
      '#000000ff',
      '#00000000',
      '#00000000',
      '#00000000',
      '#00000000',
      '#00000000',
      '#ffffffff',
      '#e4e4e4b3',
      '#00000000',
      '#a4a4a4e0',
    ],
    textColor: 'black',
    invertColor: '#6d6d6d',
  },
  {
    name: 'white',
    inverted: false,
    disableInvert: true,
    scheme: [
      '#ffffffff',
      '#ffffffff',
      '#ffffffff',
      '#ffffffff',
      '#ffffffff',
      '#ffffffff',
      '#c9c9c9',
      '#ffffffff',
      '#ffffffff',
      '#ffffffff',
    ],
    textColor: 'black',
    invertColor: 'black',
  },
  {
    name: 'choice',
    inverted: false,
    scheme: [
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
    textColor: 'black',
    invertColor: 'white',
  },

  {
    name: 'greens',
    inverted: false,
    scheme: [
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
    textColor: 'black',
    invertColor: 'black',
  },
  {
    name: 'yellows',
    inverted: false,
    scheme: [
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
    textColor: 'black',
    invertColor: 'black',
  },
  {
    name: 'darks',
    inverted: false,
    scheme: [
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
    textColor: 'white',
    invertColor: 'white',
  },
  {
    name: 'purples',
    inverted: false,
    scheme: [
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
    textColor: 'black',
    invertColor: 'white',
  },
  {
    name: 'blues',
    inverted: false,
    scheme: [
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
    ],
    textColor: 'black',
    invertColor: 'black',
  },
  {
    name: 'sand',
    inverted: false,
    scheme: [
      '#CCD5AE',
      '#DBE1BC',
      '#E9EDC9',
      '#F4F4D5',
      '#FEFAE0',
      '#FCF4D7',
      '#FAEDCD',
      '#E7C8A0',
      '#DEB68A',
      '#D4A373',
    ],
    textColor: 'black',
    invertColor: 'black',
  },
];
