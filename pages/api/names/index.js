import dbConnect from "../../../utils/dbConnect";
import Name from "../../../models/Name";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const searchedField = req.query.name;
        const names = await Name.find({
          name: { $regex: `^${searchedField}$` },
        }).sort({
          year: "asc",
        });

        res.status(200).json(names);
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
