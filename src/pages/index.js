import "./index.css";
import {
  popupNewPlaceOpen,
  formNewPlace,
} from "../utils/constants.js";
import { initialCards } from "../utils/cards";
import { obj } from "../utils/formobject.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupConfirmAction } from "../components/PopupConfirmAction";
import { FormValidator } from "../components/FormValidator.js";

const popupShowZoom = new PopupWithImage(".popup_show-zoom");
popupShowZoom.setEventListeners();

// Попап подтверждения действия 
const popupDeleteCard = new PopupConfirmAction({
  handleConfirmAction: (card) => {
    console.log(card);
    deleteThisCard(card); 
  }
}, ".popup_delete-card");
popupDeleteCard.setEventListeners();

// Создание карточки проекта
function renderCard(item) {
  const card = new Card(
    {
      data: item,
     handleCardClick: (name, link) => {
        popupShowZoom.open(name, link);
      },
      handleLikeClick: () => {
        if (card.isLiked()) {
          card.dislike()
        } else {
          card.like()
        }
      }
    },
    ".cards-template"
  );
  return card.generateCard();
}
const sectionCards = new Section({
  items: initialCards, 
  renderer: (item) => {
    const cardElement = renderCard(item);
    console.log(item);
    sectionCards.addItemAppend(cardElement);
  }}, 
  '.cards'
);

sectionCards.renderItems(); 
// Добавление нового проекта
const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_new-place",
  callbackFormSubmit: (data) => {
    const newCard = renderCard(data);
    console.log(newCard);
    sectionCards.addItemPrepend(newCard);
    popupNewPlace.close();
  }
}, obj)

popupNewPlace.setEventListeners();

popupNewPlaceOpen.addEventListener("click", () => {
  newPlaceValid.clearError();
  popupNewPlace.open();
});

const newPlaceValid = new FormValidator(obj, formNewPlace);
newPlaceValid.enableValidation();
