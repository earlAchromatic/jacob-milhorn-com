export function addProperties(styleArray) {
  let root = document.documentElement;
  styleArray.forEach((e) => {
    root.style.setProperty(e.split(':')[0], e.split(':')[1]);
  });
}
