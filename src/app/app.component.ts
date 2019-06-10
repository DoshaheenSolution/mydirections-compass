import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { environment } from '../environments/environment';
import { isPlatformBrowser,isPlatformServer, DOCUMENT } from '@angular/common';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'My Direction Compass';
  test = [];
  readMarkers: latLong[];
  markerDataPlot: latLong[];
  errMsg: string;
  isMapMe: boolean;
  isBrowser;

  public ngOnInit(): void {
    this.readMarkers = new Array();
    if (!isPlatformBrowser(this.platformId)) {
      let bases = this.document.getElementsByTagName('base');

      if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
      }
    }

    // Default location
    let defautMarker = new latLong;
    defautMarker.lat = 34.066728;
    defautMarker.lng = -118.407056;
    this.readMarkers.push(defautMarker);
    this.markerDataPlot = this.readMarkers;

  }

  constructor(@Inject(PLATFORM_ID) private platformId, @Inject(DOCUMENT) private document: any, private papa: PapaParseService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  handleFileSelect(evt) {
    this.readMarkers = new Array();
    var files = evt.target.files; // FileList object
    var reader = new FileReader();

    if (files.length > 0 && evt.target.value.split('.').pop() == 'csv') {
      this.isMapMe = true;
      this.errMsg = "";
      var file = files[0];
      reader.readAsText(file);
      reader.onload = (event: any) => {
        var csv = event.target.result; // Content of CSV file
        this.papa.parse(csv, {
          skipEmptyLines: true,
          header: true,
          complete: (results) => {
            for (const iterator of results.data) {
              let readSingleMarker = new latLong;
              readSingleMarker.lat = iterator.device_lat;
              readSingleMarker.lng = iterator.device_long;
              this.readMarkers.push(readSingleMarker);
            }
          }
        });
      }
    }
    else if(files.length > 0 && evt.target.value.split('.').pop() != 'csv') {
      this.isMapMe = false;
      this.errMsg = "Only .CSV files are allowed to be uploaded."
    }
  }
  
  //function which gets called when Map me button is click
  loadMapMarkers() {
    this.markerDataPlot = this.readMarkers;
  }
}

class latLong {
  lat: number;
  lng: number;
}