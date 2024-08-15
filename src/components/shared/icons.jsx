export function IconOpen(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <rect strokeWidth="3" x="1.5" y="1.5" width="29" height="29" rx="8" />
      <path
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8 10 8 5 8-5M8 18l8 5 8-5"
      />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <rect strokeWidth="3" x="1.5" y="1.5" width="29" height="29" rx="8" />
      <path
        strokeWidth="3.5"
        strokeLinecap="round"
        d="m9 9 14 14m0-14L9 23"
      />
    </svg>
  );
}