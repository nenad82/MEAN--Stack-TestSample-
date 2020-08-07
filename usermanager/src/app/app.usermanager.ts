import { Component , OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MongoService } from './mongo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.usermanager.html',
  styleUrls: ['./app.usermanager.css']
})

export class AppComponent {

    @ViewChild('search_role') search_role: ElementRef;
    @ViewChild('search_text') search_text: ElementRef;

    roleValues;
    searchValues;
    userList; 
    title       = 'User Management';
    editId      = '';
    deleteId    = '';
    newItem     = false;
    errMsg      = '';
    constructor(private dbService: MongoService){ 
        this.roleValues = ['Artist' , 'Designer', 'Art Manager'];
        this.searchValues = ['All' , 'Artist' , 'Designer', 'Art Manager'];
        this.select = new EventEmitter();
    }

    @Output()
    select:EventEmitter<string>;

    ngOnInit(){
        this.dbService.GetUser().subscribe(data => this.userList = data)
      
    }

    onSearch()
    {
        let search_str = this.search_text.nativeElement.value;
        let role_str = this.search_role.nativeElement.value;
        let like_str;
        if(role_str=='All')
            like_str = {$or:[{firstname:{ $regex:search_str}} , {lastname:{ $regex:search_str}} , {email:{ $regex:search_str}}]};
        else
            like_str = {$or:[{firstname:{ $regex:search_str}} , {lastname:{ $regex:search_str}} , {email:{ $regex:search_str}}], role:{ $regex:role_str} };
      
        this.userList = [];
        this.dbService.FindUser(like_str)
            .subscribe(data => {
                data.forEach(element => {
                    this.userList.push(element);
                });
            })
    }

    onChangeSearchRole(value)
    {
        this.onSearch();
    }

    onSelectRole(value)
    {
        this.select.emit(value);   
    }

    onNew  = function()
    {
        this.newItem = true;
        this.editId = '';
        this.errMsg = '';
    }

    onEdit = function(id)
    {
        if(this.editId != '')
        {
            this.editId  = '';
            return;
        }
        this.newItem = false;
        this.editId = id;
        this.errMsg = '';
    }

    onDelete = function(id)
    {
        this.dbService.DeleteUser(id)
        .subscribe(data => {
            console.log(data);
            this.ngOnInit();
        })
        this.errMsg = '';
        this.editId = '';
        this.newItem = false;
    }

    onSave = function(user)
    {
        let name_regexp = new RegExp('[0-9-]');
        let email_regexp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/m);

        if(name_regexp.test(user.firstname) == true || name_regexp.test(user.lastname) == true)
        {
            this.errMsg = "The name should be made with only characters. ";
            return;
        }

        if(email_regexp.test(user.email) == false )
        {
            this.errMsg = "Email format is invalid.";
            return;
        }

        
        if(user.id !== undefined)
        {
            this.dbService.UpdateUser({id:user.id, firstname:user.firstname, lastname:user.lastname, email:user.email, role:user.role})
            .subscribe(data => {
                this.ngOnInit();
            })
            
        }
        else
        {
            this.dbService.SaveUser({firstname:user.firstname, lastname:user.lastname, email:user.email, role:user.role})
            .subscribe(data => {
                this.ngOnInit();
            })
        }

        this.errMsg = '';
        this.editId = '';
        this.newItem = false;
    }



}