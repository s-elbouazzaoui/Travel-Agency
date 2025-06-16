import { TestBed } from '@angular/core/testing';

import { UserserviceAdminService } from './userservice-admin.service';

describe('UserserviceAdminService', () => {
  let service: UserserviceAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserserviceAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
