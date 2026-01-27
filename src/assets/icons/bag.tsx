import { IconBase } from "@/src/components";

export const Bag = ({ size }: IconBase) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M10.294 29.563h11.478c4.216 0 7.45-1.523 6.532-7.652l-1.07-8.307c-.566-3.058-2.517-4.229-4.229-4.229H9.01c-1.737 0-3.574 1.259-4.229 4.229l-1.07 8.306c-.78 5.438 2.366 7.653 6.583 7.653z"
        stroke="#FF9F47"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.105 9.073a5.94 5.94 0 015.94-5.94 5.94 5.94 0 015.966 5.94M11.967 15.265h.063M19.985 15.265h.063"
        stroke="#FF9F47"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}