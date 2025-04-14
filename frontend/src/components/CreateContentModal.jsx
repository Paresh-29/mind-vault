import { useEffect, useRef, useState } from 'react';
import { apiWithAuth } from '../utils/axios';
const CreateModalContent = ({ isOpen, onClose, onSuccess, }) => {
    const [formData, setFormData] = useState({
        link: '',
        title: '',
        type: '',
        tags: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const modalRef = useRef(null);
    useEffect(() => {
        if (!isOpen)
            return;
        const handleClickOutside = (event) => {
            if (modalRef.current &&
                !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            await apiWithAuth.post('/content', {
                ...formData,
                tags: formData.tags
                    ? formData.tags.split(',').map((tag) => tag.trim())
                    : [],
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFormData({
                link: '',
                title: '',
                type: '',
                tags: '',
            });
            onSuccess();
        }
        catch (error) {
            setError(error.response?.data?.message || 'Failed to create content');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-gray-200 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" disabled={isLoading}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
          Add New Content
        </h2>

        {error && (<div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {error}
          </div>)}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
              Link
            </label>
            <input type="text" id="link" name="link" value={formData.link} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter content link" disabled={isLoading} required/>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
              Title
            </label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter content title" disabled={isLoading} required/>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
              Type
            </label>
            <select id="type" name="type" value={formData.type} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isLoading} required>
              <option value="">Select content type</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
              <option value="article">Article</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
              Tags
            </label>
            <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter tags (comma-separated)" disabled={isLoading}/>
          </div>

          <button type="submit" disabled={isLoading} className={`w-full py-2 px-4 rounded-md transition-colors
                        ${isLoading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'} text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
            {isLoading ? 'Creating...' : 'Add Content'}
          </button>
        </form>
      </div>
    </div>);
};
export default CreateModalContent;
