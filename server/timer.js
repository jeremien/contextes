import {
    Meteor
} from 'meteor/meteor';
import {
    CRONjob
} from 'meteor/ostrio:cron-jobs';

import {
    Chapitres
} from '../imports/api/collections/chapitres'


var globalChapitre; //Methode de la doc de CRONJob pour passer des arguments à la fonction appeler
var rangOnAir = 0;

const bound = Meteor.bindEnvironment((callback) => {
    callback();
});

const db = Chapitres.rawDatabase();
const cron = new CRONjob({
    db: db,
    autoClear: true,
});

const StartTimer = function (ready) {
    bound(() => {
        Meteor.call('chapitres.timer.update', globalChapitre._id, globalChapitre.duree_boucle)
        ready();
    });
};

function Next() {
    listeTranscripteurs.map((trancripteur) =>
        Meteor.call('message.client', trancripteur.socket, 'offAir')
    );
    rangOnAir = (rangOnAir + 1) % listeTranscripteurs.length
    Meteor.call('message.client', listeTranscripteurs[rangOnAir].socket, 'onAir');
}
Meteor.methods({
    'timer.start'(chapitre) {
        globalChapitre = chapitre;
        const idTimer = cron.setInterval(StartTimer, 1000, 'startTimer')
        Meteor.call('chapitres.timer.set', chapitre._id, idTimer)
        Next();
    },

    'timer.stop'(chapitre) {
        cron.clearInterval(chapitre.id_timer);
        Meteor.call('chapitres.timer.reset', chapitre._id, chapitre.duree_boucle)

    },

    'timer.listeTranscripteurs'(nouvelleListe) {
        listeTranscripteurs = nouvelleListe
    },

    'timer.next'() {
        Next();
    }
})