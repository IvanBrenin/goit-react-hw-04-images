import css from './Modal.module.css';
import { useEffect } from 'react';

export default function Modal({ onClose, largeImageURL }) {
   
    const handleKeyDown = e => {
            if (e.code === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <div className={css.Overlay} onClick={onClose}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt="" />
            </div>
        </div>
    );
}
