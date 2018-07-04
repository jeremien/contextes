import React from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Chapitres } from '../../api/collections/chapitres';
import { withTracker } from 'meteor/react-meteor-data';

class Chapitre extends React.Component {
    componentDidMount() {
        Meteor.call('chapitres.connexion', this.props.match.params.id, Session.get('utilisateur'));
        console.log('Component will mount');
        // console.log(this.props.chapitre.utilisateurs_connectes)
    };

  componentWillUnmount() {
    Meteor.call('chapitres.deconnexion', this.props.match.params.id, Session.get('utilisateur'));
        console.log('Component will unmount');
        console.log(this.props.chapitre.utilisateurs_connectes)
  }



    
    render() {
        return (
            <div>
            {!!this.props.chapitre &&
            <div>
                
                <p>Chapitre : {this.props.chapitre.titre}</p>
                    <h3 >Modificiation en cours : {this.props.chapitre.utilisateurs_connectes}</h3>  
            </div>
            }
            </div>
        )
    }
}

export default withTracker((props) => {
    Meteor.subscribe('chapitres');
    console.log(Chapitres.find({_id: props.match.params.id}).fetch())
    return {
        chapitre : Chapitres.findOne({_id: props.match.params.id}),
      };
    })(Chapitre);

    //4eQn66hfiqWsCFZLp
    // db.chapitres.update({_id: "MgqqdEhyhne8LhxLh"}, {$addToSet: {utilisateurs_connectes: "perceval"}})
    //db.chapitres.update({_id: "a4pnPMEH3682wrWnt"}, {$pull: {utilisateurs_connectes: "perceval"}})