import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { education } from '../../data/resume'
import { GlowLine } from '../components/GlowLine'
import { publicAsset } from '../../utils/publicAsset'

export const SceneEducation: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headingOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const timelineProgress = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { stiffness: 50, damping: 13 },
    durationInFrames: 18,
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
            'radial-gradient(circle, rgba(0,217,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: 900 }}>
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
          <GlowLine startFrame={34} color="#00D9FF" durationInFrames={16} />
        </div>

        <div
          style={{
            position: 'relative',
            padding: '8px 20px 0',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 100,
              right: 100,
              top: 196,
              height: 2,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${timelineProgress * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00D9FF, #67E8F9)',
                boxShadow: '0 0 12px rgba(0,217,255,0.5)',
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${education.length}, minmax(0, 1fr))`,
              gap: 40,
              alignItems: 'start',
            }}
          >
            {education.map((item, index) => {
              const cardSpring = spring({
                frame: Math.max(0, frame - (36 + index * 8)),
                fps,
                config: { stiffness: 85, damping: 15 },
                durationInFrames: 18,
              })

              const cardOpacity = interpolate(frame - (36 + index * 8), [0, 8], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })

              const cardY = interpolate(cardSpring, [0, 1], [34, 0])
              const detailOpacity = interpolate(frame - (42 + index * 8), [0, 10], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })

              return (
                <div
                  key={`${item.degreeZh}-${item.period}`}
                  style={{
                    opacity: cardOpacity,
                    transform: `translateY(${cardY}px)`,
                  }}
                >
                  <div
                    style={{
                      minHeight: 142,
                      position: 'relative',
                      background: 'linear-gradient(180deg, rgba(0,217,255,0.16) 0%, rgba(22,27,39,0.96) 26%, #161B27 100%)',
                      border: '1px solid rgba(0,217,255,0.28)',
                      borderTop: '3px solid #00D9FF',
                      borderRadius: 14,
                      padding: '22px 24px',
                      boxShadow: '0 18px 40px rgba(0,217,255,0.12)',
                    }}
                  >
                    <img
                      src={publicAsset('ndhu-logo.png')}
                      style={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        width: 38,
                        height: 38,
                        objectFit: 'contain',
                        opacity: 0.92,
                        filter: 'drop-shadow(0 0 8px rgba(0,217,255,0.18))',
                      }}
                    />
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: '#F0F6FC',
                        fontFamily: '"Noto Sans TC", sans-serif',
                        marginBottom: 6,
                      }}
                    >
                      {item.degreeZh}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#C9D1D9',
                        fontFamily: '"Noto Sans TC", sans-serif',
                        marginBottom: 6,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.schoolZh}
                    </div>
                    <div
                      style={{
                        opacity: detailOpacity,
                        fontSize: 12,
                        color: '#8B949E',
                        fontFamily: '"Space Grotesk", sans-serif',
                        letterSpacing: 0.6,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.degreeEn}
                      <br />
                      {item.schoolEn}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: 26,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: '#00D9FF',
                        border: '3px solid #0A0E1A',
                        boxShadow: '0 0 18px rgba(0,217,255,0.45)',
                        marginBottom: 10,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 12,
                        color: '#F0F6FC',
                        fontFamily: '"JetBrains Mono", monospace',
                        marginBottom: 4,
                      }}
                    >
                      {item.startYear} - {item.endYear}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
