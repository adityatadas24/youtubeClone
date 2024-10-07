import React from 'react'
import user2 from "../assets/user-2.png";

const VideoItem = ({ video,key }) => {
    return (
      <a className="group" href="#">
        <div className="relative" key={key}>
          <img className="rounded-2xl aspect-video" src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
        </div>
  
        <div className="flex gap-3 py-3 px-2">
          <img className="h-9 w-9 rounded-full" src={user2} />
          <div>
            <h2 className="group-hover:text-blue-500 font-semibold leading-snug line-clamp-2 dark:text-neutral-300" title={video.title}>
              {video.snippet.title}
            </h2>
            <p className="text-sm mt-1 text-neutral-500 hover:text-neutral-500 dark:text-neutral-400">
              {video.snippet.channelTitle}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              3.5M Views • {video.snippet.publishedAt.slice(0, 10)}
            </p>
          </div>
        </div>
      </a>
    )
  }
  
  export default VideoItem
