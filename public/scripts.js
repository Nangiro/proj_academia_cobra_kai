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

    title5.textContent = "Endere??o"
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

    title8.textContent = "N??mero de contato"
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

    title12.textContent = "Situa????o financeira"
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
        document.getElementById("financialField").value= doc.data().situacaofinanc;
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
          situacaofinanc: signupForm['financialField'].value,
        })

      })
    }).then(()=>{
      window.alert("Dados atualizados com sucesso");
      setTimeout(() => {
        window.location.href = "/" 
      }, 2500);
    })
  }

  function deleteStudent(){
    var userCPF = document.getElementById("cpf_field").value;
    const deleteUser = functions.httpsCallable('deleteUser');

    db.collection('Alunos').where('cpf', '==', userCPF).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        var numUid = doc.data().uid;

        deleteUser({uid: numUid}).then(result =>{
          console.log(result);
        })

        db.collection('Alunos').doc(numUid).delete();
      })
    })
    window.alert("Aluno excluido com sucesso!");
    setTimeout(() => {
      window.location.reload();
    }, 2500);
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

    //then = usado pois a funcao ?? assincrona, then espera a fun????o terminar para executar o resto do codigo
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
    const secretaryEmail = document.querySelector('#emailField').value;
    const addSecretaryRole = functions.httpsCallable('addSecretaryRole');

    addSecretaryRole({email: secretaryEmail}).then(result => {
      console.log(result);
      window.alert("Direitos de secretarias concedidos!")
      window.location.href = "/"
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

  title5.textContent = "Endere??o"
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

  title8.textContent = "N??mero de contato"
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

function updateTeachers() {
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

// ---------------------- SECRETARIES ----------------------

function createNewSecretary() {
  const signupForm = document.querySelector('#signupForm');

  const email = signupForm['emailField'].value;
  const password = signupForm['pswField'].value;

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('Secretarias').doc(cred.user.uid).set({
      nome: signupForm['nameField'].value,
      email: signupForm['emailField'].value,
      rg: signupForm['rgField'].value,
      cpf: signupForm['cpfField'].value,
      carteiraTrabalho: signupForm['cartDeTrabField'].value,
      endereco: signupForm['enderecoField'].value,
      bairro: signupForm['bairroField'].value,
      cep: signupForm['cepField'].value,
      numerocontato: signupForm['contatoField'].value,
      datanascimento: signupForm['nascField'].value,
      uid: cred.user.uid,
    })
  }).then(()=> {
    auth.signOut().then(() => {
      window.alert("Necessario Liberacao pelo Administrador");
      window.location.href = "/"
    }) 
  })
}

function renderSecretary(doc) {
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

  title5.textContent = "Carteira de Trabalho"
  field5.textContent = doc.data().carteiraTrabalho;

  div5.appendChild(title5);
  div5.appendChild(field5);

  studentList.appendChild(div5);

  let div6 = document.createElement('div');
  let title6 = document.createElement('h2');
  let field6 = document.createElement('p')

  title6.textContent = "Endere??o"
  field6.textContent = doc.data().endereco;

  div6.appendChild(title6);
  div6.appendChild(field6);

  studentList.appendChild(div6);

  let div7 = document.createElement('div');
  let title7 = document.createElement('h2');
  let field7 = document.createElement('p')

  title7.textContent = "Bairro"
  field7.textContent = doc.data().bairro;

  div7.appendChild(title7);
  div7.appendChild(field7);

  studentList.appendChild(div7);

  let div8 = document.createElement('div');
  let title8 = document.createElement('h2');
  let field8 = document.createElement('p')

  title8.textContent = "CEP"
  field8.textContent = doc.data().cep;

  div8.appendChild(title8);
  div8.appendChild(field8);

  studentList.appendChild(div8);

  let div9 = document.createElement('div');
  let title9 = document.createElement('h2');
  let field9 = document.createElement('p')

  title9.textContent = "N??mero de contato"
  field9.textContent = doc.data().numerocontato;

  div9.appendChild(title9);
  div9.appendChild(field9);

  studentList.appendChild(div9);

  let div10 = document.createElement('div');
  let title10 = document.createElement('h2');
  let field10 = document.createElement('p')

  title10.textContent = "Data de nascimento"
  field10.textContent = doc.data().datanascimento;

  div10.appendChild(title10);
  div10.appendChild(field10);

  studentList.appendChild(div10);

}

function searchForSecretary () {
  //Getting info from Alunos
  var userCPF = document.getElementById("cpf_field").value;

  db.collection('Secretarias').where('cpf', '==', userCPF).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderSecretary(doc);
    })
  })
}

function deleteSecretary(){
  var userCPF = document.getElementById("cpf_field").value;
  const deleteUser = functions.httpsCallable('deleteUser');

  db.collection('Secretarias').where('cpf', '==', userCPF).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      var numUid = doc.data().uid;

      deleteUser({uid: numUid}).then(result =>{
        console.log(result);
      })

      db.collection('Secretarias').doc(numUid).delete();
    })
  })

  window.alert("Secretaria excluida com sucesso!");
  setTimeout(() => {
    window.location.reload();
  }, 2500);
}

function searchForSecretaryAndComplete () {
  var userCPF = document.getElementById("cpf_field").value;

  db.collection('Secretarias').where('cpf', '==', userCPF).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      document.getElementById("nameField").value= doc.data().nome;
      document.getElementById("enderecoField").value= doc.data().endereco;
      document.getElementById("bairroField").value= doc.data().bairro;
      document.getElementById("cepField").value= doc.data().cep;
      document.getElementById("contatoField").value= doc.data().numerocontato;
      document.getElementById("nascField").value= doc.data().datanascimento;
    })
  })
}

