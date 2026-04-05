import { SCENE_SNAPS } from '../data/resume'

type Props = {
  currentScene: number
  onNavigate: (index: number) => void
}

// Width reserved for the dot column — keeps the connecting line centered
// on the dot regardless of active/inactive dot size change.
const DOT_COL = 12
// Gap between dot center and the next dot center (line height + dot height)
const LINE_H = 28

export const SceneNav: React.FC<Props> = ({ currentScene, onNavigate }) => {
  return (
    <nav
      style={{
        position: 'fixed',
        left: 28,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      aria-label="章節導覽"
    >
      {SCENE_SNAPS.map((scene, i) => {
        const isActive = i === currentScene
        const isPast = i < currentScene

        return (
          <div
            key={scene.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              // Reserve space above for the connecting line (skip first node)
              paddingTop: i > 0 ? LINE_H : 0,
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => onNavigate(i)}
            role="button"
            tabIndex={0}
            aria-label={`前往 ${scene.label}`}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate(i)}
          >
            {/* Connecting line — absolutely placed so it sits above this node's dot */}
            {i > 0 && (
              <div
                style={{
                  position: 'absolute',
                  // Center on the dot column: (DOT_COL/2) - 0.5 for 1px line
                  left: DOT_COL / 2 - 0.5,
                  top: 0,
                  width: 1,
                  height: LINE_H,
                  background: isPast
                    ? 'rgba(0,217,255,0.5)'
                    : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.4s ease',
                }}
              />
            )}

            {/* Dot wrapper — fixed width so the line always hits the center */}
            <div
              style={{
                width: DOT_COL,
                height: DOT_COL,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                  borderRadius: '50%',
                  background: isActive
                    ? '#00D9FF'
                    : isPast
                    ? 'rgba(0,217,255,0.45)'
                    : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive
                    ? '0 0 0 3px rgba(0,217,255,0.2), 0 0 12px rgba(0,217,255,0.5)'
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>

            {/* Label */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                opacity: 1,
                transform: 'translateX(0)',
                transition: 'color 0.25s ease',
                pointerEvents: 'none',
              }}
              className="scene-label"
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: isActive ? '#00D9FF' : '#8B949E',
                  fontFamily: '"Noto Sans TC", sans-serif',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                {scene.label}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: isActive ? 'rgba(0,217,255,0.75)' : '#8B949E',
                  fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: 1,
                  lineHeight: 1.2,
                }}
              >
                {scene.labelEn}
              </span>
            </div>
          </div>
        )
      })}

    </nav>
  )
}
