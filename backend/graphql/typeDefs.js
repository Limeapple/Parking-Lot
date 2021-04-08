const { gql } = require("apollo-server");

module.exports = gql`
  type Student {
    id: String!
    firstName: String!
    lastName: String!
    password: String!
    gradeLevel: String!
    token: String
  }

  type Admin {
    id: String!
    firstName: String!
    lastName: String!
    password: String!
    token: String
  }

  input ParkingSpaces {
    id: Int!
    ownerID: String!
  }

  type ParkingLot {
    id: [Int]!
    ownerID: [String]!
    ParkingSpaceID: [Int]
  }

  type Query {
    ParkingLotInfo: ParkingLot
    StudentList: [Student]!
    Students: [Student]!
    Admins: [Admin]!
    login(id: String!, password: String!): Student!
  }

  type Mutation {
    register(
      id: String!
      firstName: String!
      lastName: String!
      gradeLevel: String!
      password: String!
      confirmPassword: String!
    ): Student!
    saveParkingLot(id: [Int]!, ownerID: [String]!, ParkingSpaceID: [Int]!): ParkingLot!
    reserveParkingSpot(reserveSpot: [String]!, id: String!): String!
    unregisterParkingSpot(reserveSpot: [String]!, id: String!): String!
  }
`;
