import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClassesService } from './classes.service';

describe('ClassesService', () => {
  let service: ClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
