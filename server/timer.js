import {
    Meteor
} from 'meteor/meteor';

export default { startTimer }

Meteor.methods({
    'start.timer' (chapitreId) {
        // const idTimer = Meteor.setInterval(() => {Meteor.call('chapitres.timer.update', chapitreId)}, 1000);
        const idTimer = Meteor.setInterval(() => {
            console.log('tentative set')
        }, 10000);
        console.log(idTimer)
        var testId = 50;
        Meteor.call('chapitres.timer.set', chapitreId, idTimer)
    },

    'stop.timer' (chapitreId, idTimer) {
        Meteor.clearInterval(idTimer)
        Meteor.call('chapitres.timer.reset', chapitreId)
    }
})

// Meteor.clearInterval(this.props.chapitre.id_timer)
// Meteor.call('chapitres.timer.reset', this.props.chapitre._id)

var idTimer;

function startTimer(chapitreId) {
    idTimer = Meteor.setInterval(() => {
        console.log('tentative set')
    }, 10000);
    console.log(idTimer)
    // var testId = 50;
    Meteor.call('chapitres.timer.set', chapitreId)
}