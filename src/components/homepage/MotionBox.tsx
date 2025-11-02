import { BoxProps, chakra, shouldForwardProp } from '@chakra-ui/react'
import { isValidMotionProp, motion, Transition, Variants } from 'framer-motion'

// Convert Chakra Box into a Motion-enabled version
// Create a Chakra-wrapped motion element that forwards both Chakra & Framer props
const MotionBoxBase = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

// Available animation types
type AnimationType =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'slide-left'
  | 'slide-right'

// Animation presets
const animations: Record<AnimationType, Variants> = {
  'fade': { hidden: { opacity: 0 }, show: { opacity: 1 } },
  'fade-up': { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  'fade-down': { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  'fade-left': { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  'fade-right': { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  'zoom-in': { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } },
  'zoom-out': { hidden: { opacity: 0, scale: 1.2 }, show: { opacity: 1, scale: 1 } },
  'slide-left': { hidden: { x: -80 }, show: { x: 0 } },
  'slide-right': { hidden: { x: 80 }, show: { x: 0 } },
}

// Props: everything Box has EXCEPT Chakra's `transition` (we override it with Framer's)
interface MotionBoxProps extends Omit<BoxProps, 'transition'> {
  animation?: AnimationType,
  delay?: number,
  duration?: number,
  motionTransition?: Transition; // framer transition override
}

// ISSUE: `transition` type error: it's a known TypeScript type conflict 
//   when mixing Chakra BoxProps with Framer Motion transition typing.
// SOLUTION: 
// 1)Omit transition from Chakra props
const MotionBox = ({
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  motionTransition,
  children,
  ...rest
}: MotionBoxProps) => {
  // 2)build framer transition object
  const framerTransition: Transition = motionTransition ?? { duration, delay }

  return (
    <MotionBoxBase
      variants={animations[animation]}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.2 }}
      /* 3)cast only here to avoid the TS clash between Chakra's responsive type and Framer's Transition */
      transition={framerTransition as unknown as any}
      {...rest}
    >
      {children}
    </MotionBoxBase>
  )
}

export default MotionBox