import { Popup } from './Popup.js';

class PopupConfirmAction extends Popup {
  constructor({handleConfirmAction}, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this.actionButton = this._popup.querySelector('.popup__save_delete-card');
    this._handleConfirmAction = handleConfirmAction;
    this._cardInfo = {};
  }

  open(card) {
    super.open();
    console.log(card);
    this._cardInfo = card;  
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmAction(this._cardInfo);
    });
  }
}
export {PopupConfirmAction};