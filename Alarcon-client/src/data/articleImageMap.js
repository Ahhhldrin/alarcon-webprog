import galdeptImg from "../assets/galdept/galdept.jpg";
import galdept2Img from "../assets/galdept/galdept2.jpg";
import galdept3Img from "../assets/galdept/galdept3.jpg";
import galdept4Img from "../assets/galdept/galdept4.jpg";
import galdept5Img from "../assets/galdept/galdept5.jpg";

const imageMap = {
  "french-parker-shirt": galdeptImg,
  "branko-carpenter-shorts": galdept2Img,
  "40-year-tee": galdept3Img,
  "retouche-everglades-vest": galdept4Img,
  "ai-sweater": galdept5Img,
};

export const resolveArticleImage = (image) => {
  if (!image) {
    return "";
  }

  return imageMap[image] || image;
};
