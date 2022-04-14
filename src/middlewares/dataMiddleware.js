const validateData = (req, res, next) => {
  const data = req.body;

  const name = data.name?.trim?.() ?? "";
  if (title === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  next();
};

module.exports = {
  validateData,
};
