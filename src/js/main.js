ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [55.76526349, 37.62487947],
          zoom: 14,
          controls: []
      }),
      myPlacemarkWithContent = new ymaps.Placemark([55.76918071, 37.63868819], { }, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: 'images/point.png',
          iconImageSize: [12, 12]
      });

  myMap.geoObjects.add(myPlacemarkWithContent);
});

document.querySelector('#search-btn').addEventListener('click', function() {
  if (window.innerWidth < 581) {
    document.querySelector('.header__logo').classList.toggle('header__logo--active');
  }
  document.querySelector('.header__search').classList.toggle('header__search--active');
  document.querySelector('#search-btn').classList.toggle('search-btn--active');
});

document.querySelector('#search-close-btn').addEventListener('click', function() {
  if (window.innerWidth < 581) {
    document.querySelector('.header__logo').classList.toggle('header__logo--active');
  }
  document.querySelector('.header__search').classList.toggle('header__search--active');
  document.querySelector('#search-btn').classList.toggle('search-btn--active');
});


document.querySelector('#burger').addEventListener('click', function() {
  document.querySelector('.nav').classList.toggle('nav--active');
  document.querySelector('.menu').classList.toggle('menu--active');
  document.querySelector('.menu-tel').classList.toggle('menu-tel--active');
});

document.querySelector('#menu-close-btn').addEventListener('click', function() {
  document.querySelector('.nav').classList.toggle('nav--active');
  document.querySelector('.menu').classList.toggle('menu--active');
  document.querySelector('.menu-tel').classList.toggle('menu-tel--active');
});
