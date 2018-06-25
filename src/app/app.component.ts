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
  items = [{ name: "archie", age:23, menager: [{name: "Bill"}] }, { name: "jake", age:25 }, { name: "richard", age:30 , manager:[{empl:"Jhon"}, {empl:"Dixy"}]}];
  stuff: any;
  //items : Employee[]=[];

  constructor(private dataService: DataService ){ }


  ngOnInit(){
    //this.items = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  //  this.showConfig();
  }
 
  showConfig() {
 /*   this.dataService.getConfig()
      .subscribe((data : Employee) => this.items = {
          name: data['name'],
          gender:  data['gender'],
          company: data['company'],
          age: data['age']
      });*/
      this.dataService.getConfig()
      .subscribe( data => {
        this.stuff = data;
        //console.log(data)
        this.items = this.stuff ;
        }
      )
  }

}
