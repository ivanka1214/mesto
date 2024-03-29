export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    // this._initialCard = items;
    this._renderer = renderer;
  }

  addCartArray(dataCard) {
    dataCard.forEach(element => {
      this._renderer(element);
    })
  }
  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}
