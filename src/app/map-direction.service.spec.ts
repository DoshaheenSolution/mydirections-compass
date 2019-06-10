import { TestBed } from '@angular/core/testing';

import { MapDirectionService } from './map-direction.service';

describe('MapDirectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapDirectionService = TestBed.get(MapDirectionService);
    expect(service).toBeTruthy();
  });
});
