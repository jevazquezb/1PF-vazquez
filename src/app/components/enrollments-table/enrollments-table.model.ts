import { CourseClass } from "../class-table/class-table.model";
import { Course } from "../course-table/course-table.model";
import { StudentsModel } from "../student-table/student-table.model";

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  classId: number;
  student?: StudentsModel;
  course?: Course;
  class?: CourseClass;
}

export interface EnrollmentPayload {
  studentId: number | null;
  courseId: number | null;
  classId: number | null;
}