import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { projects } from '../../data/resume'
import { GlowLine } from '../components/GlowLine'

const ProjectCard: React.FC<{
  project: (typeof projects)[0]
  startFrame: number
  slideFrom: 'left' | 'bottom' | 'right'
}> = ({ project, startFrame, slideFrom }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const elapsed = frame - startFrame
  const slideSpring = spring({
    frame: Math.max(0, elapsed),
    fps,
    config: { stiffness: 70, damping: 16 },
    durationInFrames: 20,
  })

  const opacity = interpolate(elapsed, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  let transform = 'translate(0,0)'
  if (slideFrom === 'left') {
    const x = interpolate(slideSpring, [0, 1], [-70, 0])
    transform = `translateX(${x}px)`
  } else if (slideFrom === 'right') {
    const x = interpolate(slideSpring, [0, 1], [70, 0])
    transform = `translateX(${x}px)`
  } else {
    const y = interpolate(slideSpring, [0, 1], [50, 0])
    transform = `translateY(${y}px)`
  }

  // Count-up for accuracy numbers (only for LSTM project)
  const accuracyNum = interpolate(elapsed - 12, [0, 12], [0, 85.69], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <a
      href={project.linkUrl}
      target="_blank"
      rel="noreferrer"
      className="project-card-link"
      style={{
        display: 'block',
        ['--project-accent' as string]: project.accentColor,
        opacity,
        transform,
        background: '#161B27',
        border: `1px solid ${project.accentColor}25`,
        borderTop: `2px solid ${project.accentColor}`,
        borderRadius: 12,
        padding: '20px 22px',
        flex: 1,
        boxShadow: `0 0 30px ${project.accentColor}08`,
        textDecoration: 'none',
        cursor: project.linkUrl ? 'pointer' : 'default',
        transition: 'box-shadow 0.22s ease, border-color 0.22s ease, transform 0.22s ease',
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: project.accentColor,
            fontFamily: '"JetBrains Mono", monospace',
            marginBottom: 2,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#8B949E',
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          {project.titleEn} · {project.period}
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 12,
          color: '#C9D1D9',
          fontFamily: '"Noto Sans TC", sans-serif',
          lineHeight: 1.6,
          marginBottom: 12,
        }}
      >
        {project.description}
      </div>

      {/* Highlights */}
      <div style={{ marginBottom: 12 }}>
        {project.highlights.map((h, i) => {
          const hOpacity = interpolate(elapsed - 10 - i * 4, [0, 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          // Replace static accuracy with count-up for LSTM project
          const displayText =
            project.title.includes('LSTM') && h.includes('85.69')
              ? `LSTM 5分鐘準確率 ${accuracyNum.toFixed(2)}%`
              : h
          return (
            <div
              key={h}
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 4,
                opacity: hOpacity,
              }}
            >
              <span style={{ color: project.accentColor, fontSize: 10, marginTop: 2 }}>◆</span>
              <span
                style={{
                  fontSize: 11,
                  color: '#8B949E',
                  fontFamily: '"Noto Sans TC", sans-serif',
                }}
              >
                {displayText}
              </span>
            </div>
          )
        })}
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: project.githubUrl ? 10 : 0 }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: 10,
              color: project.accentColor,
              background: `${project.accentColor}10`,
              border: `1px solid ${project.accentColor}30`,
              borderRadius: 4,
              padding: '2px 8px',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      {(project.githubUrl || project.linkUrl) && (
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            color: project.accentColor,
            fontFamily: '"JetBrains Mono", monospace',
            opacity: interpolate(elapsed - 18, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          ↗ {project.linkLabel ?? 'Open Link'}
        </div>
      )}
    </a>
  )
}

export const SceneProjects: React.FC = () => {
  const frame = useCurrentFrame()

  const headingOpacity = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0D1117',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 60px',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(0,217,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: 1100 }}>
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
            Projects
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#F0F6FC',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            專案成就
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <GlowLine startFrame={34} durationInFrames={18} />
        </div>

        {/* Three project cards */}
        <div style={{ display: 'flex', gap: 16 }}>
          <ProjectCard project={projects[0]} startFrame={34} slideFrom="left" />
          <ProjectCard project={projects[1]} startFrame={46} slideFrom="bottom" />
          <ProjectCard project={projects[2]} startFrame={58} slideFrom="right" />
        </div>
      </div>

      <style>{`
        .project-card-link:hover {
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.04),
            0 0 18px color-mix(in srgb, var(--project-accent) 26%, transparent),
            0 0 36px color-mix(in srgb, var(--project-accent) 18%, transparent) !important;
          border-color: color-mix(in srgb, var(--project-accent) 40%, transparent) !important;
        }
      `}</style>
    </div>
  )
}
