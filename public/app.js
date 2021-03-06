const studentsTable = document.querySelector('#stu-table');
const form = document.querySelector("#add-students-form");
const db = firebase.firestore();
var data;	
// create element & render 
function renderStudents(doc){
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let tr = document.createElement("tr");
    tr.setAttribute('data-id', doc.id);
    td1.textContent = doc.data().name;
    td2.textContent = doc.data().age;
    td3.textContent = doc.data().sex;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    // delete 
    let cross = document.createElement('div');
    cross.textContent = 'x';
    tr.appendChild(cross);
    cross.addEventListener('click', (test) => {
        test.stopPropagation();
        let id = test.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('homework').doc(id).delete();
		location.reload();
    });
    //

    studentsTable.appendChild(tr);
}

// getting data 
db.collection('homework').get().then(data => {
    data.docs.forEach(doc => {
        renderStudents(doc);
    });
});
// 

// add data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('homework').add({
        name: form.name.value,
        sex: form.sex.value,
        age: form.age.value
    });
    location.reload();
});
//