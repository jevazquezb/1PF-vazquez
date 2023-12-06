import { Course } from "../course-table/course-table.model";
import { StudentsModel } from "../student-table/student-table.model";

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  student?: StudentsModel;
  course?: Course;
}