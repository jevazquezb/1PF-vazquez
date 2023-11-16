import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Course } from 'src/app/components/course-table/course-table.model';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpClient: HttpClient
  let sample: Course[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });

    service = TestBed.inject(CoursesService);
    httpClient = TestBed.inject(HttpClient);
    
    sample = [
      {
        id: 1,
        name: 'Desarrollo web',
        startDate: new Date(),
        endDate: new Date(),
        description: 'En este curso aprenderás a crear tu sitio web partiendo del prototipo en papel. Te sumergirás en las mejores prácticas del desarrollo web, trabajando con HTML y CSS. Conocerás herramientas para optimizar al máximo tu sitio web, implementando prácticas de versionado de código con GIT, y preprocesadores como SASS. Al finalizar, sabrás cómo aplicar Bootstrap a tus proyectos, y comprenderás lo importante del SEO en tus desarrollos. Subirás tu sitio a un servidor, y aprenderás a interactuar con este servicio. También sabrás cómo presentar un presupuesto y atender a tu cliente final.'
      },
      {
        id: 2,
        name: 'Javascript',
        startDate: new Date(),
        endDate: new Date(),
        description: 'En este curso aprenderás los fundamentos del lenguaje de programación más usado en la actualidad, con el cual es posible crear aplicaciones de todo tipo. Explorarás inicialmente herramientas propias del mismo, indagando casos prácticos de aplicación. Reconocerás la utilidad de las librerías estudiando jQuery, y cómo aplicar técnicas de desarrollo para apps modernas con AJAX. Al graduarte, estarás en condiciones de crear soluciones web interactivas, y trasladar los conocimientos del curso a cualquier framework JavaScript.'
      },
      {
        id: 3,
        name: 'Angular',
        startDate: new Date(),
        endDate: new Date(),
        description: 'Aprenderás a crear y mantener aplicaciones web en una sola página con Angular. A través de este framework para aplicaciones web, trabajarás con HTML y TypeScript, pudiendo generar desde el prototipo hasta la implementación completa de una aplicación.'
      }    
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCourses$() should get an observable with courses', () => {
    const spyOnHttpGet = spyOn(httpClient, 'get').and.returnValue(of(sample));
    service.getCourses$().subscribe({
      next: (courses) => {
        expect(courses).toEqual(sample);
      }
    });
    expect(spyOnHttpGet).toHaveBeenCalledTimes(1);
  });

  it('createCourses$() should get an observable with a new course added to the list', (done: DoneFn) => {
    expect(sample.length).toBe(3);

    const createdCourse = {
      id: 4,
      name: 'Created Course',
      startDate: new Date(),
      endDate: new Date(),
      description: 'This is a new course.'
    };
    sample.push(createdCourse);

    const spyOnHttpPost = spyOn(httpClient, 'post').and.returnValue(of(createdCourse));
    const spyOnHttpGet = spyOn(httpClient, 'get').and.returnValue(of(sample));
    service.createCourse$(createdCourse).subscribe({
      next: (courses) => {
        expect(courses).toEqual(sample);
        done();
        expect(courses.length).toBe(4);
      }
    });
    expect(spyOnHttpPost).toHaveBeenCalledTimes(1);
    expect(spyOnHttpGet).toHaveBeenCalledTimes(1);
  });

  it('editCourse$() should get an observable with an edited course in the list', () => {
    const editedCourse = { ...sample[1] };
    editedCourse.name = 'Edited javascript'
    editedCourse.description = 'This is my edited description.'

    sample = sample.map(course => course.id !== editedCourse.id ? course : editedCourse);

    const spyOnHttpPut = spyOn(httpClient, 'put').and.returnValue(of(editedCourse));
    const spyOnHttpGet = spyOn(httpClient, 'get').and.returnValue(of(sample));
    service.editCourse$(editedCourse).subscribe({
      next: (courses) => {
        expect(courses).toEqual(sample);
        expect(courses.length).toBe(3);
      }
    });
    expect(spyOnHttpPut).toHaveBeenCalledTimes(1);
    expect(spyOnHttpGet).toHaveBeenCalledTimes(1);
  });

  it('removeCourse$() should get an observable with a deleted course from the list', () => {
    const removedCourse = sample.shift();

    const spyOnHttpDelete = spyOn(httpClient, 'delete').and.returnValue(of({}));
    const spyOnHttpGet = spyOn(httpClient, 'get').and.returnValue(of(sample));
    service.removeCourse$(removedCourse.id).subscribe({
      next: (courses) => {
        expect(courses).toEqual(sample);
        expect(courses.length).toBe(2);
      }
    });
    expect(spyOnHttpDelete).toHaveBeenCalledTimes(1);
    expect(spyOnHttpGet).toHaveBeenCalledTimes(1);
  });
});
