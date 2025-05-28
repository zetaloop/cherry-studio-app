import React from 'react'
import Svg, {
  ClipPath,
  Defs,
  FeBlend,
  FeColorMatrix,
  FeComposite,
  FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  Path,
  Rect,
  SvgProps
} from 'react-native-svg'
interface IconProps extends SvgProps {
  size?: number
  color?: string
}

export function MdiLightbulbOffOutline(props: IconProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
      <Path
        fill="currentColor"
        d="M12 2C9.76 2 7.78 3.05 6.5 4.68l1.43 1.43C8.84 4.84 10.32 4 12 4a5 5 0 0 1 5 5c0 1.68-.84 3.16-2.11 4.06l1.42 1.44C17.94 13.21 19 11.24 19 9a7 7 0 0 0-7-7M3.28 4L2 5.27L5.04 8.3C5 8.53 5 8.76 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h5.73l4 4L20 20.72zm3.95 6.5l5.5 5.5H10v-2.42a5 5 0 0 1-2.77-3.08M9 20v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1z"></Path>
    </Svg>
  )
}

export function MdiLightbulbAutoOutline(props: IconProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
      <Path
        fill="currentColor"
        d="M9 2c3.87 0 7 3.13 7 7c0 2.38-1.19 4.47-3 5.74V17c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-2.26C3.19 13.47 2 11.38 2 9c0-3.87 3.13-7 7-7M6 21v-1h6v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1M9 4C6.24 4 4 6.24 4 9c0 2.05 1.23 3.81 3 4.58V16h4v-2.42c1.77-.77 3-2.53 3-4.58c0-2.76-2.24-5-5-5m10 9h-2l-3.2 9h1.9l.7-2h3.2l.7 2h1.9zm-2.15 5.65L18 15l1.15 3.65z"></Path>
    </Svg>
  )
}

export function MdiLightbulbOn10(props: IconProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
      <Path
        fill="currentColor"
        d="M1 11h3v2H1zm18.1-7.5L17 5.6L18.4 7l2.1-2.1zM11 1h2v3h-2zM4.9 3.5L3.5 4.9L5.6 7L7 5.6zM10 22c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1h-4zm2-16c-3.3 0-6 2.7-6 6c0 2.2 1.2 4.2 3 5.2V19c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-1.8c1.8-1 3-3 3-5.2c0-3.3-2.7-6-6-6m1 9.9V17h-2v-1.1c-1.7-.4-3-2-3-3.9c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.9-1.3 3.4-3 3.9m7-4.9h3v2h-3z"></Path>
    </Svg>
  )
}

export function MdiLightbulbOn50(props: IconProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
      <Path
        fill="currentColor"
        d="M1 11h3v2H1zm9 11c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1h-4zm3-21h-2v3h2zM4.9 3.5L3.5 4.9L5.6 7L7 5.6zM20 11v2h3v-2zm-.9-7.5L17 5.6L18.4 7l2.1-2.1zM18 12c0 2.2-1.2 4.2-3 5.2V19c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-1.8c-1.8-1-3-3-3-5.2c0-3.3 2.7-6 6-6s6 2.7 6 6M8 12c0 .35.05.68.14 1h7.72c.09-.32.14-.65.14-1c0-2.21-1.79-4-4-4s-4 1.79-4 4"></Path>
    </Svg>
  )
}

export function MdiLightbulbOn90(props: IconProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
      <Path
        fill="currentColor"
        d="M7 5.6L5.6 7L3.5 4.9l1.4-1.4zM10 22c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1h-4zm-9-9h3v-2H1zM13 1h-2v3h2zm7 10v2h3v-2zm-.9-7.5L17 5.6L18.4 7l2.1-2.1zM18 12c0 2.2-1.2 4.2-3 5.2V19c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-1.8c-1.8-1-3-3-3-5.2c0-3.3 2.7-6 6-6s6 2.7 6 6m-6-4c-1 0-1.91.38-2.61 1h5.22C13.91 8.38 13 8 12 8"></Path>
    </Svg>
  )
}

