const router = require("express").Router();
const { Rate } = require("../../db/models");

router.delete("/:rateId", async (req, res, next) => {
    let rateId = req.params.rateId;
    try {
      let rate = await Rate.findByPk(rateId);
      if (req.user.rank > 3) {
        return res.status(403).json({
          message: "User does not have permission to edit this item",
        });
      }
      await rate.destroy()
      res.json({ message: "Successfully deleted item" });
    } catch (error) {
      res.json(await error)
    }
  });

router.put("/:rateId", async (req, res, next) => {
  let rateId = req.params.rateId;
  const body = req.body;
  try {
    let rate = await Rate.findByPk(rateId);
    if (req.user.rank < 3) {
      return res.status(403).json({
        message: "User does not have permission to edit this item",
      });
    }
    await rate.update(body)
    return res.json(rate);
  } catch (error) {
    res.json(await error)
  }
});

router.post("/", async (req, res, next) => {
  const { item, price} = req.body;
  try {
    let rate = await Rate.create({
      item,
      price,
    });
    return res.json(rate);
  } catch (error) {
    await error.json()
  }
});

router.get("/", async (req, res, next) => {
  try {
    let rates = await Rate.findAll({});
    return res.json({ Rates: rates });
  } catch (error) {
    return res.json({ error: await error });
  }
});

module.exports = router;
