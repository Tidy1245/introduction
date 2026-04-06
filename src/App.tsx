import { Player, type PlayerRef } from '@remotion/player'
import { gsap } from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RESUME_CONSTANTS, SCENE_SNAPS, projects } from './data/resume'
import { ResumeComposition } from './remotion/ResumeComposition'
import { SceneNav } from './components/SceneNav'

const { TOTAL_FRAMES, FPS, COMPOSITION_WIDTH, COMPOSITION_HEIGHT } = RESUME_CONSTANTS

// How long (ms) to lock input after a navigation starts
const NAV_LOCK_MS = 1600
// GSAP ease for scene-to-scene travel
const NAV_EASE = 'power2.inOut'
// Hero auto-play: animate from frame 0 to this frame on load
const HERO_AUTOPLAY_TO = 90
const HERO_AUTOPLAY_DURATION = 1.6
const TRANSITION_FRAMES = 30
const PROJECTS_SCENE_INDEX = SCENE_SNAPS.findIndex((scene) => scene.key === 'projects')
const TOTAL_PROJECTS = projects.length

const getSceneIndexForFrame = (frame: number) => {
  let sceneIndex = 0

  for (let i = 0; i < SCENE_SNAPS.length; i += 1) {
    if (frame >= SCENE_SNAPS[i].frame) {
      sceneIndex = i
    } else {
      break
    }
  }

  return sceneIndex
}

