import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PapaParseModule } from 'ngx-papaparse';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AgmCoreModule } from '@agm/core';
import { MyMapComponent } from './my-map/my-map.component';
import { MapDirectionService } from './map-direction.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    MyMapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule, PapaParseModule, CommonModule,
    TransferHttpCacheModule, HttpClientModule, NgtUniversalModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJjo71QcNqCXbOP2ISZxSDWrNG0nZl8Bs ' // Google Maps API Key
    }),
    AngularFontAwesomeModule
  ],
  providers: [MapDirectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