function updateSecretary() {
  const signupForm = document.querySelector('#signupForm');
  var userCPF = document.getElementById("cpf_field").value;

  db.collection('Secretarias').where('cpf', '==', userCPF).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      var numUid = doc.data().uid;

      db.collection('Secretarias').doc(numUid).update({
        nome: signupForm['nameField'].value,
        endereco: signupForm['enderecoField'].value,
        bairro: signupForm['bairroField'].value,
        cep: signupForm['cepField'].value,
        numerocontato: signupForm['contatoField'].value,
        datanascimento: signupForm['nascField'].value,
      })

    })
  }).then(()=>{
    window.alert("Dados atualizados com sucesso");
    setTimeout(() => {
      window.location.href = "/menu"
    }, 2500);
  })
}

// ---------------------- RELA????O DE CLIENTES ----------------------

function knowClientList() {

  var countNewStudents = 0;
  var countAllStudents = 0;
  var defaulter = 0;

  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();

  db.collection('Alunos').get().then((snapshot)=> {
    snapshot.docs.forEach(doc => {
      let stJoinSeconds = doc.data().datainicio.seconds;
      let date = new Date(1970,0,1);
      date.setSeconds(stJoinSeconds);
      let stMonth = date.getMonth();

      ++countAllStudents;

      if(currentMonth == stMonth){
        ++countNewStudents;
      }

      var isDefaulter = doc.data().situacaofinanc;
      if (isDefaulter == "Inadimplente"){
        ++defaulter;
      }

    })

    const NumberOfCustomers = document.querySelector('#NumberOfCustomers');

    let div1 = document.createElement('div');
    let title1 = document.createElement('h2');
    let field1 = document.createElement('p')
  
    title1.textContent = "Alunos matriculados nesse mes:"
    field1.textContent = countNewStudents;
  
    div1.appendChild(title1);
    div1.appendChild(field1);
  
    NumberOfCustomers.appendChild(div1);

    let div2 = document.createElement('div');
    let title2 = document.createElement('h2');
    let field2 = document.createElement('p')
  
    title2.textContent = "Total de alunos matriculados:"
    field2.textContent = countAllStudents;
  
    div2.appendChild(title2);
    div2.appendChild(field2);
  
    NumberOfCustomers.appendChild(div2);

    let div3 = document.createElement('div');
    let title3 = document.createElement('h2');
    let field3 = document.createElement('p')
  
    title3.textContent = "Total de alunos inadimplentes:"
    field3.textContent = defaulter;
  
    div3.appendChild(title3);
    div3.appendChild(field3);
  
    NumberOfCustomers.appendChild(div3);

  })
}

// ---------------------- RELATORIO FINANCEIRO ----------------------

function financialStatements() {

  var basicPlan = 0;
  var goldPlan = 0;
  var platinunPlan = 0;
  var defaulter = 0;


  db.collection('Alunos').get().then((snapshot)=> {
    snapshot.docs.forEach(doc => {
      var plan = doc.data().tipopacote;
      var isDefaulter = doc.data().situacaofinanc

      if (isDefaulter == "Ok"){
        if(plan == "Pacote B??sico"){
          ++basicPlan;
        }
  
        if(plan == "Pacote Gold"){
          ++goldPlan;
        }
  
        if(plan == "Pacote Platina"){
          ++platinunPlan;
        }

      } else {
        ++defaulter;
      }

    })

    var basicIncome = (basicPlan * 100);
    var goldIncome = (goldPlan * 150);
    var platinunIncome = (platinunPlan * 300);
    var totalIncome = basicIncome + goldIncome + platinunIncome;

    const NumberOfCustomers = document.querySelector('#NumberOfCustomers');

    let div1 = document.createElement('div');
    let title1 = document.createElement('h2');
    let field1 = document.createElement('p');
  
    title1.textContent = "Receita proveniente do plano b??sico:"
    field1.textContent = "R$ " + basicIncome;
  
    div1.appendChild(title1);
    div1.appendChild(field1);
  
    NumberOfCustomers.appendChild(div1);

    let div2 = document.createElement('div');
    let title2 = document.createElement('h2');
    let field2 = document.createElement('p');
  
    title2.textContent = "Receita proveniente do plano gold:"
    field2.textContent = "R$ " + goldIncome;
  
    div2.appendChild(title2);
    div2.appendChild(field2);
  
    NumberOfCustomers.appendChild(div2);

    let div3 = document.createElement('div');
    let title3 = document.createElement('h2');
    let field3 = document.createElement('p');
  
    title3.textContent = "Receita proveniente do plano platina:"
    field3.textContent = "R$ " + platinunIncome;
  
    div3.appendChild(title3);
    div3.appendChild(field3);
  
    NumberOfCustomers.appendChild(div3);

    let div4 = document.createElement('div');
    let title4 = document.createElement('h2');
    let field4 = document.createElement('p');
  
    title4.textContent = "Receita total mensal:"
    field4.textContent = "R$ " + totalIncome;
  
    div4.appendChild(title4);
    div4.appendChild(field4);
  
    NumberOfCustomers.appendChild(div4);

    let div5 = document.createElement('div');
    let title5 = document.createElement('h2');
    let field5 = document.createElement('p');
  
    title5.textContent = "Alunos inadimplentes:"
    field5.textContent = defaulter + " alunos";
  
    div5.appendChild(title5);
    div5.appendChild(field5);
  
    NumberOfCustomers.appendChild(div5);

  })
}