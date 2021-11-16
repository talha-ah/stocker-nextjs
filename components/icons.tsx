const defaultSize = 16
const defaultColor = "black"

export const Burger = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 4H13V4.88889H3V4Z" fill={color} />
    <path d="M3 7.55556H13V8.44444H3V7.55556Z" fill={color} />
    <path d="M3 11.1111H13V12H3V11.1111Z" fill={color} />
  </svg>
)

export const ArrowDown = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3C8.34517 3 8.625 3.24873 8.625 3.55556L8.625 11.1032L11.9331 8.16272C12.1771 7.94575 12.5729 7.94575 12.8169 8.16272C13.061 8.37968 13.061 8.73143 12.8169 8.94839L8.44194 12.8373C8.19786 13.0542 7.80214 13.0542 7.55806 12.8373L3.18306 8.94839C2.93898 8.73143 2.93898 8.37968 3.18306 8.16272C3.42714 7.94576 3.82286 7.94576 4.06694 8.16272L7.375 11.1032L7.375 3.55556C7.375 3.24873 7.65482 3 8 3Z"
      fill={color}
    />
  </svg>
)

export const ArrowLeft = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 8C13 8.34517 12.7513 8.625 12.4444 8.625L4.89679 8.625L7.83728 11.9331C8.05425 12.1771 8.05425 12.5729 7.83728 12.8169C7.62032 13.061 7.26857 13.061 7.05161 12.8169L3.16272 8.44194C2.94576 8.19786 2.94576 7.80214 3.16272 7.55806L7.05161 3.18306C7.26857 2.93898 7.62032 2.93898 7.83728 3.18306C8.05424 3.42714 8.05425 3.82286 7.83728 4.06694L4.89679 7.375L12.4444 7.375C12.7513 7.375 13 7.65482 13 8Z"
      fill={color}
    />
  </svg>
)

export const ArrowRight = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8C3 7.65483 3.24873 7.375 3.55556 7.375L11.1032 7.375L8.16272 4.06694C7.94575 3.82287 7.94575 3.42714 8.16272 3.18307C8.37968 2.93898 8.73143 2.93898 8.94839 3.18307L12.8373 7.55806C13.0542 7.80214 13.0542 8.19786 12.8373 8.44194L8.94839 12.8169C8.73143 13.061 8.37968 13.061 8.16272 12.8169C7.94576 12.5729 7.94576 12.1771 8.16272 11.9331L11.1032 8.625L3.55556 8.625C3.24873 8.625 3 8.34518 3 8Z"
      fill={color}
    />
  </svg>
)

export const ChevronDown = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.7436 6C12.8339 6 12.912 6.02474 12.978 6.07422C13.0439 6.1237 13.0769 6.18229 13.0769 6.25C13.0769 6.31771 13.0439 6.3763 12.978 6.42578L8.31129 9.92578C8.24532 9.97526 8.16719 10 8.07692 10C7.98664 10 7.90851 9.97526 7.84254 9.92578L3.17588 6.42578C3.10991 6.3763 3.07692 6.31771 3.07692 6.25C3.07692 6.18229 3.10991 6.1237 3.17588 6.07422C3.24185 6.02474 3.31997 6 3.41025 6C3.50053 6 3.57865 6.02474 3.64463 6.07422L8.07692 9.39453L12.5092 6.07422C12.5752 6.02474 12.6533 6 12.7436 6Z"
      fill={color}
    />
  </svg>
)

