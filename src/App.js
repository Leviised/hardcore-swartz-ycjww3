import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({ img: '', text: '' });
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const addSlide = () => {
    if (newSlide.img && newSlide.text) {
      setSlides([...slides, newSlide]);
      setNewSlide({ img: '', text: '' });
    }
  };

  const saveSlides = () => {
    const data = JSON.stringify(slides, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mom-memory-album.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Happy Birthday, Mom! 🎉</h1>

      <div className="content">
        <div className="album">
          <h2>📖 Memory Album</h2>
          <div className="slide-view">
            {slides.length > 0 ? (
              <>
                <img src={slides[currentSlideIndex].img} alt="slide" className="slide-img" />
                <p className="caption">{slides[currentSlideIndex].text}</p>
              </>
            ) : (
              <p className="no-slide">No slides yet. Add your first memory below!</p>
            )}
            <div className="nav-buttons">
              <button onClick={prevSlide} disabled={slides.length === 0}>⬅️</button>
              <button onClick={nextSlide} disabled={slides.length === 0}>➡️</button>
            </div>
          </div>

          <div className="inputs">
            <input
              type="text"
              placeholder="Image URL"
              value={newSlide.img}
              onChange={(e) => setNewSlide({ ...newSlide, img: e.target.value })}
            />
            <input
              type="text"
              placeholder="Caption"
              value={newSlide.text}
              onChange={(e) => setNewSlide({ ...newSlide, text: e.target.value })}
            />
            <button className="add-btn" onClick={addSlide}>Add to Album</button>
            <button className="save-btn" onClick={saveSlides}>Save Album</button>
          </div>
        </div>

        <div className="gift-box">
          <h2>🎁 Gift Box</h2>
          <div className="gift" onClick={() => alert('🎉 To the best mom in the world, happy birthday! 🥰')}>
            Click Me!
          </div>
        </div>
      </div>

      <footer>
        Made with ❤️ just for you, Mom.
      </footer>
    </div>
  );
}
