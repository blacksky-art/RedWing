import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../index.js";
import Flight from "../models/flightModel.js";

let mongoServer;

describe("Flight and Checklist API Tests", function () {
  this.timeout(20000);

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Flight.deleteMany({});
  });

  let flightId;
  let checklistItemId;

  // ----------------------------------------------------------
  // CREATE FLIGHT + ADD CHECKLIST
  // ----------------------------------------------------------
  it("should create a flight and add a checklist item", async () => {
    const res = await request(app)
      .post("/api/flights")
      .send({
        flightNumber: "AI101",
        filedBy: "Captain Allen",
      });

    // FIX: response is the flight directly
    flightId = res.body._id;

    const addChecklist = await request(app)
      .post(`/api/flights/${flightId}/checklist`)
      .send({
        checkName: "Engine check",
        status: "pending",
        comments: "Initial test",
      });

    // FIX: Router returns checklist array
    checklistItemId = addChecklist.body[0]._id;

    if (!addChecklist.body.length) throw new Error("Checklist not added");
  });

  // ----------------------------------------------------------
  // READ CHECKLIST ITEMS
  // ----------------------------------------------------------
  it("should read checklist items", async () => {
    await Flight.create({
      flightNumber: "AI202",
      filedBy: "John",
      checklist: [{ checkName: "Test", status: "pending" }],
    });

    const flight = await Flight.findOne({ flightNumber: "AI202" });

    const res = await request(app).get(`/api/flights/${flight._id}`);

    if (!res.body.checklist.length)
      throw new Error("Checklist items not found");
  });

  // ----------------------------------------------------------
  // UPDATE CHECKLIST ITEM
  // ----------------------------------------------------------
  it("should update a checklist item", async () => {
    const flight = await Flight.create({
      flightNumber: "AI303",
      filedBy: "Mary",
      checklist: [
        {
          checkName: "Fuel check",
          status: "pending",
          comments: "Initial",
        },
      ],
    });

    const itemId = flight.checklist[0]._id;

    const res = await request(app)
      .patch(`/api/flights/${flight._id}/checklist/${itemId}`)
      .send({
        status: "completed",
      });

    // FIX: API returns the item directly
    if (res.body.status !== "completed")
      throw new Error("Checklist not updated");
  });

  // ----------------------------------------------------------
  // DELETE FLIGHT
  // ----------------------------------------------------------
  it("should delete a flight", async () => {
    const flight = await Flight.create({
      flightNumber: "AI404",
      filedBy: "Sam",
    });

    const res = await request(app).delete(`/api/flights/${flight._id}`);

    // FIX: Correct message check
    if (res.body.message !== "Flight deleted successfully")
      throw new Error("Flight not deleted");
  });

});
