class Card {
  constructor({ data, handleCardClick, handleLikeClick}, cardSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
  }

  //клонирование заготовки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  // _handleLikeClick = () => {   //лайк
  //   this._likeButton.classList.toggle('card__like_active');
  // }

  isLiked() {
    return this._likeButton.classList.contains("card__like_active");
  }

  like() {
    this._likeButton.classList.add("card__like_active");
    // this._likeCounter.textContent = this._data.likes.length;
    this._likeCounter.textContent = "1";
  }
  dislike() {
    this._likeButton.classList.remove("card__like_active");
    // this._likeCounter.textContent = this._data.likes.length;
    this._likeCounter.textContent = "0";
  }
  
  _handleTrashClick = () => { //корзина
    this._element.remove();
    this._element = null;
  }
  //общий слушатель активности
  _setEventListeners() {
      this._cardImage.addEventListener('click', 
      () => {this._handleCardClick({name: this._name, link: this._link})});
      this._likeButton.addEventListener('click', this._handleLikeClick);
      this._trashButton.addEventListener('click', this._handleTrashClick);
  }
  generateCard() { //создание карточки
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.card__image');
      this._likeButton = this._element.querySelector('.card__like');
      this._trashButton = this._element.querySelector('.card__trash');
      this._likeCounter = this._element.querySelector('.card__like-counter');
      this._setEventListeners();
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._element.querySelector('.card__title').textContent = this._name;       
      return this._element;
  }
} 
export {Card}
