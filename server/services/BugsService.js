import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class BugsService {
  async getAll(userEmail) {
    // return await dbContext.Bugs.find({ creatorEmail: userEmail }).populate("creator", "name picture")
    return await dbContext.Bugs.find()
  }

  async getById(id, userEmail) {
    let data = await dbContext.Bugs.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this Task");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Bugs.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this Task");
    }
  }

  async getNotesByBugId(id, email) {
    let data = await dbContext.Bugs.find({ bugId: id, creatorEmail: email })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

}




export const bugsService = new BugsService()