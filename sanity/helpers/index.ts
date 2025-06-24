import { sanityFetch } from "../lib/live";

export const getAllProducts = async () => {
  const PRODUCTS_QUERY = `*[_type=="product"] | order(name asc)`;
  try {
    const products = await sanityFetch({
      query: PRODUCTS_QUERY,
    });
    return products || [];
  } catch (error) {
    return [];
  }
};

export const getAllCategories = async (quantity?: number) => {
  const CATEGORIES_QUERY = `*[_type=="category"] | order(name asc)${quantity ? `[0...${quantity}]` : ""}`;

  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};

export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = `*[_type == "product" && name match $searchParam] | order(name asc)`;
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}`,
      },
    });
    return products || [];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_ID_QUERY = `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`;
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });
    return product || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export const getProductsByCategory = async (categorySlug: string) => {
  const PRODUCT_BY_CATEGORY_QUERY = `*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`;
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    });
    return products || [];
  } catch (error) {
    console.error("Erroor fetching products by category:", error);
    return [];
  }
};

export const getSale = async () => {
  const SALE_QUERY = `*[_type == 'sale'] | order(name asc)`;
  try {
    const products = await sanityFetch({
      query: SALE_QUERY,
    });
    return products || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const MY_ORDERS_QUERY = `*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){...,products[]{...,product->}}`;
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};