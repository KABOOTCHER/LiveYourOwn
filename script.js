function showNotification(message) {
  var notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;

  var existingNotifications = document.querySelectorAll('.notification');
  var topPosition = 10 + existingNotifications.length * 100;
  notification.style.top = topPosition + 'px';

  document.body.appendChild(notification);

  setTimeout(function () {
    notification.style.opacity = '0';

    setTimeout(function () {
      document.body.removeChild(notification);
    }, 1000);
  }, 2000);
}

var allPages = document.querySelector('.itemPages');

document.addEventListener('DOMContentLoaded', function () {
  // Блок первого кода
  document.querySelectorAll('.itemImg').forEach(function (item) {
    item.addEventListener('click', function () {
      var itemType = item.getAttribute('data-type');
      var itemPages = document.querySelectorAll('.itemPage');
      var itemsPage = document.querySelector('.itemsPage');
      var CartPage = document.querySelector('.CartPage');
      var allPages = document.querySelector('.itemPages'); // Добавлено для полноты

      itemPages.forEach(function (itemPage) {
        itemPage.style.display = 'none';
        itemsPage.style.display = 'none';
        CartPage.style.display = 'none';
      });

      var selectedItemPage = document.getElementById(itemType);
      if (selectedItemPage) {
        selectedItemPage.style.display = 'flex';
        allPages.style.display = 'flex';
      }
    });
  });

  // Блок второго кода
  const filterButtons = document.querySelectorAll('.filterBTN');
  const items = document.querySelectorAll('.item');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove('activeFilter');
      });

      button.classList.add('activeFilter');

      const filterValue = button.getAttribute('data-filter');

      filterButtons.forEach(function (btn) {
        if (btn.getAttribute('data-filter') === 'all') {
          btn.innerText = (filterValue === 'all') ? 'Фильтры:' : 'Сбросить фильтр';
        }
      });

      items.forEach(function (item) {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});


document.querySelectorAll('.closeBTN').forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function () {
    var itemPages = document.querySelectorAll('.itemPage');
    var itemsPage = document.querySelector('.itemsPage');
    var CartPage = document.querySelector('.CartPage');

    itemPages.forEach(function (itemPage) {
      itemPage.style.display = 'none';
    });

    itemsPage.style.display = 'flex';
    CartPage.style.display = 'none';
  });
});

let Merch = document.querySelector("#Merch");
let cart = document.querySelector("#Cart");
var CartPage = document.querySelector('.CartPage');
var itemsBlock = document.querySelector('.itemsBlock');
var listCard = document.querySelector(".cartItems");
var itemsPage = document.querySelector('.itemsPage');

cart.addEventListener("click", function(){
  CartPage.style.display = 'flex';
  itemsPage.style.display = 'none';
  allPages.style.display = 'none';
  updateButtonClasses();
});

Merch.addEventListener("click", function(){
  CartPage.style.display = 'none';
  itemsPage.style.display = 'flex';
  allPages.style.display = 'none';
  updateButtonClasses();
});

let total = document.querySelector('.cartSum');
let quantity = document.querySelector('.itemQuantity');
let listCards  = [];

let products = [
  {id: 1,name: 'Кусок неба',image: 'HoodieBlack.png',price: 1800,color: "black"},
  {id: 2,name: 'Труба. Толстовка',image: 'HoodieYellow.png',price: 3200,color: "yellow"},
  {id: 3,name: 'Другая сторона',image: 'CardOtherSide.png',price: 500,color: "black"},
  {id: 4,name: 'Высокое искусство',image: 'CardHighCulture.png',price: 300,color: "black"},
  {id: 5,name: 'Зелёное искусство',image: 'GreenTshirt.png',price: 1800,color: "green"},
  {id: 6,name: 'Блокнот',image: 'notepad.png',price: 900,color: "black"}
];

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
    showNotification("Товар добавлен в корзину");
  } else {
    listCards[key].quantity += 1;
    showNotification("Количество товара увеличено");
  }
  updateCard();
}

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  let color = null;

  listCards.forEach((value, key) => {
    totalPrice += value.quantity * value.price;
    count += value.quantity;

    if (value != null) {
      let newDiv = document.createElement('li');
      newDiv.classList.add('cardItem');
      newDiv.innerHTML = `
        <p class="itemTitle">${value.name}</div>
        <div class="color  ${(color == null) ? (value.color) : color }"></div>
        <div class="Size">S</div>
        <div class="itemQuantity">${(value.quantity * value.price).toLocaleString()} р.</div>
        <div class="itemCounter">
          <button class="itemMinus" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count itemQuantity">${value.quantity}</div>
          <button class="itemPlus" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>`;
      listCard.appendChild(newDiv);
    }
  });

  total.innerText = totalPrice.toLocaleString() + ' ₽';
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity === 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
  }
  updateCard();
}

function updateCard() {
  reloadCard();
}

reloadCard();

let payButton = document.querySelector(".payButton");

payButton.addEventListener("click", function(){
  showNotification("Оплата временно недоступна");
});

function updateButtonClasses() {

  var CartPage = document.querySelector('.CartPage');
  var itemsPage = document.querySelector('.itemsPage');

  cart.classList.toggle('activeBTN', CartPage.style.display === 'flex');
  cart.classList.toggle('deactiveBTN', CartPage.style.display !== 'flex');

  Merch.classList.toggle('activeBTN', itemsPage.style.display === 'flex');
  Merch.classList.toggle('deactiveBTN', itemsPage.style.display !== 'flex');
}

