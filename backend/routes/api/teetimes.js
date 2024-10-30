const express = require("express");
const router = require("express").Router();
const { where } = require("sequelize");
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
  let teeTimeId = req.params.teeTimeId;
  const { username } = req.user || undefined;
  const body = req.body;
  try {
    let teeTime = await TeeTime.findByPk(teeTimeId);
    if (teeTime.username !== username) {
      return res.status(403).json({
        message: "Tee Time must belong to current user",
      });
    }
    await teeTime.update(body)
    return res.json(teeTime);
  } catch (error) {
    res.json(await error)
  }
});

router.post("/new", async (req, res, next) => {
  const { username } = req.user || undefined;
  const { firstName, lastName, time, players, open } = req.body;
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
  } catch (error) {}
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
