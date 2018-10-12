--------------------

ROOT_URL='http://192.168.66.8:3000' meteor

--------------------


DetailsChapitreContainer :
    gestion des outils

Doublons composants :
    details des docs pour éditeur et correcteur

Bugs:
    //Problème en partie reglé. Redéfinir quand afficher un statut offline, online, rien, etc
    lorsque l'on se déconnecte on reste visible (à tester) / 
    creation des sessions > catégorie
    //changer la manière dont ils sont saisis ?
    reation des chapitres > tags
    //corrigé
    login > pas d'editeur


à faire:
    voir qui écrit > pas qui est connecté > bouton radio?
    gestion des images
    rajouter auteur dans documents > doit apparaitre dans l'index editeur/correcteur
    modal pour editer/corriger le doc
    choisir les catégories et les tags
    bouton radio sélectionné en fonction de l'état de la session
    lorsque l'on se connecte à l'app on apparait dans online, lorsque l'on écrit/modifie un doc on le voit
    ajouter date + metadonnée index sessions > tri
    confirmation lors de la suppression des sessions / chapitre / document
    modification du titre / description / date / role / meta > session / chapitre / document
    ajouter modal pour controle session/chapitre
    au premier login > éditeur en premier dans le choix des rôles
    écriture inclusive

    startup script pour faire le serveur > bash > récupère l'adresse ip

    notifications avec websocket

idées :
    ajouter la session + chapitre en cours d'édition dans la topbar
    voir dans la préparation de la session les rôles qui sont pourvus

    index des sessions / chapitres :    
        titre, date, catégorie > tri asc/desc / chronologique

    // problème redirection ? dans app > pas de routeur / dans composant redirect ou push > erreur lifecycle

    si l'utilisateur n'est pas connecté :
        redirection vers login + modal avec le choix du rôle

    si l'utilisateur est logué comme éditeur
        redirection vers index

    si l'utilisateur est logué comme transcripteur/correcteur > 
        redirection vers session en cours si éditée/complétée

    Editeur :
        creation d'une session > bouton pour afficher le formulaire
        sinon index
        merger des documents sélectionnés > nouveau doc ?

        création d'un nouveau chapitre message à tous > basculer sur nouveau chapitre > système de notification

    Photographe :
        que mobile > ajout de photo à organiser ensuite ?

    Dessinateur :
        dessin libre
        dessin avec formes préexistantes > svg pour représentation schématique

    images :
        clic sur l'image > recupère l'url de l'image

    bash :
        app bash/node/python cli > 
            adresse ip
            lancer serveur / client / backup / export  