export const ChevronLeft = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 12.7436C10 12.8338 9.97526 12.912 9.92578 12.978C9.8763 13.0439 9.81771 13.0769 9.75 13.0769C9.68229 13.0769 9.6237 13.0439 9.57422 12.978L6.07421 8.31127C6.02473 8.2453 6 8.16717 6 8.0769C6 7.98662 6.02474 7.90849 6.07421 7.84252L9.57422 3.17586C9.6237 3.10989 9.68229 3.0769 9.75 3.0769C9.81771 3.0769 9.8763 3.10989 9.92578 3.17586C9.97526 3.24183 10 3.31996 10 3.41024C10 3.50051 9.97526 3.57864 9.92578 3.64461L6.60547 8.0769L9.92578 12.5092C9.97526 12.5752 10 12.6533 10 12.7436Z"
      fill={color}
    />
  </svg>
)
export const ChevronRight = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 3.25643C6 3.16616 6.02474 3.08803 6.07422 3.02203C6.1237 2.9561 6.18229 2.9231 6.25 2.9231C6.31771 2.9231 6.3763 2.9561 6.42578 3.02203L9.92578 7.68873C9.97526 7.7547 10 7.83283 10 7.9231C10 8.01338 9.97526 8.0915 9.92578 8.15748L6.42578 12.8241C6.3763 12.8901 6.31771 12.9231 6.25 12.9231C6.18229 12.9231 6.1237 12.8901 6.07422 12.8241C6.02474 12.7582 6 12.68 6 12.5898C6 12.4995 6.02474 12.4214 6.07422 12.3554L9.39453 7.9231L6.07422 3.49083C6.02474 3.42483 6 3.3467 6 3.25643Z"
      fill={color}
    />
  </svg>
)

export const ChevronUp = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.25641 10C3.16615 10 3.08801 9.97526 3.02201 9.92578C2.95608 9.8763 2.92308 9.81771 2.92308 9.75C2.92308 9.68229 2.95608 9.6237 3.02201 9.57422L7.68871 6.07422C7.75468 6.02474 7.83281 6 7.92308 6C8.01336 6 8.09149 6.02474 8.15746 6.07422L12.8241 9.57422C12.8901 9.6237 12.9231 9.68229 12.9231 9.75C12.9231 9.81771 12.8901 9.8763 12.8241 9.92578C12.7582 9.97526 12.68 10 12.5897 10C12.4995 10 12.4213 9.97526 12.3554 9.92578L7.92308 6.60547L3.49081 9.92578C3.42481 9.97526 3.34668 10 3.25641 10Z"
      fill={color}
    />
  </svg>
)

export const Cross = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.2717 3L8.00051 7.27219L3.72834 3L3 3.72834L7.27114 8.00053L3 12.2717L3.72834 13L8.00051 8.72887L12.2717 13L13 12.2717L8.72783 8.00053L13 3.72834L12.2717 3Z"
      fill={color}
    />
  </svg>
)

export const Delete = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 7L6.5 11C6.5 11.2761 6.72386 11.5 7 11.5C7.27614 11.5 7.5 11.2761 7.5 11L7.5 7C7.5 6.72386 7.27614 6.5 7 6.5C6.72386 6.5 6.5 6.72386 6.5 7Z"
      fill={color}
    />
    <path
      d="M9 6.5C9.27614 6.5 9.5 6.72386 9.5 7V11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11V7C8.5 6.72386 8.72386 6.5 9 6.5Z"
      fill={color}
    />
    <path
      d="M10 4H13C13.2761 4 13.5 4.22386 13.5 4.5C13.5 4.77614 13.2761 5 13 5H12.4475L11.6946 11.7761C11.5539 13.0422 10.4838 14 9.20991 14H6.79008C5.51621 14 4.44605 13.0422 4.30537 11.7761L3.55247 5H3C2.72386 5 2.5 4.77614 2.5 4.5C2.5 4.22386 2.72386 4 3 4H6C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4ZM8 3C7.44772 3 7 3.44772 7 4H9C9 3.44772 8.55229 3 8 3ZM4.55863 5L5.29925 11.6656C5.38366 12.4253 6.02575 13 6.79008 13H9.20991C9.97423 13 10.6163 12.4253 10.7007 11.6656L11.4414 5H4.55863Z"
      fill={color}
    />
  </svg>
)

