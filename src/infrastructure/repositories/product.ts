import ProductModel, { ProductType } from "../../domain/models/product_model";
import connectDB from "../connect_db";

connectDB();

export const createProduct = async (
  args: ProductType
): Promise<ProductType> => {
  const product = await ProductModel.create(args);
  return product;
};

export const updateProduct = async (
  productDataUpdate: ProductType
): Promise<ProductType | null> => {
  const { id, ...updatedData } = productDataUpdate;

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return updatedProduct;
};

export const getAllProducts = async (): Promise<ProductType[]> => {
  const products = await ProductModel.find();
  return products;
};

export const deleteProduct = async ({ id }: { id: string }): Promise<void> => {
  try {
    const result = await ProductModel.findByIdAndDelete(id);

    if (!result) {
      throw new Error(`No se encontró el producto con id ${id}`);
    }
  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error}`);
  }
};
export const searchProduct = async (searchParams: {
  name: string;
  category: string;
}): Promise<ProductType[]> => {
  const { name, category } = searchParams;

  const products = await ProductModel.find({
    $or: [
      { name: { $regex: name, $options: "i" } },
      { category: { $regex: category, $options: "i" } },
    ],
  });

  return products;
};
