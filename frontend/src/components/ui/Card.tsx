import Shareicon from "../../icons/Shareicon";
import TrashIcon from "../../icons/Trashicon";


interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}


export function Card({ title, link, type }: CardProps) {
  return (
    <div>
      <div className="p-8 bg-white rounded-md shadow-md max-w-72 border">
        <div className="flex justify-between  ">
          <div className="flex items-center text-md">
            <div className="pr-3 text-gray-500">
              <Shareicon />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <Shareicon />
              </a>
            </div>
            <div className="text-gray-500">
              <TrashIcon />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" &&
            <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          }
          {
            type === "twitter" &&
            <blockquote className="twitter-tweet p-4">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          }
        </div>
      </div>
    </div>
  )
}
