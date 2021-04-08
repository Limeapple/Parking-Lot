const Student = require("../model/Student");
const ParkingSpace = require("../model/ParkingSpace");
const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = {
  Query: {
    Students: async (_, __, context) => {
      try {
        let student;

        if (context.req && context.req.headers.authorization) {
          const token = context.req.headers.authorization.split("Bearer ")[1];
          jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
              throw new AuthenticationError("Unauthenticated");
            }
            student = decodedToken;
          });
        }

        const students = await Student.find({ id: { $ne: student.id } });
        return students;
      } catch (err) {
        throw err;
      }
    },

    login: async (_, args) => {
      const { id, password } = args;
      let errors = {};

      try {
        if (id.trim() === "") errors.id = "Id must not be empty";

        if (password.trim() == "") errors.password = "Password must not be empty";

        if (Object.keys(errors).length > 0) throw new UserInputError("Bad Input", { errors });

        const student = await Student.findOne({ id });

        if (!student) {
          errors.id = "Person not found";
          throw new UserInputError("Person not found", { errors });
        }

        const { firstName, lastName } = student;

        const correctPassword = await bcrypt.compare(password, student.password);

        if (!correctPassword) {
          errors.password = "Password is incorrect";
          throw new UserInputError("Incorrect password", { errors });
        }

        const token = jwt.sign({ id, firstName, lastName }, JWT_SECRET, { expiresIn: "1hr" });
        console.log(student);

        student.token = token;
        return student;
      } catch (err) {
        throw err;
      }
    },
    ParkingLotInfo: async (_, args) => {
      const parkingLot = await ParkingSpace.findOne();
      console.log(parkingLot);
      if (parkingLot) {
        return {
          id: parkingLot.id,
          ParkingSpaceID: parkingLot.ParkingSpaceID,
          ownerID: parkingLot.ownerID,
        };
      } else {
        let arr = [],
          arr2 = [];
        arr3 = [];
        for (let i = 0; i < 1000; i++) {
          (arr[i] = 0), (arr2[i] = 0);
          arr3[i] = "";
        }
        return { id: arr, ParkingSpaceID: arr2, ownerID: arr3 };
      }
    },
  },

  Mutation: {
    register: async (_, args) => {
      let { id, firstName, lastName, gradeLevel, password, confirmPassword } = args;
      let errors = {};

      try {
        if (id.trim() === "") errors.id = "ID must not be empty";

        if (firstName.trim() === "") errors.firstName = "First name must not be empty";

        if (lastName.trim() === "") errors.lastName = "Last name must not be empty";

        if (gradeLevel.trim() === "") errors.gradeLevel = "Grade level must not be empty";

        if (password.trim() === "") errors.password = "Password must not be empty";

        if (confirmPassword.trim() === "")
          errors.confirmPassword = "Confirm password must not be empty";

        if (password != confirmPassword) errors.confirmPassword = "Passwords do not match";

        const findStudentID = await Student.findOne({ id });

        if (findStudentID) errors.id = "ID is taken";

        if (Object.keys(errors).length > 0) throw errors;

        password = await bcrypt.hash(password, 6);

        const student = new Student({
          id,
          firstName,
          lastName,
          gradeLevel,
          password,
          confirmPassword,
        });

        student.save();

        return student;
      } catch (err) {
        throw new UserInputError("Bad Input", { errors: err });
      }
    },
    saveParkingLot: async (_, args) => {
      const { id, ownerID, ParkingSpaceID } = args;
      ParkingSpace.collection.drop();

      const parkingArray = new ParkingSpace({
        id,
        ownerID,
        ParkingSpaceID,
      });
      parkingArray.save();
      return { id, ownerID, ParkingSpaceID };
    },

    reserveParkingSpot: async (_, args) => {
      const { reserveSpot, id } = args;
      const parkingLot = await ParkingSpace.findOne();
      for (let i = 0; i < reserveSpot.length; i++) {
        if (reserveSpot[i] === "reserve") parkingLot.ownerID[i] = id;
        if (reserveSpot[i] === id)
          return "Registration failed, you've already reserved a parking space";
      }

      const parkingArray = new ParkingSpace({
        id: parkingLot.id,
        ownerID: parkingLot.ownerID,
        ParkingSpaceID: parkingLot.ParkingSpaceID,
      });
      ParkingSpace.collection.drop();

      parkingArray.save();
      return "Parking space reserved";
    },

    unregisterParkingSpot: async (_, args) => {
      const { reserveSpot, id } = args;
      const parkingLot = await ParkingSpace.findOne();
      for (let i = 0; i < reserveSpot.length; i++) {
        if (reserveSpot[i] === id) parkingLot.ownerID[i] = "";
      }

      const parkingArray = new ParkingSpace({
        id: parkingLot.id,
        ownerID: parkingLot.ownerID,
        ParkingSpaceID: parkingLot.ParkingSpaceID,
      });
      ParkingSpace.collection.drop();

      parkingArray.save();
      return "Parking space unregistered";
    },
  },
};
