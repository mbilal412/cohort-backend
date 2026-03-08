import React, { useState, useRef, useEffect } from 'react'
import '../styles/Player.scss'
import { useSong } from '../hooks/useSong'

const Player = () => {
    const { song } = useSong()

    if (!song) {
        return <div></div>
    }



    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate
        }
    }, [playbackRate])

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        if (!audioRef.current) return
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return
        setDuration(audioRef.current.duration)
    }

    const skipForward = () => {
        if (!audioRef.current) return
        audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 5, duration)
    }

    const skipBackward = () => {
        if (!audioRef.current) return
        audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0)
    }

    const changeSpeed = () => {
        let newRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1
        setPlaybackRate(newRate)
    }

    const handleProgressChange = (e) => {
        if (!audioRef.current) return
        const newTime = Number(e.target.value)
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00"
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div className="player-container">
            <audio
                ref={audioRef}
                src={song.songUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="player-content">
                <div className="song-info">
                    <img src={song.posterUrl} alt={song.title} className="poster" />
                    <div className="details">
                        <h3 className="title">{song.title}</h3>
                        <p className="artist">{song.artist}</p>
                        <span className="mood-badge">{song.mood}</span>
                    </div>
                </div>

                <div className="controls-section">
                    <div className="buttons">
                        <button className="control-btn" onClick={skipBackward} title="Backward 5s">
                            ↺ 5s
                        </button>
                        <button className={`play-btn ${isPlaying ? 'pause' : ''}`} onClick={togglePlay}>
                            {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button className="control-btn" onClick={skipForward} title="Forward 5s">
                            5s ↻
                        </button>
                        <button className="speed-btn" onClick={changeSpeed} title="Playback Speed">
                            {playbackRate}x
                        </button>
                    </div>

                    <div className="progress-container">
                        <span className="time">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            className="progress-bar"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleProgressChange}
                            step="0.01"
                        />
                        <span className="time">{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="extra-controls"></div>
            </div>
        </div>
    )
}

export default Player