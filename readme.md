# SW-Auto readme

Frontend ja backend avataan omiin vscode ohjelmiinsa, niin että frontend on vscoden juuressa ja backend on vscoden juuressa.

### Backendin käyttö

Tässä käyttöohjeet backendin devaamiseen, varmista että vscode on backendin juuressa:

- Aja `npm install` backendissä
- Asenna vaaditut lisäosat, löytyvät extensions.json:sta, eli `eslint`, `prettier` ja `formatting toggle`
- Jos eslint urppaa ja on punaisena alareunassa, niin käynnistä vscode uudestaan
- Laita formatting päälle vscoden aivan alhaalta oikealta, niin että näkyy ruksi
- Koita tallentaa tiedosto, vscoden oikealta alhaalla pitäisi olla optio valita formatteri, valitse prettier
  - jos alaoikealla ei näy optiota valita formatteri, niin se tod.näk. löytyy kelloikonia klikkaamalla alaoikealta
  - voit myös koittaa ctrl+shift+p ja valitse "format document with..." ja sitten prettier'
- Nyt dokumentit pitäisi automaattisesti linttautua style-guiden mukaiseksi kun painat ctrl+s (eli tallennat)

#### Backin Style-guide

- Single quotit
- CRLF line endit
- Semicolonit
- Täbit = 2x spaces

### Frontin käyttö

- Aja `npm install` frontend kansiossa
- Aja `npm run dev` devaamisen aloittamiseksi, sis. hot-reload/etc.
