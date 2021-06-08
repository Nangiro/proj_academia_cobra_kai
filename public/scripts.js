// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD58QtkDDWrXMgA5VOkpl9fXHBSVbB7jeM",
    authDomain: "projeto-ack.firebaseapp.com",
    projectId: "projeto-ack",
    storageBucket: "projeto-ack.appspot.com",
    messagingSenderId: "625254220124",
    appId: "1:625254220124:web:eb74d9855ebcc3eed74199"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Ref para uso do firebase
  const auth = firebase.auth();
  const db = firebase.firestore();
  const functions = firebase.functions();

  //Ref
  const adminItens = document.querySelectorAll('.admin');
  const secretaryItens = document.querySelectorAll('.secretary');

  //FireStore

  //Ref para firestore
  const studentList = document.querySelector('#studentForm');

  db.settings({ timestampsInSnapshots: true });

  // ---------------------- STUDENT ----------------------

  function renderStudent(doc) {
    let div1 = document.createElement('div');
    let title1 = document.createElement('h2');
    let field1 = document.createElement('p')

    title1.textContent = "Nome"
    field1.textContent = doc.data().nome;

    div1.appendChild(title1);
    div1.appendChild(field1);

    studentList.appendChild(div1);

    let div2 = document.createElement('div');
    let title2 = document.createElement('h2');
    let field2 = document.createElement('p')

    title2.textContent = "Email"
    field2.textContent = doc.data().email;

    div2.appendChild(title2);
    div2.appendChild(field2);

    studentList.appendChild(div2);

    let div3 = document.createElement('div');
    let title3 = document.createElement('h2');
    let field3 = document.createElement('p')

    title3.textContent = "RG"
    field3.textContent = doc.data().rg;

    div3.appendChild(title3);
    div3.appendChild(field3);

    studentList.appendChild(div3);

    let div4 = document.createElement('div');
    let title4 = document.createElement('h2');
    let field4 = document.createElement('p')

    title4.textContent = "CPF"
    field4.textContent = doc.data().cpf;

    div4.appendChild(title4);
    div4.appendChild(field4);

    studentList.appendChild(div4);

    let div5 = document.createElement('div');
    let title5 = document.createElement('h2');
    let field5 = document.createElement('p')

    title5.textContent = "Endereço"
    field5.textContent = doc.data().endereco;

    div5.appendChild(title5);
    div5.appendChild(field5);

    studentList.appendChild(div5);

    let div6 = document.createElement('div');
    let title6 = document.createElement('h2');
    let field6 = document.createElement('p')

    title6.textContent = "Bairro"
    field6.textContent = doc.data().bairro;

    div6.appendChild(title6);
    div6.appendChild(field6);

    studentList.appendChild(div6);

    let div7 = document.createElement('div');
    let title7 = document.createElement('h2');
    let field7 = document.createElement('p')

    title7.textContent = "CEP"
    field7.textContent = doc.data().cep;

    div7.appendChild(title7);
    div7.appendChild(field7);

    studentList.appendChild(div7);

    let div8 = document.createElement('div');
    let title8 = document.createElement('h2');
    let field8 = document.createElement('p')

    title8.textContent = "Número de contato"
    field8.textContent = doc.data().numerocontato;

    div8.appendChild(title8);
    div8.appendChild(field8);

    studentList.appendChild(div8);

    let div9 = document.createElement('div');
    let title9 = document.createElement('h2');
    let field9 = document.createElement('p')

    title9.textContent = "Data de nascimento"
    field9.textContent = doc.data().datanascimento;

    div9.appendChild(title9);
    div9.appendChild(field9);

    studentList.appendChild(div9);

    let div10 = document.createElement('div');
    let title10 = document.createElement('h2');
    let field10 = document.createElement('p')

    title10.textContent = "Faixa atual"
    field10.textContent = doc.data().faixaatual;

    div10.appendChild(title10);
    div10.appendChild(field10);

    studentList.appendChild(div10);

    let div11 = document.createElement('div');
    let title11 = document.createElement('h2');
    let field11 = document.createElement('p')

    title11.textContent = "Tipo do Pacote"
    field11.textContent = doc.data().tipopacote;

    div11.appendChild(title11);
    div11.appendChild(field11);

    studentList.appendChild(div11);

    let div12 = document.createElement('div');
    let title12 = document.createElement('h2');
    let field12 = document.createElement('p')

    title12.textContent = "Situação financeira"
    field12.textContent = doc.data().situacaofinanc;

    div12.appendChild(title12);
    div12.appendChild(field12);

    studentList.appendChild(div12);

  }

  function searchForStudent () {
    //Getting info from Alunos
    var userCPF = document.getElementById("cpf_field").value;
    // document.getElementById("cpf_field").value="teste";

    db.collection('Alunos').where('cpf', '==', userCPF).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        renderStudent(doc);
      })
    })
  }

  function searchForStudentAndComplete () {
    var userCPF = document.getElementById("cpf_field").value;

    db.collection('Alunos').where('cpf', '==', userCPF).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        document.getElementById("nameField").value= doc.data().nome;
        document.getElementById("enderecoField").value= doc.data().endereco;
        document.getElementById("bairroField").value= doc.data().bairro;
        document.getElementById("cepField").value= doc.data().cep;
        document.getElementById("contatoField").value= doc.data().numerocontato;
        document.getElementById("nascField").value= doc.data().datanascimento;
        document.getElementById("faixaField").value= doc.data().faixaatual;
        document.getElementById("pacoteField").value= doc.data().tipopacote;
      })
    })
  }


  function createNewStudent() {
    const signupForm = document.querySelector('#signupForm');

    const email = signupForm['emailField'].value;
    const password = signupForm['pswField'].value;
    let currentDate = new Date();

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection('Alunos').doc(cred.user.uid).set({
        bairro: signupForm['bairroField'].value,
        cep: signupForm['cepField'].value,
        cpf: signupForm['cpfField'].value,
        datainicio: currentDate,
        datanascimento: signupForm['nascField'].value,
        email: signupForm['emailField'].value,
        endereco: signupForm['enderecoField'].value,
        faixaatual: signupForm['faixaField'].value,
        nome: signupForm['nameField'].value,
        numerocontato: signupForm['contatoField'].value,
        rg: signupForm['rgField'].value,
        situacaofinanc: "Ok",
        tipopacote: signupForm['pacoteField'].value,
        uid: cred.user.uid
      })
    }).then(()=> {
      auth.signOut().then(() => {
        window.location.href = "/" 
      }) 
    })
  }

  function updateStudent() {
    const signupForm = document.querySelector('#signupForm');
    var userCPF = document.getElementById("cpf_field").value;

    db.collection('Alunos').where('cpf', '==', userCPF).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        var numUid = doc.data().uid;

        db.collection('Alunos').doc(numUid).update({
          nome: signupForm['nameField'].value,
          endereco: signupForm['enderecoField'].value,
          bairro: signupForm['bairroField'].value,
          cep: signupForm['cepField'].value,
          numerocontato: signupForm['contatoField'].value,
          datanascimento: signupForm['nascField'].value,
          faixaatual: signupForm['faixaField'].value,
          tipopacote: signupForm['pacoteField'].value,
        })

      })
    }).then(()=>{
      window.alert("Dados atualizados com sucesso");
    })

  }

  function deleteStudent(){
    var userCPF = document.getElementById("cpf_field").value;
    const deleteSt = functions.httpsCallable('deleteSt');

    db.collection('Alunos').where('cpf', '==', userCPF).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        var numUid = doc.data().uid;

        deleteSt({uid: numUid}).then(result =>{
          console.log(result);
        })

        db.collection('Alunos').doc(numUid).delete();
      })
    })

    window.alert("Aluno excluido com sucesso!");
  }


  //---------------------- Login Logout ----------------------

  // Listen for auth status changes
  auth.onAuthStateChanged(user =>{
    if(user){
      user.getIdTokenResult().then(idTokenResult =>{
        user.admin = idTokenResult.claims.admin;
        user.secretary = idTokenResult.claims.secretary;
        if(user.admin){
          adminItens.forEach(item => item.style.display = 'block');
          secretaryItens.forEach(item => item.style.display = 'block');
        }
        if(user.secretary){
          secretaryItens.forEach(item => item.style.display = 'block');
        }
      })
    } else{
      adminItens.forEach(item => item.style.display = 'none');
    }
  })
  

  function login () {
    var userEmail = document.getElementById("email_field").value;
    var userPwd = document.getElementById("pwd_field").value;

    //then = usado pois a funcao é assincrona, then espera a função terminar para executar o resto do codigo
    auth.signInWithEmailAndPassword(userEmail, userPwd).then((userCredential) => {
      // Signed in
    })
    .catch((error) => {
      var errorMessage = error.message;
      window.alert(errorMessage);
    });
  }

  function logout() {
    auth.signOut().then(() => {
      window.location.href = "/" 
    })

  }

  // ---------------------- GIVE ROLES ----------------------

  // add admin cloud function
  function makeAnAdmin(){
    const adminEmail = document.querySelector('#email_field').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');

    addAdminRole({email: adminEmail}).then(result => {
      console.log(result);
    })
  }

  function addSecretaryRole(){
    const secretaryEmail = document.querySelector('#email_field').value;
    const addSecretaryRole = functions.httpsCallable('addSecretaryRole');

    addSecretaryRole({email: secretaryEmail}).then(result => {
      console.log(result);
    })
  }

