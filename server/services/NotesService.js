import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async getAll(userEmail) {
    return await dbContext.Notes.find({ creatorEmail: userEmail }).populate(
      "creator",
      "name picture"
    );
  }

  async getNotesByBugId(id, userEmail) {
    let data = await dbContext.Notes.find({
      bugId: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
    return data;
  }

  async create(rawData) {
    let data = await dbContext.Notes.create(rawData);
    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Notes.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Notes.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
  }
}

export const notesService = new NotesService();
