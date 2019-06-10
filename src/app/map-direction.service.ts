import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapDirectionService {

  constructor() { }

  // This formula is for the initial bearing (sometimes referred to as forward azimuth) which if followed in a straight line along a great-circle arc will take you from the start point to the end point
  getBearingDegrees(lat1: number, lng1: number, lat2: number, lng2: number) {
    const y = Math.sin(lng2 - lat1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lat1);
    let brng = Math.round(Math.atan2(y, x) * (180 / Math.PI));
    //correct the negative degrees values
    if (brng < 0) {
      brng = 360 - Math.abs(brng);
    }
    return brng; //return bearing value in degrees    
  }
}
