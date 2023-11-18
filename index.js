const cardObjectDefinitions = [
  {
    id: 1,
    imagePath: "/images/card-KingHearts.png",
  },
  {
    id: 2,
    imagePath: "/images/card-JackClubs.png",
  },
  {
    id: 3,
    imagePath: "/images/card-QueenDiamonds.png",
  },
  {
    id: 4,
    imagePath: "/images/card-AceSpades.png",
  },
];

// global variable to store references to card elements
let cards = [];
let cardPositions = [];

// start game button element global const
const playGameButtonElement = document.getElementById("playGame");

// initialize new game method, with stacked cards on the first cell
const colappsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";
const numCards = cardObjectDefinitions.length;

/* {--Create cards block--} */

const cardBackImgPath = "/images/card-back-Blue.png";

// global const of card container element useful to change the grid positions
const cardContainerElement = document.querySelector(".card-container");

const initializeCardPositions = (card) => {
  cardPositions.push(card.id);
};

// createElement method
const createElement = (elementType) => {
  return document.createElement(elementType);
};

// addClass method
const addClassToElement = (element, className) => {
  element.classList.add(className);
};

// addId method
const addIdToElement = (element, id) => {
  element.id = id;
};

// addSrc method
const addSrcToElement = (element, src) => {
  element.src = src;
};

// addChildElement method
const addChildElement = (parentElement, childElement) => {
  parentElement.appendChild(childElement);
};

// map cardId to grid cell method
const mapCardIdToGridCell = (card) => {
  switch (card.id) {
    case "1":
      return ".card-pos-a";
    case "2":
      return ".card-pos-b";
    case "3":
      return ".card-pos-c";
    case "4":
      return ".card-pos-d";
  }
};

// addCard to grid cell method, then
const addCardToGridCell = (cardElement) => {
  const cardPositionClassName = mapCardIdToGridCell(cardElement);

  const cardPositionElement = document.querySelector(cardPositionClassName);

  addChildElement(cardPositionElement, cardElement);
};

const createCard = (cardItemn) => {
  // create div element that make up a card
  const cardElement = createElement("div");
  const cardInnterElement = createElement("div");
  const cardFrontElement = createElement("div");
  const cardBackElement = createElement("div");

  // create front and back image elements for a card
  const cardFrontImg = createElement("img");
  const cardBackImg = createElement("img");

  // add class and id to card element
  addClassToElement(cardElement, "card");
  addIdToElement(cardElement, cardItemn.id);

  // add class to inner card element
  addClassToElement(cardInnterElement, "card-inner");

  // add class to front and back card elements
  addClassToElement(cardFrontElement, "card-front");
  addClassToElement(cardBackElement, "card-back");

  // add src attribute and appropriate value to img elment - back of card and front of card
  addSrcToElement(cardBackImg, cardBackImgPath);
  addSrcToElement(cardFrontImg, cardItemn.imagePath);

  // assign class to back image element of back of card and front of card
  addClassToElement(cardBackImg, "card-img");
  addClassToElement(cardFrontImg, "card-img");

  // add img elements to their respective parent elements
  addChildElement(cardFrontElement, cardFrontImg);
  addChildElement(cardBackElement, cardBackImg);

  // add front card element and back card element to inner card element
  addChildElement(cardInnterElement, cardFrontElement);
  addChildElement(cardInnterElement, cardBackElement);

  // add inner card element to card element
  addChildElement(cardElement, cardInnterElement);

  // add card element as child element to appropriate grid cell
  addCardToGridCell(cardElement);

  // each initialial position of the card is stored in the cardPositions array
  initializeCardPositions(cardElement);
};

const createCards = () => {
  cardObjectDefinitions.forEach((cardItem) => createCard(cardItem));
};

//method to randomize card positions
const randomizeCardPositions = () => {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;
  const temp = cardPositions[random1 - 1];
  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;

  console.log(cardPositions);
};

const addCardsToAppropriateGridCell = () => {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
};

const returnGridAreasMappedToCardPositions = () => {
  let firstPart = "",
    secondPart = "";
  areas = "";

  cards.forEach((_, index) => {
    switch (cardPositions[index]) {
      case "1":
        areas = areas + "a ";
        break;
      case "2":
        areas = areas + "b ";
        break;
      case "3":
        areas = areas + "c ";
        break;
      case "4":
        areas = areas + "d ";
        break;
    }
    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = "";
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }
  });
  return `"${firstPart}" "${secondPart}"`;
};

// transform grid area method to collapse the cards in a single cell
const transformGridArea = (areas) => {
  cardContainerElement.style.gridTemplateAreas = areas;
};

const dealCards = () => {
  // restore the grid to contain 4 grid cells and add the card back to its position in the grid
  addCardsToAppropriateGridCell();
  // return grid template area value that contains the grid area based on the randomization provided in the cardsPositions array
  const areasTemplate = returnGridAreasMappedToCardPositions();
  // transform the grid area to the template value
  transformGridArea(areasTemplate);
};

// methods to shuffle the cards
const shuffleCards = () => {
  let shuffleCount = 0;

  const shuffle = () => {
    randomizeCardPositions();
    if (shuffleCount == 500) {
      clearInterval(id);
      dealCards();
    } else {
      shuffleCount++;
    }
  };
  // every 12 miliseconds the shuffle method will be called
  const id = setInterval(shuffle, 12);
};

/* {--Game preparation block--} */

const loadGame = () => {
  createCards();

  cards = document.querySelectorAll(".card");

  playGameButtonElement.addEventListener("click", () => startGame());
};

// method to add cards to the grid area cell, because the grid consiste in only one cell
const addCardsToGridAreaCell = (cellPositionCell) => {
  const cellPositionElement = document.querySelector(cellPositionCell);
  cards.forEach((card) => addChildElement(cellPositionElement, card));
};

const collectCards = () => {
  transformGridArea(colappsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
};

// method to flip cards. If the card is on its front and the flip to back argument is true, code will flip the card so its back
// is facing the user
const flipCard = (card, flipToBack) => {
  const innerCardElement = card.firstChild;
  if (flipToBack && !innerCardElement.classList.contains("filp-it")) {
    innerCardElement.classList.add("flip-it");
  } else if (innerCardElement.classList.contains("flip-it")) {
    // if the card is already bak facing we don't want to flip it so we remove the flip-it class
    innerCardElement.classList.remove("flip-it");
  }
};
const flipCards = (flipToBack) => {
  // traverse all cards and flip them
  cards.forEach((card, index) => {
    // set timeout method to flip the cards one at a time
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
};

/* { -- Game control block -- } */

const startGame = () => {
  // definition for a method that initializes a new game
  initializeNewGame();
  startRound();
};

const initializeNewGame = () => {};

const startRound = () => {
  initializeNewRound();
  collectCards();
  //we want our cards to begin with their back facing the user
  //flipCards(true);
  shuffleCards();
};

const initializeNewRound = () => {};

loadGame();
