Event-calendar sovellus

Sovellus hakee Helsinki Linked Events API:sta tapahtumia, joita voi tallentaa suosikkien listaan. Suosikkitapahtumat tallennetaan Mongo.db-tietokantaan.

Tapahtumia voi hakea sovelluksen avulla Helsinki Linked Events API:sta hakusanalla ja tapahtuman alku- ja loppupäivämäärällä. Apin osoite on http://api.hel.fi/linkedevents/v1/event/.

Suosikkitapahtumia voi hakea, lisätä, poistaa ja päivittää seuraavilla kutsuilla:
haku (kaikki): /api/events GET 
haku (yksi): /api/events/id GET
lisäys: /api/events POST
poisto: /api/events/id DELETE
päivitys: /api/events/id PUT


