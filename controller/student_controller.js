import Student from "../models/student_detail.js";

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
