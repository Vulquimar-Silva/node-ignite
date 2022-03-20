import { Request, Response } from 'express';
import CreateCouserService from './CreateCourseService';

export function createCourse(request: Request, response: Response) {

  CreateCouserService.execute({
    name: "NodeJS",
    educator: "Dani",
    duration: 10,
  });

  CreateCouserService.execute({
    name: "ReactJS",
    educator: "Diego",
  });

  return response.send();
}
