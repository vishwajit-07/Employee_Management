// import mongoose from "mongoose";

// const EmployeeSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   address: String,
//   experience: Number,
//   lastCompany: String,
//   resignationDate: Date,
//   joiningDate: Date,
//   history: [{ field: String, oldValue: String, newValue: String, date: Date }],
// });

// export default mongoose.model("Employee", EmployeeSchema);

import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    lastCompany: {
      type: String,
      required: true,
    },
    resignationDate: {
      type: Date,
      default: null, // Allows null if the employee hasn't resigned
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    history: [
      {
        field: { type: String, required: true },
        oldValue: { type: mongoose.Schema.Types.Mixed, required: true },
        newValue: { type: mongoose.Schema.Types.Mixed, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

export const Employee = mongoose.model("Employee", EmployeeSchema);


// import mongoose from "mongoose";

// const employeeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   address: { type: String, required: true },
//   experience: { type: Number, required: true },
//   lastWorkCompany: { type: String, required: true },
//   dateOfResignation: { type: Date, required: true },
//   joiningDate: { type: Date, required: true },
//   changeHistory: [
//     {
//       updatedAt: { type: Date, default: Date.now },
//       previousData: { type: Object },
//     },
//   ],
// });

// export default mongoose.model("Employee", employeeSchema);
