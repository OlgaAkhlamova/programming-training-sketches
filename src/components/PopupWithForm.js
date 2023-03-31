import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector, callbackFormSubmit }, obj) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._obj = obj;
    this._form = this._popup.querySelector(this._obj.formSelector);
    this._inputList = this._form.querySelectorAll(this._obj.inputSelector);
    this.submitBtn = this._form.querySelector(this._obj.submitButtonSelector);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close = () => {
    super.close();
    this._form.reset();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("На меня нажали!");
      this._callbackFormSubmit(this._getInputValues());
    });
  }
  
}

export { PopupWithForm };
