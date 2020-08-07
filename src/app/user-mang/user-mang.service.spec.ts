import { TestBed } from '@angular/core/testing';

import { UserMangService } from './user-mang.service';

describe('UserMangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMangService = TestBed.get(UserMangService);
    expect(service).toBeTruthy();
  });
});
