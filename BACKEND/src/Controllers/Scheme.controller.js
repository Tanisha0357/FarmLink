import { Scheme } from "../Models/Scheme.model.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

export const getSchemes = AsyncHandler(async (req, res) => {
  const schemes = await Scheme.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, schemes, "Schemes fetched"));
});

export const addScheme = AsyncHandler(async (req, res) => {
  const scheme = await Scheme.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, scheme, "Scheme added"));
});


export const deleteScheme = AsyncHandler(async (req, res) => {
  await Scheme.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Scheme deleted"));
});
