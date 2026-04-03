import { Composition, registerRoot } from 'remotion'
import { RESUME_CONSTANTS } from '../data/resume'
import { ResumeComposition } from './ResumeComposition'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ResumeComposition"
        component={ResumeComposition}
        durationInFrames={RESUME_CONSTANTS.TOTAL_FRAMES}
        fps={RESUME_CONSTANTS.FPS}
        width={RESUME_CONSTANTS.COMPOSITION_WIDTH}
        height={RESUME_CONSTANTS.COMPOSITION_HEIGHT}
      />
    </>
  )
}

registerRoot(RemotionRoot)
