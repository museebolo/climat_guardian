import React from "react";

export function PlanIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <style type="text/css">
        {`
                    .st0{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                    .st1{fill:none;stroke:currentColor;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}
                    .st2{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}
                `}
      </style>
      <rect x="3" y="3" className="st0" width="26" height="26" />
      <rect x="18" y="20" className="st0" width="11" height="9" />
      <polyline className="st0" points="14,3 29,3 29,15 20,15 " />
      <line className="st0" x1="14" y1="15" x2="14" y2="3" />
      <rect x="18" y="23" className="st0" width="11" height="6" />
      <rect x="18" y="26" className="st0" width="11" height="3" />
      <polyline className="st0" points="11,29 11,20 7,20 " />
      <polyline className="st0" points="14,15 3,15 3,3 14,3 " />
    </svg>
  );
}
