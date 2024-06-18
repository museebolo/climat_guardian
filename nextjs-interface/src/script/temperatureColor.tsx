export function getColor(value: number): string {
  let newColor: string = "";

  if (value >= 27) {
    newColor = "#aa0103";
  } else if (value >= 25) {
    newColor = "#e07300";
  } else if (value >= 22) {
    newColor = "#94cf4c";
  } else if (value < 20) {
    newColor = "#005edf";
  } else if (value <= 21) {
    newColor = "#00ade3";
  }

  return newColor;
}

export function getHumidity(value: number): string {
  let newColor: string = "";

  if (value >= 75) {
    newColor = "#003a97";
  } else if (value >= 50) {
    newColor = "#0E60E2";
  } else if (value >= 30) {
    newColor = "#4A7DCD";
  } else if (value < 30) {
    newColor = "#57C9F0";
  }

  return newColor;
}
