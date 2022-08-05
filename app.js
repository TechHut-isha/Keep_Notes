//Fetching Elements
var addBtn = document.getElementById('btn');
var noteTitle = document.getElementById('title'); 
var noteText = document.getElementById('noteContent');

addBtn.addEventListener('click', saveNote);

// function to display the notes from local storage
 function displayNotes(){
    let notes = localStorage.getItem('notes');
    if(notes==null){
        var notesObject = [];
    }
    else{
        notesObject = JSON.parse(notes);
    }

    let noteStruct = '';
    notesObject.forEach(function(ele, index) {
        noteStruct += `
        <div class="note">
            <p class="noteCounter">Note ${index + 1}</p>
            <input class='check-box' id=${index} onclick="checking();" type="checkbox">
            <button id="${index}"onclick="archiveNote(this.id)" class="deletebtn"><i class="fas fa-archive"></i></button>
            <button id="${index}"onclick="deleteNote(this.id)" class="deletebtn"><i class="fa fa-trash"></i></button>
            <button id="${index}"onclick="editNote(this.id)" class="edit-btn"><i class="fas fa-edit"></i></button>
            
            <h2 class="noteTitle">${ele.title} </h2>
            <p class="noteText"> ${ele.text}</p>
            <h5 class="noteDate">${ele. CreatedateTime}</h5>
        </div>`; 
    });
    let elementNotes =  document.getElementById('notes');
    if(notesObject.length != 0){
        elementNotes.innerHTML = noteStruct;
    }
    else{
        elementNotes.innerHTML = `<h3 class='warning'>No Notes Yet! First Add a note.</h3> `;
    }
}

//function for save the note in local storage
function saveNote(){
    if(noteTitle.value=='')
        return alert('Please add Title of the note!');

    let notes = localStorage.getItem('notes');

    if(notes==null){
        var notesObject = [];
    }
    else{
        notesObject = JSON.parse(notes);
    }
    var newDate = new Date();
    var createDateTime = newDate.toLocaleString();
    let id = 0;
    notesObject.forEach(function(){
        id = id+1;
    });
    let myNoteObj = {
        id: id,
        title: noteTitle.value,
        text: noteText.value,
        CreatedateTime: createDateTime
    }

    notesObject.push(myNoteObj);

    localStorage.setItem("notes", JSON.stringify(notesObject));
    noteTitle.value = "";
    noteText.value = "";

    console.log(notes);

    displayNotes();
 }
 //function for delete checked multiple notes
var deleteCheckedBtn = document.getElementById('deleteChecked');

function checking(){
    var checklist = document.querySelectorAll('.check-box');
    for(let checks of checklist)
    {   if(checks.checked==true){
            deleteCheckedBtn.addEventListener('click',function(){
                deleteNote(checks.id);
            }); 
        }
    }
}

//function for deleting the a note

function deleteNote(index){
    //let confirmation = confirm("Do You Really Want to Delete This Note?");

    if(true){
        let notes = localStorage.getItem('notes');
        if(notes==null){
            var notesObject = [];
        }
        else{
            notesObject = JSON.parse(notes);
        }
        let delNote = notesObject.splice(index ,1);
        localStorage.setItem("notes", JSON.stringify(notesObject));
        displayNotes();
        let delNotes = localStorage.getItem('deletedNotes');
        if(delNotes==null){
            var BackupNotes=[];
        }
        else{
            BackupNotes = JSON.parse(delNotes)
        }
        var delNoteObj = {
            title: delNote[0].title,
            text: delNote[0].text,
            CreatedateTime: delNote[0]. CreatedateTime
        }
        
        BackupNotes.push(delNoteObj);
        // console.log(BackupNotes);
        
        localStorage.setItem("deletedNotes", JSON.stringify(BackupNotes));
    }
}

var backUpBtn = document.getElementById('backUp');
backUpBtn.addEventListener('click',backupNotes); 

//function for Backup all deleted notes
function backupNotes(){
    let confirmation = confirm('Do You want to restore all Deleted notes')
    if(confirmation){
    let Backup = JSON.parse(localStorage.getItem('deletedNotes'));
    let notes = JSON.parse(localStorage.getItem('notes'));
    localStorage.setItem("notes", JSON.stringify(notes.concat(Backup)));
    displayNotes();
    }
}