export const Edit = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.6569 2.3436C14.4379 3.12465 14.4379 4.39098 13.6569 5.17203L6.27041 12.5585C5.95001 12.8789 5.54856 13.1062 5.10898 13.2161L2.81798 13.7888C2.45179 13.8804 2.12009 13.5487 2.21164 13.1825L2.78439 10.8915C2.89429 10.4519 3.12158 10.0505 3.44198 9.73006L10.8284 2.3436C11.6095 1.56255 12.8758 1.56255 13.6569 2.3436ZM10.1213 4.46481L4.14909 10.4372C3.95685 10.6294 3.82047 10.8703 3.75453 11.134L3.3839 12.6166L4.86645 12.2459C5.13019 12.18 5.37106 12.0436 5.5633 11.8514L11.5353 5.87881L10.1213 4.46481ZM11.5355 3.05071L10.8283 3.75781L12.2423 5.17181L12.9498 4.46492C13.3403 4.07439 13.3403 3.44123 12.9498 3.05071C12.5592 2.66018 11.9261 2.66018 11.5355 3.05071Z"
      fill={color}
    />
  </svg>
)

export const Plus = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.33333 3H7.66666V7.66667H3V8.33334H7.66666V13H8.33333V8.33334H13V7.66667H8.33333V3Z"
      fill={color}
    />
  </svg>
)

export const Receipt = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 5C3 3.89543 3.89543 3 5 3H12C13.1046 3 14 3.89543 14 5V12H17V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V5ZM14 13V16C15.1046 16 16 15.1046 16 14V13H14ZM13 16V5C13 4.44772 12.5523 4 12 4H5C4.44772 4 4 4.44772 4 5V14C4 15.1046 4.89543 16 6 16H13ZM6 6.5C6 6.22386 6.22386 6 6.5 6H10.5C10.7761 6 11 6.22386 11 6.5C11 6.77614 10.7761 7 10.5 7H6.5C6.22386 7 6 6.77614 6 6.5ZM6 9.5C6 9.22386 6.22386 9 6.5 9H10.5C10.7761 9 11 9.22386 11 9.5C11 9.77614 10.7761 10 10.5 10H6.5C6.22386 10 6 9.77614 6 9.5ZM6 12.5C6 12.2239 6.22386 12 6.5 12H8.5C8.77614 12 9 12.2239 9 12.5C9 12.7761 8.77614 13 8.5 13H6.5C6.22386 13 6 12.7761 6 12.5Z"
      fill={color}
    />
  </svg>
)

