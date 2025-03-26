import mongoose, { Schema, Document } from "mongoose";

export interface ProductType extends Document {
  name: string;
  category: string;
  price: number;
  description?: string;
}

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductType>("Product", productSchema);

export default ProductModel;
