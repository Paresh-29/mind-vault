import { useEffect } from 'react';
import { TrashIcon, ShareIcon } from '@heroicons/react/24/outline';
const getYouTubeEmbedUrl = (url) => {
    if (!url)
        return null;
    // Handle youtu.be links
    const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortUrlMatch)
        return `https://www.youtube.com/embed/${shortUrlMatch[1]}`;
    // Handle regular YouTube URLs
    const standardMatch = url.match(/(?:v=|\/v\/|embed\/|watch\?v=|\&v=)([a-zA-Z0-9_-]{11})/);
    return standardMatch
        ? `https://www.youtube.com/embed/${standardMatch[1]}`
        : null;
};
export function Card({ id, title, link, type, tags, createdAt, deleteContent, }) {
    useEffect(() => {
        if (type !== 'twitter')
            return;
        const initTwitterWidget = () => {
            if (window.twttr?.widgets) {
                window.twttr.widgets.load();
            }
            else {
                const script = document.createElement('script');
                script.src = 'https://platform.twitter.com/widgets.js';
                script.async = true;
                script.onload = () => {
                    if (window.twttr?.widgets) {
                        window.twttr.widgets.load();
                    }
                };
                document.body.appendChild(script);
                return () => {
                    document.body.removeChild(script);
                };
            }
        };
        initTwitterWidget();
    }, [type, link]);
    const renderIcon = () => {
        switch (type) {
            case 'twitter':
                return (<svg className="w-4 h-4 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>);
            case 'youtube':
                return (<svg className="w-4 h-4 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>);
            case 'article':
                return (<svg className="w-4 h-4 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H6z"/>
          </svg>);
            default:
                return null;
        }
    };
    const renderContent = () => {
        switch (type) {
            case 'youtube':
                return (<div className="relative aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
            <iframe className="absolute inset-0 w-full h-full" src={getYouTubeEmbedUrl(link) || ''} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
          </div>);
            case 'twitter':
                return (<div className="bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden h-48 flex items-center justify-center">
            <blockquote className="twitter-tweet p-2" data-conversation="none">
              <a href={link.replace('x.com', 'twitter.com')}/>
            </blockquote>
          </div>);
            case 'article':
                return (<div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-48 flex items-center justify-center">
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-500">
              Read Article
            </a>
          </div>);
            default:
                return null;
        }
    };
    return (<div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow w-full max-w-xs">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {renderIcon()}
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg" aria-label="Share">
              <ShareIcon className="w-4 h-4 text-gray-600 dark:text-gray-400"/>
            </button>
            <button onClick={() => deleteContent(id)} className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg" aria-label="Delete">
              <TrashIcon className="w-4 h-4 text-gray-600 dark:text-gray-400"/>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-3">{renderContent()}</div>

        {/* Tags */}
        {tags && tags.length > 0 && (<div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (<span key={tag._id} className="px-2 py-0.5 text-xs text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-800 rounded-full">
                #{tag.title}
              </span>))}
          </div>)}

        {/* Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Added on {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>);
}