// ---------------------- TEACHERS ----------------------

function createNewTeacher() {
  const signupForm = document.querySelector('#signupForm');

  db.collection('Professores').doc(signupForm['cpfField'].value).set({
    nome: signupForm['nameField'].value,
    email: signupForm['emailField'].value,
    rg: signupForm['rgField'].value,
    cpf: signupForm['cpfField'].value,
    cnpj: signupForm['cnpjField'].value,
    carteiraTrabalho: signupForm['cartDeTrabField'].value,
    endereco: signupForm['enderecoField'].value,
    bairro: signupForm['bairroField'].value,
    cep: signupForm['cepField'].value,
    numerocontato: signupForm['contatoField'].value,
    datanascimento: signupForm['nascField'].value,
    faixaatual: signupForm['faixaField'].value,

  }).then(()=>{
    window.alert("Professor(a) Cadastrado(a) com Sucesso!");
    setTimeout(() => {
      window.location.href = "/"
  }, 2500);
  })
}

function renderTeacher(doc) {
  let div1 = document.createElement('div');
  let title1 = document.createElement('h2');
  let field1 = document.createElement('p')

  title1.textContent = "Nome"
  field1.textContent = doc.data().nome;

  div1.appendChild(title1);
  div1.appendChild(field1);

  studentList.appendChild(div1);

  let div2 = document.createElement('div');
  let title2 = document.createElement('h2');
  let field2 = document.createElement('p')

  title2.textContent = "Email"
  field2.textContent = doc.data().email;

  div2.appendChild(title2);
  div2.appendChild(field2);

  studentList.appendChild(div2);

  let div3 = document.createElement('div');
  let title3 = document.createElement('h2');
  let field3 = document.createElement('p')

  title3.textContent = "RG"
  field3.textContent = doc.data().rg;

  div3.appendChild(title3);
  div3.appendChild(field3);

  studentList.appendChild(div3);

  let div4 = document.createElement('div');
  let title4 = document.createElement('h2');
  let field4 = document.createElement('p')

  title4.textContent = "CPF"
  field4.textContent = doc.data().cpf;

  div4.appendChild(title4);
  div4.appendChild(field4);

  studentList.appendChild(div4);

  let div5 = document.createElement('div');
  let title5 = document.createElement('h2');
  let field5 = document.createElement('p')

  title5.textContent = "Endereço"
  field5.textContent = doc.data().endereco;

  div5.appendChild(title5);
  div5.appendChild(field5);

  studentList.appendChild(div5);

  let div6 = document.createElement('div');
  let title6 = document.createElement('h2');
  let field6 = document.createElement('p')

  title6.textContent = "Bairro"
  field6.textContent = doc.data().bairro;

  div6.appendChild(title6);
  div6.appendChild(field6);

  studentList.appendChild(div6);

  let div7 = document.createElement('div');
  let title7 = document.createElement('h2');
  let field7 = document.createElement('p')

  title7.textContent = "CEP"
  field7.textContent = doc.data().cep;

  div7.appendChild(title7);
  div7.appendChild(field7);

  studentList.appendChild(div7);

  let div8 = document.createElement('div');
  let title8 = document.createElement('h2');
  let field8 = document.createElement('p')

  title8.textContent = "Número de contato"
  field8.textContent = doc.data().numerocontato;

  div8.appendChild(title8);
  div8.appendChild(field8);

  studentList.appendChild(div8);

  let div9 = document.createElement('div');
  let title9 = document.createElement('h2');
  let field9 = document.createElement('p')

  title9.textContent = "Data de nascimento"
  field9.textContent = doc.data().datanascimento;

  div9.appendChild(title9);
  div9.appendChild(field9);

  studentList.appendChild(div9);

  let div10 = document.createElement('div');
  let title10 = document.createElement('h2');
  let field10 = document.createElement('p')

  title10.textContent = "Faixa atual"
  field10.textContent = doc.data().faixaatual;

  div10.appendChild(title10);
  div10.appendChild(field10);

  studentList.appendChild(div10);

}