export const Search = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9011 12.4323L9.7604 9.29167C10.0417 8.95486 10.2621 8.57813 10.4219 8.16146C10.5851 7.74132 10.6667 7.29861 10.6667 6.83333C10.6667 6.48264 10.6198 6.14583 10.5261 5.82292C10.4357 5.49653 10.3073 5.19097 10.1406 4.90625C9.97393 4.62153 9.7726 4.36285 9.53647 4.13021C9.30382 3.8941 9.04514 3.69271 8.76041 3.52604C8.47569 3.35937 8.17014 3.2309 7.84375 3.14063C7.52083 3.04688 7.18403 3 6.83333 3C6.30903 3 5.81423 3.10243 5.34896 3.30729C4.88715 3.50868 4.4809 3.78472 4.13021 4.13541C3.78299 4.48264 3.50695 4.88889 3.30208 5.35417C3.10069 5.81597 3 6.30903 3 6.83333C3 7.18055 3.04514 7.51736 3.13542 7.84375C3.22917 8.16667 3.35937 8.47049 3.52604 8.75521C3.69618 9.03646 3.89931 9.29514 4.13541 9.53125C4.37153 9.76733 4.63021 9.97047 4.91146 10.1406C5.19618 10.3073 5.5 10.4375 5.82292 10.5313C6.14931 10.6215 6.48611 10.6667 6.83333 10.6667C7.29861 10.6667 7.73959 10.5868 8.15625 10.4271C8.57639 10.2639 8.95486 10.0417 9.29167 9.7604L12.4323 12.9011C12.4983 12.967 12.5764 13 12.6667 13C12.7569 13 12.8351 12.967 12.9011 12.9011C12.967 12.8351 13 12.7569 13 12.6667C13 12.5764 12.967 12.4983 12.9011 12.4323ZM3.66667 6.83333C3.66667 6.40278 3.75 5.99653 3.91667 5.61459C4.08681 5.22917 4.31597 4.89236 4.60417 4.60417C4.89236 4.31597 5.22743 4.08854 5.60937 3.92187C5.99479 3.75173 6.40278 3.66667 6.83333 3.66667C7.26389 3.66667 7.67014 3.75173 8.05208 3.92187C8.4375 4.08854 8.77431 4.31597 9.0625 4.60417C9.35067 4.89236 9.57813 5.22917 9.7448 5.61459C9.91493 5.99653 10 6.40278 10 6.83333C10 7.26389 9.91493 7.67187 9.7448 8.05729C9.57813 8.43923 9.35067 8.77431 9.0625 9.0625C8.77431 9.35069 8.4375 9.57986 8.05208 9.75C7.67014 9.91667 7.26389 10 6.83333 10C6.40278 10 5.99479 9.91667 5.60937 9.75C5.22743 9.57986 4.89236 9.35069 4.60417 9.0625C4.31597 8.77431 4.08681 8.43923 3.91667 8.05729C3.75 7.67187 3.66667 7.26389 3.66667 6.83333Z"
      fill={color}
    />
  </svg>
)

