import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Employee } from './employee';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  //items: Employee[]= [];
  //items  = [{ name: "archie", age:25 }, { name: "jake", age:25 }, { name: "richard", age:30 , manager:[{empl:"Jhon"}, {empl:"Dixy"}]}];
  items : Employee[];
  items2 : Employee[]=[];
  items3 : Employee[]=[];
  items4 : Employee[];
  filt: string = '';
  one : Employee;

  rxlist: Employee[]=[];
  errorMessage: string;

  //source: LocalDataSource;
  source = new LocalDataSource();

  settings = {
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-check-square"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle"></i>',
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
      saveButtonContent: '<i class="fa fa-check-square"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o" aria-hidden="true"></i>'
      //confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        filter: false
      },
      name: {
        title: 'Full Name',
        filter: false
      },
      phone: {
        title: 'Phone',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      },
      isActive: {
        title: "Enable",
        filter: false
      }
    }
  };

  constructor(private dataService: DataService ){ }

  ngOnInit(){
  //  this.items = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
    //this.showADUsersList();
    this.showADUsersListPromise();
  }
 
  showADUsersList() {
 /*   this.dataService.getConfig()
      .subscribe((data : Employee) => this.items = {
          name: data['name'],
          gender:  data['gender'],
          company: data['company'],
          age: data['age']
      });*/
      this.dataService.getADUsers()
      .subscribe( data => {
        //console.log(data)
        this.items = data;
        this.items3 = data;
        this.one = data[0]
        this.source = new LocalDataSource(this.items)
        //this.source.load(data);
        }
      )
  }

  onCustom(event: any){
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
  }

  showADUsersListPromise() {
    this.dataService.getData().then((data) => {this.source.load(data);this.items = data;})
  }

  onSearch(query: string = '') {
    //console.log(query)
    if (query === '') { this.showADUsersList(); }
    //if (query === '') { this.source.load(this.items); }
    //if (query === '') { this.showADUsersListPromise(); }
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'name',
        search: query
      },
      {
        field: 'phone',
        search: query
      },
      {
        field: 'email',
        search: query
      },
      {
        field: 'isActive',
        search: query
      }
    ], false); 
  }

  refresh() {this.showADUsersListPromise()}

  editFilter() {
    var regex = new RegExp('('+this.filt+')', 'gi');
    this.items2 = this.items.filter(res => res.name.match(regex)) // work res.name.match(/(d)/gi)
    //console.log(JSON.stringify(this.items2));
  }

  findAll() {
    this.items2 = [];
    var regex = new RegExp('('+this.filt+')', 'gi');
    let a = this.items.filter(res => res.name.match(regex));
    let b = this.items.filter(res => res.age.toString().match(this.filt));
    //console.log(a, b);
    this.items2 = [...this.items2, ...a, ...b];
    //console.log(this.items2);
  }

  getRx() {
    this.dataService.getRx()
        .then(rxlist => {
                this.rxlist = rxlist;
                if (this.rxlist.length === 0) {
                    this.errorMessage = 'There are no prescriptions you have created so far!';
                }
            },
            error =>  {
                //this.router.navigateByUrl('/auth/login');
                console.error('An error occurred in retrieving rx list, navigating to login: ', error);
            });
  }

  getArray(){
    this.items4 = <Employee[]>this.dataService.getArray();
  }

  allFields(){
    const objectKeys = Object.keys(this.one) as Array<keyof Employee>;
    for (let key of objectKeys)
    {
       console.log('key:' + key);
    }
  }
}
