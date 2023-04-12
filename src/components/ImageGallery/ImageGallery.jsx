import React, { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css'


const API_KEY = '35229674-3e393ba1385e05f4c0aa7cd98'

export default function ImageGallery(props) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (props.searchQuery) {
      setStatus('pending');
      setImages([]);
      setPage(1);

      fetch(`https://pixabay.com/api/?q=${props.searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then((response) => response.json())
        .then((data) => {
          if (data.hits.length === 0) {
            return Promise.reject(
              new Error(`Нет картинок по запросу ${props.searchQuery}`)
            );
          } else {
            setTotalPages(Math.ceil(data.totalHits / 12));
            const images = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            }));
            setImages(images);
            setStatus('resolved');
          }
        })
        .catch((error) => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [props.searchQuery]);

  useEffect(() => {
    if (page <= totalPages && page > 1) {
      setStatus('pending');

      fetch(`https://pixabay.com/api/?q=${props.searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then((response) => response.json())
        .then((data) => {
          if (data.hits.length === 0) {
            return Promise.reject(
              new Error(`Нет картинок по запросу ${props.searchQuery}`)
            );
          } else {
            const images = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            }));
            setImages((prevImages) => [...prevImages, ...images]);
            setStatus('resolved');
          }
        })
        .catch((error) => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [page]);

  const handleImageClick = (e) => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    setLargeImageURL(e.target.dataset.large);
    setModal(true);
  };

  const onModalClose = () => {
    setModal(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const showButton = totalPages > page && status === 'resolved';

  return (
    <div>
      <ul className={css.ImageGallery}>
        {images.map((image) => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onClick={handleImageClick}
          />
        ))}
      </ul>
      {status === 'pending' && <Loader />}
      {status === 'idle' && <h1>Enter your request</h1>}
      {status === 'rejected' && <h1>{error.message}</h1>}
                    {showButton && <Button onClick={handleLoadMore} />}
                    {modal && <Modal onClose={onModalClose} largeImageURL={largeImageURL} />}
                    </div>
            
            );  
        }
    
    

