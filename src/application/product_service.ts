import { ProductType } from "../domain/models/product_model";
import {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  searchProduct,
} from "../infrastructure/repositories/product";

export const createProductService = async (
  args: ProductType
): Promise<ProductType> => {
  const newProduct = await createProduct(args);
  return newProduct;
};

export const updateProductService = async (
  productDataUpdate: ProductType
): Promise<ProductType | null> => {
  const updatedProduct = await updateProduct(productDataUpdate);
  return updatedProduct;
};
export const getAllProductsService = async () => {
  try {
    const products = await getAllProducts();
    return products;
  } catch (error) {
    console.error("Error en el servicio de obtener productos:", error);
    throw new Error("Error al obtener los productos en el servicio");
  }
};

export const deleteProductService = async (id: string): Promise<void> => {
  try {
    await deleteProduct({ id });
  } catch (error) {
    throw new Error(
      `Error en la capa de aplicación al eliminar el producto: ${error}`
    );
  }
};

export const searchProductsService = async (searchParams: {
  name: string;
  category: string;
}): Promise<ProductType[]> => {
  const products = await searchProduct(searchParams);
  return products;
};
