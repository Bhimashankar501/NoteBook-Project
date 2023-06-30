import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteForm !: FormGroup;
  editForm!: FormGroup;
  noteDetails:any
  notesData:any = ''
  noteObj: Note ={
    id: '',
    note_title: '',
    note_dec: ''
  }

  constructor(private fb: FormBuilder, private noteService : NoteService,private spinner: NgxSpinnerService){
    this.noteForm= this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.editForm= this.fb.group({
     edit_title: ['', Validators.required],
    edit_description: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.getAllNotes();

      
  }
  addNote(){
    const{value} = this.noteForm
    console.log(value);
    this.noteObj.id='';
    this.noteObj.note_title=value.title,
    this.noteObj.note_dec=value.description

    this.noteService.addNote(this.noteObj).then((note) =>{
      if(note){
        alert("note added successfully")
        this.noteForm.reset();
      }

    })
  }

  getAllNotes(){
    this.spinner.show();
    this.noteService.getNotes().subscribe((res:Note[])=>{
      console.log(res);
      this.notesData=res;
      this.spinner.hide();
    })
  }

  

  deleteNote(note:Note){
    let decision=confirm("Are You sure you want to delete this note...?");
    if(decision == true){
    this.noteService.deleteNote(note);

}  
}


getAllDetails(note:Note){
 
  this.noteDetails= note
  console.log(this.noteDetails);
  
}


updateNote() {
  const { value } = this.editForm;
  console.log(value);

  this.noteObj.note_title = value.edit_title;
  this.noteObj.note_dec = value.edit_description;

  this.noteService.updateNote(this.noteDetails, this.noteObj).then(() => {
    alert("Note updated successfully");
  });
  this.editForm.reset();
}


}
