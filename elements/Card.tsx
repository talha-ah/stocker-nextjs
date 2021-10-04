import styled from "styled-components"

const Shadow = styled.div``

export default function Card({ children }: any) {
  return (
    <div
      css={`
        margin: 0px auto;
        height: 200px;
        display: flex;
        min-width: 0;
        word-wrap: break-word;
        position: relative;
        flex-direction: column;
        overflow: hidden;
        transition: transform 0.2s ease 0s;
        background: rgb(255, 255, 255);
        border: 2px solid rgb(4, 6, 8);
        border-radius: 5px;
        box-shadow: rgb(210 239 253) 14px 14px;

        @media (min-width: 1024px) {
          width: 306px;
        }
      `}
    >
      <div
        css={`
          // Card body
          padding: 0px;
          display: block;
          -webkit-box-flex: 1;
          flex: 1 1 auto;
        `}
      >
        <div
          css={`
            // Content wrap
            padding: 0px 16px;
            display: flex;
            flex: 1 1 0%;
            flex-direction: column;
            height: 100%;
          `}
        >
          <div
            css={`
              // Entry header
              text-align: left;
              flex: 1 1 0%;
              max-height: 80%;
            `}
          >
            <div
              css={`
                // Flex
                display: flex;
                height: 100% !important;
                justify-content: center !important;
                flex-direction: column !important;
              `}
            >
              <h5
                css={`
                  margin-bottom: 0.5rem;
                  font-family: SF Pro Display, -apple-system, acumin-pro,
                    BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial,
                    sans-serif, Apple Color Emoji, Segoe UI Emoji,
                    Segoe UI Symbol;
                  font-weight: 600;
                  line-height: 1.2;
                  color: inherit;
                `}
              >
                <a
                  css={`
                    font-size: 18px;
                    font-weight: 800;
                    text-align: left;
                    line-height: 130%;
                    color: rgb(0, 0, 0);
                    text-decoration: none;
                    transition: all 0.3s ease 0s;
                    background-color: transparent;
                  `}
                >
                  Building a Smooth Image Carousel with FlatList in React Native
                </a>
              </h5>
            </div>
          </div>
          <div
            css={`
              // Entry Footer
              font-size: 12px;
              color: rgb(153, 153, 153);
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              flex-wrap: wrap;
              margin-bottom: 1em;
            `}
          >
            <div
              css={`
                //  Publishable date
                line-height: 31px;
                vertical-align: middle;
              `}
            >
              <time
                css={`
                  font-weight: 500;
                  font-size: 10px;
                  line-height: 177.4%;
                  color: rgb(4, 6, 8);
                `}
                dateTime="2021-09-28T17:26:09.183"
              >
                Sep 28th, 2021
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
