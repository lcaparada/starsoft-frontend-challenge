import { IconBase } from "@/src/components"

export const Trash = ({ size }: IconBase) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.774 10.178s-.583 7.24-.922 10.29c-.161 1.457-1.061 2.31-2.535 2.337-2.805.05-5.613.054-8.416-.005-1.418-.03-2.303-.893-2.46-2.324-.342-3.077-.922-10.298-.922-10.298m16.742-3.47H4.031m14.718 0c-.844 0-1.57-.597-1.736-1.424l-.262-1.307a1.376 1.376 0 00-1.33-1.02h-4.55c-.622 0-1.168.417-1.33 1.02l-.26 1.307a1.772 1.772 0 01-1.737 1.424"
        stroke="#fff"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}