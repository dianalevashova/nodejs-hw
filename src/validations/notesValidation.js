import { celebrate, Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid note id');
  }
  return value;
};

export const noteIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(noteIdValidator).required(),
  }),
});

export const getAllNotesSchema = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
});

export const createNoteSchema = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
});

export const updateNoteSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(noteIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).or('title', 'content', 'tag'),
});
