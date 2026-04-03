import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { education } from '../../data/resume'
import { GlowLine } from '../components/GlowLine'

export const SceneEducation: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headingOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Card slide-in from left (+30 offset)
  const cardSlide = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: { stiffness: 80, damping: 16 },
    durationInFrames: 18,
  })
  const cardX = interpolate(cardSlide, [0, 1], [-80, 0])
  const cardOpacity = interpolate(frame - 36, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Degree text
  const degreeOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const degreeY = interpolate(frame, [40, 50], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Timeline bar fills top-to-bottom
  const timelineHeight = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { stiffness: 50, damping: 13 },
    durationInFrames: 16,
  })

  // English subtitle
  const enOpacity = interpolate(frame, [46, 56], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0A0E1A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 100px',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(124,58,237,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: 900 }}>
        {/* Heading */}
        <div style={{ opacity: headingOpacity, marginBottom: 8 }}>
          <div
            style={{
              fontSize: 13,
              color: '#7C3AED',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Education
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#F0F6FC',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            學歷
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <GlowLine startFrame={34} color="#7C3AED" durationInFrames={16} />
        </div>

        {/* Main card + timeline */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          {/* Timeline bar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
              paddingTop: 8,
            }}
          >
            {/* Year label top */}
            <div
              style={{
                fontSize: 11,
                color: '#8B949E',
                fontFamily: '"JetBrains Mono", monospace',
                marginBottom: 6,
              }}
            >
              {education.startYear}
            </div>
            {/* Vertical bar */}
            <div
              style={{
                width: 2,
                height: 80,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 1,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${timelineHeight * 100}%`,
                  background: 'linear-gradient(180deg, #7C3AED, #00D9FF)',
                  boxShadow: '0 0 8px #7C3AED',
                }}
              />
            </div>
            {/* Year label bottom */}
            <div
              style={{
                fontSize: 11,
                color: '#8B949E',
                fontFamily: '"JetBrains Mono", monospace',
                marginTop: 6,
              }}
            >
              {education.endYear}
            </div>
          </div>

          {/* School card */}
          <div
            style={{
              opacity: cardOpacity,
              transform: `translateX(${cardX}px)`,
              background: '#161B27',
              border: '1px solid rgba(124,58,237,0.3)',
              borderLeft: '3px solid #7C3AED',
              borderRadius: 12,
              padding: '24px 28px',
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: '#F0F6FC',
                fontFamily: '"Noto Sans TC", sans-serif',
                marginBottom: 6,
              }}
            >
              {education.schoolZh}
            </div>

            <div
              style={{
                opacity: degreeOpacity,
                transform: `translateY(${degreeY}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: '#7C3AED',
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                {education.degreeZh}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: '#8B949E',
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {education.period}
              </div>
            </div>
          </div>
        </div>

        {/* English name */}
        <div
          style={{
            opacity: enOpacity,
            marginTop: 20,
            fontSize: 14,
            color: '#8B949E',
            fontFamily: '"Space Grotesk", sans-serif',
            letterSpacing: 1,
          }}
        >
          {education.degreeEn} · {education.schoolEn}
        </div>
      </div>
    </div>
  )
}
