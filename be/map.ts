const dataObj: Record<string, string> = {};

export function updateMap(id: string, data: string) {
  dataObj[id] = data;
}

export function removeElement(id: string) {
  delete dataObj[id];
}

export function getMap() {
  return dataObj;
}