export const Settings = ({
  size = defaultSize,
  color = defaultColor,
}: {
  size?: number
  color?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.62562 3C6.68145 3 6.73728 3.00985 6.7931 3.02956C6.84893 3.04926 6.8982 3.07882 6.94089 3.11823L7.84729 3.93596C7.90969 3.93268 7.97208 3.93268 8.03448 3.93596C8.09688 3.93596 8.15928 3.9376 8.22168 3.94089L8.98522 3.15271C9.07389 3.05747 9.18554 3.00985 9.32022 3.00985C9.40887 3.00985 9.50081 3.02627 9.59608 3.05911C9.69129 3.08867 9.78159 3.11987 9.86703 3.15271C9.93922 3.17898 10.023 3.21018 10.1182 3.24631C10.2134 3.28243 10.3038 3.32676 10.3892 3.37931C10.4746 3.42857 10.5468 3.48768 10.6059 3.55665C10.6683 3.62562 10.7012 3.70772 10.7044 3.80296L10.7635 5.0197C10.8095 5.0624 10.8539 5.10673 10.8966 5.15271C10.9393 5.1954 10.982 5.23974 11.0246 5.28571C11.2118 5.28243 11.399 5.27915 11.5862 5.27586C11.7734 5.27258 11.9606 5.27094 12.1478 5.27094C12.1872 5.27094 12.2249 5.2775 12.2611 5.29064C12.3005 5.30378 12.3366 5.32184 12.3695 5.34482C12.4286 5.38423 12.4942 5.45977 12.5665 5.57143C12.642 5.68308 12.711 5.8046 12.7734 5.93596C12.8391 6.06732 12.8932 6.19704 12.9359 6.32512C12.9786 6.4532 13 6.55336 13 6.62561C13 6.68144 12.9902 6.73727 12.9704 6.7931C12.9508 6.84893 12.9212 6.89819 12.8818 6.94088L12.064 7.84729C12.0673 7.90968 12.0673 7.97208 12.064 8.03448C12.064 8.09688 12.0624 8.15927 12.0591 8.22167L12.8473 8.98522C12.9426 9.07387 12.9902 9.18554 12.9902 9.32022C12.9902 9.40888 12.9737 9.50245 12.9409 9.601C12.9081 9.69622 12.8769 9.78487 12.8473 9.86697C12.821 9.93923 12.7898 10.023 12.7537 10.1182C12.7176 10.2102 12.6733 10.2988 12.6207 10.3842C12.5714 10.4696 12.5123 10.5435 12.4434 10.6059C12.3744 10.665 12.2939 10.6978 12.202 10.7045L10.9803 10.7635C10.9376 10.8095 10.8933 10.8538 10.8473 10.8966C10.8046 10.9393 10.7603 10.982 10.7143 11.0246C10.7176 11.2118 10.7208 11.399 10.7241 11.5862C10.7274 11.7734 10.729 11.9606 10.729 12.1478C10.729 12.1872 10.7225 12.2249 10.7094 12.2611C10.6963 12.2972 10.6782 12.3317 10.6552 12.3645C10.6289 12.4039 10.5846 12.4483 10.5222 12.4975C10.4631 12.5435 10.3941 12.5911 10.3153 12.6404C10.2365 12.6864 10.1511 12.7307 10.0591 12.7734C9.97044 12.8161 9.88342 12.8555 9.79805 12.8916C9.71267 12.9245 9.63221 12.9508 9.55667 12.9704C9.48441 12.9902 9.42363 13 9.37438 13C9.31858 13 9.26272 12.9902 9.20691 12.9704C9.15107 12.9508 9.10181 12.9212 9.05911 12.8818L8.15271 12.064C8.09031 12.0673 8.02791 12.0689 7.96552 12.0689C7.90312 12.0657 7.84072 12.0624 7.77833 12.0591L7.01478 12.8473C6.92611 12.9425 6.81445 12.9902 6.6798 12.9902C6.59113 12.9902 6.49918 12.9753 6.40394 12.9458C6.3087 12.913 6.21839 12.8801 6.13301 12.8473C6.06075 12.821 5.97701 12.7898 5.88177 12.7537C5.78654 12.7176 5.69623 12.6749 5.61084 12.6256C5.52545 12.5731 5.4532 12.5123 5.39409 12.4434C5.33498 12.3711 5.30214 12.289 5.29557 12.197L5.23645 10.9803C5.19047 10.9376 5.14614 10.8949 5.10345 10.8522C5.06075 10.8062 5.01807 10.7603 4.97537 10.7143C4.78818 10.7176 4.60099 10.7208 4.41379 10.7241C4.2266 10.7274 4.03941 10.729 3.85222 10.729C3.81281 10.729 3.77504 10.7225 3.73892 10.7094C3.70279 10.6962 3.66831 10.6782 3.63547 10.6551C3.59606 10.6289 3.55173 10.5862 3.50246 10.5271C3.45649 10.4647 3.40887 10.3941 3.35961 10.3153C3.31363 10.2365 3.26929 10.1527 3.2266 10.064C3.18391 9.97208 3.1445 9.88342 3.10837 9.79805C3.07553 9.71261 3.04926 9.63379 3.02956 9.56159C3.00985 9.48606 3 9.42363 3 9.37439C3 9.31852 3.00985 9.26272 3.02956 9.20692C3.04926 9.15105 3.07882 9.1018 3.11823 9.05912L3.93596 8.15271C3.93268 8.09031 3.93104 8.02791 3.93104 7.96551C3.93432 7.90311 3.9376 7.84072 3.94089 7.77832L3.15271 7.01478C3.05747 6.92611 3.00985 6.81445 3.00985 6.6798C3.00985 6.59113 3.02627 6.49918 3.05911 6.40394C3.09195 6.30542 3.12315 6.2151 3.15271 6.133C3.17898 6.06075 3.21018 5.97865 3.24631 5.8867C3.28243 5.79146 3.32512 5.70115 3.37438 5.61576C3.42693 5.53037 3.48768 5.45649 3.55665 5.39409C3.62561 5.33169 3.70608 5.29885 3.79803 5.29557L5.0197 5.23645C5.0624 5.19047 5.10509 5.14614 5.14779 5.10345C5.19376 5.06075 5.23974 5.01806 5.28572 4.97536C5.28243 4.78818 5.27915 4.60099 5.27586 4.41379C5.27258 4.2266 5.27094 4.03941 5.27094 3.85222C5.27094 3.81281 5.2775 3.77504 5.29064 3.73892C5.30378 3.69951 5.32184 3.66338 5.34483 3.63054C5.38424 3.57143 5.45977 3.50575 5.57143 3.4335C5.68308 3.35796 5.8046 3.289 5.93596 3.2266C6.06732 3.16092 6.19705 3.10673 6.32512 3.06404C6.4532 3.02135 6.55337 3 6.62562 3ZM5.90148 3.97537L5.91626 5.1133C5.91626 5.16256 5.8867 5.22988 5.82759 5.31527C5.77176 5.39737 5.70444 5.47783 5.62562 5.55665C5.5468 5.63547 5.4647 5.70443 5.37931 5.76354C5.29721 5.82266 5.23153 5.85385 5.18226 5.85714L3.93596 5.92118L3.66995 6.63547L4.48276 7.42857C4.52873 7.47455 4.55665 7.52873 4.5665 7.59113C4.57964 7.65353 4.58621 7.71756 4.58621 7.78325C4.58621 7.82266 4.58621 7.87685 4.58621 7.94581C4.58621 8.01149 4.58292 8.07881 4.57636 8.14778C4.57307 8.21674 4.56486 8.28243 4.55172 8.34483C4.53859 8.40393 4.51888 8.44827 4.49261 8.47783L3.6601 9.40396L3.97537 10.0985C4.16584 10.0952 4.35632 10.0919 4.5468 10.0887C4.73727 10.0854 4.92775 10.0837 5.11823 10.0837C5.16749 10.0837 5.23317 10.1133 5.31527 10.1724C5.39737 10.2315 5.47783 10.3005 5.55665 10.3793C5.63547 10.4581 5.70444 10.5386 5.76355 10.6207C5.82266 10.7028 5.85386 10.7685 5.85715 10.8178L5.92118 12.064L6.63547 12.3301L7.42857 11.5172C7.47455 11.468 7.53038 11.4384 7.59606 11.4286C7.66502 11.4187 7.73235 11.4138 7.79803 11.4138C7.83744 11.4138 7.88998 11.4138 7.95567 11.4138C8.02135 11.4138 8.08703 11.4171 8.15271 11.4236C8.22168 11.4269 8.28572 11.4351 8.34483 11.4483C8.40394 11.4614 8.44828 11.4811 8.47784 11.5074L9.40396 12.3399L10.0985 12.0246L10.0837 10.8867C10.0837 10.8374 10.1117 10.7717 10.1675 10.6896C10.2266 10.6043 10.2955 10.5222 10.3744 10.4433C10.4532 10.3645 10.5336 10.2955 10.6158 10.2365C10.7012 10.1773 10.7684 10.1461 10.8178 10.1428L12.064 10.0788L12.33 9.36455L11.5172 8.57142C11.4713 8.52545 11.4417 8.47126 11.4286 8.40886C11.4187 8.34647 11.4138 8.28243 11.4138 8.21674C11.4138 8.17734 11.4138 8.12479 11.4138 8.05911C11.4138 7.99015 11.4154 7.92118 11.4187 7.85221C11.4253 7.78325 11.4351 7.71921 11.4483 7.6601C11.4614 7.5977 11.4811 7.55172 11.5074 7.52217L12.3399 6.59606L12.0246 5.90148C11.8341 5.90476 11.6437 5.90804 11.4532 5.91133C11.2627 5.91461 11.0722 5.91625 10.8818 5.91625C10.8325 5.91625 10.7668 5.8867 10.6847 5.82759C10.6026 5.76847 10.5222 5.6995 10.4433 5.62069C10.3645 5.54187 10.2955 5.46141 10.2365 5.37931C10.1773 5.29721 10.1462 5.23153 10.1429 5.18226L10.0788 3.93596L9.36455 3.66995L8.57143 4.48276C8.52545 4.52873 8.47127 4.55829 8.40887 4.57143C8.34647 4.58128 8.28243 4.58621 8.21675 4.58621C8.17734 4.58621 8.12316 4.58621 8.05419 4.58621C7.9885 4.58621 7.92118 4.58456 7.85222 4.58128C7.78325 4.57471 7.71757 4.56486 7.65517 4.55172C7.59606 4.53859 7.55173 4.51888 7.52217 4.49261L6.59606 3.6601L5.90148 3.97537ZM8.00493 6.42364C8.21839 6.42364 8.42036 6.46634 8.61084 6.55172C8.80132 6.63382 8.96716 6.74712 9.10838 6.89162C9.25288 7.03612 9.36619 7.20361 9.44828 7.39408C9.53366 7.58456 9.57635 7.78653 9.57635 8C9.57635 8.21346 9.53366 8.41707 9.44828 8.61083C9.36619 8.80131 9.25288 8.96882 9.10838 9.11328C8.96716 9.25452 8.79967 9.36783 8.60591 9.45321C8.41544 9.5353 8.21346 9.57635 8 9.57635C7.78653 9.57635 7.58457 9.5353 7.39409 9.45321C7.20361 9.36783 7.03613 9.25288 6.89163 9.10836C6.74712 8.96384 6.63218 8.79638 6.5468 8.60591C6.4647 8.41543 6.42364 8.21346 6.42364 8C6.42364 7.78325 6.4647 7.57963 6.5468 7.38916C6.63218 7.1954 6.74549 7.02791 6.8867 6.8867C7.0312 6.7422 7.19869 6.6289 7.38916 6.54679C7.58292 6.46469 7.78818 6.42364 8.00493 6.42364ZM8 7.05418C7.86864 7.05418 7.74549 7.08046 7.63055 7.133C7.5156 7.18554 7.41544 7.25615 7.33005 7.34483C7.24467 7.43349 7.17734 7.53694 7.12808 7.65517C7.07882 7.77339 7.05419 7.89655 7.05419 8.02462C7.05419 8.15271 7.08046 8.27257 7.133 8.38424C7.18883 8.49589 7.26109 8.59441 7.34975 8.6798C7.44171 8.7619 7.54516 8.82758 7.6601 8.87684C7.77833 8.92282 7.89984 8.94581 8.02463 8.94581C8.15271 8.94581 8.27257 8.91953 8.38424 8.86699C8.49589 8.81116 8.59278 8.73891 8.67488 8.65024C8.76026 8.55829 8.82594 8.45484 8.87192 8.3399C8.92118 8.22167 8.94581 8.10016 8.94581 7.97537C8.94581 7.85057 8.91954 7.73234 8.86699 7.62069C8.81445 7.50903 8.74384 7.41215 8.65518 7.33005C8.56979 7.24466 8.46962 7.17734 8.35468 7.12808C8.24302 7.07881 8.1248 7.05418 8 7.05418Z"
      fill={color}
    />
  </svg>
)

export const Empty = () => (
  <svg
    width="184"
    height="152"
    viewBox="0 0 184 152"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#dce0e6" fillRule="evenodd">
      <g transform="translate(24 31.67)">
        <ellipse
          fillOpacity="0.8"
          fill="#f5f5f5"
          cx="67.797"
          cy="106.89"
          rx="67.797"
          ry="12.668"
        ></ellipse>
        <path
          fill="#aeb8c2"
          d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
        ></path>
        <path
          d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
          transform="translate(13.56)"
        ></path>
        <path
          fill="#f5f5f7"
          d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
        ></path>
        <path
          fill="#dce0e6"
          d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
        ></path>
      </g>
      <path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"></path>
      <g fill="#fff" transform="translate(149.65 15.383)">
        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse>
        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path>
      </g>
    </g>
  </svg>
)
