import { TestBed } from '@angular/core/testing';

import { JudoService } from './judo.service';

describe('JudoService', () => {
  let service: JudoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JudoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
