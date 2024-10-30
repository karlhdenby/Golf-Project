const router = require("express").Router();
const { Membership } = require("../../db/models");

router.delete("/:membershipId", async (req, res, next) => {
    let membershipId = req.params.membershipId;
    try {
      let membership = await Membership.findByPk(membershipId);
      if (req.user.rank < 3) {
        return res.status(403).json({
          message: "User does not have permission to edit memberships",
        });
      }
      await membership.destroy()
      res.json({ message: "Successfully deleted membership" });
    } catch (error) {
      res.json(await error)
    }
  });

router.put("/:membershipId", async (req, res, next) => {
  let membershipId = req.params.membershipId;
  const body = req.body;
  try {
    let membership = await Membership.findByPk(membershipId);
    if (req.user.rank < 3) {
      return res.status(403).json({
        message: "User does not have permission to edit memberships",
      });
    }
    await membership.update(body)
    return res.json(membership);
  } catch (error) {
    res.json(await error)
  }
});

router.post("/", async (req, res, next) => {
  const { membership, price, description} = req.body;
  try {
    let membership = await Membership.create({
      membership,
      price,
      description
    });
    return res.json(membership);
  } catch (error) {
    await error.json()
  }
});

router.get("/", async (req, res, next) => {
  try {
    let memberships = await Membership.findAll({});
    return res.json({ Memberships: memberships });
  } catch (error) {
    return res.json({ error: await error });
  }
});

module.exports = router;
