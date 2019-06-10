import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { LatLng } from '@agm/core';
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral } from '@agm/core';
import { MapDirectionService } from '../map-direction.service';
import { Observable, Subscriber } from 'rxjs';

declare var require: any;

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit, OnChanges {

  constructor(private directionService: MapDirectionService) { }

  lat: number;
  lng: number;
  findChar = ["N", "S", "E", "W"];
  substituteStr = [' North', ' South', ' East', ' West'];
  finalCompassDirection: string;
  dirExist: boolean = false;

  @Input()
  mappingPoints: LatLng[];

  ngOnInit() {
    this.lat = +this.mappingPoints[0].lat;
    this.lng = +this.mappingPoints[0].lng;
    this.dirExist = false;
  }

  ngOnChanges() {
    let d2d = require('degrees-to-direction');
    this.lat = +this.mappingPoints[0].lat;
    this.lng = +this.mappingPoints[0].lng;
    const mappingPointsLength = this.mappingPoints.length - 1;

    const getGPSBearingDegrees = this.directionService.getBearingDegrees(this.lat, this.lng,
      +this.mappingPoints[mappingPointsLength].lat, +this.mappingPoints[mappingPointsLength].lng)
    if (mappingPointsLength <= 1) {
      this.dirExist = false;
    }
    this.dirExist = true;

    const degtodir = d2d(getGPSBearingDegrees);
    this.finalCompassDirection = this.getDirectionText(degtodir);  // get final direction text to display 

  }

  replaceStr(str, find, replace) {
    for (var i = 0; i < find.length; i++) {
      str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
    }
    return str;
  }

  // function to convert replace string as per input
  getDirectionText(dirVal: string) {
    return this.replaceStr(dirVal, this.findChar, this.substituteStr);
  }

}
