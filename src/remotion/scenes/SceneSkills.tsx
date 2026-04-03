import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { skills } from '../../data/resume'
import { GlowLine } from '../components/GlowLine'
import { ProgressBar } from '../components/ProgressBar'

export const SceneSkills: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headingOpacity = interpolate(frame, [30, 40], [0, 1], {
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
        padding: '0 80px',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(0,217,255,0.08) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: 1000 }}>
        {/* Heading */}
        <div style={{ opacity: headingOpacity, marginBottom: 8 }}>
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
            Skills
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#F0F6FC',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            專長
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <GlowLine startFrame={34} durationInFrames={16} />
        </div>

        {/* 2×3 skill grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {skills.map((skill, i) => {
            const cardStartFrame = 30 + i * 3
            const cardScale = spring({
              frame: Math.max(0, frame - cardStartFrame),
              fps,
              config: { stiffness: 140, damping: 18 },
              durationInFrames: 16,
            })
            const cardOpacity = interpolate(frame - cardStartFrame, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            const nameY = interpolate(frame - cardStartFrame - 4, [0, 8], [10, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            const nameOpacity = interpolate(frame - cardStartFrame - 4, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })

            return (
              <div
                key={skill.name}
                style={{
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                  background: '#161B27',
                  border: '1px solid rgba(0,217,255,0.12)',
                  borderRadius: 12,
                  padding: '18px 20px',
                  boxShadow: '0 0 20px rgba(0,217,255,0.04)',
                }}
              >
                {/* Icon + name */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                    opacity: nameOpacity,
                    transform: `translateY(${nameY}px)`,
                  }}
                >
                  {skill.iconAsset ? (
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Img
                        src={staticFile(skill.iconAsset)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  ) : (
                    <span style={{ fontSize: 20 }}>{skill.icon}</span>
                  )}
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#F0F6FC',
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >
                    {skill.name}
                  </span>
                </div>

                {/* Progress bar */}
                <ProgressBar
                  skill={skill}
                  startFrame={cardStartFrame + 4}
                  durationInFrames={8}
                />

                {/* Description */}
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 11,
                    color: '#8B949E',
                    fontFamily: '"Noto Sans TC", sans-serif',
                    lineHeight: 1.5,
                  }}
                >
                  {skill.description}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                  {skill.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 9,
                        color: '#00D9FF',
                        background: 'rgba(0,217,255,0.08)',
                        border: '1px solid rgba(0,217,255,0.2)',
                        borderRadius: 3,
                        padding: '1px 6px',
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
