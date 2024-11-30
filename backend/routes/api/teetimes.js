const router = require("express").Router();
const { TeeTime } = require("../../db/models");

router.delete("/:teeTimeId", async (req, res, next) => {
    let teeTimeId = req.params.teeTimeId;
    const { username } = req.user || undefined;
    try {
      let teeTime = await TeeTime.findByPk(teeTimeId);
      if (teeTime.username !== username) {
        return res.status(403).json({
          message: "Tee Time must belong to current user",
        });
      }
      await teeTime.destroy()
      res.json({ message: "Successfully cancelled tee time" });
    } catch (error) {
      res.json(await error)
    }
  });

router.put("/:teeTimeId", async (req, res, next) => {
  console.log("/n HELLO")
  let teeTimeId = req.params.teeTimeId;
  console.log(teeTimeId)
  const body = req.body;
  console.log(body)
  try {
    let teeTime = await TeeTime.findByPk(teeTimeId);
    console.log(teeTime)
    await teeTime.update({
      username: body.username,
      players: body.players,
      firstName: body.firstName,
      lastName: body.lastName,
      open: body.open,
      time: body.time
    })
    return res.json({
      username: body.username,
      players: body.players,
      firstName: body.firstName,
      lastName: body.lastName,
      open: body.open,
      time: body.time
    });
  } catch (error) {
    let shoe = await error
    console.log(await shoe)
  }
});

router.post("/", async (req, res, next) => {
  const { username, firstName, lastName, time, players, open } = req.body;
  try {
    let teeTime = await TeeTime.create({
      username,
      firstName,
      lastName,
      players,
      time,
      open,
    });
    return res.json(teeTime);
  } catch (error) {
    console.log(username, firstName, lastName, players,time,open)
  }
});

router.get("/", async (req, res, next) => {
  try {
    let teeTimes = await TeeTime.findAll({});
    return res.json({ teeTimes: teeTimes });
  } catch (error) {
    return res.json({ error: await error });
  }
});

module.exports = router;
