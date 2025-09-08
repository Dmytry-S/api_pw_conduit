import Joi from 'joi';


export const articleSchema = Joi.object({
	article: Joi.object({
        slug: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        body: Joi.string().required(),
        tagList: Joi.array().items(Joi.string()).required(),
        createdAt: Joi.string().required(),
        updatedAt: Joi.string().required(),
        favorited: Joi.boolean().required(),
        favoritesCount: Joi.number().required(),
        author: Joi.object({
            username: Joi.string().required(),
            bio: Joi.allow(null),
            image: Joi.string().allow(''),
            following: Joi.boolean().required(),
        }).required(),
    }).required(),
})