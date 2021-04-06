import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'new-orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];
  constructor() {
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
   
    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
          
          let fetchedSatellites = data.satellites;
          for(let i =0 ; i < fetchedSatellites.length; i++){
            console.log(fetchedSatellites[i]);
            let newSatellite = new Satellite(
              fetchedSatellites[i].name,
              fetchedSatellites[i].type,
              fetchedSatellites[i].launchDate,
              fetchedSatellites[i].orbitType,
              fetchedSatellites[i].operational,
              
            )
            if(fetchedSatellites[i].type === "Space Debris"){
              
            }
            this.sourceList.push(newSatellite);
          }
            
          this.displayList = this.sourceList.slice(0);
       }.bind(this));
      }.bind(this));
    } 
    ngOnInit() { }
    search(searchTerm: string): void {
      let matchingSatellites: Satellite[] = [];
      searchTerm = searchTerm.toLowerCase();
      for(let i=0; i < this.sourceList.length; i++) {
         let name = this.sourceList[i].name.toLowerCase();
         if (name.indexOf(searchTerm) >= 0) {
            matchingSatellites.push(this.sourceList[i]);
         }
      }
      // assign this.displayList to be the array of matching satellites
      // this will cause Angular to re-make the table, but now only containing matches
      this.displayList = matchingSatellites;
   }
  }