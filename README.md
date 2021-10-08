# Moment 5 - Klient

I denna uppgift har jag skapat en webbapplikation som presenterar alla kurser jag har läst på högskola/univeristet i en tabell. Webbapplikationen använder en webbtjänst som jag skapat med data för kurserna.

Sidan är såklart också responsiv.

## Gulp

I denna uppgift har jag använt gulp för att automatisera arbetet. Jag använder paketen:
* gulp
* gulp-terser
* browser-sync
* gulp-sourcemaps
* gulp-sass
* sass
* gulp-babel
* gulp-typescript

Jag använder TypeScript i arbetet, så innan publicering kommer denna fil att göras om till JavaScript. Jag använder också SASS(SCSS) som kommer att göras om till CSS innan publicering.

## TypeScript

Datan från webbtjänsten hämtas i TypeScript med fetch-anrop. Sen skrivs datan ut beroende på vilket anrop som har gjorts. TypeScript-filen innehåller olika funktioner som gör olika anrop till webbtjänsten med GET, PUT, POT eller DELETE.

Om användaren lägger till en ny kurs eller redigerar en befintlig kurs så kommer data också att skickas till webbtjänsten som i sin tur lagrar till en databas. Värdena hämtas från de två olika formulären på sidan, lägg till kurs och redigera kurs.

## Installera

Om du vill klona repot och köra det på din datorn behöver du ha npm och node.js installerat på din dator. Genom följande kommandon installerar du allt.
* git clone https://github.com/Ztawh/Moment5-webbapplikation.git
* npm install
* gulp

## Länkar
Den resulterande webbapplikationen syns här: [länk](https://studenter.miun.se/~amhv2000/writeable/webbapp/pub/)
