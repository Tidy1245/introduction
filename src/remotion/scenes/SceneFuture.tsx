import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { futurePlans } from '../../data/resume'
import { GlowLine } from '../components/GlowLine'

export const SceneFuture: React.FC = () => {
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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(245,158,11,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: 1040 }}>
        <div style={{ opacity: headingOpacity, marginBottom: 8 }}>
          <div
            style={{
              fontSize: 13,
              color: '#F59E0B',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Future Plan
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#F0F6FC',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            未來規劃
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <GlowLine startFrame={34} color="#F59E0B" durationInFrames={18} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
          }}
        >
          {futurePlans.map((plan, index) => {
            const cardStartFrame = 34 + index * 8
            const cardProgress = spring({
              frame: Math.max(0, frame - cardStartFrame),
              fps,
              config: { stiffness: 90, damping: 16 },
              durationInFrames: 18,
            })
            const cardOpacity = interpolate(frame - cardStartFrame, [0, 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            const translateY = interpolate(cardProgress, [0, 1], [28, 0])

            return (
              <div
                key={plan.range}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${translateY}px)`,
                  background: 'rgba(22,27,39,0.92)',
                  border: `1px solid ${plan.accentColor}35`,
                  borderTop: `3px solid ${plan.accentColor}`,
                  borderRadius: 16,
                  padding: '24px 26px',
                  boxShadow: `0 0 26px ${plan.accentColor}12`,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: plan.accentColor,
                    fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: 2,
                    marginBottom: 10,
                  }}
                >
                  {plan.range}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#F0F6FC',
                    fontFamily: '"Noto Sans TC", sans-serif',
                    marginBottom: 14,
                  }}
                >
                  {plan.title}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.focus.map((item, itemIndex) => {
                    const itemOpacity = interpolate(
                      frame - cardStartFrame - 6 - itemIndex * 5,
                      [0, 8],
                      [0, 1],
                      {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      },
                    )

                    return (
                      <div
                        key={item}
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'flex-start',
                          opacity: itemOpacity,
                        }}
                      >
                        <span
                          style={{
                            color: plan.accentColor,
                            fontSize: 12,
                            marginTop: 4,
                          }}
                        >
                          ◆
                        </span>
                        <span
                          style={{
                            fontSize: 16,
                            color: '#C9D1D9',
                            fontFamily: '"Noto Sans TC", sans-serif',
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
