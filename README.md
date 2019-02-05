Génération de la doc : jsdoc -r -c jsdoc-conf.json -d ../doc-test_backend

_________________________________________________________________________

# Installation

meteor npm install

_________________________________________________________________________

# Lancement en mode electron

## you need to have any mobile platform added (ios/android) 
 meteor --mobile-server=127.0.0.1:3000
 
## open new terminal 
 
 npm run desktop -- init
 npm run desktop
 
 # or in one command 
 npm run desktop -- --scaffold

 # API REST

## Obtenir toute une collection
 Les collections sont disponibles à l'adresse /publication/nom-collection

Pour l'instant la collection chapitre doit être demandée avec une requête GET à l'adresse /publications/chapitres/ get (le paramètre en plus est du à la gestion des droits pour la version web).

 Par exemple,  GET localhost:3000/publications/sessions renvoie :

 {
  "sessions": [
    {
      "_id": "4PiQPKNNsWB3nepLg",
      "titre": "Dynamo Days",
      "auteur": "Kevin",
      etc
    },
    {
      "_id": "s7HeZvmuwunszivmQ",
      "titre": "Journée ICM",
      "auteur": "Kevin",
      "creation": "2019-01-24T23:28:12.417Z",
      "description": "Les alumnis viennent expliquer leur métier aux élèves",
      "etat": "edition",
      "roles": {
        "transcripteurs": 1
      },
      "utilisateurs_connectes": [],
      "utilisateurs_ayant_participe": [],
      "categories": [],
      "password": "presentation",
      "lastModified": "2019-01-24T23:36:59.792Z",
    }
  ]
}

## Manipulation de la base de données
Pour l'instant seul les collections Sessions, Chapitres, Documents et Messages sont ouvertes (les autres doivent être bloquées).

Pour ajouter un document : envoyer une requete POST à l'adresse /nom-collection/ avec le header "Content-Type": "application/json" et le champ de donnée contenant le nouveau docuement à inséré au format JSON-Serialized (c-a-d sous forme de string. Par exemple avec la méthode JSON.Stringify)

Pour modifier un document : une requete PATCH à l'adresse /nom-collection/_id et les même informations que pour l'insertion

Pour supprimer un document : une requete DELETE à l'adresse /nom-collection/_id et le même header

## Utilisation des méthodes existantes
Pour l'instant elles ne sont pas accessibles, mais pourront l'être si besoin




