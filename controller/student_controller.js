import Student from "../models/student_detail.js";
import Company from "../models/company.js";
import Course from "../models/course_score.js";

export const createStudentData = async (req, res) => {
  try {
    //   if (!req.isAuthenticated) {
    //     return res.redirect('/');
    // }
    const { name, email, contact, batch, college } = req.body;
    const existUser = Student.findOne({ email });
    if (existUser) {
      console.log("User already exists");
      return res.redirect("back");
    }
    const newStudent = new Student({
      name,
      email,
      contact,
      batch,
      college,
    });
    await newStudent.save();
    console.log("Student data saved", newStudent);
    return res.redirect("back");
  } catch (error) {
    res.status(404).json({ message: error.message });
    return res.redirect("back");
  }
};

export const getStudentList = async (req, res) => {
  try {
    const studentList = await Student.find();
    studentList.sort((a, b) => a.createdAt < b.createdAt) ? 1 : -1;
    return res.render("student-list", {
      studentList: studentList,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudentDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    const company = await Company.find({ student: id });
    const course = await Course.find({ student: id });
    return res.render("student-detail", {
      student: student,
      company: company,
      course: course,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
