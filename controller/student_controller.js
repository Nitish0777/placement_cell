import Student from "../models/student_detail.js";
import Company from "../models/company.js";
import Course from "../models/course_score.js";
import { Parser } from "json2csv";

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

export const createStudentScore = async (req, res) => {
  try {
    const { dsa, webdesign, react } = req.body;
    const newScore = new Course({
      dsa,
      webdesign,
      react,
    });
    await newScore.save();
    console.log("Student score saved", newScore);
    return res.redirect("back");
  } catch (error) {
    res.status(404).json({ message: error.message });
    return res.redirect("back");
  }
};

export const createCompanyData = async (req, res) => {
  try {
    const date = req.body.interviewDate.subString(0, 10);
    const { companyName, placementStatus, studentId } = req.body;
    const newCompany = new Company({
      companyName,
      date,
      placementStatus,
      studentIds: studentId,
    });
    await newCompany.save();
    console.log("Company data saved", newCompany);
    return res.redirect("back");
  } catch (error) {
    res.status(404).json({ message: error.message });
    return res.redirect("back");
  }
};

export const destroyStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    console.log("Student deleted");
    return res.redirect("back");
  } catch (error) {
    res.status(404).json({ message: error.message });
    return res.redirect("back");
  }
};

export const companyDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    return res.redirect("back");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const companyUpdate = async (req, res) => {
  try {
    let company = await Company.findByIdAndUpdate(
      req.body.id,
      {
        placementStatus: req.body.placementStatus,
      },
      { new: true }
    );

    return res.redirect("back");
  } catch (error) {
    res.status(404).json({ message: error.message });
    return res.redirect("back");
  }
};

export const csv = async (req, res) => {
  try {
    const company = await Company.find({}).populate("studentId");
    const fields = [
      "studentId.id",
      "studentId.name",
      "studentId.college",
      "studentId.batch",
      "studentId.courseId.dsa",
      "studentId.courseId.webdesign",
      "studentId.courseId.react",
      "companyName",
      "interviewDate",
      "placementStatus",
    ];
    const json2csvParser = new Parser({ fields, excelStrings: true });
    let csvFormat = "";
    for (comp of company) {
      let temp = await comp.populate("studentId.courseId");
      // console.log(temp);
      csvFormat += json2csvParser.parse(temp);
    }
    res.attachment("placement.csv");
    return res.send(csvFormat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