export function DefaultProviderIcon(props: IconProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 102 109" fill="none" {...props}>
      <G clipPath="url(#clip0_4303_2223)" filter="url(#filter0_i_4303_2223)">
        <Path
          d="M30.1107 129.373C40.8358 135.589 54.4507 131.924 81.6871 124.6C108.923 117.284 122.538 113.619 128.732 102.848C134.925 92.0836 131.274 78.4191 123.977 51.0835C116.687 23.7478 113.035 10.0833 102.303 3.86739C91.5781 -2.34855 77.9632 1.30983 50.7268 8.63976C23.4904 15.9565 9.87545 19.6215 3.68208 30.3922C-2.5113 41.1564 1.1338 54.821 8.43712 82.1566C15.7273 109.492 19.379 123.157 30.1107 129.373Z"
          fill="#00B96B"
          fillOpacity="0.2"
        />
        <G filter="url(#filter1_i_4303_2223)">
          <Path
            d="M64.9714 49.4297C67.2769 48.8089 68.3972 45.4878 67.4716 42.0148C66.5416 38.5418 63.9203 36.2279 61.6105 36.8487C59.305 37.4695 58.1847 40.7863 59.1147 44.2636C60.0404 47.7366 62.6616 50.0505 64.9714 49.4297ZM39.9009 56.1716C42.2107 55.5509 43.3267 52.2298 42.401 48.7568C41.4754 45.2838 38.8541 42.9699 36.5443 43.5907C34.2345 44.2115 33.1185 47.5282 34.0442 51.0056C34.9741 54.4786 37.5911 56.7924 39.9009 56.1716ZM35.9344 69.0825C36.038 68.6678 36.2221 68.2776 36.476 67.9342C36.7299 67.5908 37.0487 67.301 37.4142 67.0813C37.7797 66.8616 38.1848 66.7163 38.6063 66.6537C39.0277 66.5911 39.4574 66.6125 39.8706 66.7165C44.7584 67.9451 50.3729 67.9625 56.0739 66.43C61.7749 64.8932 66.6281 62.0627 70.2528 58.5463C70.5585 58.2463 70.9202 58.0098 71.3171 57.8506C71.7141 57.6913 72.1385 57.6124 72.566 57.6183C72.9935 57.6242 73.4156 57.7148 73.808 57.885C74.2005 58.0552 74.5555 58.3015 74.8528 58.6099C75.1501 58.9183 75.3837 59.2826 75.5402 59.6818C75.6967 60.0811 75.7731 60.5075 75.7648 60.9365C75.7566 61.3655 75.664 61.7886 75.4923 62.1816C75.3206 62.5745 75.0732 62.9295 74.7643 63.2262C73.2274 64.7132 71.5628 66.0613 69.79 67.2549L70.4778 68.6527C70.856 69.4207 71.0795 70.256 71.1355 71.1108C71.1916 71.9656 71.079 72.8231 70.8043 73.6341C70.5296 74.4452 70.0981 75.1939 69.5346 75.8373C68.9711 76.4808 68.2867 77.0063 67.5205 77.3838C66.7543 77.7613 65.9214 77.9833 65.0695 78.0372C64.2177 78.0911 63.3636 77.9758 62.5563 77.6979C61.7489 77.4199 61.0041 76.9849 60.3645 76.4176C59.725 75.8503 59.2033 75.1619 58.8292 74.3919L57.9814 72.6554L57.7522 72.7161C51.026 74.5264 44.2912 74.5395 38.2918 73.0331C37.8785 72.929 37.4897 72.7443 37.1476 72.4895C36.8055 72.2347 36.5167 71.9147 36.2978 71.5478C36.0789 71.181 35.9341 70.7745 35.8718 70.3515C35.8094 69.9285 35.8307 69.4973 35.9344 69.0825Z"
            fill="#00B96B"
            fillOpacity="0.8"
          />
        </G>
      </G>
      <Defs>
        <Filter
          id="filter0_i_4303_2223"
          x="-199.471"
          y="-199.297"
          width="522.879"
          height="529.706"
          filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="2" />
          <FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <FeColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <FeBlend mode="normal" in2="shape" result="effect1_innerShadow_4303_2223" />
        </Filter>
        <Filter
          id="filter1_i_4303_2223"
          x="-166.281"
          y="-163.252"
          width="442.047"
          height="441.302"
          filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="2" />
          <FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <FeColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <FeBlend mode="normal" in2="shape" result="effect1_innerShadow_4303_2223" />
        </Filter>
        <ClipPath id="clip0_4303_2223">
          <Rect width="122.879" height="129.706" fill="white" transform="translate(0.529297 0.703125)" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
