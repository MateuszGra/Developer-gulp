<!DOCTYPE html>
<html lang="pl-PL">

<head>
  <title>Gulp Starter</title>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge ,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta http-equiv="Content-Language" content="pl-PL" />
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="assets/css/all.min.css">

  <!-- To replace following tags, use https://realfavicongenerator.net/ -->
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">

  <meta property="og:image" content="og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="628">
  <meta property="og:description" content="Awesome tool for amazing developers.">
  <meta property="og:title" content="Gulp Starter">
  <meta property="og:url" content="https://adcookie.pl/">
</head>

<body>
  <main>
    <!----------------------------------------------------------- header ----------------------------------------------------------->
    <header id="main">
      <nav>
        <a class="navLogo" href="index.html"><img class="navLogo" src="assets/images/logo.png"></a>
        <div class="hamburger">
          <div class="hamburgerLines"></div>
        </div>
        <ul class="navList active">
          <li class="listEl"><a class="navLink" href="#main">STRONA GŁÓWNA</a></li>
          <li class="listEl"><a class="navLink" href="#search">WYSZUKIWARKA</a></li>
          <li class="listEl"><a class="navLink" href="#investments">INWESTYCJE</a></li>
          <li class="listEl"><a class="navLink" href="#blog">BLOG</a></li>
        </ul>
      </nav>
      <div class="headerImages">
        <img class="headerImgFirst" src="assets/images/header.jpg">
        <img class="headerImgSecend" src="assets/images/header-overlay.jpg">
      </div>
    </header>
    <!----------------------------------------------------------- search ----------------------------------------------------------->
    <section class="search" id="search">
      <h1>Znajdź inwestycję, którą pokochasz!</h1>
      <p class="searchText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.
        Aliquam erat volutpat.
        Donec placerat nisl magna, et faucibus arcu condimentum sed.</p>
      <div class="searchWrapper">
        <div class="dotsWrapper"></div>
        <div class="arrowLeftWrapper" id="arrow"><img src="assets/images//SVG/arrow.svg"></div>
        <div class="arrowRightWrapper" id="arrow"><img src="assets/images/SVG/arrow.svg"></div>
      </div>
    </section>
    <!----------------------------------------------------------- investments ----------------------------------------------------------->
    <section class="investments" id="investments">
      <img class="investImg" src="assets/images/form1.jpg">
      <form class="investForm" id="contact_form" novalidate method="POST" action=""
        target="_blank">
        <h1>Zainteresowany kupnem? Zostaw numer!</h1>
        <p class="investFormText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor
          sem.</p>
        <div class="inputWrapper">
          <div class="error notActive" id="error">Proszę uzupełnić pole</div>
          <label class="labelForm" for="name" id="label">Imię i nazwisko</label>
          <input class="inputForm input" type=”text” name="name" id="name">
        </div>
        <div class="inputWrapper">
          <div class="error notActive" id="error">Proszę uzupełnić pole</div>
          <label class="labelForm" for="phone" id="label">Telefon</label>
          <input class="inputForm input" type="phone" name="phone" id="phone">
        </div>
        <div class="inputWrapper">
          <div class="error notActive" id="error">Proszę uzupełnić pole</div>
          <label class="labelForm" for="message" id="label">Kiedy najlepiej zadzwonić</label>
          <input class="inputForm input" type="text" name="message" id="message">
        </div>
        <label class="checkboxContainer"></div>
          <div class="errorChec notActive" id="errorChec">Wymagana zgoda</div>
          <input class="checkbox" type="checkbox">
          <span class="checkmark" id="checbox">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aliquam at
            porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum
            sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        </label>
        <label class="checkboxContainer">
          <div class="errorChec notActive" id="errorChec">Wymagana zgoda</div>
          <input class="checkbox" type="checkbox">
          <span class="checkmark" id="checbox">Nervous, aren't you? I can see it in your soul. I can feel it
            in your bones.
            This unnerving feeling going through your spine.</span>
        </label>
        <button class="buttonFirst submit">Wyślij</button>
      </form>
    </section>
    <!----------------------------------------------------------- benefits ----------------------------------------------------------->
    <section class="benefits">
      <div class="rowOne">
        <div class="benefit">
          <img class="benefitImg" src="assets/images/SVG/blok.svg">
          <h3 class="benefitTitle">ZNAKOMITA LOKALIZACJA</h3>
        </div>
        <div class="benefit">
          <img class="benefitImg" src="assets/images/SVG/metraz.svg">
          <h3 class="benefitTitle">CIEKAWY ROZKŁAD</h3>
        </div>
        <div class="benefit">
          <img class="benefitImg" src="assets/images/SVG/samochod.svg">
          <h3 class="benefitTitle">ŁATWA PRZEPROWADZKA</h3>
        </div>
      </div>
      <div class="rowOne">
        <div class="benefit">
          <img class="benefitImg" src="assets/images/SVG/blok.svg">
          <h3 class="benefitTitle">ZNAKOMITA LOKALIZACJA</h3>
        </div>
        <div class="benefit">
          <img class="benefitImg" src="assets/images/SVG/metraz.svg">
          <h3 class="benefitTitle">CIEKAWY ROZKŁAD</h3>
        </div>
        <div class="benefit">
          <img class="benefitImg" src="assets/images/SVG/samochod.svg">
          <h3 class="benefitTitle">ŁATWA PRZEPROWADZKA</h3>
        </div>
      </div>
      <div class="rowTwo"></div>
    </section>
    <!----------------------------------------------------------- blog ----------------------------------------------------------->
    <section class="blog" id="blog">
      <div class="columnOne">
        <div class="blogImagesOne">
          <img class="blogImageOne" src="assets/images/wpis-1.jpg">
          <img class="blogImageTwo" src="assets/images/wpis-1-overlay.jpg">
        </div>
        <h3 class="columnOneTitle">BARDZO CIEKAWY WPIS NA NASZYM BLOGU, KTÓREGO PEWNIE NIKT NIE PRZECZYTA</h3>
        <figure class="columnLine"></figure>
        <p class="columnOneText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat
          volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.
        </p>
        <button class="buttonFirst more">Więcej</button>
      </div>
      <div class="columnTwo">
        <div class="blogImagesTwo">
          <img class="blogImageThree" src="assets/images/wpis-2.jpg">
          <img class="blogImageFour" src="assets/images/wpis-2-overlay.jpg">
        </div>
        <h3 class="columnTwoTitle">BARDZO CIEKAWY WPIS NA NASZYM BLOGU, KTÓREGO PEWNIE NIKT NIE PRZECZYTA</h3>
        <figure class="columnLine"></figure>
        <p class="columnTwoText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat
          volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.
        </p>
        <button class="buttonFirst more">Więcej</button>
      </div>
    </section>
    <!----------------------------------------------------------- more about us ----------------------------------------------------------->
    <section class="moreAbout">
      <h4 class="aboutUs">WIĘCEJ O NAS</h3>
        <figure class="columnLine"></figure>
        <h2 class="aboutTitle">Podobno cyferki sprzedają :)</h2>
        <p class="aboutText">All alone! Whether you like it or not, alone is something you'll be quite a lot!
        </p>
        <div class="statWrapper">
          <div class="stat">
            <div class="number">
              <div class="figureNumberWrapper"></div>
              <div class="figureNumberWrapper"></div>
              <div class="figureNumberWrapper"></div>
            </div>
            <figure class="columnLine"></figure>
            <h3 class="statInfoOne">LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING</h3>
          </div>
          <div class="stat">
            <div class="number">
              <div class="figureNumberWrapper"></div>
              <div class="figureNumberWrapper"></div>
              <div class="figureNumberWrapper"></div>
            </div>
            <figure class="columnLine"></figure>
            <h3 class="statInfoTwo">ADIPISCING ELIT. ALIQUAM AT PORTTITOR SEM. ALIQUAM ERAT VOLUTPAT.</h3>
          </div>
          <div class="stat">
            <div class="number">
              <div class="figureNumberWrapper"></div>
              <div class="figureNumberWrapper"></div>
            </div>
            <figure class="columnLine"></figure>
            <h3 class="statInfoThree">ADIPISCING ELIT. ALIQUAM AT PORTTITOR SEM. ALIQUAM ERAT VOLUTPAT.</h3>
          </div>
        </div>
    </section>
    <!----------------------------------------------------------- contact ----------------------------------------------------------->
    <section class="contact">
      <h3 class="contactUs">KONTAKT</h3>
      <figure class="columnLineTwo"></figure>
      <h2 class="contactTitle">Napisz do nas!</h2>
      <p class="contactText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.
      </p>
      <form class="contactForm" id="contact_form" novalidate method="POST" action="inc/send_contact.php">
        <div class="rowLabel">
          <div class="inputWrapper inputShort firstInput">
            <div class="errorContact notActive" id="error">Proszę uzupełnić pole</div>
            <label class="contactLabel" for="name" id="label">Imię i nazwisko</label>
            <input class="contactInput input" type=”text” name="name" id="name">
          </div>
          <div class="inputWrapper inputShort">
            <div class="errorContact notActive" id="error">Proszę uzupełnić pole</div>
            <label class="contactLabel" for="phone" id="label">telefon lub adres email</label>
            <input class="contactInput input" type="phone" name="phone" id="phone">
          </div>
        </div>
        <div class="inputWrapper">
          <div class="errorContact notActive" id="error">Proszę uzupełnić pole</div>
          <label class="contactLabel" for="message" id="label">Twoja Wiadomość</label>
          <input class="contactTextArea input" type="text" name="message" id="message">
        </div>
        <label class="checkboxContainerContact">
          <div class="errorChecContact notActive" id="errorChec">Wymagana zgoda</div>
          <input class="checkbox" type="checkbox">
          <span class="checkmarkContact" id="checbox">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aliquam at
            porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum
            sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam
            erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. D</span>
        </label>
        <label class="checkboxContainerContact">
          <div class="errorChecContact notActive" id="errorChec">Wymagana zgoda</div>
          <input class="checkbox" type="checkbox">
          <span class="checkmarkContact" id="checbox">If you're reading this there's something not quite right
            with you.
            And that's fantastic. Believe in yourself because we already do.</span>
        </label>
        <button class="buttonFirst submitContact">Wyślij</button>
      </form>
    </section>
    <!----------------------------------------------------------- footer ----------------------------------------------------------->
    <footer>
      <p class="copyright">COPYRIGHT 2019. Created Without Any Original Thought by Sunday & Autumn</p>
      <p class="policy">Polityka prywatności</p>
    </footer>
  </main>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous">
</script>
<script>
  WebFont.load({
    google: {
      families: ['Muli']
    }
  });
</script>
<script src="assets/js/all.min.js"></script>

</html>