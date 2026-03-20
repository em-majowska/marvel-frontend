import DOMPurify from "dompurify";

const purifyStr = (str) => {
  return {
    __html: DOMPurify.sanitize(str, {
      USE_PROFILES: { html: true },
    }),
  };
};
export default purifyStr;
