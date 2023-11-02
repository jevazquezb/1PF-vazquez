import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  constructor() { }

  generateId() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 5)
  }
}
