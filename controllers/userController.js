const { User, Retort, Counter } = require("../models");

module.exports = {

    getUser(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: "No User with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User with that ID" })
                    : res.json(user)
                )
                .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
                ? res.status(404).json({ message: "No User with that ID" })
                : res.json(user)
            )
            .then(() => res.json({ message: "User removed from server"}))
            .catch((err) => res.status(500).json(err))
    },
    addAccomplice(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { accomplices: req.params.accompliceId}},
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User with that ID" })
                    : res.json(user)
                )
                .catch((err) => res.status(500).json(err))
    },
    deleteAccomplice(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(
                (user) =>
          !user
            ? res.status(404).json({ message: "No User find with this ID!" })
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    }
}