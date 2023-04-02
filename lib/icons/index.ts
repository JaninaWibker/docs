import type { SVGProps, ForwardedRef } from 'react'
import Contact from './Contact'
import Info from './Info'
import InfoCircle from './InfoCircle'
import Lightbulb from './Lightbulb'
import Link from './Link'
import Warn from './Warn'
import WarnCircle from './WarnCircle'

export type IconComponent = (props: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => JSX.Element

export {
  Contact,
  Info,
  InfoCircle,
  Lightbulb,
  Link,
  Warn,
  WarnCircle
}
