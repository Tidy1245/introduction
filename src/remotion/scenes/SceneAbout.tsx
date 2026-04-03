import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { personal } from '../../data/resume'
import { GlowLine } from '../components/GlowLine'

export const SceneAbout: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Heading fade-in (+30 offset so animation starts at snap frame)
  const headingOpacity = interpolate(frame, [30, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const headingY = interpolate(frame, [30, 38], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Bio text typewriter
  const bio = personal.bio
  const bioStartFrame = 34
  const charsToShow = Math.floor(
    interpolate(frame - bioStartFrame, [0, 14], [0, bio.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  )

  // Stat badges
  const stats = [
    { label: '年齡', value: `${personal.age} 歲`, color: '#00D9FF' },
    { label: '位置', value: personal.location, color: '#7C3AED' },
    { label: '狀態', value: '求職中', color: '#22C55E' },
    { label: '遠端', value: '可配合', color: '#F59E0B' },
  ]

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0D1117',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 100px',
        gap: 32,
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,217,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: 900 }}>
        {/* Heading */}
        <div
          style={{
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: '#00D9FF',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            About Me
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#F0F6FC',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            關於我
          </div>
        </div>

        {/* Glow line */}
        <div style={{ marginBottom: 28 }}>
          <GlowLine startFrame={33} durationInFrames={12} />
        </div>

        {/* Bio text */}
        <div
          style={{
            fontSize: 18,
            color: '#C9D1D9',
            fontFamily: '"Noto Sans TC", sans-serif',
            lineHeight: 1.8,
            letterSpacing: 1,
            marginBottom: 32,
            minHeight: 60,
          }}
        >
          {bio.slice(0, charsToShow)}
          {charsToShow < bio.length && (
            <span
              style={{
                borderRight: '2px solid #00D9FF',
                marginLeft: 1,
                animation: 'none',
              }}
            />
          )}
        </div>

        {/* Stat badges */}
        <div style={{ display: 'flex', gap: 16 }}>
          {stats.map((stat, i) => {
            const badgeFrame = frame - 38 - i * 3
            const badgeSlide = spring({
              frame: Math.max(0, badgeFrame),
              fps,
              config: { stiffness: 140, damping: 18 },
              durationInFrames: 10,
            })
            const badgeX = interpolate(badgeSlide, [0, 1], [-40, 0])
            const badgeOpacity = interpolate(badgeFrame, [0, 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            return (
              <div
                key={stat.label}
                style={{
                  opacity: badgeOpacity,
                  transform: `translateX(${badgeX}px)`,
                  background: `${stat.color}10`,
                  border: `1px solid ${stat.color}40`,
                  borderRadius: 10,
                  padding: '12px 20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: '#8B949E',
                    fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: stat.color,
                    fontFamily: '"Noto Sans TC", sans-serif',
                  }}
                >
                  {stat.value}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
