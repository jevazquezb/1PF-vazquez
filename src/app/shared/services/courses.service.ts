import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Course } from 'src/app/components/course-table/course-table.model';
import { IdService } from './id.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[] = [
    {
      id: this.idService.generateId(),
      name: 'Desarrollo web',
      startDate: new Date(),
      endDate: new Date(),
      description: 'En este curso aprenderás a crear tu sitio web partiendo del prototipo en papel. Te sumergirás en las mejores prácticas del desarrollo web, trabajando con HTML y CSS. Conocerás herramientas para optimizar al máximo tu sitio web, implementando prácticas de versionado de código con GIT, y preprocesadores como SASS. Al finalizar, sabrás cómo aplicar Bootstrap a tus proyectos, y comprenderás lo importante del SEO en tus desarrollos. Subirás tu sitio a un servidor, y aprenderás a interactuar con este servicio. También sabrás cómo presentar un presupuesto y atender a tu cliente final.'
    },
    {
      id: this.idService.generateId(),
      name: 'Javascript',
      startDate: new Date(),
      endDate: new Date(),
      description: 'En este curso aprenderás los fundamentos del lenguaje de programación más usado en la actualidad, con el cual es posible crear aplicaciones de todo tipo. Explorarás inicialmente herramientas propias del mismo, indagando casos prácticos de aplicación. Reconocerás la utilidad de las librerías estudiando jQuery, y cómo aplicar técnicas de desarrollo para apps modernas con AJAX. Al graduarte, estarás en condiciones de crear soluciones web interactivas, y trasladar los conocimientos del curso a cualquier framework JavaScript.'
    },
    {
      id: this.idService.generateId(),
      name: 'Angular',
      startDate: new Date(),
      endDate: new Date(),
      description: 'Aprenderás a crear y mantener aplicaciones web en una sola página con Angular. A través de este framework para aplicaciones web, trabajarás con HTML y TypeScript, pudiendo generar desde el prototipo hasta la implementación completa de una aplicación.'
    },
    {
      id: this.idService.generateId(),
      name: 'Ruby',
      startDate: new Date(),
      endDate: new Date(),
      description: 'Un lenguaje de programación dinámico y de código abierto enfocado en la simplicidad y productividad. Su elegante sintaxis se siente natural al leerla y fácil al escribirla.'
    },
    {
      id: this.idService.generateId(),
      name: 'Ruby on Rails',
      startDate: new Date(),
      endDate: new Date(),
      description: 'Es un framework de aplicaciones web de código abierto escrito en el lenguaje de programación Ruby, siguiendo el paradigma del patrón Modelo Vista Controlador (MVC). Trata de combinar la simplicidad con la posibilidad de desarrollar aplicaciones del mundo real escribiendo menos código que con otros frameworks y con un mínimo de configuración.'
    },
    {
      id: this.idService.generateId(),
      name: 'Python',
      startDate: new Date(),
      endDate: new Date(),
      description: 'En este curso aprenderás las bases de programación uno de los lenguajes más populares en estos tiempos. Partirás desde sus fundamentos, para luego abarcar módulos y sintaxis, hasta el uso de reglas para crear tus primeras aplicaciones. Incorporarás los conocimientos necesarios de Class-Based-View, login - register - accounts, CRUD y modelforms. Desarrollarás una aplicación web estilo blog de la mano de Python en Django Framework.'
    },
  ];

  constructor(private idService: IdService) { }

  getCourses$(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById$(id: string): Observable<Course | undefined> {
    return of(this.courses.find((c) => c.id === id));
  }

  createCourse$(course: Course): Observable<Course[]> {
    this.courses.push(course);
    return of([...this.courses]);
  }

  removeCourse$(courseId: string): Observable<Course[]> {
    this.courses = this.courses.filter(course => course.id !== courseId);
    return of([...this.courses]);
  }

  editCourse$(editedCourse: Course): Observable<Course[]> {
    this.courses = this.courses.map(course => course.id === editedCourse.id ? { ...course, ...editedCourse } : course);
    return of([...this.courses]);
  }
}
