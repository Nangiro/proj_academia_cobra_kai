const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

//We will get the user info from the front-end
exports.addAdminRole = functions.https.onCall((data, context) => {
    //Check if is an admin
    if (context.auth.token.admin !== true){
        return {error: 'Apenas administradores podem adicionar outros administradores'}
    }

    //Get user and add custom claim (admin role)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(()=> {
        //Response from the fuction
        return {
            message: `Parabêns! Agora ${data.email} é um adm`
        }
    }).catch(err => {
        return err;
    });
});

exports.addSecretaryRole = functions.https.onCall((data, context) => {
    //Check if is an admin
    if (context.auth.token.admin !== true){
        return {error: 'Apenas administradores podem adicionar outras secretarias'}
    }

    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            secretary: true
        })
    }).then(()=> {
        return {
            message: `Parabêns! Agora ${data.email} é uma Secretária`
        }
    }).catch(err => {
        return err;
    });
});

exports.deleteSt = functions.https.onCall((data, context) => {
    
    admin.auth().deleteUser(data.uid).then(() => {
        return {
            message: `Aluno excluido com sucesso!`
        }
    }).catch((err) => {
        return err;
    });

});