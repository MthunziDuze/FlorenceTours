const multer = require("multer");
const db = require("../models");
const ImageDBA = db.images;
const Vacation = db.vacation;
const path = require("path");
const configs = require("../configs/app.config");
imageName = "";

exports.create = async (req, res) => {
  const vacationId = req.headers.vacationid;
  if (!vacationId) {
    return res.status(501).send({ message: "invalid vacationId!!" });
  }

  const vacation = await Vacation.findOne({
    where: { id: vacationId },
  });

  if (req.files)
    if (!vacation)
      return res
        .status(403)
        .send({ message: "You need to save the vacation first!!" });

  const files = uploadImages(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    if (req.files.length < 1)
      return res
        .status(403)
        .send({ message: "You need to select images first!!" });

    const files = req.files;
    console.log(JSON.stringify(files));
    imageName = files[0].filename;

    const imagePath = configs.FRONTEND_ENDPOINT + "/images/" + imageName;

    const imageReq = {
      name: imageName,
      vacationId: vacationId,
      imagePath: imagePath,
    };

    ImageDBA.create(imageReq)
      .then((data) => {
        res.send(data);
        return;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Images cannot be saved" });
        return;
      });
  });
};

// exports.delete = async (req, res)=> {
//   const {id} = req.params.id;
//   const fileData = await File.findById
// }

exports.upload = async (req, res) => {
  uploadImages(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const files = req.files;
    imageName = files.filename;
    imagePath = files.path;
    console.log(JSON.stringify(files));
    res.json(files);
  });
};
const storage = multer.diskStorage({
  destination: path.join("./public/images/"),
  filename: function (req, file, cb) {
    imageName = Date.now() + path.extname(file.originalname);
    console.log(imageName);
    cb(null, imageName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 4000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg images allowed"));
    }
  },
});
const uploadImages = upload.array("image");
