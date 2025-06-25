import type { SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { orderType } from "./orderType";

export const schema: { types: any[] } = {
  types: [blockContentType, categoryType, productType, orderType],
};