import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();
  // console.log(fileExt)
  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return video;

  if (fileExt === "mp3" || fileExt === "wav") return audio;

  if (
    fileExt === "png" ||
    fileExt === "gif" ||
    fileExt === "jpeg" ||
    fileExt === "jpg"
  )
    return "image";
    return "file"
};

const transformImage = (url = "",width="100") => url;

const getLast7Days = ()=>{

  const currentDate = moment()
  // console.log(currentDate)
  const last7days = []
  for(let i =0;i<7;i++){
    const dayDate = currentDate.clone().subtract(i,"days")
    // console.log(dayDate,"Day date")
    const dayName = dayDate.format("dddd")
    last7days.unshift(dayName)
  }
  // console.log(last7days)
  return last7days
}

export {fileFormat,transformImage,getLast7Days}
