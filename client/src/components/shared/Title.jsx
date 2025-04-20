import { useEffect } from "react";

const Title = ({ title }) => {
  useEffect(() => {
    document.title = title || " Anuk Chat App ";
  }, [title]);

  return null;
};

export default Title;
