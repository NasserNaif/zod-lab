import express, { json } from "express";
import validate from "../middleware/validate";
import { studentSchema, studentType } from "../zodSchema/studentSchema";

export const studentRoute = express();

let studentArr: studentType[] = [
  {
    id: "1234",
    name: "nasser",
    major: "CS",
    level: 3,
    GPA: 3.5,
  },
];

// get
studentRoute.get(`/`, (req, res) => {
  return res.json(studentArr);
});

// post
studentRoute.post(`/`, validate(studentSchema), (req, res) => {
  const newStudent = req.body as studentType;
  studentArr.push(newStudent);

  return res.json({
    message: "student has been added !",
  });
});

// update
studentRoute.put(`/:id`, validate(studentSchema), (req, res) => {
  const { id } = req.params;
  const UpdatedStudent = req.body as studentType;
  studentArr.map((std) => {
    if (std.id === id) {
      let newObj = JSON.stringify(UpdatedStudent);
      std = JSON.parse(newObj);

      return res.json({
        message: "student has been updated !",
      });
    } else {
      return res.json({
        message: "student isn't valid !",
      });
    }
  });
});

// delete
studentRoute.delete(`/:id`, (req, res) => {
  const { id } = req.params;
  const deleteStudent = studentArr.filter((del) => {
    return del.id !== id;
  });
  studentArr = deleteStudent;

  return res.json({
    message: "student has been deleted !",
  });
});

// search by major
studentRoute.get(`/search/:id`, (req, res) => {
  const { id } = req.params;
  studentArr.map((search) => {
    if (search.major === id) {
      return res.json(search);
    } else {
      return res.json({
        message: "soory the major isn't valid !",
      });
    }
  });
});

// next level Func
studentRoute.put(`/editlevel/:id/:nextlevel`, (req: any, res) => {
  const id = req.params.id;
  const nextlevel = Number(req.params.nextlevel);
  studentArr.map((edit) => {
    if (edit.id === id) {
      edit.id = edit.id;
      edit.major = edit.major;
      edit.level = nextlevel;
      edit.GPA = edit.GPA;
      edit.name = edit.name;
      return res.json({
        message: "level is updated !",
      });
    } else {
      return res.json({
        message: "the id incorrect",
      });
    }
  });
});
