"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const studentSchema_1 = require("../zodSchema/studentSchema");
exports.studentRoute = (0, express_1.default)();
let studentArr = [
    {
        id: "1234",
        name: "nasser",
        major: "CS",
        level: 3,
        GPA: 3.5,
    },
];
exports.studentRoute.get(`/`, (req, res) => {
    return res.json(studentArr);
});
exports.studentRoute.post(`/`, (0, validate_1.default)(studentSchema_1.studentSchema), (req, res) => {
    const newStudent = req.body;
    studentArr.push(newStudent);
    return res.json({
        message: "student has been added !",
    });
});
exports.studentRoute.put(`/:id`, (0, validate_1.default)(studentSchema_1.studentSchema), (req, res) => {
    const { id } = req.params;
    const UpdatedStudent = req.body;
    studentArr.map((std) => {
        if (std.id === id) {
            let newObj = JSON.stringify(UpdatedStudent);
            std = JSON.parse(newObj);
            return res.json({
                message: "student has been updated !",
            });
        }
        else {
            return res.json({
                message: "student isn't valid !",
            });
        }
    });
});
exports.studentRoute.delete(`/:id`, (req, res) => {
    const { id } = req.params;
    const deleteStudent = studentArr.filter((del) => {
        return del.id !== id;
    });
    studentArr = deleteStudent;
    return res.json({
        message: "student has been deleted !",
    });
});
exports.studentRoute.get(`/search/:id`, (req, res) => {
    const { id } = req.params;
    studentArr.map((search) => {
        if (search.major === id) {
            return res.json(search);
        }
        else {
            return res.json({
                message: "soory the major isn't valid !",
            });
        }
    });
});
exports.studentRoute.put(`/editlevel/:id/:nextlevel`, (req, res) => {
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
        }
        else {
            return res.json({
                message: "the id incorrect",
            });
        }
    });
});
