import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Employee } from './employee';

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
  items3 : Employee[];
  filt: string = '';

  rxlist: any[];
  errorMessage: string;

  constructor(private dataService: DataService ){ }

  ngOnInit(){
  //  this.items = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
    this.showADUsersList();
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
        }
      )
  }

  editFilter() {
    var regex = new RegExp('('+this.filt+')', 'gi');
    this.items2 = this.items.filter(res => res.name.match(regex)) // work res.name.match(/(d)/gi)
    //console.log(JSON.stringify(this.items2));
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

}
