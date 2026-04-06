import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import type { WorkExperience } from '../../data/resume'

type Props = {
  experience: WorkExperience
  startFrame: number
  direction?: 'left' | 'right'
}

export const TimelineCard: React.FC<Props> = ({
  experience,
  startFrame,
  direction = 'left',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const elapsed = frame - startFrame

  const slideIn = spring({
    frame: Math.max(0, elapsed),
    fps,
    config: { stiffness: 60, damping: 14 },
    durationInFrames: 20,
  })

  const translateX = interpolate(slideIn, [0, 1], [direction === 'left' ? -60 : 60, 0])

  const opacity = interpolate(elapsed, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        background: `linear-gradient(180deg, ${experience.logoColor}14 0%, ${experience.logoColor}05 24%, #161B27 100%)`,
        border: `1px solid ${experience.logoColor}30`,
        borderLeft: `3px solid ${experience.logoColor}`,
        borderRadius: 12,
        padding: '20px 24px',
        flex: 1,
        boxShadow: `0 18px 40px ${experience.logoColor}1A`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 8,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#F0F6FC',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            {experience.role}
          </div>
          <div
            style={{
              fontSize: 12,
              color: experience.logoColor,
              fontFamily: '"Noto Sans TC", sans-serif',
              marginTop: 2,
            }}
          >
            {experience.company}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: 11,
              color: '#8B949E',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {experience.period}
          </div>
          <div
            style={{
              fontSize: 11,
              color: '#8B949E',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            {experience.location} · {experience.durationLabel}
          </div>
        </div>
      </div>

      {/* Bullets */}
      <div style={{ marginBottom: 12 }}>
        {experience.bullets.map((bullet, i) => {
          const bulletOpacity = interpolate(
            elapsed,
            [6 + i * 4, 11 + i * 4],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          )
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 5,
                opacity: bulletOpacity,
              }}
            >
              <span style={{ color: experience.logoColor, fontSize: 11, marginTop: 2 }}>▸</span>
              <span
                style={{
                  fontSize: 12,
                  color: '#C9D1D9',
                  fontFamily: '"Noto Sans TC", sans-serif',
                  lineHeight: 1.5,
                }}
              >
                {bullet}
              </span>
            </div>
          )
        })}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {experience.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              color: experience.logoColor,
              background: `${experience.logoColor}18`,
              border: `1px solid ${experience.logoColor}40`,
              borderRadius: 4,
              padding: '2px 8px',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