export default function App() {
  const playerRef = useRef<PlayerRef>(null)
  const currentFrameRef = useRef(0)
  const isNavigating = useRef(false)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const autoplayDelayRef = useRef<number | null>(null)
  const projectStartIndexRef = useRef(0)
  const [currentScene, setCurrentScene] = useState(() => getSceneIndexForFrame(0))
  const [projectStartIndex, setProjectStartIndex] = useState(0)
  const [projectDirection, setProjectDirection] = useState<1 | -1>(1)
  const [projectMotionKey, setProjectMotionKey] = useState(0)

  const resetProjectWindow = useCallback(() => {
    projectStartIndexRef.current = 0
    setProjectStartIndex(0)
    setProjectDirection(1)
    setProjectMotionKey(0)
  }, [])

  const shiftProjectWindow = useCallback(
    (direction: 1 | -1) => {
      if (currentScene !== PROJECTS_SCENE_INDEX || TOTAL_PROJECTS <= 1) {
        return false
      }

      const nextIndex = (projectStartIndexRef.current + direction + TOTAL_PROJECTS) % TOTAL_PROJECTS

      projectStartIndexRef.current = nextIndex
      setProjectDirection(direction)
      setProjectStartIndex(nextIndex)
      setProjectMotionKey((currentKey) => currentKey + 1)
      return true
    },
    [currentScene],
  )

  const syncFrame = useCallback((frame: number) => {
    const roundedFrame = Math.round(frame)
    playerRef.current?.seekTo(roundedFrame)
    currentFrameRef.current = roundedFrame
    setCurrentScene(getSceneIndexForFrame(roundedFrame))
  }, [])

  const runFrameAnimation = useCallback(
    (
      fromFrame: number,
      targetFrame: number,
      duration: number,
      ease: string,
      onComplete?: () => void,
    ) => {
      const obj = { frame: fromFrame }
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(obj, {
        frame: targetFrame,
        duration,
        ease,
        onUpdate() {
          syncFrame(obj.frame)
        },
        onComplete() {
          syncFrame(targetFrame)
          tweenRef.current = null
          onComplete?.()
        },
      })
    },
    [syncFrame],
  )

  const playToFrame = useCallback(
    (targetFrame: number, duration: number, ease: string) => {
      isNavigating.current = true
      runFrameAnimation(currentFrameRef.current, targetFrame, duration, ease, () => {
        isNavigating.current = false
      })
    },
    [runFrameAnimation],
  )

  const getSceneExitFrame = useCallback((sceneIndex: number, direction: 1 | -1) => {
    if (direction > 0) {
      if (sceneIndex >= SCENE_SNAPS.length - 1) {
        return TOTAL_FRAMES - 1
      }

      return Math.max(
        SCENE_SNAPS[sceneIndex].settleFrame,
        SCENE_SNAPS[sceneIndex + 1].frame - TRANSITION_FRAMES,
      )
    }

    return SCENE_SNAPS[sceneIndex].frame
  }, [])

  // ── Navigate to a scene index ─────────────────────────────────────────────
  const navigateTo = useCallback(
    (sceneIndex: number) => {
      if (isNavigating.current) return
      if (sceneIndex < 0 || sceneIndex >= SCENE_SNAPS.length) return

      if (sceneIndex === PROJECTS_SCENE_INDEX && currentScene !== PROJECTS_SCENE_INDEX) {
        resetProjectWindow()
      }

      const targetFrame = SCENE_SNAPS[sceneIndex].settleFrame
      playToFrame(targetFrame, NAV_LOCK_MS / 1000, NAV_EASE)
    },
    [currentScene, playToFrame, resetProjectWindow],
  )

  const navigateFromNav = useCallback(
    (sceneIndex: number) => {
      if (isNavigating.current) return
      if (sceneIndex < 0 || sceneIndex >= SCENE_SNAPS.length) return

      if (sceneIndex === PROJECTS_SCENE_INDEX && currentScene !== PROJECTS_SCENE_INDEX) {
        resetProjectWindow()
      }

      const activeScene = getSceneIndexForFrame(currentFrameRef.current)
      const distance = Math.abs(sceneIndex - activeScene)

      if (distance <= 1) {
        navigateTo(sceneIndex)
        return
      }

      const direction: 1 | -1 = sceneIndex > activeScene ? 1 : -1
      const currentExitFrame = getSceneExitFrame(activeScene, direction)
      const targetEntryFrame = SCENE_SNAPS[sceneIndex].frame
      const targetSettleFrame = SCENE_SNAPS[sceneIndex].settleFrame
      const halfDuration = NAV_LOCK_MS / 2000

      isNavigating.current = true
      runFrameAnimation(currentFrameRef.current, currentExitFrame, halfDuration, NAV_EASE, () => {
        syncFrame(targetEntryFrame)
        runFrameAnimation(targetEntryFrame, targetSettleFrame, halfDuration, NAV_EASE, () => {
          isNavigating.current = false
        })
      })
    },
    [currentScene, getSceneExitFrame, navigateTo, resetProjectWindow, runFrameAnimation, syncFrame],
  )

  // ── Auto-play hero on mount ───────────────────────────────────────────────
  useEffect(() => {
    // Short delay to let Player mount
    autoplayDelayRef.current = window.setTimeout(() => {
      playToFrame(HERO_AUTOPLAY_TO, HERO_AUTOPLAY_DURATION, 'power1.out')
    }, 150)

    return () => {
      if (autoplayDelayRef.current !== null) {
        window.clearTimeout(autoplayDelayRef.current)
      }
      tweenRef.current?.kill()
      tweenRef.current = null
      isNavigating.current = false
    }
  }, [playToFrame])

  // ── Wheel navigation ──────────────────────────────────────────────────────
  useEffect(() => {
    let wheelCooldown = false

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (wheelCooldown || isNavigating.current) return

      const isHorizontalGesture =
        currentScene === PROJECTS_SCENE_INDEX &&
        Math.abs(e.deltaX) > Math.abs(e.deltaY) &&
        Math.abs(e.deltaX) > 24

      if (isHorizontalGesture) {
        const handled = shiftProjectWindow(e.deltaX > 0 ? 1 : -1)
        if (handled) {
          wheelCooldown = true
          setTimeout(() => {
            wheelCooldown = false
          }, 280)
        }
        return
      }

      wheelCooldown = true
      setTimeout(() => {
        wheelCooldown = false
      }, NAV_LOCK_MS + 100)

      if (e.deltaY > 0) navigateTo(currentScene + 1)
      else navigateTo(currentScene - 1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [currentScene, navigateTo, shiftProjectWindow])

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (currentScene === PROJECTS_SCENE_INDEX && e.key === 'ArrowLeft') {
        e.preventDefault()
        shiftProjectWindow(-1)
      } else if (currentScene === PROJECTS_SCENE_INDEX && e.key === 'ArrowRight') {
        e.preventDefault()
        shiftProjectWindow(1)
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        navigateTo(currentScene + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        navigateTo(currentScene - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentScene, navigateTo, shiftProjectWindow])

  // ── Touch navigation ──────────────────────────────────────────────────────
  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX - e.changedTouches[0].clientX
      const dy = touchStartY - e.changedTouches[0].clientY

      if (
        currentScene === PROJECTS_SCENE_INDEX &&
        Math.abs(dx) > Math.abs(dy) &&
        Math.abs(dx) >= 40
      ) {
        shiftProjectWindow(dx > 0 ? 1 : -1)
        return
      }

      if (Math.abs(dy) < 40) return // ignore small swipes
      if (dy > 0) navigateTo(currentScene + 1)
      else navigateTo(currentScene - 1)
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [currentScene, navigateTo, shiftProjectWindow])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0A0E1A',
        position: 'relative',
      }}
    >
      {/* Remotion Player — fills viewport */}
      <Player
        ref={playerRef}
        component={ResumeComposition}
        inputProps={{ projectStartIndex, projectDirection, projectMotionKey }}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        compositionWidth={COMPOSITION_WIDTH}
        compositionHeight={COMPOSITION_HEIGHT}
        controls={false}
        loop={false}
        autoPlay={false}
        initialFrame={0}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Left chapter navigation */}
      <SceneNav
        currentScene={currentScene}
        onNavigate={navigateFromNav}
      />

      {/* Scroll hint — shown only on first scene */}
      {currentScene === 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            pointerEvents: 'none',
            zIndex: 20,
            animation: 'fadeInUp 1s ease 2.8s both',
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'rgba(139,148,158,0.7)',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Scroll to explore
          </div>
          <div
            style={{
              width: 22,
              height: 34,
              border: '1px solid rgba(0,217,255,0.3)',
              borderRadius: 11,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 5,
            }}
          >
            <div
              style={{
                width: 3,
                height: 7,
                background: '#00D9FF',
                borderRadius: 2,
                boxShadow: '0 0 6px #00D9FF',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
