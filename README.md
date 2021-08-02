Event-calendar sovellus

React kirjastoa hyödyntäen toteuttu sevellus, joka hakee Helsinki Linked Events API:sta tapahtumia, joita voi tallentaa suosikkien listaan. Suosikkitapahtumat tallennetaan Mongo.db-tietokantaan ja käyttäjä voi hakea ne näytölle listauksena tai kalenterinäkymässä. Sovelluksesta puuttuu vielä kirjautumissivu, koska käytettävissä olleen ajan puitteissa sitä ei ehditty tehdä. Sen voi toteuttaa seuraavassa vaiheessa.

Tapahtumia voi hakea sovelluksen avulla Helsinki Linked Events API:sta hakusanalla ja tapahtuman alku- ja loppupäivämäärällä. Apin osoite on http://api.hel.fi/linkedevents/v1/event/.

Suosikkitapahtumia voi hakea, lisätä, poistaa ja päivittää seuraavilla kutsuilla:
haku (kaikki): /api/events GET 
haku (yksi): /api/events/id GET
lisäys: /api/events POST
poisto: /api/events/id DELETE
päivitys: /api/events/id PUT


