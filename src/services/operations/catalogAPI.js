import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

// export const getCatalogaPageData = async(categoryId) => {
//   const toastId = toast.loading("Loading...");
//   if(!categoryId) return;
//   let result = [];
//   try{
//         const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
//         {categoryId: categoryId,});
//         console.log("res : ", response)

//         if(!response?.data?.success)
//             throw new Error("Could not Fetch Category page data");

//          result = response?.data;

//   }
//   catch(error) {
//     console.log("CATALOG PAGE DATA API ERROR....", error);
//     toast.error(error.message);
//     result = error.response?.data;
//   }
//   toast.dismiss(toastId);
//   return result;
// }

export const getCatalogaPageData = async (categoryId) => {
  if (!categoryId || typeof categoryId !== "string" || categoryId.length !== 24) {
    console.warn("❌ Invalid or missing categoryId:", categoryId);
    return { success: false, message: "Invalid categoryId" };
  }

  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });
    console.log("✅ Response from CATALOGPAGEDATA_API:", response);

    if (!response?.data?.success)
      throw new Error("Could not fetch category page data");

    result = response?.data;
  } catch (error) {
    console.log("❌ CATALOG PAGE DATA API ERROR:", error);
    toast.error(error.message);
    result = error.response?.data || { success: false, message: error.message };
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};
