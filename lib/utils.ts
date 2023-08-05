// Importing the necessary functions from the "clsx" and "tailwind-merge" libraries
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Exporting a function called "cn" (short for classnames) with a rest parameter "inputs"
export function cn(...inputs: ClassValue[]) {
  // The rest parameter "inputs" allows the function to accept any number of arguments, which are of type "ClassValue".
  // ClassValue is a type definition from "clsx" that represents a single class or an array of classes.

  // The function first uses "clsx" to concatenate and merge all the input class names into a single string.
  // "clsx" is a utility function that efficiently concatenates class names together.
  const mergedClassNames = clsx(inputs);

  // Then, the function uses "twMerge" to further merge and optimize the class names based on Tailwind CSS.
  // "twMerge" is a function provided by "tailwind-merge" that performs optimizations on class names, eliminating duplicates and more.
  // The purpose is to create a more concise and efficient representation of the class names for use with Tailwind CSS.

  return twMerge(mergedClassNames);
  // Finally, the optimized class names are returned by the "cn" function.
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
