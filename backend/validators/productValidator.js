const validateProduct = (req, res, next) => {
  const { name, description, price, status } = req.body;

  // Check if required fields are present and valid
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string." });
  }

  if (description && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string." });
  }

  if (typeof price !== "number" || isNaN(price)) {
    return res
      .status(400)
      .json({ error: "Price is required and must be a number." });
  }

  if (!status || typeof status !== "string") {
    return res
      .status(400)
      .json({ error: "Status is required and must be a string." });
  }

  // If all validations pass, proceed to the next middleware
  next();
};

module.exports = validateProduct;