function searchForTeacher () {
  //Getting info from Alunos
  var userCPF = document.getElementById("cpf_field").value;

  db.collection('Professores').where('cpf', '==', userCPF).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderTeacher(doc);
    })
  })
}

function deleteTeacher(){
  console.log("Aqui1")
  var userCPF = document.getElementById("cpf_field").value;

  db.collection('Professores').where('cpf', '==', userCPF).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      var numUid = doc.data().cpf;
      db.collection('Professores').doc(numUid).delete();
    })
  }).then(()=>{
    window.alert("Professor(a) Excluido(a) com Sucesso!");
    setTimeout(() => {
      window.location.href = "/"
    }, 2500);
  })
}

function searchForTeacherAndComplete () {
  var userCPF = document.getElementById("cpf_field").value;

  db.collection('Professores').where('cpf', '==', userCPF).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      document.getElementById("nameField").value= doc.data().nome;
      document.getElementById("emailField").value= doc.data().email;
      document.getElementById("rgField").value= doc.data().rg;
      document.getElementById("cpfField").value= doc.data().cpf;
      document.getElementById("cnpjField").value= doc.data().cnpj;
      document.getElementById("cartDeTrabField").value= doc.data().carteiraTrabalho;
      document.getElementById("enderecoField").value= doc.data().endereco;
      document.getElementById("bairroField").value= doc.data().bairro;
      document.getElementById("cepField").value= doc.data().cep;
      document.getElementById("contatoField").value= doc.data().numerocontato;
      document.getElementById("nascField").value= doc.data().datanascimento;
      document.getElementById("faixaField").value= doc.data().faixaatual;
    })
  })
}

function updateStudent() {
  const signupForm = document.querySelector('#signupForm');
  var userCPF = document.getElementById("cpf_field").value;

  db.collection('Professores').where('cpf', '==', userCPF).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      var numUid = userCPF;

      db.collection('Professores').doc(numUid).update({
        bairro: signupForm['bairroField'].value,
        carteiraTrabalho: signupForm['cartDeTrabField'].value,
        cep: signupForm['cepField'].value,
        cnpj: signupForm['cnpjField'].value,
        cpf: signupForm['cpfField'].value,
        datanascimento: signupForm['nascField'].value,
        email: signupForm['emailField'].value,
        endereco: signupForm['enderecoField'].value,
        faixaatual: signupForm['faixaField'].value,
        nome: signupForm['nameField'].value,
        numerocontato: signupForm['contatoField'].value,
        rg: signupForm['rgField'].value,
      })

    })
  }).then(()=>{
    window.alert("Dados atualizados com sucesso");
    setTimeout(() => {
      window.location.href = "/"
    }, 2500);
  })

}