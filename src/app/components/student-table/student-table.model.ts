export interface StudentsModel {
  id: number,
  name: string,
  lastName: string,
  active?: boolean,
  grades: number,
  age: number,
  fees?: number
}

export interface Data {
  students: StudentsModel[];
}
