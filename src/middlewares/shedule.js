const CronJob = require("node-cron");
const Appointment = require("../models/appointment.model");
const { date } = require("joi");

exports.initScheduledJobs = () => {

  const ChangeStatusOfAppoiment = CronJob.schedule("*/1 * * * *", () => {
    console.log(new Date(),"??",new Date().getDate() - 1);

    async (req, res, next) => {
      try {
        const appointment = await Appointment.findOneAndUpdate(
          {
            date: { $lte: new Date().getDate() - 1 },
            status: "active",
          },
          {
            status: "Not Attended",
          },
          { new: true }
        );
        console.log(appointment);
      } catch (error) {
        next(error);
      }
    };
  });

  //   ChangeStatusOfAppoiment.start();
};
