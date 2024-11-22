import React from "react";

export function SvgArrow(props) {
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 1142 1142' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1142 174.324V0.0106812H967.684H912.867H5.27703V229.141H738.554L-0.00537109 967.676L174.308 1141.99L912.867 403.454V1136.73H1142V229.141V174.324Z'
        fill='url(#paint0_linear_1_935)'
      />
      <defs>
        <linearGradient id='paint0_linear_1_935' x1='-532.286' y1='-778.062' x2='1078.93' y2='1064.82' gradientUnits='userSpaceOnUse'>
          <stop stop-color='#1907F8' />
          <stop offset='0.16' stop-color='#3305F9' />
          <stop offset='0.38' stop-color='#5202FC' />
          <stop offset='0.6' stop-color='#6901FD' />
          <stop offset='0.81' stop-color='#7600FE' />
          <stop offset='1' stop-color='#7B00FF' />
        </linearGradient>
      </defs>
    </svg>
  );
}