//function of editing the note
function editNote(index){
    if (noteTitle.value !== "" || noteText.value !== "") {
      return alert("Please clear the input field before editing a note")
    } 
    let btn = document.getElementById('btn');
    btn.innerHTML = `✔`;
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObject = [];
    } else {
      notesObject = JSON.parse(notes);
    }
    
    // console.log(notesObj);

    noteTitle.value = notesObject[index].title;
    noteText.value = notesObject[index].text;
    notesObject.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObject));
    displayNotes();
}
displayNotes();

var searchBtn = document.getElementById('search-btn');
var searchBox = document.getElementsByClassName('search')[0];

searchBtn.addEventListener('click', searchNotes);

// for search the note by title
function searchNotes(){
    let searchTitle = JSON.parse(localStorage.getItem('notes'));
    for(let i=0;i<searchTitle.length;i++){
        if(searchTitle[i].title == searchBox.value){
            let noteId = searchTitle[i].id;
            let notes =  JSON.parse(localStorage.getItem('notes'));
            let searchNoteStruct ='';
            searchNoteStruct += `
            <div class="note">
                <p class="noteCounter">Note ${i + 1}</p>
                <button id="${noteId}"onclick="deleteNote(this.id)" class="deletebtn"><i class="fa fa-trash"></i></button>
                <button id="${noteId}"onclick="editNote(this.id)" class="edit-btn"><i class="fas fa-edit"></i></button>
                <h2 class="noteTitle">${notes[i].title} </h2>
                <p class="noteText"> ${notes[i].text}</p>
                <h5 class="noteDate">${notes[i]. CreatedateTime}</h5>
            </div>`; 
                let elementNotes =  document.getElementById('notes');
                elementNotes.innerHTML = searchNoteStruct;
        }  
    }
    searchBox.value='';
}
// for display buttons only when notes contain atleast 2 notes
var showAllBtn = document.getElementById('show');
var backUpBtn = document.getElementById('backUp');
let notes =  localStorage.getItem('notes');
if (notes == null) {
    notesObject = [];
  } else {
    notesObject = JSON.parse(notes);
  }
console.log(notesObject);
if(notesObject.length > 1){
    showAllBtn.style.visibility ='visible';
    backUpBtn.style.visibility = 'visible';
    deleteCheckedBtn.style.visibility='visible';
}
else{
    showAllBtn.style.visibility ='hidden';
    backUpBtn.style.visibility = 'hidden';
    deleteCheckedBtn.style.visibility='hidden';
}




var refreshBtn = document.getElementsByClassName('refresh')[0];
refreshBtn.addEventListener('click',displayNotes);
//Archive Notes *********Optional
function archiveNote(index){
    let notes = localStorage.getItem('notes');
        if(notes==null){
            var notesObject = [];
        }
        else{
            notesObject = JSON.parse(notes);
        }
        let archivedOne = notesObject.splice(index ,1);
        localStorage.setItem("notes", JSON.stringify(notesObject));
        displayNotes();
        let archiveNotes = localStorage.getItem('archiveNotes');
        if(archiveNotes==null){
            var archivedNotes=[];
        }
        else{
            archivedNotes = JSON.parse(archiveNotes)
        }
        var archiveNoteObj = {
            title: archivedOne[0].title,
            text: archivedOne[0].text,
            CreatedateTime: archivedOne[0]. CreatedateTime
        }
        archivedNotes.push(archiveNoteObj);
        localStorage.setItem("archiveNotes", JSON.stringify(archivedNotes));
}

//Function for Display all archived Notes
var showAllBtn = document.getElementById('show');
showAllBtn.addEventListener('click', showArchive);
function showArchive(){
    console.log('hello');
    let archive = JSON.parse(localStorage.getItem("archiveNotes"));
    let noteStruct = '';
    archive.forEach(function(ele, index) {
        noteStruct += `
        <div class="note">
            <p class="noteCounter">Note ${index + 1}</p>
            <h2 class="noteTitle">${ele.title} </h2>
            <p class="noteText"> ${ele.text}</p>
        </div>`; 
    });
    let elementNotes =  document.getElementById('notes');
    elementNotes.innerHTML = `<h1 class='warning'>Archived Notes</h1>`+noteStruct;
}
