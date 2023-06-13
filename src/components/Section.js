export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCard = items;
    this._renderer = renderer;
  }

  addCartArray() {
    this._initialCard.forEach(item => {
      this._renderer(item);
    })
  }
  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}
