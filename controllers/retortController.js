const { User, Retort, Counter } = require("../models")

module.exports = {

    getRetort(req, res) {
        Retort.find({})
            .then((retort) => res.json(retort))
            .catch((err) => res.status(500).json(err))
    },
    getSingleRetort(req, res) {
        Retort.findOne({ _id: req.params.retortId })
            .select("-__v")
            .then((retort) =>
                !retort
                    ? res.status(404).json({ message: "ID doesn't exist" })
                    : res.json(retort)
            )
            .catch((err) => res.status(500).json(err))
    },
    createRetort(req, res) {
        Retort.create(req.body)
            .then(({ _id  }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { retorts: _id } },
                    { new: true }
                )
            })
            .then((retort) =>
                !retort
                    ? res.status(404).json({ message: "ID doesn't exist" })
                    : res.json(retort)
            )
            .catch((err) => res.status(500).json(err))
    },
    updateRetort(req, res) {
        Retort.findOneAndUpdate(
            { _id: req.params.retortId },
            { $set: req.body },
            {runValidators: true, new: true } 
        )
            .then((retort) =>
                !retort
                    ? res.status(404).json({ message: "ID doesn't exist"})
                    : res.json(retort)
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteRetort(req, res) {
        Retort.findOneAndDelete({ _id: req.params.retortId })
            .then((retort) =>
                !retort
                    ? res.status(404).json({ message: "ID doesn't exist"})
                    : User.findOneAndUpdate(
                        { retorts: req.params.retortId },
                        { $pull: { retorts: req.params.retortId }},
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Retort deleted, no user found"})
                   : res.json({ message: "retort deleted from server" })
            )
            .catch((err) => res.status(500).json(err))
    },
    createCounter(req, res) {
        Retort.findOneAndUpdate(
            { _id: req.params.retortId },
            { $pull: { counters: { counterId: req.params.counterId}}},
            { runValidators: true, new: true }
        )
            .then((retort) =>
                !retort
                    ? res.status(404).json({ message: "ID doesn't exist"})
                    : res.json(retort)
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteCounter(req, res) {
        Retort.findOneAndUpdate(
            { _id: req.params.retortId },
            { $pull: { counters: { counterId: req.params.counterId}}},
            { runValidators: true, new: true }
        )
            .then((retort) =>
                !retort
                    ? res.status(404).json({ message: "ID doesn't exist"})
                    : res.json(retort)
            )
            .catch((err) => res.status(500).json(err))
    }
}