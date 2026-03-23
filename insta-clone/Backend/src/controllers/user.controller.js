const mongoose = require('mongoose')
const userModel = require('../models/user.model');
const followModel = require('../models/follow.model');

async function followUserController(req, res) {
    const followerId = req.user.id
    const followeeId = req.params.userId
    if (!mongoose.Types.ObjectId.isValid(followeeId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    if (followerId == followeeId) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExist = await userModel.findById(followeeId)

    if (!isFolloweeExist) {
        return res.status(404).json({
            message: "user to follow not found"
        })
    }

    const isFollowAlreadyExist = await followModel.findOne({ follower: followerId, followee: followeeId })

    if (isFollowAlreadyExist) {
        if (isFollowAlreadyExist.status === "pending") {
            return res.status(409).json({
                message: 'follow request already sent'
            })
        }
        else if (isFollowAlreadyExist.status === "accepted") {
            return res.status(409).json({
                message: 'already follow'
            })
        }
    }
    const follow = await followModel.create({
        follower: followerId,
        followee: followeeId
    })


    res.status(200).json({
        message: 'follow done',
        follow
    })


}

async function acceptFollowRequestController(req, res) {
    const requestId = req.params.requestId


    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const isRequestIdExist = await followModel.findById(requestId)

    if (!isRequestIdExist) {
        return res.status(404).json({
            message: "follow request not found"
        })
    }

    const isSameUser = isRequestIdExist.followee.toString() === req.user.id
    if (!isSameUser) {
        return res.status(409).json({
            message: "unauthorized access"
        })
    }



    if (isRequestIdExist.status !== "pending") {
        return res.status(409).json({
            message: `you already ${isRequestIdExist.status} this follow request`
        })
    }

    isRequestIdExist.status = 'accepted'
    await isRequestIdExist.save()



    res.status(200).json({
        message: `follow request accepted`,
        follow: isRequestIdExist
    })



}


async function rejectFollowRequestController(req, res) {
    const requestId = req.params.requestId

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const isRequestIdExist = await followModel.findOne({
        _id:requestId,
        followee: req.user.id
    })

    if (!isRequestIdExist) {
        return res.status(404).json({
            message: "follow request not found"
        })
    }

    if (isRequestIdExist.status !== "pending") {
        return res.status(409).json({
            message: `This request is not pending`
        })
    }

    await followModel.findByIdAndDelete(requestId)

    res.status(200).json({
        message: "follow request rejected"
    })


}


async function unfollowUserController(req, res) {
    const followerId = req.user.id
    const followeeId = req.params.userId

    if (!mongoose.Types.ObjectId.isValid(followeeId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const isFollowing = await followModel.findOne({ follower: followerId, followee: followeeId, status: "accepted" })

    if (!isFollowing) {
        return res.status(404).json({
            message: "you are not following this user"
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id)

    res.status(200).json({
        message: "unfollow done"
    })

}


async function cancelFollowRequestController(req, res) {
    const userId = req.user.id
    const followeeId = req.params.userId

    if (!mongoose.Types.ObjectId.isValid(followeeId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const isRelationExist = await followModel.findOne({
        follower: userId,
        followee: followeeId,
        status: "pending"
    })

    if(!isRelationExist){
        return res.status(404).json({
            message: "follow request not found"
        })
    }

    const deletedRelation = await followModel.findByIdAndDelete(isRelationExist._id)

    res.status(200).json({
        message: "follow request cancelled",
        deletedRelation
    })
}

async function getFollowers(req, res) {
    const user = req.user.id

    const followers = await followModel.find({ followee: user }).populate('follower')

    res.status(200).json({
        message: 'followers fetched',
        followers
    })
}


async function getFollowing(req, res) {
    const user = req.user.id

    const following = await followModel.find({
        follower: user
    }).populate('followee')

    res.status(200).json({
        message: 'following fetched',
        following
    })
}

async function getSuggestedUsers(req, res) {
    const userId = req.user.id

    // Get all users except current user
    const allUsers = await userModel.find({ _id: { $ne: userId } })

    // Get all follow relations for current user (where they are the follower)
    const existingRelations = await followModel.find({ follower: userId })
    const followedUserIds = existingRelations.map(rel => rel.followee.toString())

    // Filter out users already followed or with pending requests
    const suggestedUsers = allUsers.filter(user => !followedUserIds.includes(user._id.toString()))

    res.status(200).json({
        message: 'suggested users fetched',
        suggestedUsers
    })
}

module.exports = { 
    followUserController, 
    unfollowUserController, 
    acceptFollowRequestController, 
    rejectFollowRequestController, 
    getFollowers, 
    getFollowing, 
    cancelFollowRequestController,
    getSuggestedUsers 
}