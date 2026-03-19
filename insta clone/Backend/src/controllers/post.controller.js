const postModel = require('../models/post.model')
const imageKit = require('@imagekit/nodejs')
const { toFile } = require("@imagekit/nodejs")
const mongoose = require('mongoose')
const likeModel = require('../models/like.model')


const client = new imageKit({
    priveteKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req, res) {

    if(!req.file){
        const error = new Error("file is required")
        error.statusCode = 400
        throw error
    }

    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'post-image',
        folder: 'insta-clone/posts'
    })

    const userId = req.user.id

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: userId
    })

    res.status(201).json({
        message: "post created",
        post
    })


}

async function getPostController(req, res) {


    const userId = req.user.id

    const post = await postModel.find({
        user: userId
    })

    if (!post) {
        return res.status(404).josn({
            message: "post not found"
        })
    }

    res.status(200).json({
        message: "post fetched",
        post
    })


}


async function getPostDetailsController(req, res) {
    
    const userId = req.user.id
    const { postId } = req.params
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const post = await postModel.findById(req.params.postId)

    if (!post) {
        return res.status(404).josn({
            message: "post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser) {
        return res.status(401).json({
            message: "unauthorized"
        })
    }

    res.status(200).json({
        post
    })
}

async function likePostController(req, res) {
    const postId = req.params.postId
    const userId = req.user.id

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }


    const isPostExist = await postModel.findById(postId)
    console.log(isPostExist)

    if (!isPostExist) {
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isAlreadyLiked = await likeModel.findOne({ user: userId, post: postId })


    if (isAlreadyLiked) {
        return res.status(409).json({
            message: "post already liked"
        })
    }

    const like = await likeModel.create({
        user: userId,
        post: postId
    })

    res.status(200).json({
        message: "post liked",
        like

    })

}

async function unlikePostController(req, res) {
    const postId = req.params.postId
    const userId = req.user.id

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const isPostExist = await postModel.findById(postId)

    if (!isPostExist) {
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isAlreadyLiked = await likeModel.findOne({ user: userId, post: postId })

    if (!isAlreadyLiked) {
        return res.status(404).json({
            message: "like relationship not found"
        })
    }

    await likeModel.findByIdAndDelete(isAlreadyLiked._id)

    res.status(200).json({
        message: "post unliked"
    })
}

async function getFeedController(req, res) {
    const userId = req.user.id

    const posts = await Promise.all((await postModel.find().populate('user').lean())
        .map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: userId,
                post: post._id
            })

            post.isLiked = !!isLiked

            return post
        }))

    res.status(200).json({
        message: "feed fetched",
        posts
    })
}


module.exports = { createPostController, getPostController, getPostDetailsController, likePostController, unlikePostController, getFeedController }