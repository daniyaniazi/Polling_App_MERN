const db = require('../models')

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find().populate('user', ['username', 'id']);

        res.status(200).json(polls)

    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.createPoll = async (req, res, next) => {
    try {
        //console.log("DECODED", req.decoded)
        const { id } = req.decoded
        const user = await db.User.findById(id)

        const { question, options } = req.body
        const poll = await db.Poll.create({
            user,
            question,
            options: options.map(option => ({
                option, votes: 0
            }))
        });
        user.polls.push(poll._id)

        await user.save()
        res.status(201).json({ ...poll._doc, user: user._id })

    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.userPolls = async (req, res, next) => {
    try {
        const { id } = req.decoded;
        const user = await db.User.findById(id).populate('polls')
        console.log(user)
        res.status(200).json(user.polls)
    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.getPoll = async (req, res, next) => {
    try {
        const { id } = req.params;
        const poll = await db.Poll.findById(id).populate('user', ['username', 'id'])

        if (!poll) throw new Error("Poll Not Found")

        res.status(200).json(poll)
    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.deletePoll = async (req, res, next) => {
    try {
        const { id: pollId } = req.params;

        const { id: userId } = req.decoded

        const poll = await db.Poll.findById(pollId)

        if (!poll) throw new Error("Poll Not Found")

        //poll.user in objectId mongodb type
        if (poll.user.toString() !== userId) {
            throw new Error("Unauthorized access")
        }

        await poll.remove()
        res.status(202).json(poll)
    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.vote = async (req, res, next) => {
    try {
        const { id: pollId } = req.params;

        const { id: userId } = req.decoded

        const { answer } = req.body;
        if (answer) {

            const poll = await db.Poll.findById(pollId)
            if (!poll) throw new Error("Poll Not Found")

            //voting
            const vote = poll.options.map(option => {
                console.log("here:", option.option)
                if (option.option === answer) {
                    return {
                        option: option.option,
                        _id: option._id,
                        votes: option.votes + 1

                    };

                }
                else {
                    return option
                }
            })

            //check user vote and mark
            if (poll.voted.filter(user => user.toString() === userId) <= 0) {
                poll.voted.push(userId);
                poll.options = vote;
                await poll.save();
                res.status(202).json(poll)
            } else {
                throw new Error("Already Voted")

            }

        } else {
            throw new Error("No answer provided")
        }
    } catch (error) {
        error.status = 400;
        next(error)
    }
}