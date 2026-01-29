import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const API_URL = 'https://api.unsplash.com/search/photos';
    const IMAGES_PER_PAGE = 24;

    const [query, setQuery] = useState('unsplash');
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(1);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSearch = async () => {
        if (!query) return;
        try {
            const { data } = await axios.get(
                `${API_URL}?query=${query}&page=${currentPage}&per_page=${IMAGES_PER_PAGE}`,
                {
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
                    },
                },
            );
            setImages(data.results);
            setTotalResults(data.total);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='py-10 px-8 space-y-10 rounded-3xl mb-4 border'>
                <div className='px-3'>
                    <div className='flex space-x-4 mb-6'>
                        <input
                            ref={inputRef}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search images...'
                            value={query}
                            type='text'
                            className='w-[90%] py-3 px-5 rounded-2xl border'
                        />
                        <button
                            onClick={() => {
                                handleSearch();
                                inputRef.current?.focus();
                            }}
                            className='w-[10%] rounded-2xl border text-center'
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {images ? (
                    <div>
                        {images.map((image, index) => (
                            <img
                                key={`${image.id}-${index}`}
                                src={image.urls.small}
                                alt={image.alt_description}
                            />
                        ))}
                    </div>
                ) : (
                    <div>No Images Found</div>
                )}
            </div>
        </div>
    );
}

export default App;
