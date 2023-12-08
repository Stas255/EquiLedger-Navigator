import { TestBed } from '@angular/core/testing';

import { ElectronRenderService } from './electron-render.service';

describe('ElectronRenderService', () => {
  let service: ElectronRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
