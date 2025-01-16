import { ApiError } from "../utils/ApiError.js";
import { Stock } from "../models/stock.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Log } from "../models/log.models.js";
// import mongoose from "mongoose";
//import mongoose from "mongoose"; // Ensure mongoose is imported

const stockRegister = asyncHandler(async (req, res) => {
  try {
    const { name, price, initialStock, minimumRequiredStock } = req.body;
    if (
      [name, price, initialStock, minimumRequiredStock].some((field) => {
        field.trim() === "";
      })
    ) {
      throw new Error(400, "All fields are required");
    }

    const stock = await Stock.create({
      name,
      price,
      initialStock,
      minimumRequiredStock,
    });

    await stock.save();
    return res
      .status(200)
      .json(new ApiResponse(200, stock, "stock register success"));
  } catch (err) {
    throw new ApiError(200, "err in register stock", err);
  }
});
const updateItems = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const { price, name } = req.body;
    //  if(!price) return null;

    const result = await Stock.findByIdAndUpdate(
      _id,
      { $set: { price: price, name } },
      { new: true }
    );
    await result.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse("200", result, "updata price success"));
  } catch (err) {
    throw new ApiError(400, "err in update items", err);
  }
});

const patchItemsInc = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || isNaN(quantity)) {
      throw new ApiError(400, "Quantity is required and must be a number");
    }

    // Find the stock by ID
    const result = await Stock.findById(_id);
    const prevStock = result.initialStock;

    // Update the stock
    result.initialStock += Number(quantity);

    if (prevStock > result.initialStock) {
      throw new ApiError(400, "You cannot decrease the stock");
    }
    // Create a log entry
    const log = {
      stockId:result._id,
      stockName: result.name,
      stockOperations: "restock",
      StockPreQuantity: prevStock,
      stockCurrQuantity: result.initialStock,
    };

    // Insert the log into the database
    await Log.create(log);

    // Save the updated stock
    await result.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse("200", result, "Update success"));
  } catch (err) {
    console.error(err);
    throw new ApiError(400, "Error in updating items", err);
  }
});


const patchItemsDec = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const { quantity } = req.body;
    //  if(!price) return null;
    console.log(quantity);
    if (quantity === undefined || isNaN(quantity)) {
      throw new ApiError(400, "Quantity is required and must be a number");
    }

    const result = await Stock.findById(_id);
    const prevStock = result.initialStock;
    result.initialStock = result.initialStock - Number(quantity);
    if (prevStock < result.initialStock) {
      throw new ApiError(400, "you never decrease the stock");
    }
    let log = [];
    log.push({
      // _id: new mongoose.Types.ObjectId(),
      stockId: result._id,
      stockName: result.name,
      stockOperations: "sell",
      StockPreQuantity: prevStock,
      stockCurrQuantity: result.initialStock,
    });
    await Log.create(log);

    await result.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse("200", result, "updata price success"));
  } catch (err) {
    console.log(err);
    throw new ApiError(400, "err in update items", err);
  }
});


const getLogHistory = asyncHandler(async (req, res) => {
	const { _id } = req.params;
	if (!_id) {
		throw new ApiError(404, "Stock ID not found");
	}

	const logs = await Log.find({ stockId: _id });
	if (!logs || logs.length === 0) {
		throw new ApiError(404, "logs with given stock id not found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, { logs: logs }, "Successfully fetched logs")
		);
});

export { stockRegister, updateItems, patchItemsInc, patchItemsDec, getLogHistory };
