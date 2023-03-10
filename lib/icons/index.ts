import type { SVGProps, ForwardedRef } from 'react'
import Link from './Link'
import Warn from './Warn'
import WarnCircle from './WarnCircle'
import Info from './Info'
import InfoCirle from './InfoCircle'

export type IconComponent = (props: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => JSX.Element

export {
  Link,
  Warn,
  WarnCircle,
  Info,
  InfoCirle,
}
