import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { personal } from '../../data/resume'
import { AnimatedText } from '../components/AnimatedText'
import { publicAsset } from '../../utils/publicAsset'

// Subtle dot-grid background
const DotGrid: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'radial-gradient(circle, rgba(0,217,255,0.12) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }}
  />
)

export const SceneHero: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Background fade-in
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Avatar
  const avatarScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { stiffness: 80, damping: 14 },
    durationInFrames: 30,
  })
  const avatarOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Subtitle slide-up
  const subtitleY = interpolate(frame, [40, 65], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const subtitleOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Tag stagger
  const tags = personal.tags
  const tagStartFrame = 50

  // Contact info fade-in
  const contactOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0A0E1A',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background layer */}
      <div style={{ opacity: bgOpacity, position: 'absolute', inset: 0 }}>
        <DotGrid />
        {/* Radial glow center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(0,217,255,0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            opacity: avatarOpacity,
            transform: `scale(${avatarScale})`,
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '2px solid rgba(0,217,255,0.5)',
            boxShadow: '0 0 30px rgba(0,217,255,0.2)',
            overflow: 'hidden',
            background: '#161B27',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
          }}
        >
          <img
            src={publicAsset('avatar.jpg')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => {}}
          />
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center' }}>
          <AnimatedText
            text={personal.nameZh}
            startFrame={25}
            staggerFrames={3}
            style={{
              display: 'block',
              fontSize: 56,
              fontWeight: 700,
              color: '#00D9FF',
              fontFamily: '"Noto Sans TC", sans-serif',
              letterSpacing: 8,
              textShadow: '0 0 30px rgba(0,217,255,0.4)',
            }}
          />
          {/* Subtitle */}
          <div
            style={{
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              fontSize: 18,
              color: '#8B949E',
              fontFamily: '"Space Grotesk", sans-serif',
              marginTop: 8,
              letterSpacing: 2,
            }}
          >
            {personal.nameEn} · {personal.subtitle}
          </div>
        </div>

        {/* Tag pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {tags.map((tag, i) => {
            const tagFrame = frame - tagStartFrame - i * 7
            const tagScale = spring({
              frame: tagFrame,
              fps,
              config: { stiffness: 200, damping: 14 },
              durationInFrames: 20,
            })
            const tagOpacity = interpolate(tagFrame, [0, 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            return (
              <div
                key={tag}
                style={{
                  opacity: tagOpacity,
                  transform: `scale(${tagScale})`,
                  fontSize: 13,
                  color: '#00D9FF',
                  background: 'rgba(0,217,255,0.08)',
                  border: '1px solid rgba(0,217,255,0.3)',
                  borderRadius: 20,
                  padding: '6px 16px',
                  fontFamily: '"Noto Sans TC", sans-serif',
                }}
              >
                {tag}
              </div>
            )
          })}
        </div>

        {/* Contact line */}
        <div
          style={{
            opacity: contactOpacity,
            display: 'flex',
            gap: 24,
            fontSize: 13,
            color: '#8B949E',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          <span>{personal.email}</span>
          <span style={{ color: 'rgba(0,217,255,0.4)' }}>|</span>
          <span>{personal.phone}</span>
          <span style={{ color: 'rgba(0,217,255,0.4)' }}>|</span>
          <span>{personal.location}</span>
        </div>
      </div>
    </div>
  )
}
