const path = require("path");
const fs = require("fs");

// return list of PYQs for a department
exports.getPyqsByDept = (req, res) => {
  const dept = req.params.dept; // e.g. cse
  const folderPath = path.join(__dirname, "../PYQ", dept);

  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(404).json({ message: "No files found" });

    res.json({ department: dept, files });
  });
};

// download one file
exports.downloadPyq = (req, res) => {
  const { dept, filename } = req.params;
  const filePath = path.join(__dirname, "../pyq", dept, filename);

  res.download(filePath, filename, (err) => {
    if (err) res.status(404).send("File not found!");
  });
};
