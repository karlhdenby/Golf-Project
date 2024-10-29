const express = require("express");
const router = require('express').Router();
const { where } = require("sequelize");
const { TeeTime } = require("../../db/models");

router.get('/', async (req, res, next) => {
    try {
        let teeTimes = await TeeTime.findAll()
        return res.json({"teeTimes": teeTimes})
    } catch (error) {
        let awaited = await error
        console.log(await awaited)
        return res.json({error: await error})
    }
})

module.exports = router;