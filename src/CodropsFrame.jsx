import { SvgLogo } from './SvgLogo'

export default function () {
  return (
    <div className="frame container" id="top">
              <a href="#top">
                <SvgLogo width="50" height="50" />
              </a>
      <div className="frame__title">
        <h1 className="frame__title-main">
          Progressively enhanced WebGL concept created by{" "}
          <a href="https://www.gabrielfleury.design">Gabriel Fleury</a>
          {" "}for TheZone
        </h1>
      </div>
      {/* <a
        aria-label="Back to the article"
        className="frame__title-back"
        href="https://tympanus.net/codrops/?p=73607"
      >
        <span className="oh__inner">Back to the article</span>
        <svg width="18px" height="18px" viewBox="0 0 24 24">
          <path
            vectorEffect="non-scaling-stroke"
            d="M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
          ></path>
        </svg>
      </a> */}
    </div>
  );
}
