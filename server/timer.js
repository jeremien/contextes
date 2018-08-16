import {
    Meteor
} from 'meteor/meteor';
import {
    CRONjob
} from 'meteor/ostrio:cron-jobs';
// import { Jobs } from 'meteor/msavin:sjobs'

import {
    Chapitres
} from '../imports/api/collections/chapitres'

// Jobs.register({
//     "startTimer": function (chapitre) {
//         console.log('ok')
//     }
// });

var globalChapitre; //Methode de la doc de CRONJob pour passer des arguments à la fonction appeler

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
        // console.log('ok')
        Meteor.call('chapitres.timer.update', globalChapitre._id, globalChapitre.duree_boucle)
        ready();
    });
}; 

Meteor.methods({
    'timer.start' (chapitre) {
        globalChapitre = chapitre;
        const idTimer = cron.setInterval(StartTimer, 1000, 'startTimer')
        Meteor.call('chapitres.timer.set', chapitre._id, idTimer)
    },

    'timer.stop' (chapitre) {
        cron.clearInterval(chapitre.id_timer);
        Meteor.call('chapitres.timer.reset', chapitre._id, chapitre.duree_boucle)

    }
})