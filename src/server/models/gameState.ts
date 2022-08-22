import Joi from "joi";

const schema = Joi.object({
  id: Joi.number().required(),
  playerA: Joi.number().required(),
  playerB: Joi.number().required(),
  playerAPiece: Joi.string().valid("x", "o").required(),
  playerBPiece: Joi.string().valid("x", "o").required(),
  activePlayer: Joi.string().valid("playerA", "playerB").required(),
  move: Joi.number().required(),
  isOver: Joi.boolean().required(),
}).pattern(Joi.number(), Joi.string().valid("x", "o").required());

export default schema;
