export interface Teacher {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Test {
  id: string;
  title: string;
  url: string;
  slug: string;
  teacherId: string;
  createdAt: string;
  attempts: Attempt[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  uid: string;
  createdAt: string;
}

export interface Attempt {
  id: string;
  startedAt: string;
  finishedAt?: string;
  testId: string;
  studentId: string;
  student: Student;
  test: Test;
  tabSwitchCount: number;
  fullscreenExitCount: number;
  multipleFacesCount: number;
  phoneDetectionCount: number;
}

export interface ViolationType {
  TAB_SWITCH: 'TAB_SWITCH';
  FULLSCREEN_EXIT: 'FULLSCREEN_EXIT';
  MULTIPLE_FACES: 'MULTIPLE_FACES';
  PHONE_DETECTION: 'PHONE_DETECTION';
}
